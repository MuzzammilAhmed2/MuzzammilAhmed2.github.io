"use client";

import { useEffect, useState } from "react";

// The intro loader handles the first paint; the curtain only plays on client-side navigations.
let hasNavigated = false;

/** Page transition: a curtain wipes away and the new page eases up on every route change (CSS, transform/opacity only). */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => typeof window !== "undefined" && hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  if (!animate) return <>{children}</>;
  return (
    <>
      <div aria-hidden className="page-curtain pointer-events-none fixed inset-0 z-[80] origin-top bg-surface">
        <div className="absolute inset-x-0 bottom-0 h-px bg-accent" />
      </div>
      <div className="page-in">{children}</div>
    </>
  );
}
