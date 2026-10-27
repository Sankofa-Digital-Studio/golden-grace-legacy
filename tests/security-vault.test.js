import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  uint8ToBase64,
  base64ToUint8,
  uint8ToHex,
  hexToUint8,
  toBase64Url,
  fromBase64Url,
  timingSafeEqual,
  encryptField,
  decryptField,
  createBlindIndex,
  generateDigitalWaxSeal,
  verifyDigitalWaxSeal,
  generateTrackingGrantToken,
  verifyTrackingGrantToken,
  maskEmail,
  maskPhone,
  maskAddress,
  maskOrderForEgress,
} from '../src/services/security-vault.js';

describe('Security Vault: Binary & String Utilities', () => {
  it('correctly encodes and decodes Uint8Array to Base64', () => {
    const original = new Uint8Array([72, 101, 108, 108, 111, 32, 71, 111, 108, 100]); // "Hello Gold"
    const b64 = uint8ToBase64(original);
    assert.equal(typeof b64, 'string');
    const restored = base64ToUint8(b64);
    assert.deepEqual(restored, original);

    // Edge cases
    assert.equal(uint8ToBase64(null), '');
    assert.equal(uint8ToBase64('not-u8'), '');
    assert.deepEqual(base64ToUint8(null), new Uint8Array(0));
    assert.deepEqual(base64ToUint8(123), new Uint8Array(0));
  });

  it('correctly encodes and decodes Uint8Array to Hex', () => {
    const original = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
    const hex = uint8ToHex(original);
    assert.equal(hex, 'deadbeef');
    const restored = hexToUint8(hex);
    assert.deepEqual(restored, original);

    // Edge cases
    assert.equal(uint8ToHex(null), '');
    assert.deepEqual(hexToUint8(null), new Uint8Array(0));
    assert.deepEqual(hexToUint8('oddlength'), new Uint8Array(0));
  });

  it('converts to and from URL-safe Base64', () => {
    const text = 'Hello+World/With=Special?Chars';
    const b64Url = toBase64Url(text);
    assert.equal(b64Url.includes('+'), false);
    assert.equal(b64Url.includes('/'), false);
    assert.equal(b64Url.includes('='), false);

    const decoded = fromBase64Url(b64Url);
    assert.equal(decoded, text);
  });

  it('performs timing-safe string comparison', () => {
    assert.equal(timingSafeEqual('deadbeef', 'deadbeef'), true);
    assert.equal(timingSafeEqual('deadbeef', 'deadbeef00'), false);
    assert.equal(timingSafeEqual('deadbeef', 'cafebabe'), false);
    assert.equal(timingSafeEqual(null, 'deadbeef'), false);
    assert.equal(timingSafeEqual('deadbeef', null), false);
  });
});

describe('Security Vault: Field-Level Envelope Encryption (POPIA Vault)', () => {
  it('encrypts and decrypts sensitive PII with AES-256-GCM', async () => {
    const phone = '+27821234567';
    const secret = 'super-secret-vault-passphrase-2026';

    const encrypted = await encryptField(phone, secret);
    assert.match(encrypted, /^enc:v1:[A-Za-z0-9+/=]+:[A-Za-z0-9+/=]+$/);

    const decrypted = await decryptField(encrypted, secret);
    assert.equal(decrypted, phone);
  });

  it('produces different ciphertexts for identical plaintexts (fresh IV test)', async () => {
    const address = '14 Jan Cilliers St, Welkom Central, 9459';
    const secret = 'vault-key-abc';

    const enc1 = await encryptField(address, secret);
    const enc2 = await encryptField(address, secret);

    assert.notEqual(enc1, enc2); // Randomized 96-bit IV guarantee
    assert.equal(await decryptField(enc1, secret), address);
    assert.equal(await decryptField(enc2, secret), address);
  });

  it('fails decryption when ciphertext is tampered or wrong key is supplied', async () => {
    const data = 'Confidential Corporate Client Note';
    const secret1 = 'key-number-one-2026';
    const secret2 = 'key-number-two-2026';

    const encrypted = await encryptField(data, secret1);

    // Wrong key
    await assert.rejects(
      async () => decryptField(encrypted, secret2),
      /Decryption failed/
    );

    // Tampered format
    await assert.rejects(
      async () => decryptField('invalid:format', secret1),
      /Invalid encrypted payload format/
    );

    // Tampered ciphertext payload
    const parts = encrypted.split(':');
    parts[3] = parts[3].slice(0, -4) + 'AAAA'; // corrupt auth tag/bytes
    const tampered = parts.join(':');
    await assert.rejects(
      async () => decryptField(tampered, secret1),
      /Decryption failed/
    );
  });

  it('safely handles empty or null inputs', async () => {
    assert.equal(await encryptField(''), '');
    assert.equal(await encryptField(null), '');
    assert.equal(await decryptField(''), '');
    assert.equal(await decryptField(null), '');
  });
});

describe('Security Vault: Deterministic Blind Indexing', () => {
  it('generates consistent blind index for identical canonical inputs', async () => {
    const pepper = 'welkom-blind-index-pepper-9459';
    const email1 = 'Grace@GoldenGraceLegacy.co.za';
    const email2 = '  grace@goldengracelegacy.co.za  '; // different casing and whitespace

    const bidx1 = await createBlindIndex(email1, pepper);
    const bidx2 = await createBlindIndex(email2, pepper);

    assert.match(bidx1, /^bidx:[0-9a-f]{64}$/);
    assert.equal(bidx1, bidx2); // Case & whitespace canonicalization
  });

  it('produces different blind indexes for distinct values or peppers', async () => {
    const bidxA = await createBlindIndex('info@goldengracelegacy.co.za', 'pepper-1');
    const bidxB = await createBlindIndex('grace@goldengracelegacy.co.za', 'pepper-1');
    const bidxC = await createBlindIndex('info@goldengracelegacy.co.za', 'pepper-2');

    assert.notEqual(bidxA, bidxB);
    assert.notEqual(bidxA, bidxC);
  });

  it('handles empty or null values gracefully', async () => {
    assert.equal(await createBlindIndex(''), '');
    assert.equal(await createBlindIndex(null), '');
  });
});

describe('Security Vault: Digital Wax Seal (Cryptographic Provenance)', () => {
  const sampleOrder = {
    orderReference: 'GG-20261027-4821',
    total: 385.0,
    items: [
      { productId: 'premium-hex-aloe', batchNumber: '2026/FS-01', quantity: 2 },
      { productId: 'daily-squeeze-wild', batchNumber: '2026/FS-02', quantity: 1 },
    ],
    harvestSeason: 'Winter Bloom',
  };

  it('generates a valid, deterministic Digital Wax Seal', async () => {
    const customTime = '2026-10-27T10:00:00.000Z';
    const seal = await generateDigitalWaxSeal(sampleOrder, 'secret-key-1', customTime);

    assert.match(seal.sealCode, /^WAX-[0-9A-F]{4}-[0-9A-F]{4}$/);
    assert.match(seal.signature, /^[0-9a-f]{64}$/);
    assert.equal(seal.apiaryReg, 'DALRRD-DFS194');
    assert.equal(seal.timestamp, customTime);

    // Verification check
    const isValid = await verifyDigitalWaxSeal(
      sampleOrder,
      seal.signature,
      customTime,
      'secret-key-1'
    );
    assert.equal(isValid, true);
  });

  it('detects tampering with order amount, reference, or batch numbers', async () => {
    const customTime = '2026-10-27T10:00:00.000Z';
    const seal = await generateDigitalWaxSeal(sampleOrder, 'master-key', customTime);

    // Tamper with order total (e.g. fraudulent price reduction)
    const tamperedOrder = { ...sampleOrder, total: 200.0 };
    const check1 = await verifyDigitalWaxSeal(
      tamperedOrder,
      seal.signature,
      customTime,
      'master-key'
    );
    assert.equal(check1, false);

    // Tamper with batch numbers (e.g. counterfeit batch claim)
    const tamperedBatch = {
      ...sampleOrder,
      items: [{ productId: 'fake-jar', batchNumber: 'FAKE/BATCH-09' }],
    };
    const check2 = await verifyDigitalWaxSeal(
      tamperedBatch,
      seal.signature,
      customTime,
      'master-key'
    );
    assert.equal(check2, false);

    // Wrong secret key
    const check3 = await verifyDigitalWaxSeal(
      sampleOrder,
      seal.signature,
      customTime,
      'wrong-key'
    );
    assert.equal(check3, false);
  });

  it('handles empty or missing parameters in verifyDigitalWaxSeal', async () => {
    assert.equal(await verifyDigitalWaxSeal(null, 'sig', 'time'), false);
    assert.equal(await verifyDigitalWaxSeal(sampleOrder, '', 'time'), false);
    assert.equal(await verifyDigitalWaxSeal(sampleOrder, 'sig', ''), false);
  });
});

describe('Security Vault: Zero-Knowledge Ephemeral Tracking Grant Tokens', () => {
  it('generates and verifies 1-tap tracking grant tokens', async () => {
    const orderRef = 'GG-20261027-4821';
    const secret = 'tracking-secret-key-xyz';

    const token = await generateTrackingGrantToken(orderRef, {}, secret);
    assert.equal(typeof token, 'string');
    assert.match(token, /^[A-Za-z0-9_-]+\.[0-9a-f]{64}$/);

    const verification = await verifyTrackingGrantToken(token, secret);
    assert.equal(verification.valid, true);
    assert.equal(verification.orderRef, orderRef);
    assert.equal(verification.expired, false);
  });

  it('rejects tampered grant tokens', async () => {
    const orderRef = 'GG-20261027-4821';
    const secret = 'tracking-secret-key-xyz';

    const token = await generateTrackingGrantToken(orderRef, {}, secret);
    const [payload, sig] = token.split('.');

    // Tamper with signature
    const corruptedSig = sig.slice(0, -4) + '0000';
    const check1 = await verifyTrackingGrantToken(`${payload}.${corruptedSig}`, secret);
    assert.equal(check1.valid, false);
    assert.equal(check1.error, 'Cryptographic signature mismatch');

    // Malformed token structure
    const check2 = await verifyTrackingGrantToken('not-a-token', secret);
    assert.equal(check2.valid, false);
    assert.equal(check2.error, 'Malformed token structure');
  });

  it('detects and flags expired grant tokens', async () => {
    const orderRef = 'GG-20261027-4821';
    const secret = 'tracking-secret-key-xyz';

    // Expired 1 second in the past
    const expiredToken = await generateTrackingGrantToken(
      orderRef,
      { expiresInMs: -1000 },
      secret
    );
    const check = await verifyTrackingGrantToken(expiredToken, secret);

    assert.equal(check.valid, false);
    assert.equal(check.expired, true);
    assert.equal(check.orderRef, orderRef);
    assert.equal(check.error, 'Token has expired');
  });

  it('detects incomplete or non-JSON payloads with valid signatures', async () => {
    const secret = 'tracking-secret-key-xyz';
    const enc = new TextEncoder();
    const rawKey = await globalThis.crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    // 1. Incomplete JSON payload (missing ref/exp)
    const incompletePayloadStr = toBase64Url(JSON.stringify({ otherField: 'test' }));
    const sig1 = await globalThis.crypto.subtle.sign('HMAC', rawKey, enc.encode(incompletePayloadStr));
    const token1 = `${incompletePayloadStr}.${uint8ToHex(new Uint8Array(sig1))}`;
    const check1 = await verifyTrackingGrantToken(token1, secret);
    assert.equal(check1.valid, false);
    assert.equal(check1.error, 'Incomplete token payload');

    // 2. Corrupted JSON payload string
    const badJsonPayloadStr = toBase64Url('this-is-not-valid-json');
    const sig2 = await globalThis.crypto.subtle.sign('HMAC', rawKey, enc.encode(badJsonPayloadStr));
    const token2 = `${badJsonPayloadStr}.${uint8ToHex(new Uint8Array(sig2))}`;
    const check2 = await verifyTrackingGrantToken(token2, secret);
    assert.equal(check2.valid, false);
    assert.match(check2.error, /Payload decode error/);
  });

  it('handles null/empty inputs safely', async () => {
    assert.equal(await generateTrackingGrantToken(''), '');
    assert.equal(await generateTrackingGrantToken(null), '');
    const check = await verifyTrackingGrantToken(null);
    assert.equal(check.valid, false);
  });
});

describe('Security Vault: PII Masking & Safe Egress', () => {
  it('masks email addresses accurately', () => {
    assert.equal(
      maskEmail('grace@goldengracelegacy.co.za'),
      'g***e@goldengracelegacy.co.za'
    );
    assert.equal(maskEmail('info@domain.com'), 'i**o@domain.com');
    assert.equal(maskEmail('me@test.com'), 'm*@test.com');
    assert.equal(maskEmail('notanemail'), '***@***.***');
    assert.equal(maskEmail(''), '***@***.***');
    assert.equal(maskEmail(null), '***@***.***');
  });

  it('masks South African phone numbers accurately', () => {
    assert.equal(maskPhone('+27821234567'), '+27 82 *** *567');
    assert.equal(maskPhone('0821234567'), '082 *** *567');
    assert.equal(maskPhone('071 987 6543'), '071 *** *543');
    assert.equal(maskPhone('12345'), '12****45');
    assert.equal(maskPhone(''), '*** *** ****');
    assert.equal(maskPhone(null), '*** *** ****');
  });

  it('masks physical delivery addresses accurately', () => {
    const masked = maskAddress('14 Jan Cilliers St, Welkom Central, Free State');
    assert.equal(masked.includes('14'), true); // building number kept
    assert.equal(masked.includes('J*n'), true);
    assert.equal(masked.includes('C******s'), true);
    assert.equal(maskAddress(''), '***, ***');
    assert.equal(maskAddress(null), '***, ***');
  });

  it('generates fully masked egress order views', () => {
    const rawOrder = {
      orderReference: 'GG-20261027-4821',
      status: 'dispatched',
      createdAt: '2026-10-27T10:00:00Z',
      total: 385,
      currency: 'ZAR',
      customerEmail: 'customer@domain.co.za',
      customerPhone: '0821234567',
      shippingStreet: '14 Jan Cilliers St',
      shippingCity: 'Welkom',
      items: [
        {
          title: 'Aloe Ferox Reserve',
          size: '375g',
          quantity: 2,
          batchNumber: '2026/FS-01',
        },
      ],
      digitalWaxSeal: { sealCode: 'WAX-8F92-B31C' },
    };

    const egress = maskOrderForEgress(rawOrder);

    assert.equal(egress.orderReference, 'GG-20261027-4821');
    assert.equal(egress.status, 'dispatched');
    assert.equal(egress.itemsCount, 1);
    assert.equal(egress.customer.emailMasked, 'c******r@domain.co.za');
    assert.equal(egress.customer.phoneMasked, '082 *** *567');
    assert.equal(egress.shippingAddressMasked.includes('14'), true);
    assert.equal(egress.digitalWaxSeal.sealCode, 'WAX-8F92-B31C');

    // Empty case
    assert.deepEqual(maskOrderForEgress(null), {});
  });
});
