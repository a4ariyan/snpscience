"use client";

import { motion } from "framer-motion";
import { ScribbleUnderline, ScribbleSparkle, MarkerHighlight } from "@/components/ui/Scribbles";
import type { Language } from "@/shared/language";

interface AboutHeroQuoteProps {
  language: Language;
  quoteAr: string;
}

export function AboutHeroQuote({ language, quoteAr }: AboutHeroQuoteProps) {
  return (
    <section className="pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)", y: 15 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block"
        >
          <ScribbleSparkle 
            className="w-10 h-10 md:w-14 md:h-14 -top-8 -left-6 md:-top-12 md:-left-12 opacity-60" 
            delay={0.8} 
          />
          <ScribbleSparkle 
            className="w-6 h-6 md:w-8 md:h-8 -bottom-4 -right-4 md:-bottom-6 md:-right-8 opacity-40" 
            delay={1.1} 
          />
          
          <h1
            className={`text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-normal leading-relaxed md:leading-relaxed text-foreground tracking-tight ${
              language === "ar" ? "font-arabic-serif" : "font-serif-display"
            }`}
          >
            {language === "en" ? (
              <>
                “Research on <MarkerHighlight active delay={1.4}>Natural Science</MarkerHighlight>. At SNP, we are dedicated to advancing genomics through{" "}
                <ScribbleUnderline>open research</ScribbleUnderline> and rigorous data. We believe in open science, global collaboration, and providing researchers with the tools they need to decode the fundamental building blocks of life.”
              </>
            ) : (
              <>
                “البحث في <MarkerHighlight active delay={1.4}>العلوم الطبيعية</MarkerHighlight>. في SNP، نكرس جهودنا لتطوير علم الجينوم من خلال{" "}
                <ScribbleUnderline>البحث المفتوح</ScribbleUnderline> والبيانات الدقيقة. نحن نؤمن بالعلم المفتوح والتعاون العالمي وتزويد الباحثين بالأدوات التي يحتاجونها لفك شفرة اللبنات الأساسية للحياة.”
              </>
            )}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}