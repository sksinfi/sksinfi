import React from "react";
import type { Metadata } from "next";
import LegacyPageRenderer from "@/components/LegacyPageRenderer";
import pagesDataRaw from "@/data/pagesContent.json";

const pagesData = pagesDataRaw as Record<
  string,
  { slug: string; file: string; title: string; metaDescription: string; html: string; jsonLd?: string[] }
>;

export const metadata: Metadata = {
  title: "Financial Consultancy in India | Trusted SKS INFI Experts",
  description:
    "SKS INFI is a leading financial consultancy in Jaipur and across India offering personalized loan solutions, investments, insurance, NRI services and real estate advisory.",
};

export default function AboutPage() {
  const page = pagesData["about"];
  return <LegacyPageRenderer slug="about" initialData={page} />;
}
