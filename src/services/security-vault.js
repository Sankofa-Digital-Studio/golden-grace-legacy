// src/services/security-vault.js
// Sovereign Cryptographic Security Vault & POPIA Compliance Layer
// Universal implementation (Node.js 18+, Modern Browsers, Vercel Edge).
// Zero external dependencies. Uses W3C standard Web Cryptography API.

const DEFAULT_VAULT_KEY = 'gg-legacy-vault-master-key-2026-dfs194';
const DEFAULT_PEPPER_KEY = 'gg-legacy-blind-index-pepper-welkom';
const DEFAULT_TRACKING_KEY = 'gg-legacy-ephemeral-grant-secret-key';

/**
 * Universal binary to Base64 encoder.
 * @param {Uint8Array} u8
 * @returns {string}
 */
export function uint8ToBase64(u8) {
  if (!u8 || !(u8 instanceof Uint8Array)) return '';
  let binary = '';
  for (let i = 0; i < u8.length; i++) {
    binary += String.fromCharCode(u8[i]);
  }
  return globalThis.btoa(binary);
}

/**
 * Universal Base64 to binary decoder.
 * @param {string} b64
 * @returns {Uint8Array}
 */
export function base64ToUint8(b64) {
  if (!b64 || typeof b64 !== 'string') return new Uint8Array(0);
  const binary = globalThis.atob(b64);
  const u8 = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    u8[i] = binary.charCodeAt(i);
  }
  return u8;
}

/**
 * Encodes Uint8Array to Hex string.
 * @param {Uint8Array} u8
 * @returns {string}
 */
export function uint8ToHex(u8) {
  if (!u8 || !(u8 instanceof Uint8Array)) return '';
  return Array.from(u8)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Decodes Hex string to Uint8Array.
 * @param {string} hex
 * @returns {Uint8Array}
 */
export function hexToUint8(hex) {
  if (!hex || typeof hex !== 'string' || hex.length % 2 !== 0) return new Uint8Array(0);
  const u8 = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    u8[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return u8;
}

/**
 * URL-safe Base64 encoder.
 * @param {string} str
 * @returns {string}
 */
export function toBase64Url(str) {
  return globalThis
    .btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * URL-safe Base64 decoder.
 * @param {string} b64Url
 * @returns {string}
 */
export function fromBase64Url(b64Url) {
  let b64 = b64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) {
    b64 += '=';
  }
  return globalThis.atob(b64);
}

/**
 * Timing-safe string comparison to prevent timing attacks.
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
export function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Derives a 256-bit AES-GCM CryptoKey from a secret passphrase.
 * @param {string} [secretString=DEFAULT_VAULT_KEY]
 * @returns {Promise<CryptoKey>}
 */
export async function deriveAesGcmKey(secretString = DEFAULT_VAULT_KEY) {
  const enc = new TextEncoder();
  const rawDigest = await globalThis.crypto.subtle.digest(
    'SHA-256',
    enc.encode(secretString)
  );
  return globalThis.crypto.subtle.importKey(
    'raw',
    rawDigest,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Derives an HMAC-SHA256 CryptoKey.
 * @param {string} [secretString=DEFAULT_PEPPER_KEY]
 * @returns {Promise<CryptoKey>}
 */
export async function deriveHmacKey(secretString = DEFAULT_PEPPER_KEY) {
  const enc = new TextEncoder();
  return globalThis.crypto.subtle.importKey(
    'raw',
    enc.encode(secretString),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

// ==============================================================================
// 1. FIELD-LEVEL ENVELOPE ENCRYPTION (POPIA & GDPR DATA VAULT)
// ==============================================================================

/**
 * Encrypts a sensitive plaintext field using AES-256-GCM with a fresh 96-bit IV.
 * Produces format: enc:v1:<base64-iv>:<base64-ciphertext>
 *
 * @param {string} plaintext
 * @param {string} [secretKey=DEFAULT_VAULT_KEY]
 * @returns {Promise<string>}
 */
export async function encryptField(plaintext, secretKey = DEFAULT_VAULT_KEY) {
  if (!plaintext || typeof plaintext !== 'string') return '';
  const cryptoKey = await deriveAesGcmKey(secretKey);
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();

  const ciphertextBuffer = await globalThis.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    enc.encode(plaintext)
  );

  const b64Iv = uint8ToBase64(iv);
  const b64Cipher = uint8ToBase64(new Uint8Array(ciphertextBuffer));
  return `enc:v1:${b64Iv}:${b64Cipher}`;
}

/**
 * Decrypts an envelope-encrypted field.
 *
 * @param {string} encryptedString
 * @param {string} [secretKey=DEFAULT_VAULT_KEY]
 * @returns {Promise<string>}
 */
export async function decryptField(encryptedString, secretKey = DEFAULT_VAULT_KEY) {
  if (!encryptedString || typeof encryptedString !== 'string') return '';
  const parts = encryptedString.split(':');
  if (parts.length !== 4 || parts[0] !== 'enc' || parts[1] !== 'v1') {
    throw new Error('Invalid encrypted payload format');
  }

  const iv = base64ToUint8(parts[2]);
  const cipherBytes = base64ToUint8(parts[3]);
  const cryptoKey = await deriveAesGcmKey(secretKey);

  try {
    const decryptedBuffer = await globalThis.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      cipherBytes
    );
    return new TextDecoder().decode(decryptedBuffer);
  } catch (err) {
    throw new Error(`Decryption failed: data corrupted or invalid key (${err.message})`);
  }
}

// ==============================================================================
// 2. DETERMINISTIC BLIND INDEXING (EXACT-MATCH QUERIES OVER CIPHERTEXT)
// ==============================================================================

/**
 * Creates a deterministic blind index for fast exact-match database queries
 * without storing or decrypting sensitive PII in the database.
 * Produces format: bidx:<64-char-hex>
 *
 * @param {string} value - e.g. Email or Phone number
 * @param {string} [pepper=DEFAULT_PEPPER_KEY]
 * @returns {Promise<string>}
 */
export async function createBlindIndex(value, pepper = DEFAULT_PEPPER_KEY) {
  if (!value || typeof value !== 'string') return '';
  const canonical = value.trim().toLowerCase();
  const hmacKey = await deriveHmacKey(pepper);
  const enc = new TextEncoder();
  const signatureBuffer = await globalThis.crypto.subtle.sign(
    'HMAC',
    hmacKey,
    enc.encode(canonical)
  );
  return `bidx:${uint8ToHex(new Uint8Array(signatureBuffer))}`;
}

// ==============================================================================
// 3. CRYPTOGRAPHIC PROOF OF PROVENANCE: DIGITAL WAX SEAL
// ==============================================================================

/**
 * Computes canonical payload string for digital wax seal.
 * @param {object} orderData
 * @param {string} timestamp
 * @returns {string}
 */
function buildCanonicalSealPayload(orderData, timestamp) {
  const batchList = Array.isArray(orderData.items)
    ? orderData.items.map((i) => i.batchNumber || i.batch || '2026/FS').sort().join(',')
    : '2026/FS';
  return [
    orderData.orderReference || orderData.reference || 'GG-PENDING',
    Number(orderData.total || 0).toFixed(2),
    batchList,
    orderData.harvestSeason || 'Standard',
    'DALRRD-DFS194',
    timestamp,
  ].join('|');
}

/**
 * Generates an unforgeable Digital Wax Seal for completed orders and batch allocations.
 *
 * @param {object} orderData
 * @param {string} [masterSecret=DEFAULT_VAULT_KEY]
 * @param {string} [customTimestamp]
 * @returns {Promise<{ sealCode: string, signature: string, timestamp: string, apiaryReg: string, canonicalPayload: string }>}
 */
export async function generateDigitalWaxSeal(
  orderData,
  masterSecret = DEFAULT_VAULT_KEY,
  customTimestamp
) {
  const timestamp = customTimestamp || new Date().toISOString();
  const canonical = buildCanonicalSealPayload(orderData, timestamp);
  const hmacKey = await deriveHmacKey(masterSecret);
  const enc = new TextEncoder();

  const signatureBuffer = await globalThis.crypto.subtle.sign(
    'HMAC',
    hmacKey,
    enc.encode(canonical)
  );
  const signatureHex = uint8ToHex(new Uint8Array(signatureBuffer));
  const sealCode = `WAX-${signatureHex.slice(0, 4).toUpperCase()}-${signatureHex.slice(4, 8).toUpperCase()}`;

  return {
    sealCode,
    signature: signatureHex,
    timestamp,
    apiaryReg: 'DALRRD-DFS194',
    canonicalPayload: canonical,
  };
}

/**
 * Verifies a Digital Wax Seal against order data.
 *
 * @param {object} orderData
 * @param {string} signatureHex
 * @param {string} timestamp
 * @param {string} [masterSecret=DEFAULT_VAULT_KEY]
 * @returns {Promise<boolean>}
 */
export async function verifyDigitalWaxSeal(
  orderData,
  signatureHex,
  timestamp,
  masterSecret = DEFAULT_VAULT_KEY
) {
  if (!orderData || !signatureHex || !timestamp) return false;
  const canonical = buildCanonicalSealPayload(orderData, timestamp);
  const hmacKey = await deriveHmacKey(masterSecret);
  const enc = new TextEncoder();

  const expectedBuffer = await globalThis.crypto.subtle.sign(
    'HMAC',
    hmacKey,
    enc.encode(canonical)
  );
  const expectedHex = uint8ToHex(new Uint8Array(expectedBuffer));
  return timingSafeEqual(expectedHex, signatureHex);
}

// ==============================================================================
// 4. ZERO-KNOWLEDGE EPHEMERAL TRACKING GRANT TOKENS (IDOR-PROOF TRACKING)
// ==============================================================================

/**
 * Generates a tamper-proof, time-bound ephemeral grant token for 1-tap WhatsApp order tracking.
 * Prevents Insecure Direct Object Reference (IDOR) attacks without requiring a customer password.
 * Format: <base64url-payload>.<signature-hex>
 *
 * @param {string} orderReference
 * @param {{ expiresInMs?: number }} [options={}]
 * @param {string} [secretKey=DEFAULT_TRACKING_KEY]
 * @returns {Promise<string>}
 */
export async function generateTrackingGrantToken(
  orderReference,
  options = {},
  secretKey = DEFAULT_TRACKING_KEY
) {
  if (!orderReference || typeof orderReference !== 'string') return '';
  const expiresInMs = options.expiresInMs || 30 * 24 * 60 * 60 * 1000; // 30 days default
  const nonce = uint8ToHex(globalThis.crypto.getRandomValues(new Uint8Array(8)));

  const payload = {
    ref: orderReference,
    exp: Date.now() + expiresInMs,
    nonce,
  };

  const payloadStr = toBase64Url(JSON.stringify(payload));
  const hmacKey = await deriveHmacKey(secretKey);
  const enc = new TextEncoder();
  const sigBuffer = await globalThis.crypto.subtle.sign(
    'HMAC',
    hmacKey,
    enc.encode(payloadStr)
  );
  const sigHex = uint8ToHex(new Uint8Array(sigBuffer));

  return `${payloadStr}.${sigHex}`;
}

/**
 * Verifies an ephemeral tracking grant token.
 *
 * @param {string} token
 * @param {string} [secretKey=DEFAULT_TRACKING_KEY]
 * @returns {Promise<{ valid: boolean, orderRef?: string, expired?: boolean, error?: string }>}
 */
export async function verifyTrackingGrantToken(token, secretKey = DEFAULT_TRACKING_KEY) {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Token missing or invalid type' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, error: 'Malformed token structure' };
  }

  const [payloadStr, sigHex] = parts;
  const hmacKey = await deriveHmacKey(secretKey);
  const enc = new TextEncoder();
  const expectedSigBuffer = await globalThis.crypto.subtle.sign(
    'HMAC',
    hmacKey,
    enc.encode(payloadStr)
  );
  const expectedSigHex = uint8ToHex(new Uint8Array(expectedSigBuffer));

  if (!timingSafeEqual(expectedSigHex, sigHex)) {
    return { valid: false, error: 'Cryptographic signature mismatch' };
  }

  try {
    const payload = JSON.parse(fromBase64Url(payloadStr));
    if (!payload.ref || !payload.exp) {
      return { valid: false, error: 'Incomplete token payload' };
    }

    if (Date.now() > payload.exp) {
      return { valid: false, orderRef: payload.ref, expired: true, error: 'Token has expired' };
    }

    return { valid: true, orderRef: payload.ref, expired: false };
  } catch (err) {
    return { valid: false, error: `Payload decode error: ${err.message}` };
  }
}

// ==============================================================================
// 5. DATA MASKING & REDACTION (SAFE EGRESS & LEAK DEFENSE)
// ==============================================================================

/**
 * Masks an email address for safe public/semi-public display.
 * e.g. "grace@goldengracelegacy.co.za" -> "g***e@goldengracelegacy.co.za"
 *
 * @param {string} email
 * @returns {string}
 */
export function maskEmail(email) {
  if (!email || typeof email !== 'string' || !email.includes('@')) return '***@***.***';
  const [local, domain] = email.trim().split('@');
  if (local.length <= 2) {
    return `${local[0]}*@${domain}`;
  }
  const maskedLocal = `${local[0]}${'*'.repeat(Math.max(2, local.length - 2))}${local[local.length - 1]}`;
  return `${maskedLocal}@${domain}`;
}

/**
 * Masks a South African phone number for safe egress.
 * e.g. "0821234567" -> "082 *** *567" or "+27821234567" -> "+27 82 *** *567"
 *
 * @param {string} phone
 * @returns {string}
 */
export function maskPhone(phone) {
  if (!phone || typeof phone !== 'string') return '*** *** ****';
  const clean = phone.replace(/\s+/g, '');
  if (clean.startsWith('+27') && clean.length >= 12) {
    return `+27 ${clean.slice(3, 5)} *** *${clean.slice(-3)}`;
  }
  if (clean.length === 10) {
    return `${clean.slice(0, 3)} *** *${clean.slice(-3)}`;
  }
  return `${clean.slice(0, 2)}****${clean.slice(-2)}`;
}

/**
 * Masks a physical delivery address for POPIA compliance.
 * e.g. "14 Jan Cilliers St, Welkom" -> "14 J** C****** St, W****m"
 *
 * @param {string} address
 * @returns {string}
 */
export function maskAddress(address) {
  if (!address || typeof address !== 'string') return '***, ***';
  return address
    .split(',')
    .map((part) => {
      const words = part.trim().split(/\s+/);
      return words
        .map((w) => {
          if (/^\d+$/.test(w)) return w; // keep building numbers
          if (w.length <= 2) return w;
          return `${w[0]}${'*'.repeat(w.length - 2)}${w[w.length - 1]}`;
        })
        .join(' ');
    })
    .join(', ');
}

/**
 * Generates a fully redacted, leak-proof egress representation of an order.
 * Safe for client-side rendering, customer tracking views, and audit logging.
 *
 * @param {object} order
 * @returns {object}
 */
export function maskOrderForEgress(order) {
  if (!order || typeof order !== 'object') return {};
  return {
    orderReference: order.orderReference || order.reference,
    status: order.status || 'pending',
    createdAt: order.createdAt,
    total: order.total,
    currency: order.currency || 'ZAR',
    itemsCount: Array.isArray(order.items) ? order.items.length : 0,
    items: Array.isArray(order.items)
      ? order.items.map((item) => ({
          title: item.title,
          size: item.size,
          quantity: item.quantity,
          batchNumber: item.batchNumber || item.batch || '2026/FS',
        }))
      : [],
    customer: {
      emailMasked: maskEmail(order.customerEmail || order.email),
      phoneMasked: maskPhone(order.customerPhone || order.phone),
    },
    shippingAddressMasked: order.shippingStreet
      ? maskAddress(`${order.shippingStreet}, ${order.shippingCity || 'Free State'}`)
      : null,
    digitalWaxSeal: order.digitalWaxSeal || null,
    trackingUrl: order.trackingUrl || null,
  };
}
