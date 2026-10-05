"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// The shared root layout persists across client-side navigation.
export function DevPulseOnly({ children }: { children: ReactNode }) {
  return usePathname() === "/" ? null : children;
}
