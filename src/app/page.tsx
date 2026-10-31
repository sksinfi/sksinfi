import React from "react";
import type { Metadata } from "next";
import LegacyPageRenderer from "@/components/LegacyPageRenderer";
import pagesDataRaw from "@/data/pagesContent.json";

const pagesData = pagesDataRaw as Record<
  string,
  { slug: string; file: string; title: string; metaDescription: string; html: string; jsonLd?: string[] }
>;

export const metadata: Metadata = {
  title: "Financial Consultant in Jaipur | Trusted SKS INFI Experts",
  description:
    "SKS INFI provides expert financial planning, investment, loan and insurance services as a trusted Financial Consultant in Jaipur. Contact us today for guidance.",
};

export default function HomePage() {
  const page = pagesData["index"];
  return <LegacyPageRenderer slug="index" initialData={page} />;
}
