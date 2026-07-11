import type { Metadata } from "next";
import "./globals.css";
import portfolioData from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: portfolioData.settings?.seo?.title || "Chandru S | Personal Portfolio | IT Student & AI Builder",
  description: portfolioData.settings?.seo?.description || "Explore the personal brand story, engineering internships, community leadership, and innovative AI web projects built by Chandru S.",
  keywords: portfolioData.settings?.seo?.keywords?.split(',').map((k: string) => k.trim()) || ["Chandru S", "Portfolio", "CSI Joint Secretary", "FastAPI Developer", "Next.js", "Framer Motion", "St. Joseph's College of Engineering", "AI builder"],
  authors: [{ name: "Chandru S" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: portfolioData.settings?.seo?.title || "Chandru S | Portfolio",
    description: portfolioData.settings?.seo?.description || "IT Student & AI Builder — internships, leadership, and projects.",
    type: "website",
    locale: "en_US",
    siteName: "Chandru S Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioData.settings?.seo?.title || "Chandru S | Portfolio",
    description: portfolioData.settings?.seo?.description || "IT Student & AI Builder — internships, leadership, and projects.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
