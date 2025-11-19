import type { Metadata } from "next";
import { Inter, Lora, Roboto_Slab, Balthazar, Jersey_20 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import FooterImage from "@/components/footerimage";
import Footer from "@/components/footer";
import ReactLenis from "lenis/react";
// app/layout.tsx (or pages/_app.js)
import Okta from 'next/font/local';

// app/layout.tsx (or pages/_app.js)
const OktaRegular = Okta({
  src: '../public/fonts/OktaItalic.otf', // Adjust path as needed
  variable: '--font-Okta', // Optional: for CSS variables
  // You can add more font variations if needed:
  // src: [
  //   {
  //     path: '../public/fonts/MyFont-Regular.otf',
  //     weight: '400',
  //     style: 'normal',
  //   },
  //   {
  //     path: '../public/fonts/MyFont-Bold.otf',
  //     weight: '700',
  //     style: 'normal',
  //   },
  // ],
});

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
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    images: [
      {
        url: "/repairconnectglasslogo.png",
      },
    ],
  },
};

const Jersey20s = Jersey_20({
  variable: "--font-Jersey_20",
  weight: ["400"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Inters.variable} ${Loras.variable} ${Robotoslab.variable} ${Balthazars.variable} ${OktaRegular.variable} ${Jersey20s.variable} antialiased overscroll-none`}
      >
        <Navbar />
        <ReactLenis root>{children}</ReactLenis>
        <Footer />
        <FooterImage />
      </body>
    </html>
  );
}
