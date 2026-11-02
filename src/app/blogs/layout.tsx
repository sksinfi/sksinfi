import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Knowledge & Insights Hub | SKS INFI Blogs",
  description:
    "Explore expert financial insights on home loans, business financing, mutual funds, SIP compounding, insurance planning, taxation, and real estate in Jaipur and across India.",
  keywords: [
    "Financial Blogs Jaipur",
    "Loan Guide Jaipur",
    "Mutual Fund SIP Guide",
    "Taxation Tips India",
    "SKS INFI Blogs",
    "Financial Planning Articles"
  ],
  alternates: {
    canonical: "https://www.sksinfi.com/blogs"
  },
  openGraph: {
    title: "Financial Knowledge & Insights Hub | SKS INFI Blogs",
    description:
      "Explore expert financial insights on home loans, business financing, mutual funds, SIP compounding, insurance planning, taxation, and real estate in Jaipur and across India.",
    url: "https://www.sksinfi.com/blogs",
    siteName: "SKS INFI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.sksinfi.com/img/aboutus.png",
        alt: "SKS INFI Financial Insights Hub"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Knowledge & Insights Hub | SKS INFI Blogs",
    description:
      "Explore expert financial insights on home loans, business financing, mutual funds, SIP compounding, insurance planning, taxation, and real estate in Jaipur and across India.",
    images: ["https://www.sksinfi.com/img/aboutus.png"]
  }
};

export default function BlogsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
