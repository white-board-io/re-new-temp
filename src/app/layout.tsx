import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "ReNew Solar — India's Most Reliable Solar Panels",
  description:
    "ReNew Solar is the manufacturing arm of ReNew, India's leading decarbonisation solutions company. Three world-class facilities in Jaipur, Dholera, and Vizag building the panels powering India's net-zero future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
