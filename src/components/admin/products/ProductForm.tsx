"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  createProduct,
  unpublishProduct,
  updateProduct,
} from "@/features/products/actions";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_FORMATS,
} from "@/features/products/constants";
import type { ProductFormData } from "@/features/products/types";
import { cn } from "@/lib/utils";
import { ImageUploader } from "./ImageUploader";

interface ProductFormProps {
  productId?: string;
  initialData: ProductFormData;
  status?: "draft" | "active";
}

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-foreground mb-1.5">
      {children}
      {required && <span className="text-destructive ml-0.5">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-destructive">{message}</p>;
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-accent/20 transition-colors"
      >
        <span className="text-sm font-medium text-foreground">{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0 space-y-4 border-t border-border/50">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
}

export function ProductForm({
  productId,
  initialData,
  status = "draft",
}: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const update = <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const addDosageRow = () => {
    update("dosagePricing", [...form.dosagePricing, { dosage: "", price: "" }]);
  };

  const updateDosageRow = (
    index: number,
    field: "dosage" | "price",
    value: string
  ) => {
    const next = [...form.dosagePricing];
    next[index] = { ...next[index], [field]: value };
    update("dosagePricing", next);
  };

  const removeDosageRow = (index: number) => {
    if (form.dosagePricing.length <= 1) return;
    update(
      "dosagePricing",
      form.dosagePricing.filter((_, i) => i !== index)
    );
  };

  const addSpec = () => {
    update("specs", [...form.specs, { key: "", value: "" }]);
  };

  const handleSave = async (publish = false) => {
    setSaving(true);
    setMessage(null);

    const result = productId
      ? await updateProduct(
          productId,
          form,
          publish ? "active" : status
        )
      : await createProduct(form);

    if (!result.success) {
      setErrors(result.errors ?? {});
      setMessage(result.message ?? "Something went wrong");
      setSaving(false);
      return;
    }

    if (!productId && result.id) {
      router.push(`/admin/products/${result.id}/edit`);
      return;
    }

    setMessage(
      publish ? "Published successfully" : "Saved successfully"
    );
    setSaving(false);
    router.refresh();
  };

  const handleUnpublish = async () => {
    if (!productId) return;
    setSaving(true);
    const result = await unpublishProduct(productId);
    if (result.success) {
      setMessage("Moved to drafts");
      router.refresh();
    } else {
      setMessage(result.message ?? "Could not unpublish");
    }
    setSaving(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave(false);
      }}
      className="space-y-6"
    >
      {message && (
        <div className="rounded-lg bg-primary/10 px-4 py-3 text-sm text-foreground">
          {message}
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
        <h2 className="text-sm font-semibold text-foreground">Basic info</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel required>Title (English)</FieldLabel>
            <input
              type="text"
              value={form.titleEn}
              onChange={(e) => update("titleEn", e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <FieldError message={errors.titleEn} />
          </div>
          <div>
            <FieldLabel required>Title (Arabic)</FieldLabel>
            <input
              type="text"
              value={form.titleAr}
              onChange={(e) => update("titleAr", e.target.value)}
              dir="rtl"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <FieldError message={errors.titleAr} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel>Subtitle (English)</FieldLabel>
            <input
              type="text"
              value={form.subtitleEn}
              onChange={(e) => update("subtitleEn", e.target.value)}
              placeholder="e.g. 10 MG"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <FieldLabel>Subtitle (Arabic)</FieldLabel>
            <input
              type="text"
              value={form.subtitleAr}
              onChange={(e) => update("subtitleAr", e.target.value)}
              placeholder="e.g. 10 مجم"
              dir="rtl"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel required>Category</FieldLabel>
            <select
              value={form.category}
              onChange={(e) =>
                update("category", e.target.value as ProductFormData["category"])
              }
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.labelEn}
                </option>
              ))}
            </select>
            <FieldError message={errors.category} />
          </div>
          <div>
            <FieldLabel>Format</FieldLabel>
            <select
              value={form.format}
              onChange={(e) =>
                update("format", e.target.value as ProductFormData["format"])
              }
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select format</option>
              {PRODUCT_FORMATS.map((fmt) => (
                <option key={fmt.value} value={fmt.value}>
                  {fmt.labelEn}
                </option>
              ))}
            </select>
            <FieldError message={errors.format} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={form.stockStatus}
            onClick={() => update("stockStatus", !form.stockStatus)}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors",
              form.stockStatus ? "bg-primary" : "bg-muted"
            )}
          >
            <span
              className={cn(
                "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform mt-0.5",
                form.stockStatus ? "translate-x-5" : "translate-x-0.5"
              )}
            />
          </button>
          <span className="text-sm text-foreground">
            {form.stockStatus ? "In stock" : "Out of stock"}
          </span>
        </div>
      </div>

      {productId && (
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Images</h2>
          <ImageUploader
            productId={productId}
            images={form.images}
            onChange={(images) => update("images", images)}
            error={errors.images}
          />
        </div>
      )}

      {!productId && (
        <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-5 text-sm text-muted-foreground">
          Save as draft first, then upload images on the edit page.
        </div>
      )}

      <CollapsibleSection title="Description">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel>Description (English)</FieldLabel>
            <textarea
              rows={4}
              value={form.descriptionEn}
              onChange={(e) => update("descriptionEn", e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          </div>
          <div>
            <FieldLabel>Description (Arabic)</FieldLabel>
            <textarea
              rows={4}
              value={form.descriptionAr}
              onChange={(e) => update("descriptionAr", e.target.value)}
              dir="rtl"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Dosage & pricing" defaultOpen>
        <div className="space-y-3">
          {form.dosagePricing.map((row, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={row.dosage}
                onChange={(e) => updateDosageRow(index, "dosage", e.target.value)}
                placeholder="e.g. 10 MG"
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="number"
                min="0"
                step="0.01"
                value={row.price}
                onChange={(e) => updateDosageRow(index, "price", e.target.value)}
                placeholder="Price (AED)"
                className="w-32 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {form.dosagePricing.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDosageRow(index)}
                  className="rounded-lg border border-border px-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Remove dosage"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addDosageRow}
            className="text-xs font-medium text-primary hover:underline"
          >
            + Add dosage
          </button>
          <FieldError message={errors.dosagePricing} />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Additional details">
        <div className="space-y-4">
          <div>
            <FieldLabel>Active ingredients</FieldLabel>
            <textarea
              rows={2}
              value={form.activeIngredients}
              onChange={(e) => update("activeIngredients", e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          </div>
          <div>
            <FieldLabel>Common uses</FieldLabel>
            <textarea
              rows={2}
              value={form.commonUses}
              onChange={(e) => update("commonUses", e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          </div>
          <div>
            <FieldLabel>Disclaimer</FieldLabel>
            <textarea
              rows={2}
              value={form.disclaimer}
              onChange={(e) => update("disclaimer", e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <FieldLabel>Specs</FieldLabel>
              <button
                type="button"
                onClick={addSpec}
                className="text-xs font-medium text-primary hover:underline"
              >
                + Add spec
              </button>
            </div>
            {form.specs.map((spec, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={spec.key}
                  onChange={(e) => {
                    const next = [...form.specs];
                    next[i] = { ...next[i], key: e.target.value };
                    update("specs", next);
                  }}
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) => {
                    const next = [...form.specs];
                    next[i] = { ...next[i], value: e.target.value };
                    update("specs", next);
                  }}
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      <div className="sticky bottom-0 -mx-6 px-6 py-4 bg-background/95 backdrop-blur border-t border-border flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Save {status === "active" ? "changes" : "draft"}
        </button>

        {productId && status === "draft" && (
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-primary text-primary px-5 py-2.5 text-sm font-medium hover:bg-primary/5 disabled:opacity-50 transition-colors"
          >
            Publish
          </button>
        )}

        {productId && status === "active" && (
          <button
            type="button"
            disabled={saving}
            onClick={handleUnpublish}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
          >
            Unpublish
          </button>
        )}
      </div>
    </form>
  );
}
