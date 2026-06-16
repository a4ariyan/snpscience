"use client";

import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label: string;
}

export function BackButton({ label }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="mb-6 flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
      {label}
    </button>
  );
}
