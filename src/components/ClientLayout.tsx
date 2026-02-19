"use client";

// === CLIENT LAYOUT WRAPPER ===
// This exists because ProgressProvider and Navbar are client components,
// but the root layout.tsx is a server component.
// This bridge lets us wrap the app in client-side providers.

import { ProgressProvider } from "@/hooks/useProgress";
import Navbar from "./Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>
    </ProgressProvider>
  );
}
