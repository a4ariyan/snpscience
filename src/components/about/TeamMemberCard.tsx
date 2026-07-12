"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  const [showBio, setShowBio] = useState(false);

  const quote = t(language, member.quote, member.quoteAr);
  const bio = t(language, member.bio, member.bioAr);
  const name = t(language, member.name, member.nameAr);
  const role = t(language, member.role, member.roleAr);

  return (
    <motion.article 
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative flex flex-col items-center text-center rounded-3xl border border-border/40 bg-card p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
      itemScope 
      itemType="https://schema.org/Person"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div
        className={cn(
          "relative mb-4 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-2xl font-light text-white shadow-inner",
          member.accent
        )}
        aria-hidden
      >
        {member.initials}
        <div className="absolute inset-0 rounded-full bg-primary/10 mix-blend-overlay" />
      </div>

      <h2 className="text-lg sm:text-xl font-medium text-foreground tracking-tight z-10" itemProp="name">
        {name}
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-primary tracking-wide z-10" itemProp="jobTitle">
        {role}
      </p>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-muted-foreground hover:text-primary transition-colors z-10"
          aria-label={`${name} on LinkedIn`}
          itemProp="sameAs"
        >
          <LinkedInIcon className="h-5 w-5" />
        </a>
      )}

      <div className="w-8 h-px bg-border my-5 z-10 shrink-0" aria-hidden />

      <div className="flex-1 w-full flex flex-col justify-between z-10">
        <div className="relative min-h-[90px] flex items-center justify-center px-1">
          <p 
            key={showBio ? "bio" : "quote"}
            className="text-sm leading-relaxed text-muted-foreground animate-in fade-in zoom-in-95 duration-300"
          >
            {showBio ? (
              bio
            ) : (
              <span className="relative inline-block">
                <span className="relative z-10 italic text-foreground/80">&ldquo;{quote}&rdquo;</span>
                <motion.svg
                  variants={{
                    rest: { pathLength: 0, opacity: 0 },
                    hover: { pathLength: 1, opacity: 1 }
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute -bottom-2 left-0 w-full h-5 -z-10 text-primary pointer-events-none opacity-50"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M -2,12 Q 25,18 50,12 T 102,12"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </motion.svg>
              </span>
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowBio(!showBio)}
          className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors inline-flex items-center justify-center gap-1.5 mx-auto shrink-0"
        >
          {showBio
            ? t(language, "Show less", "عرض أقل")
            : t(language, "Read more", "اقرأ المزيد")}
        </button>
      </div>
    </motion.article>
  );
}
