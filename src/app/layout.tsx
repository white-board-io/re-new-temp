import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import { ContactModal } from "@/components/contact-modal";
import { EnquireFab } from "@/components/sections/enquire-fab";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "ReNew Solar — India's Most Reliable Solar Panels",
  description:
    "ReNew Solar is the manufacturing arm of ReNew, India's leading decarbonisation solutions company. Three world-class facilities in Jaipur, Dholera, and Vizag building the panels powering India's net-zero future.",
  manifest: "/favicon_io/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico", sizes: "any" },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon_io/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        {children}
        <EnquireFab />
        <ContactModal />
      </body>
    </html>
  );
}
