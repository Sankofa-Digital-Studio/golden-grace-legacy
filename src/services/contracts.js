// src/services/contracts.js
// Contract validators and schemas for Golden Grace Legacy & Honey storefront.
// 100% Node.js / Vite / SSR compatible without heavy external validator dependencies.

/**
 * Validates a South African mobile/phone number (10 digits or E.164 +27 format).
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidSAPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  // Matches: 0821234567 or +27821234567 or 27821234567
  return /^(?:\+27|27|0)[6-8][0-9]{8}$/.test(cleaned);
}

/**
 * Validates standard email address format.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Validates an order item contract.
 * @param {object} item
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateOrderItem(item) {
  const errors = [];
  if (!item || typeof item !== 'object') {
    return { valid: false, errors: ['Item must be an object'] };
  }
  if (!item.productId && !item.id) errors.push('Missing productId');
  if (!item.title) errors.push('Missing item title');
  if (typeof item.price !== 'number' || item.price < 0) errors.push('Invalid price');
  if (typeof item.quantity !== 'number' || item.quantity <= 0) errors.push('Quantity must be >= 1');
  if (!item.size) errors.push('Missing item size');

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates an order creation request payload.
 * @param {object} payload
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateOrderPayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['Payload must be an object'] };
  }

  if (!isValidEmail(payload.customerEmail || payload.email)) {
    errors.push('Invalid or missing customer email');
  }

  if (payload.customerPhone && !isValidSAPhone(payload.customerPhone)) {
    errors.push('Customer phone must be a valid South African mobile number');
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    errors.push('Order must contain at least one item');
  } else {
    payload.items.forEach((item, index) => {
      const itemCheck = validateOrderItem(item);
      if (!itemCheck.valid) {
        errors.push(`Item at index ${index} is invalid: ${itemCheck.errors.join(', ')}`);
      }
    });
  }

  if (typeof payload.total !== 'number' || payload.total < 0) {
    errors.push('Order total must be a non-negative number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates a waitlist lead registration payload.
 * @param {object} payload
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateWaitlistPayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['Payload must be an object'] };
  }
  if (!payload.productId) errors.push('Missing productId');
  if (!isValidEmail(payload.email)) errors.push('Invalid email address');
  if (payload.phone && !isValidSAPhone(payload.phone)) {
    errors.push('Invalid phone format');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates a corporate gifting / bespoke suite inquiry payload.
 * @param {object} payload
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateCorporateInquiryPayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['Payload must be an object'] };
  }
  if (!payload.companyName || payload.companyName.trim().length === 0) {
    errors.push('Company name is required');
  }
  if (!payload.contactName || payload.contactName.trim().length === 0) {
    errors.push('Contact person name is required');
  }
  if (!isValidEmail(payload.email)) {
    errors.push('Invalid or missing email address');
  }
  if (!isValidSAPhone(payload.phone)) {
    errors.push('Valid South African phone number is required');
  }
  if (typeof payload.estimatedUnits !== 'number' || payload.estimatedUnits < 1) {
    errors.push('Estimated units must be at least 1');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generates an official sovereign Golden Grace Order Reference (e.g. GG-20261027-4821).
 * @param {Date} [date=new Date()]
 * @param {number} [randomSuffix]
 * @returns {string}
 */
export function generateOrderReference(date = new Date(), randomSuffix) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const rand = randomSuffix !== undefined ? randomSuffix : Math.floor(1000 + Math.random() * 9000);
  return `GG-${year}${month}${day}-${rand}`;
}
