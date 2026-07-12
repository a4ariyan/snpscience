"use client";

import { useState } from "react";
import type { TeamMember } from "@/shared/about-content";
import type { Language } from "@/shared/language";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface TeamMemberCardProps {
  member: TeamMember;
  language: Language;
}

export function TeamMemberCard({ member, language }: TeamMemberCardProps) {
  const [expanded, setExpanded] = useState(false);

  const motto = t(language, member.motto, member.mottoAr);
  const quote = t(language, member.quote, member.quoteAr);
  const bio = t(language, member.bio, member.bioAr);
  const name = t(language, member.name, member.nameAr);
  const role = t(language, member.role, member.roleAr);

  return (
    <article className="flex flex-col items-center text-center rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
      <div
        className={cn(
          "relative mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br text-2xl font-semibold text-white shadow-inner",
          member.accent
        )}
        aria-hidden
      >
        {member.initials}
        <div className="absolute inset-0 rounded-full bg-primary/10 mix-blend-overlay" />
      </div>

      <h3 className="text-base font-semibold text-foreground tracking-tight">
        {motto}
      </h3>

      <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{expanded ? bio : quote}&rdquo;
      </blockquote>

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        aria-expanded={expanded}
      >
        {expanded
          ? t(language, "Show less", "عرض أقل")
          : t(language, "Read more", "اقرأ المزيد")}
      </button>

      <div className="mt-6 w-full pt-6 border-t border-border/60">
        <p className="text-lg font-semibold text-foreground">{name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{role}</p>

        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            aria-label={`${name} on LinkedIn`}
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
  );
}
