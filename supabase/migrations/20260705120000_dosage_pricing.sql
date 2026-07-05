ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS dosage_pricing JSONB DEFAULT '[]'::jsonb;

-- Backfill from existing dosage_options + single price
UPDATE public.products
SET dosage_pricing = (
  SELECT COALESCE(
    jsonb_agg(jsonb_build_object('dosage', d, 'price', price)),
    '[]'::jsonb
  )
  FROM unnest(dosage_options) AS d
)
WHERE dosage_options IS NOT NULL
  AND array_length(dosage_options, 1) > 0
  AND (dosage_pricing IS NULL OR dosage_pricing = '[]'::jsonb);

-- Products with no dosage options: one row at base price
UPDATE public.products
SET dosage_pricing = jsonb_build_array(
  jsonb_build_object('dosage', 'Standard', 'price', price)
)
WHERE (dosage_options IS NULL OR array_length(dosage_options, 1) IS NULL)
  AND (dosage_pricing IS NULL OR dosage_pricing = '[]'::jsonb);
