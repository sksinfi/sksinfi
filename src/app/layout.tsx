import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sksinfi.com"),
  title: {
    default: "Financial Consultant in Jaipur | Trusted SKS INFI Experts",
    template: "%s | SKS INFI"
  },
  description:
    "SKS INFI provides expert financial planning, investment, loan and insurance services as a trusted Financial Consultant in Jaipur. Contact us today for guidance.",
  keywords: [
    "Financial Consultant in Jaipur",
    "Financial Advisor in Jaipur",
    "Home Loan Jaipur",
    "Business Loan Jaipur",
    "Mutual Fund SIP Advisor Jaipur",
    "Real Estate Consultant Jaipur",
    "Loan Against Property Rajasthan",
    "Taxation Consultant Jaipur",
    "SKS INFI"
  ],
  authors: [{ name: "SKS INFI", url: "https://www.sksinfi.com" }],
  creator: "SKS INFI",
  publisher: "SKS INFI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "UE4re_FjV0-KN4S_jEiH3ftHeUtv8zDtK4wGplCPOqM"
  },
  alternates: {
    canonical: "https://www.sksinfi.com/"
  },
  openGraph: {
    title: "Financial Consultant in Jaipur | Trusted SKS INFI Experts",
    description:
      "SKS INFI provides expert financial planning, investment, loan and insurance services as a trusted Financial Consultant in Jaipur. Contact us today for guidance.",
    url: "https://www.sksinfi.com/",
    siteName: "SKS INFI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.sksinfi.com/img/aboutus.png",
        width: 1200,
        height: 630,
        alt: "SKS INFI Financial Consultant in Jaipur"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Consultant in Jaipur | Trusted SKS INFI Experts",
    description:
      "SKS INFI provides expert financial planning, investment, loan and insurance services as a trusted Financial Consultant in Jaipur. Contact us today for guidance.",
    images: ["https://www.sksinfi.com/img/aboutus.png"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: ["/favicon.ico"]
  }
};

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.sksinfi.com/#organization",
      "name": "SKS INFI",
      "url": "https://www.sksinfi.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.sksinfi.com/img/logo.png"
      },
      "description":
        "SKS INFI is a financial consultancy in Jaipur providing loan advisory, investment planning, insurance solutions, taxation services, NRI advisory and real estate consulting."
    },
    {
      "@type": "WebSite",
      "@id": "https://www.sksinfi.com/#website",
      "url": "https://www.sksinfi.com/",
      "name": "SKS INFI",
      "publisher": {
        "@id": "https://www.sksinfi.com/#organization"
      }
    }
  ]
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
        <link rel="preload" href="/img/sksl.jpg" as="image" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Poppins:wght@300;400;500;600;700&display=swap"
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="stylesheet" href="/css/legacy.css" />

        {/* Global JSON-LD Schema (Organization & WebSite) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen text-[#333333] bg-white font-['Poppins',sans-serif]" suppressHydrationWarning>
        {children}

        {/* Google Analytics / Google Tag Manager (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GGZPZB2RJF"
          strategy="afterInteractive"
        />
        <Script id="google-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GGZPZB2RJF');
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1586258296159685');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1586258296159685&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
