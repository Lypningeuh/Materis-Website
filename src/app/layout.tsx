import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MATERIS — Formations endométriose & ostéopathie gynécologique",
  description:
    "Former des praticiens qui prennent vraiment soin des femmes. Formations en ostéopathie gynécologique, endométriose et santé féminine par Sandrine, 25+ ans d'expérience.",
  keywords: [
    "formation endométriose",
    "formation ostéopathie gynécologique",
    "formation douleurs pelviennes",
    "formation santé féminine",
    "réseau ostéopathes gynéco",
    "MATERIS",
    "Sandrine ostéopathe",
  ],
  authors: [{ name: "MATERIS" }],
  openGraph: {
    title: "MATERIS — Formations endométriose & ostéopathie gynécologique",
    description:
      "Former des praticiens qui prennent vraiment soin des femmes. 25+ ans d'expérience en ostéopathie gynécologique.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${cormorant.variable} ${raleway.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
