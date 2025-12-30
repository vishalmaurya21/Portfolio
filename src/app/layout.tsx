import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vishal Kumar | Full Stack Developer & UI/UX Designer",
  description: "A passionate full stack developer creating beautiful, functional, and user-friendly digital experiences. Explore my portfolio to see my latest projects and skills.",
  keywords: ["Portfolio", "Full Stack Developer", "UI/UX Designer", "React", "Next.js", "Web Development"],
  authors: [{ name: "Vishal Kumar" }],
  openGraph: {
    title: "Vishal Kumar | Full Stack Developer",
    description: "A passionate full stack developer creating beautiful digital experiences.",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
