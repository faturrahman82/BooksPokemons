import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Pokémon Explorer',
  description: 'Cari dan jelajahi Pokémon favoritmu dengan tampilan interaktif dan modern!',
  keywords: ['pokemon', 'pokedex', 'nextjs', 'pokeapi', 'tanstack', 'frontend test'],
    icons: {
    icon: '/favicon.png', // <- ini menunjuk favicon baru
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-white to-sky-100">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
