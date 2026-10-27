-- ==============================================================================
-- Golden Grace Legacy & Honey: Production Database Schema & Security Policies
-- Target RDBMS: PostgreSQL 15+ / Supabase
-- Target Domains: goldengracelegacy.co.za / goldengracelegacy.vercel.app
-- Description: Sovereign e-commerce schema, batch scarcity engine, RLS policies,
--              and payment webhook idempotency logs.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE order_status AS ENUM (
        'pending',
        'paid',
        'processing',
        'dispatched',
        'delivered',
        'cancelled',
        'refunded'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_gateway AS ENUM (
        'paystack',
        'whatsapp_concierge',
        'instant_eft',
        'cash_on_delivery'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) UNIQUE NOT NULL,
    category VARCHAR(64) NOT NULL, -- 'The Jars', 'The Squeeze', 'The Gift'
    title VARCHAR(255) NOT NULL,
    flora VARCHAR(255) NOT NULL,
    vessel VARCHAR(128) NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    compare_at_price NUMERIC(10, 2) CHECK (compare_at_price IS NULL OR compare_at_price > price),
    currency VARCHAR(3) DEFAULT 'ZAR' NOT NULL,
    sizes TEXT[] NOT NULL DEFAULT '{"500g"}',
    taste_notes TEXT,
    scarcity_text TEXT,
    tag VARCHAR(64),
    image_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 4. HARVEST BATCHES TABLE (Scarcity & Regulatory DFS194 Tracking)
CREATE TABLE IF NOT EXISTS public.harvest_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(64) NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    batch_number VARCHAR(64) UNIQUE NOT NULL, -- e.g. '2026/FS-01'
    harvest_season VARCHAR(128) NOT NULL,     -- 'Winter Bloom', 'Summer Veld'
    apiary_location VARCHAR(255) DEFAULT 'Welkom, Free State' NOT NULL,
    dfs194_registration VARCHAR(64) DEFAULT 'DFS194' NOT NULL,
    lab_analysis_url TEXT,
    moisture_percentage NUMERIC(4, 2) CHECK (moisture_percentage <= 20.0), -- South Africa raw standard < 18-20%
    diastase_number NUMERIC(5, 2), -- Living enzyme verification
    total_batch_jars INTEGER NOT NULL CHECK (total_batch_jars > 0),
    remaining_jars INTEGER NOT NULL CHECK (remaining_jars >= 0 AND remaining_jars <= total_batch_jars),
    is_current_active BOOLEAN DEFAULT true NOT NULL,
    harvested_at DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 5. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_reference VARCHAR(64) UNIQUE NOT NULL, -- e.g. 'GG-20261027-4821'
    status order_status DEFAULT 'pending' NOT NULL,
    payment_method payment_gateway DEFAULT 'paystack' NOT NULL,
    payment_reference VARCHAR(128),              -- Paystack reference or manual EFT tag
    
    -- Customer Contact & Billing
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(32) NOT NULL,
    customer_first_name VARCHAR(128),
    customer_last_name VARCHAR(128),
    
    -- Courier Shipping Address
    shipping_street TEXT,
    shipping_suburb VARCHAR(128),
    shipping_city VARCHAR(128) DEFAULT 'Welkom',
    shipping_province VARCHAR(64) DEFAULT 'Free State',
    shipping_postal_code VARCHAR(16),
    shipping_country VARCHAR(64) DEFAULT 'South Africa',
    
    -- Financial Totals (ZAR)
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
    shipping_fee NUMERIC(10, 2) DEFAULT 0.00 NOT NULL CHECK (shipping_fee >= 0),
    discount_amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
    currency VARCHAR(3) DEFAULT 'ZAR' NOT NULL,
    
    -- Waybill & Courier Dispatch Telemetry
    courier_tracking_number VARCHAR(128),
    courier_tracking_url TEXT,
    dispatched_at TIMESTAMPTZ,
    paid_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 6. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id VARCHAR(64) NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    batch_number VARCHAR(64),
    title VARCHAR(255) NOT NULL,
    size VARCHAR(32) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 7. SEASONAL BLOOM WAITLIST LEADS
CREATE TABLE IF NOT EXISTS public.waitlist_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(64) NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    product_title VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    preferred_quantity INTEGER DEFAULT 1 CHECK (preferred_quantity > 0),
    source VARCHAR(64) DEFAULT 'collection_modal',
    notified BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 8. CORPORATE & BESPOKE GIFTING INQUIRIES
CREATE TABLE IF NOT EXISTS public.corporate_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inquiry_reference VARCHAR(64) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    tier VARCHAR(64) DEFAULT 'executive_suites' NOT NULL,
    estimated_units INTEGER NOT NULL CHECK (estimated_units > 0),
    target_delivery_date DATE,
    custom_branding_requested BOOLEAN DEFAULT false NOT NULL,
    notes TEXT,
    status VARCHAR(32) DEFAULT 'new' NOT NULL, -- 'new', 'quoted', 'invoiced', 'fulfilled'
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 9. VERIFIED CUSTOMER REVIEWS
CREATE TABLE IF NOT EXISTS public.customer_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id VARCHAR(64) REFERENCES public.products(id) ON DELETE SET NULL,
    author_name VARCHAR(128) NOT NULL,
    author_location VARCHAR(128) DEFAULT 'South Africa',
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT NOT NULL,
    batch_tested VARCHAR(64),
    is_verified_purchase BOOLEAN DEFAULT true NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 10. PAYSTACK WEBHOOK AUDIT LOG (Idempotency Guard)
CREATE TABLE IF NOT EXISTS public.webhooks_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gateway VARCHAR(32) DEFAULT 'paystack' NOT NULL,
    event_type VARCHAR(64) NOT NULL,
    event_id VARCHAR(128) UNIQUE, -- Idempotency key from Paystack
    order_reference VARCHAR(64),
    payload JSONB NOT NULL,
    processed_successfully BOOLEAN DEFAULT false NOT NULL,
    error_message TEXT,
    received_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- ==============================================================================
-- 11. INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_harvest_batches_product ON public.harvest_batches(product_id) WHERE is_current_active = true;
CREATE INDEX IF NOT EXISTS idx_orders_reference ON public.orders(order_reference);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_product ON public.waitlist_leads(product_id);
CREATE INDEX IF NOT EXISTS idx_webhooks_event_id ON public.webhooks_log(event_id);

-- ==============================================================================
-- 12. AUTOMATED INVENTORY DECREMENT TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.process_paid_order_inventory()
RETURNS TRIGGER AS $$
DECLARE
    item RECORD;
BEGIN
    -- Only trigger when an order status shifts to 'paid'
    IF (NEW.status = 'paid' AND (OLD.status IS NULL OR OLD.status != 'paid')) THEN
        FOR item IN SELECT product_id, quantity FROM public.order_items WHERE order_id = NEW.id LOOP
            UPDATE public.harvest_batches
            SET remaining_jars = GREATEST(0, remaining_jars - item.quantity),
                updated_at = TIMEZONE('utc', NOW())
            WHERE product_id = item.product_id AND is_current_active = true;
        END LOOP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_order_paid_inventory ON public.orders;
CREATE TRIGGER trg_order_paid_inventory
AFTER UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.process_paid_order_inventory();

-- Timestamp auto-update trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_orders_updated_at ON public.orders;
CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_batches_updated_at ON public.harvest_batches;
CREATE TRIGGER trg_batches_updated_at BEFORE UPDATE ON public.harvest_batches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================================================
-- 13. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS across all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.harvest_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corporate_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhooks_log ENABLE ROW LEVEL SECURITY;

-- PRODUCTS: Public Read-Only for Active Items
DROP POLICY IF EXISTS "Public can view active products" ON public.products;
CREATE POLICY "Public can view active products"
ON public.products FOR SELECT
USING (is_active = true);

-- HARVEST BATCHES: Public Read-Only for Active Batches
DROP POLICY IF EXISTS "Public can view active harvest batches" ON public.harvest_batches;
CREATE POLICY "Public can view active harvest batches"
ON public.harvest_batches FOR SELECT
USING (is_current_active = true);

-- REVIEWS: Public Read-Only for Published Reviews
DROP POLICY IF EXISTS "Public can view published customer reviews" ON public.customer_reviews;
CREATE POLICY "Public can view published customer reviews"
ON public.customer_reviews FOR SELECT
USING (is_published = true);

-- ORDERS: Public Insert Allowed (Anonymously or Authenticated during checkout)
DROP POLICY IF EXISTS "Public can place orders" ON public.orders;
CREATE POLICY "Public can place orders"
ON public.orders FOR INSERT
WITH CHECK (
    customer_email IS NOT NULL AND
    customer_phone IS NOT NULL AND
    total >= 0 AND
    status = 'pending'
);

-- ORDERS: Customers can only select their own orders if authenticated or matching reference
DROP POLICY IF EXISTS "Authenticated users view own orders" ON public.orders;
CREATE POLICY "Authenticated users view own orders"
ON public.orders FOR SELECT
USING (
    (auth.uid() IS NOT NULL AND auth.jwt() ->> 'email' = customer_email) OR
    (current_setting('request.jwt.claim.role', true) = 'service_role')
);

-- ORDER ITEMS: Public Insert Allowed during Order Creation
DROP POLICY IF EXISTS "Public can insert order items" ON public.order_items;
CREATE POLICY "Public can insert order items"
ON public.order_items FOR INSERT
WITH CHECK (quantity > 0 AND unit_price >= 0);

-- ORDER ITEMS: Viewable by service role or order owners
DROP POLICY IF EXISTS "View order items" ON public.order_items;
CREATE POLICY "View order items"
ON public.order_items FOR SELECT
USING (
    current_setting('request.jwt.claim.role', true) = 'service_role' OR
    EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_items.order_id AND o.customer_email = auth.jwt() ->> 'email')
);

-- WAITLIST LEADS: Public Insert Allowed
DROP POLICY IF EXISTS "Public can join waitlist" ON public.waitlist_leads;
CREATE POLICY "Public can join waitlist"
ON public.waitlist_leads FOR INSERT
WITH CHECK (email IS NOT NULL AND product_id IS NOT NULL);

-- CORPORATE INQUIRIES: Public Insert Allowed
DROP POLICY IF EXISTS "Public can submit corporate inquiries" ON public.corporate_inquiries;
CREATE POLICY "Public can submit corporate inquiries"
ON public.corporate_inquiries FOR INSERT
WITH CHECK (
    company_name IS NOT NULL AND
    email IS NOT NULL AND
    phone IS NOT NULL AND
    estimated_units > 0
);

-- WEBHOOKS LOG: Restricted strictly to Service Role
DROP POLICY IF EXISTS "Only service role can manage webhooks log" ON public.webhooks_log;
CREATE POLICY "Only service role can manage webhooks log"
ON public.webhooks_log
USING (current_setting('request.jwt.claim.role', true) = 'service_role')
WITH CHECK (current_setting('request.jwt.claim.role', true) = 'service_role');
