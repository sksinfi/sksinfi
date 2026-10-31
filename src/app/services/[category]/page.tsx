import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LegacyPageRenderer from "@/components/LegacyPageRenderer";
import pagesDataRaw from "@/data/pagesContent.json";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const pagesData = pagesDataRaw as Record<
  string,
  { slug: string; file: string; title: string; metaDescription: string; html: string; jsonLd?: string[] }
>;

const categoryToSlugMap: Record<string, string> = {
  loans: "loan",
  loan: "loan",
  insurance: "insurance",
  investments: "investment",
  investment: "investment",
  "real-estate": "real_estate",
  realestate: "real_estate",
  taxation: "accountstax",
  tax: "accountstax",
  accounts: "accountstax",
  nri: "sksinfi_nri",
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const targetSlug = categoryToSlugMap[category.toLowerCase()] || category;
  const page = pagesData[targetSlug];

  if (!page) {
    return {
      title: "Services | SKS INFI",
    };
  }

  return {
    title: page.title || "Services | SKS INFI",
    description: page.metaDescription || "SKS INFI Financial Services in Jaipur and across India.",
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const targetSlug = categoryToSlugMap[category.toLowerCase()] || category;
  const page = pagesData[targetSlug];

  if (!page) {
    notFound();
  }

  return <LegacyPageRenderer slug={targetSlug} initialData={page} />;
}
