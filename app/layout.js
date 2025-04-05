import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import Head from 'next/head';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LivresLib - Livres gratuits en EPUB et PDF",
  description: "Découvrez des milliers de livres gratuits à télécharger en formats EPUB et PDF sur LivresLib.com.",
  keywords: "livres gratuits, EPUB, PDF, télécharger livres, livres domaine public, LivresLib"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1803218881232491"
          crossorigin="anonymous"
        ></script>
        
        {/* Google Analytics Script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6CXBM5K6LR"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6CXBM5K6LR');
          `}
        </script>
      
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

