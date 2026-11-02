import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Partner | Channel Partner & DSA Network | SKS INFI",
  description:
    "Join SKS INFI nationwide network of financial consultants, DSAs, and channel partners for loan distribution, wealth management, and real estate services.",
  keywords: [
    "Channel Partner SKS INFI",
    "DSA Registration Jaipur",
    "Partner Program Financial Services",
    "Loan Syndication Partner",
    "Financial Advisory Network"
  ],
  alternates: {
    canonical: "https://www.sksinfi.com/partner"
  },
  openGraph: {
    title: "Become a Partner | Channel Partner & DSA Network | SKS INFI",
    description:
      "Join SKS INFI nationwide network of financial consultants, DSAs, and channel partners for loan distribution, wealth management, and real estate services.",
    url: "https://www.sksinfi.com/partner",
    siteName: "SKS INFI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.sksinfi.com/img/aboutus.png",
        alt: "Partner With SKS INFI"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Become a Partner | Channel Partner & DSA Network | SKS INFI",
    description:
      "Join SKS INFI nationwide network of financial consultants, DSAs, and channel partners for loan distribution, wealth management, and real estate services.",
    images: ["https://www.sksinfi.com/img/aboutus.png"]
  }
};

export default function PartnerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
