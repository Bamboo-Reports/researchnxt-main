"use client";

import { useLayoutEffect } from "react";
import { syncMotionPreference } from "@/lib/motion";

/** Restore CSS motion after hydration, including on direct visits to inner pages. */
export function MotionPreference() {
  useLayoutEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    syncMotionPreference();
    preference.addEventListener("change", syncMotionPreference);
    return () => preference.removeEventListener("change", syncMotionPreference);
  }, []);
  return null;
}
