import React from "react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import LegacyPageRenderer from "@/components/LegacyPageRenderer";
import pagesDataRaw from "@/data/pagesContent.json";

interface PageProps {
  params: Promise<{ slug: string }>;
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = slug.replace(/\.php$/, "");
  const page = pagesData[cleanSlug];

  if (!page) {
    return {
      title: "SKS INFI | Financial Consultant in Jaipur",
      description: "SKS INFI provides expert financial planning, investment, loan and insurance services as a trusted Financial Consultant in Jaipur."
    };
  }

  const title = page.title || "SKS INFI | Financial Consultant in Jaipur";
  const description =
    page.metaDescription ||
    "SKS INFI provides expert financial planning, investment, loan and insurance services as a trusted Financial Consultant in Jaipur. Contact us today for guidance.";
  const canonicalUrl = page.canonical || `https://www.sksinfi.com/${slug}`;
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

export default async function DynamicLegacyPage({ params }: PageProps) {
  const { slug } = await params;
  const cleanSlug = slug.replace(/\.php$/, "");

  if (cleanSlug === "blog" || cleanSlug === "blogs") {
    redirect("/blogs");
  }
  if (cleanSlug === "msme") {
    redirect("/msme");
  }

  const page = pagesData[cleanSlug];

  if (!page) {
    notFound();
  }

  return <LegacyPageRenderer slug={cleanSlug} initialData={page} />;
}
