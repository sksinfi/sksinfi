import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sksinfi.com"),
  title: "SKS INFI | Financial Consultant in Jaipur | Loans, Investments & Advisory",
  description:
    "SKS INFI provides expert financial planning, home loans, business financing, mutual fund SIPs, bonds, and real estate consulting as a trusted Financial Consultant in Jaipur.",
  keywords: [
    "Financial Consultant in Jaipur",
    "Home Loan Jaipur",
    "Business Loan Jaipur",
    "Mutual Fund SIP Advisor Jaipur",
    "Loan Against Property Rajasthan",
    "SKS INFI",
    "Financial Advisor in Jaipur"
  ],
  authors: [{ name: "SKS INFI" }],
  openGraph: {
    title: "SKS INFI | Financial Consultant in Jaipur",
    description:
      "Expert loan syndication, wealth compounding, mutual funds, insurance, and real estate solutions in Jaipur.",
    url: "https://www.sksinfi.com",
    siteName: "SKS INFI",
    images: [
      {
        url: "/images/about.png",
        width: 1200,
        height: 630,
        alt: "SKS INFI Financial Consultant"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link rel="stylesheet" href="/css/legacy.css" />
      </head>
      <body className="antialiased min-h-screen text-[#333333] bg-white font-['Poppins',sans-serif]" suppressHydrationWarning>
        {children}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
