import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinay Amin — Product & Technology Leader",
  description:
    "Product & technology leader building analytics platforms that translate complex strategy into measurable delivery. Specializes in data-driven decision-making, experimentation, and engineering stewardship.",
  keywords:
    "Product Manager, Analytics, SaaS, Experimentation, Data-driven, Product Strategy, Engineering Leadership, Bengaluru",
  authors: [{ name: "Vinay Amin" }],
  creator: "Vinay Amin",
  publisher: "Vinay Amin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Vinay Amin — Product & Technology Leader",
    description:
      "Building analytics platforms that translate complex strategy into measurable delivery.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://vinayvp.com",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.svg", sizes: "any", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#030712" />
        <meta name="contact" content="vinayamin1997@gmail.com" />
        <meta name="linkedin" content="https://www.linkedin.com/in/vinayvp/" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
