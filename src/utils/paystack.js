/* eslint-disable no-alert */
// src/utils/paystack.js
// Paystack payment gateway helper and post-checkout WhatsApp hook for Golden Grace Legacy

import { WHATSAPP_NUMBER } from '../config/maintenance.js';

const PAYSTACK_SCRIPT_URL = 'https://js.paystack.co/v1/inline.js';

/**
 * Load Paystack inline script dynamically
 * @returns {Promise<boolean>}
 */
export const loadPaystackScript = () => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if (window.PaystackPop) {
      resolve(true);
      return;
    }

    if (typeof document === 'undefined') {
      resolve(false);
      return;
    }

    const script = document.createElement('script');
    script.src = PAYSTACK_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Paystack inline script failed to load. Falling back to test handler.');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Open Paystack Checkout Modal
 * @param {Object} options
 * @param {string} options.email Customer email
 * @param {number} options.amountInRands Amount in ZAR Rands
 * @param {Array} options.items Cart items
 * @param {string} [options.phone] Optional customer contact
 * @param {Function} options.onSuccess Callback on successful payment (reference)
 * @param {Function} [options.onClose] Callback on modal dismissal
 */
export const openPaystackCheckout = async ({
  email,
  amountInRands,
  items = [],
  phone = '',
  onSuccess,
  onClose,
}) => {
  const publicKey =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PAYSTACK_PUBLIC_KEY) ||
    (typeof globalThis !== 'undefined' && globalThis.process?.env?.VITE_PAYSTACK_PUBLIC_KEY) ||
    'pk_test_sample_golden_grace_legacy';

  const amountInCents = Math.round(amountInRands * 100);
  const reference = `GG-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Attempt to load inline script
  if (typeof window !== 'undefined') {
    await loadPaystackScript();
  }

  if (typeof window !== 'undefined' && window.PaystackPop && publicKey !== 'pk_test_sample_golden_grace_legacy') {
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: amountInCents,
      currency: 'ZAR',
      ref: reference,
      metadata: {
        custom_fields: [
          { display_name: 'Customer Phone', variable_name: 'phone', value: phone },
          { display_name: 'Items Count', variable_name: 'items_count', value: items.length },
        ],
        cart_items: items.map((i) => ({
          id: i.id,
          title: i.title,
          qty: i.quantity,
          size: i.selectedSize,
          price: i.price,
        })),
      },
      callback: (response) => {
        onSuccess?.({
          reference: response.reference || reference,
          status: 'success',
          amount: amountInRands,
        });
      },
      onClose: () => {
        onClose?.();
      },
    });

    handler.openIframe();
  } else {
    // Development / Simulated Test Fallback
    console.info(`[Paystack Dev Mode] Simulated transaction for R${amountInRands} (Ref: ${reference})`);
    const confirmSimulated = typeof window !== 'undefined' && typeof window.confirm === 'function'
      ? window.confirm(
          `[Paystack Test Gateway]\n\nAmount: R${amountInRands}.00 (ZAR)\nCustomer: ${email}\n\nClick OK to simulate successful Paystack card/EFT payment.`
        )
      : true;

    if (confirmSimulated) {
      onSuccess?.({
        reference,
        status: 'success',
        amount: amountInRands,
        simulated: true,
      });
    } else {
      onClose?.();
    }
  }
};

/**
 * Task 5: Build post-checkout WhatsApp dispatch verification URL
 * @param {Object} params
 * @param {string} params.orderRef
 * @param {number} params.total
 * @param {Array} params.items
 * @param {string} [params.email]
 * @returns {string} wa.me URL with pre-filled message
 */
export const buildPostCheckoutWhatsAppUrl = ({ orderRef, total, items = [], email = '' }) => {
  const itemsSummary = items
    .map((item) => `• ${item.quantity}x ${item.title} (${item.selectedSize})`)
    .join('\n');

  const message = [
    `*GOLDEN GRACE HARVEST DISPATCH VERIFICATION*`,
    `--------------------------------------`,
    `Payment Ref: *${orderRef}*`,
    `Status: *PAID VIA PAYSTACK (ZAR R${total})*`,
    email ? `Account: ${email}` : '',
    ``,
    `*Purchased Items:*`,
    itemsSummary,
    ``,
    `Please dispatch this harvest order and send my courier tracking number to this number.`,
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
