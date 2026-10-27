# Golden Grace Legacy: Frontend-to-Backend Service Contracts & API Specs

This document defines the strict, production-grade contracts between the Golden Grace Legacy frontend application (`goldengracelegacy.co.za` / `goldengracelegacy.vercel.app`) and backend infrastructure (Supabase / PostgreSQL and Paystack Payment Webhook engine).

---

## 1. Data Types & Universal Primitives

```typescript
// Currency Primitive: South African Rands (ZAR)
type Currency = 'ZAR';

// ISO 8601 UTC Timestamp
type ISODateTime = string;

// Unique Identifier (UUIDv4)
type UUID = string;

// Standard Order Reference: GG-YYYYMMDD-XXXX (e.g. GG-20261027-4821)
type OrderReference = string;

// Payment Method Indicator
type PaymentMethod = 'paystack' | 'whatsapp_concierge' | 'instant_eft' | 'cash_on_delivery';

// Order Status Lifecycle
type OrderStatus = 'pending' | 'paid' | 'processing' | 'dispatched' | 'delivered' | 'cancelled' | 'refunded';
```

---

## 2. Service Contracts

### Contract 1: Product & Live Batch Scarcity Query
* **Method:** `GET /api/products` (or Supabase RPC `get_store_products()`)
* **Purpose:** Returns all active retail products, active harvest batches, live remaining jar counts, and pricing.

#### Response Contract:
```json
{
  "status": "success",
  "data": [
    {
      "id": "premium-hex-aloe",
      "slug": "aloe-ferox-reserve",
      "category": "The Jars",
      "title": "Aloe Ferox Reserve",
      "flora": "Welkom Central Aloe",
      "batchNumber": "2026/FS-01",
      "harvestSeason": "Winter Bloom",
      "remainingJars": 34,
      "totalBatchJars": 250,
      "isLowStock": true,
      "price": 145.00,
      "compareAtPrice": null,
      "currency": "ZAR",
      "sizes": ["375g", "500g"],
      "vessel": "Hexagonal Glass",
      "imageUrl": "/images/products/aloe-jar.webp",
      "tasteNotes": "Deep amber, rich woody resonance, medicinal finish",
      "scarcityLabel": "Limited Winter Bloom • 34 Jars Remaining",
      "tag": "Best Seller",
      "isActive": true
    }
  ]
}
```

---

### Contract 2: Checkout Order Creation
* **Method:** `POST /api/orders`
* **Purpose:** Creates a pending order record before transaction submission, reserves inventory lock, and outputs the unique `orderReference`.

#### Request Payload:
```json
{
  "customer": {
    "email": "customer@example.co.za",
    "phone": "+27821234567",
    "firstName": "Grace",
    "lastName": "Mokoena"
  },
  "items": [
    {
      "productId": "premium-hex-aloe",
      "title": "Aloe Ferox Reserve",
      "size": "375g",
      "quantity": 2,
      "unitPrice": 145.00
    },
    {
      "productId": "daily-squeeze-wild",
      "title": "Veld Wildflower",
      "size": "500g",
      "quantity": 1,
      "unitPrice": 95.00
    }
  ],
  "shippingAddress": {
    "street": "14 Jan Cilliers St",
    "suburb": "Welkom Central",
    "city": "Welkom",
    "province": "Free State",
    "postalCode": "9459",
    "country": "South Africa"
  },
  "subtotal": 385.00,
  "shippingFee": 75.00,
  "total": 460.00,
  "currency": "ZAR",
  "paymentMethod": "paystack"
}
```

#### Response Contract:
```json
{
  "status": "success",
  "orderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orderReference": "GG-20261027-4821",
  "total": 460.00,
  "currency": "ZAR",
  "status": "pending",
  "digitalWaxSeal": {
    "sealCode": "WAX-8F92-B31C",
    "signature": "0560a1847c3abf84182b8277501549074579d4380bf9bf24153f1521f14f8ae5",
    "timestamp": "2026-10-27T10:15:30.000Z",
    "apiaryReg": "DALRRD-DFS194"
  },
  "trackingGrantToken": "eyJhbGciOiJIUzI1NiJ9...0560a184",
  "trackingUrl": "https://goldengracelegacy.co.za/track?ref=GG-20261027-4821&grant=eyJhbGciOiJIUzI1NiJ9...0560a184",
  "maskedOrder": {
    "orderReference": "GG-20261027-4821",
    "status": "pending",
    "total": 460.00,
    "customer": {
      "emailMasked": "g***e@example.co.za",
      "phoneMasked": "+27 82 *** *567"
    }
  },
  "paystackAccessCode": "0peioxfhpn",
  "createdAt": "2026-10-27T10:15:30.000Z"
}
```

---

### Contract 3: Paystack Webhook Ingestion (`charge.success`)
* **Endpoint:** `POST /api/webhooks/paystack`
* **Signature Verification:** `x-paystack-signature` header compared against HMAC-SHA512 of raw body with `PAYSTACK_SECRET_KEY`.

#### Webhook Payload Contract:
```json
{
  "event": "charge.success",
  "data": {
    "id": 302949,
    "domain": "live",
    "status": "success",
    "reference": "GG-20261027-4821",
    "amount": 46000,
    "message": null,
    "gateway_response": "Successful",
    "paid_at": "2026-10-27T10:16:12.000Z",
    "channel": "card",
    "currency": "ZAR",
    "ip_address": "105.22.14.88",
    "metadata": {
      "order_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "customer_phone": "+27821234567"
    },
    "customer": {
      "email": "customer@example.co.za",
      "customer_code": "CUS_xn9393ks09"
    }
  }
}
```

#### Side-Effects Executed by Backend:
1. Verify signature and check idempotency table (`webhooks_log`) to prevent double-processing.
2. Update `orders.status` to `paid`, store `payment_reference = reference`, record `paid_at`.
3. Execute PostgreSQL stored procedure `decrement_batch_inventory(order_id)`.
4. Trigger automated order confirmation email (via Resend / SendGrid) and dispatch WhatsApp waybill tracking payload.

---

### Contract 4: Seasonal Bloom Waitlist & Pre-Order Lead
* **Method:** `POST /api/waitlist`
* **Purpose:** Captures consumer contact details for out-of-stock or strictly limited seasonal harvests (e.g. *Highland Cosmos*).

#### Request Payload:
```json
{
  "productId": "premium-hex-cosmos",
  "productTitle": "Highland Cosmos",
  "email": "honeylover@domain.co.za",
  "phone": "+27712345678",
  "preferredQuantity": 2,
  "source": "collection_modal"
}
```

#### Response Contract:
```json
{
  "status": "success",
  "message": "You are on the priority reserve list for Highland Cosmos.",
  "waitlistId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "estimatedHarvest": "Late Summer 2027"
}
```

---

### Contract 5: Corporate & Bespoke Gifting Inquiry
* **Method:** `POST /api/corporate-inquiries`
* **Purpose:** Ingests B2B corporate gifting, custom wax-sealed hamper inquiries, and B-BBEE procurement quote requests.

#### Request Payload:
```json
{
  "companyName": "Kalahari Capital Partners",
  "contactName": "Thabo Sithole",
  "email": "thabo@kalaharicapital.co.za",
  "phone": "+27118809000",
  "tier": "executive_suites",
  "estimatedUnits": 75,
  "targetDeliveryDate": "2026-12-05",
  "customBrandingRequested": true,
  "notes": "Interested in custom wooden boxes with wax seals and corporate thank-you insert."
}
```

#### Response Contract:
```json
{
  "status": "success",
  "inquiryReference": "CORP-2026-0042",
  "message": "Inquiry received. A bespoke gifting dossier and quotation will be delivered within 4 business hours."
}
```

---

### Contract 6: Zero-Knowledge Order Tracking & Verification Lookup
* **Method:** `GET /api/orders/track?ref={orderReference}&grant={grantToken}`
* **Purpose:** Allows frictionless 1-tap order status and waybill tracking directly from WhatsApp/SMS without password accounts, while completely defeating IDOR scraping attacks.

#### Query Parameters:
- `ref`: Order reference string (e.g. `GG-20261027-4821`)
- `grant`: Cryptographic time-bound grant token (`<payloadBase64Url>.<signatureHex>`)

#### Response Contract (Safe Masked Egress):
```json
{
  "status": "success",
  "order": {
    "orderReference": "GG-20261027-4821",
    "status": "dispatched",
    "createdAt": "2026-10-27T10:15:30.000Z",
    "total": 460.00,
    "currency": "ZAR",
    "itemsCount": 2,
    "items": [
      {
        "title": "Aloe Ferox Reserve",
        "size": "375g",
        "quantity": 2,
        "batchNumber": "2026/FS-01"
      },
      {
        "title": "Veld Wildflower",
        "size": "500g",
        "quantity": 1,
        "batchNumber": "2026/FS-02"
      }
    ],
    "customer": {
      "emailMasked": "g***e@example.co.za",
      "phoneMasked": "+27 82 *** *567"
    },
    "shippingAddressMasked": "14 J** C****** St, W****m",
    "digitalWaxSeal": {
      "sealCode": "WAX-8F92-B31C",
      "signature": "0560a1847c3abf84182b8277501549074579d4380bf9bf24153f1521f14f8ae5",
      "apiaryReg": "DALRRD-DFS194",
      "verified": true
    },
    "courierTelemetry": {
      "trackingNumber": "TC-8893910",
      "trackingUrl": "https://thecourierguy.co.za/track?no=TC-8893910"
    }
  }
}
```

