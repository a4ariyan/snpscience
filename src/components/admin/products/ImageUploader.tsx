"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadProductImage } from "@/features/products/actions";
import { MAX_PRODUCT_IMAGES } from "@/features/products/constants";
import { compressImage } from "@/lib/image-compress";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  productId: string;
  images: string[];
  onChange: (images: string[]) => void;
  error?: string;
}

export function ImageUploader({
  productId,
  images,
  onChange,
  error,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remaining = MAX_PRODUCT_IMAGES - images.length;
    if (remaining <= 0) {
      setUploadError(`Maximum ${MAX_PRODUCT_IMAGES} images allowed`);
      return;
    }

    setUploading(true);
    setUploadError(null);

    const newUrls: string[] = [];

    for (let i = 0; i < Math.min(files.length, remaining); i++) {
      let file = files[i];
      try {
        file = await compressImage(file);
      } catch (err) {
        setUploadError(
          err instanceof Error ? err.message : "Image compression failed"
        );
        break;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", productId);

      const result = await uploadProductImage(formData);
      if (result.success && result.url) {
        newUrls.push(result.url);
      } else {
        setUploadError(result.message ?? "Upload failed");
        break;
      }
    }

    if (newUrls.length > 0) {
      onChange([...images, ...newUrls]);
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {images.map((url, index) => (
          <div
            key={url}
            className="relative h-24 w-24 rounded-xl border border-border overflow-hidden group"
          >
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            {index === 0 && (
              <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                Primary
              </span>
            )}
          </div>
        ))}

        {images.length < MAX_PRODUCT_IMAGES && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className={cn(
              "flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors",
              uploading && "opacity-50 cursor-not-allowed"
            )}
          >
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <ImagePlus className="h-5 w-5" />
                <span className="text-xs">Upload</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {(error || uploadError) && (
        <p className="text-sm text-destructive">{error || uploadError}</p>
      )}

      <p className="text-xs text-muted-foreground">
        JPG, PNG or WebP. Converted to WebP on upload (max 2MB). Up to{" "}
        {MAX_PRODUCT_IMAGES} images.
      </p>
    </div>
  );
}
