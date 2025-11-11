// File: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider"; // <-- 1. IMPORTAR O NOVO COMPONENTE

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CIS Control Dashboard",
  description: "Análise de Maturidade CIS Control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* ▼▼▼ 2. ENVOLVER OS 'children' COM O AuthProvider ▼▼▼ */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
