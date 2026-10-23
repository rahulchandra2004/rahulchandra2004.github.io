import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahul Chandra — Software Engineer · AI & Cloud Developer",
  description:
    "Portfolio of Rahul Chandra Padamuttam. Software Engineer & AI/Cloud Developer. Certified in Oracle Cloud Infrastructure (OCI) and Google Gemini.",
  keywords: [
    "Rahul Chandra",
    "Software Engineer",
    "AI Developer",
    "Cloud Engineer",
    "Oracle Cloud Infrastructure",
    "Google Gemini",
    "Machine Learning",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Rahul Chandra Padamuttam" }],
  openGraph: {
    title: "Rahul Chandra — Software Engineer · AI & Cloud Developer",
    description: "Building production full-stack systems, deep learning pipelines, and cloud architectures end to end.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050505] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
