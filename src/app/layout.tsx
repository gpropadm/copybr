import type { Metadata } from "next";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "CopyBR - Gerador de Copy com IA",
  description: "A primeira plataforma brasileira de geração de copy com IA. Crie textos que vendem em segundos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="facebook-domain-verification" content="1256183002680390" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <ConditionalNavbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
