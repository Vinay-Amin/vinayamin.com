import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vinay V P - Product Manager | Social Service (NSS) | YEP",
  description: "Product Manager with 4 years of experience and proven expertise in driving product vision, roadmapping, and data-driven decision-making. Specializes in synthesizing complex user requirements into strategic, actionable plans with experience in political and non-political campaigns.",
  keywords: "Product Manager, Product Vision, Roadmapping, Data-driven Decision Making, Python, Django, FastAPI, SQL, MongoDB, Cross-functional Collaboration, Feature Prioritisation, Process Automation, Agile Methodologies, Political Consulting, NSS, YEP",
  authors: [{name: "Vinay V P"}],
  creator: "Vinay V P",
  publisher: "Vinay V P",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Vinay V P - Product Manager | Social Service (NSS) | YEP",
    description: "Product Manager with 4 years of experience and proven expertise in driving product vision, roadmapping, and data-driven decision-making.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}