-- Fix abbreviated product slugs to full title-derived names
UPDATE public.products SET slug = 'bacteriostatic-water' WHERE slug = 'bac-water';
UPDATE public.products SET slug = 'glp-3-reta' WHERE slug = 'glp3-reta';
UPDATE public.products SET slug = 'glp-3-reta-pen' WHERE slug = 'glp3-reta-pen';
UPDATE public.products SET slug = 'ghk-cu' WHERE slug = 'ghk-cu';
UPDATE public.products SET slug = 'mots-c' WHERE slug = 'mots-c';
UPDATE public.products SET slug = 'ipamorelin' WHERE slug = 'ipamorelin';
