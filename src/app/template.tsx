"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// The intro loader handles the first paint; the curtain only plays on client-side navigations.
let hasNavigated = false;

/** Page transition: a curtain wipes away and the new page eases up on every route change. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [animate] = useState(() => typeof window !== "undefined" && hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  if (reduce || !animate) return <>{children}</>;
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] origin-top bg-surface"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-accent" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
}
