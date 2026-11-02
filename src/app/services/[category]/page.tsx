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
  {
    slug: string;
    file: string;
    title: string;
    metaDescription: string;
    keywords?: string;
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    html: string;
    jsonLd?: string[];
  }
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
  nri: "sksinfi_nri"
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const targetSlug = categoryToSlugMap[category.toLowerCase()] || category;
  const page = pagesData[targetSlug];

  if (!page) {
    return {
      title: "Services | SKS INFI",
      description: "SKS INFI Financial Services in Jaipur and across India."
    };
  }

  const title = page.title || "Services | SKS INFI";
  const description =
    page.metaDescription || "SKS INFI Financial Services in Jaipur and across India.";
  const canonicalUrl = page.canonical || `https://www.sksinfi.com/services/${category}`;
  const ogImg = page.ogImage || "https://www.sksinfi.com/img/aboutus.png";

  const keywordsList = page.keywords
    ? page.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : undefined;

  return {
    title,
    description,
    keywords: keywordsList,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: page.ogTitle || title,
      description: page.ogDescription || description,
      url: canonicalUrl,
      siteName: "SKS INFI",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImg,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: page.twitterTitle || title,
      description: page.twitterDescription || description,
      images: [page.twitterImage || ogImg]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    }
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
