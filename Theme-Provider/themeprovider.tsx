"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

// Theme provider
export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
