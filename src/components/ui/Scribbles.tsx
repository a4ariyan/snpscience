"use client";

import { motion } from "framer-motion";

export function ScribbleUnderline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className || ""}`}>
      <span className="relative z-10">{children}</span>
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        className="absolute -bottom-1 left-0 w-full h-3 z-0 text-primary pointer-events-none"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2,15 Q25,5 50,15 T98,10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </motion.svg>
    </span>
  );
}

export function ScribbleCircle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className || ""}`}>
      <span className="relative z-10">{children}</span>
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        className="absolute -inset-2 w-[calc(100%+1rem)] h-[calc(100%+1rem)] z-0 text-primary/20 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50,5 C80,5 95,25 95,50 C95,80 75,95 50,95 C20,95 5,75 5,50 C5,25 25,5 50,5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>
    </span>
  );
}
