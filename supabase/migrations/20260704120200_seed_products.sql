-- Seed existing static products as drafts for admin review
INSERT INTO public.products (
  slug,
  status,
  title,
  subtitle,
  category,
  price,
  currency,
  stock_status,
  dosage_options,
  format,
  description
) VALUES
  (
    'bacteriostatic-water',
    'draft',
    '{"en": "Bacteriostatic Water", "ar": "ماء بكتريوستاتيك"}'::jsonb,
    '{"en": "11 ML", "ar": "11 مل"}'::jsonb,
    'Recovery & Repair',
    99.00,
    'AED',
    true,
    ARRAY['11 ML'],
    'vial',
    NULL
  ),
  (
    'glp-3-reta',
    'draft',
    '{"en": "GLP-3 (Reta)", "ar": "GLP-3 (Reta)"}'::jsonb,
    '{"en": "10 / 30 MG", "ar": "10 / 30 مجم"}'::jsonb,
    'Metabolic & Weight',
    390.00,
    'AED',
    true,
    ARRAY['10 MG', '30 MG'],
    'vial',
    NULL
  ),
  (
    'glp-3-reta-pen',
    'draft',
    '{"en": "GLP-3 (Reta) Pen", "ar": "قلم GLP-3 (Reta)"}'::jsonb,
    '{"en": "10 MG", "ar": "10 مجم"}'::jsonb,
    'Metabolic & Weight',
    450.00,
    'AED',
    true,
    ARRAY['10 MG'],
    'pen',
    NULL
  ),
  (
    'ghk-cu',
    'draft',
    '{"en": "GHK-CU", "ar": "GHK-CU"}'::jsonb,
    '{"en": "50 MG", "ar": "50 مجم"}'::jsonb,
    'Recovery & Repair',
    320.00,
    'AED',
    true,
    ARRAY['50 MG'],
    'vial',
    NULL
  ),
  (
    'mots-c',
    'draft',
    '{"en": "MOTS-C", "ar": "MOTS-C"}'::jsonb,
    '{"en": "10 MG", "ar": "10 مجم"}'::jsonb,
    'Longevity & Immune',
    280.00,
    'AED',
    true,
    ARRAY['10 MG'],
    'vial',
    NULL
  ),
  (
    'ipamorelin',
    'draft',
    '{"en": "Ipamorelin", "ar": "إيباموريلين"}'::jsonb,
    '{"en": "5 MG", "ar": "5 مجم"}'::jsonb,
    'Cognitive & Neuro',
    240.00,
    'AED',
    true,
    ARRAY['5 MG'],
    'vial',
    NULL
  )
ON CONFLICT (slug) DO NOTHING;
