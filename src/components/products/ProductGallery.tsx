"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCT_PLACEHOLDER_IMAGE } from "@/shared/products-content";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const gallery = images.length > 0 ? images : [PRODUCT_PLACEHOLDER_IMAGE];
  const [active, setActive] = useState(0);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 md:p-5">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
        <Image
          src={gallery[active]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      {gallery.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {gallery.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                active === index ? "border-primary" : "border-border"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
