import React from "react";
import type { Metadata } from "next";
import LegacyPageRenderer from "@/components/LegacyPageRenderer";
import pagesDataRaw from "@/data/pagesContent.json";

const pagesData = pagesDataRaw as Record<
  string,
  { slug: string; file: string; title: string; metaDescription: string; html: string; jsonLd?: string[] }
>;

export const metadata: Metadata = {
  title: "SKS INFI Contact Number | Get Expert Financial Guidance Today",
  description:
    "Contact SKS INFI in Jaipur for expert financial consultation, loans, investments, insurance and NRI financial services.",
};

export default function ContactPage() {
  const page = pagesData["contact"];
  return <LegacyPageRenderer slug="contact" initialData={page} />;
}
