-- Products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'active')),
  title JSONB NOT NULL,
  subtitle JSONB,
  category TEXT NOT NULL CHECK (category IN (
    'Recovery & Repair',
    'Metabolic & Weight',
    'Longevity & Immune',
    'Skin & Beauty',
    'Cognitive & Neuro',
    'Growth & Body'
  )),
  price NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'AED',
  stock_status BOOLEAN NOT NULL DEFAULT true,
  dosage_options TEXT[],
  format TEXT CHECK (format IN ('vial', 'pen', 'spray')),
  images TEXT[] DEFAULT '{}',
  lab_results_image TEXT,
  purity_percentage NUMERIC,
  lab_method TEXT,
  description JSONB,
  active_ingredients TEXT,
  common_uses TEXT,
  specs JSONB,
  disclaimer TEXT DEFAULT 'For laboratory research use only. Not for human consumption.',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_modtime
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_modified_column();

-- RLS: products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active products"
  ON public.products FOR SELECT
  USING (status = 'active');

CREATE POLICY "Admins manage products"
  ON public.products FOR ALL
  USING ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true)
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

-- RLS: reviews (public read approved only; admins full access)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read approved reviews"
  ON public.reviews FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Admins manage reviews"
  ON public.reviews FOR ALL
  USING ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true)
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true);

-- Indexes
CREATE INDEX products_status_idx ON public.products (status);
CREATE INDEX products_category_idx ON public.products (category);
CREATE INDEX reviews_product_id_idx ON public.reviews (product_id);
