import React from "react";
import type { Metadata } from "next";
import ModernNavbar from "@/components/ModernNavbar";
import ModernHome from "@/components/ModernHome";
import ModernFooter from "@/components/ModernFooter";

export const metadata: Metadata = {
  title: "Financial Consultant in Jaipur | Trusted SKS INFI Experts | Compare Best Loans",
  description:
    "Compare best loan offers with lowest interest rates in Jaipur from 45+ banks. SKS INFI provides expert Home Loans, LAP, Business Loans, Mutual Funds, and Insurance advisory.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ModernNavbar />
      <main className="flex-1 w-full">
        <ModernHome />
      </main>
      <ModernFooter />
    </div>
  );
}
