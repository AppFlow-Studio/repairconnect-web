import type { Metadata } from "next";
import { Inter, Lora, Roboto_Slab, Balthazar } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import FooterImage from "@/components/footerimage";
import Footer from "@/components/footer";
import ReactLenis from "lenis/react";
const Inters = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",

});

const Loras = Lora({
  variable: "--font-Lora",
  subsets: ["latin"],
  display: "swap",

});

const Robotoslab = Roboto_Slab({
  variable: "--font-Roboto_Slab",
  weight: "500",
  style: "normal",
  subsets: ["latin"],
  display: "swap",

});

const Balthazars = Balthazar({
  variable: "--font-Balthazar",
  weight: ["400"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",

});

export const metadata: Metadata = {
  title: "Otopair",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Inters.variable} ${Loras.variable} ${Robotoslab.variable} ${Balthazars.variable} antialiased overscroll-none`}
      >
        <Navbar />
        <ReactLenis root>{children}</ReactLenis>
        <Footer />
        <FooterImage />
      </body>
    </html>
  );
}
