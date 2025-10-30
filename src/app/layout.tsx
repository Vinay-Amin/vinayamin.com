import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VVP - Product manager",
  description:
    "Product Manager with 4 years of experience and proven expertise in driving product vision, roadmapping, and data-driven decision-making. Specializes in synthesizing complex user requirements into strategic, actionable plans across industries.",
  keywords:
    "Product Manager, Product Vision, Roadmapping, Data-driven Decision Making, Python, Django, FastAPI, SQL, MongoDB, Cross-functional Collaboration, Feature Prioritisation, Process Automation, Agile Methodologies",
  authors: [{ name: "Vinay V P" }],
  creator: "Vinay V P",
  publisher: "Vinay V P",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "VVP - Product manager",
    description:
      "Product Manager with 4 years of experience and proven expertise in driving product vision, roadmapping, and data-driven decision-making.",
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="contact" content="vinayamin1997@gmail.com" />
        <meta name="phone" content="+91 8217866171" />
        <meta name="location" content="Bengaluru, India" />
        <meta name="linkedin" content="https://www.linkedin.com/in/vinayvp/" />
      </head>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}

