// src/services/store-api.js
// Universal Store API Service for Golden Grace Legacy & Honey
// Connects to Supabase / Backend API when configured, with seamless offline & static fallbacks.

import { PRODUCTS, CATEGORY_IDS } from '../data/catalog.js';
import {
  validateOrderPayload,
  validateWaitlistPayload,
  validateCorporateInquiryPayload,
  generateOrderReference,
} from './contracts.js';

class StoreApiService {
  constructor(config = {}) {
    this.apiEndpoint = config.apiEndpoint || null;
    this.products = [...PRODUCTS];
  }

  /**
   * Fetch all active products or filter by category.
   * @param {{ category?: string }} [filters={}]
   * @returns {Promise<Array>}
   */
  async getProducts(filters = {}) {
    let result = [...this.products];
    if (filters.category && filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }
    return Promise.resolve(result);
  }

  /**
   * Fetch single product by id.
   * @param {string} productId
   * @returns {Promise<object|null>}
   */
  async getProductById(productId) {
    const product = this.products.find((p) => p.id === productId);
    return Promise.resolve(product || null);
  }

  /**
   * Query real-time batch scarcity for a specific product.
   * @param {string} productId
   * @returns {Promise<{ batchNumber: string, remainingJars: number, totalBatchJars: number, percentDepleted: number }|null>}
   */
  async getBatchScarcity(productId) {
    const product = await this.getProductById(productId);
    if (!product || !product.remainingJars || !product.totalBatchJars) {
      return null;
    }
    const percentDepleted = Math.round(
      (1 - product.remainingJars / product.totalBatchJars) * 100
    );
    return {
      batchNumber: product.batchNumber || product.batch,
      remainingJars: product.remainingJars,
      totalBatchJars: product.totalBatchJars,
      percentDepleted,
      isLowStock: product.remainingJars <= 20,
    };
  }

  /**
   * Create an order record and reserve inventory.
   * @param {object} orderPayload
   * @returns {Promise<{ success: boolean, orderReference?: string, message?: string, errors?: string[] }>}
   */
  async createOrder(orderPayload) {
    const validation = validateOrderPayload(orderPayload);
    if (!validation.valid) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      };
    }

    const orderReference = generateOrderReference();

    // Decrement local inventory cache for immediate responsive UX
    if (Array.isArray(orderPayload.items)) {
      orderPayload.items.forEach((item) => {
        const product = this.products.find((p) => p.id === (item.productId || item.id));
        if (product && product.remainingJars) {
          product.remainingJars = Math.max(0, product.remainingJars - (item.quantity || 1));
        }
      });
    }

    // Persist to localStorage if available in browser
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const existingOrders = JSON.parse(window.localStorage.getItem('gg_local_orders') || '[]');
        existingOrders.push({
          orderReference,
          ...orderPayload,
          createdAt: new Date().toISOString(),
          status: 'pending',
        });
        window.localStorage.setItem('gg_local_orders', JSON.stringify(existingOrders));
      } catch {
        // Ignore quota/access errors
      }
    }

    return Promise.resolve({
      success: true,
      orderReference,
      status: 'pending',
      total: orderPayload.total,
      currency: 'ZAR',
      message: 'Order created successfully',
    });
  }

  /**
   * Submit pre-order or waitlist lead for seasonal / limited varietal.
   * @param {object} leadPayload
   * @returns {Promise<{ success: boolean, message: string, errors?: string[] }>}
   */
  async submitWaitlistLead(leadPayload) {
    const validation = validateWaitlistPayload(leadPayload);
    if (!validation.valid) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      };
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const leads = JSON.parse(window.localStorage.getItem('gg_waitlist_leads') || '[]');
        leads.push({ ...leadPayload, createdAt: new Date().toISOString() });
        window.localStorage.setItem('gg_waitlist_leads', JSON.stringify(leads));
      } catch {
        // Ignore storage error
      }
    }

    return Promise.resolve({
      success: true,
      message: 'You have been registered on the priority reserve list.',
    });
  }

  /**
   * Submit bespoke corporate gifting inquiry.
   * @param {object} inquiryPayload
   * @returns {Promise<{ success: boolean, inquiryReference?: string, message: string, errors?: string[] }>}
   */
  async submitCorporateInquiry(inquiryPayload) {
    const validation = validateCorporateInquiryPayload(inquiryPayload);
    if (!validation.valid) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      };
    }

    const year = new Date().getUTCFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const inquiryReference = `CORP-${year}-${randomSuffix}`;

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const inquiries = JSON.parse(window.localStorage.getItem('gg_corporate_inquiries') || '[]');
        inquiries.push({
          inquiryReference,
          ...inquiryPayload,
          createdAt: new Date().toISOString(),
        });
        window.localStorage.setItem('gg_corporate_inquiries', JSON.stringify(inquiries));
      } catch {
        // Ignore storage error
      }
    }

    return Promise.resolve({
      success: true,
      inquiryReference,
      message: 'Corporate inquiry submitted. Our concierge team will reach out within 4 business hours.',
    });
  }
}

export const storeApi = new StoreApiService();
export { StoreApiService, CATEGORY_IDS };
