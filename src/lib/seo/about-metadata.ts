import type { Metadata } from "next";
import { teamMembers } from "@/shared/about-content";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://snpscience.com";

const description =
  "Meet the SNP Science team. We advance genomics research through open science, rigorous data, and a global community of researchers based in the UAE.";

export const aboutUsMetadata: Metadata = {
  title: "Our People",
  description,
  keywords: [
    "SNP Science team",
    "genomics research UAE",
    "about SNP",
    "SNP researchers",
    "open science genomics",
    "SNP Science leadership",
  ],
  alternates: { canonical: "/about-us" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Our People | SNP",
    description,
    url: `${siteUrl}/about-us`,
    siteName: "SNP | Research on Natural Science",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our People | SNP",
    description,
  },
};

export function buildAboutJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About SNP Science",
    description,
    url: `${siteUrl}/about-us`,
    mainEntity: {
      "@type": "Organization",
      name: "SNP Science",
      url: siteUrl,
      description:
        "Research on Natural Science. SNP work on Single Nucleotide Polymorphisms and genomics.",
      employee: teamMembers.map((member) => ({
        "@type": "Person",
        name: member.name,
        jobTitle: member.role,
        ...(member.linkedin ? { sameAs: member.linkedin } : {}),
      })),
    },
  };
}

export function buildAboutBreadcrumbJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Our People",
        item: `${siteUrl}/about-us`,
      },
    ],
  };
}
