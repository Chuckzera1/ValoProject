import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "VALORANT Agents",
  description: "Explore all VALORANT agents and their abilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-valorant-gray/30 bg-valorant-black/80 sticky top-0 z-10">
          <nav className="container mx-auto px-4 py-3 flex gap-6" aria-label="Navegação principal">
            <Link href="/" className="nav-link">
              Agentes
            </Link>
            <Link href="/descubra-seu-agente" className="nav-link">
              Descubra seu agente
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
