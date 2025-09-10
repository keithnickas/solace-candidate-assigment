import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./contexts/theme";

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </html>
  );
}
