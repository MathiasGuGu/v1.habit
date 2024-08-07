import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import Providers from "./_providers/Providers";
import Navbar from "./_components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Habitfarm | Mixing habits with fun.",
  description: "Habitfarm is a habit tracker that mixes habits with fun.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>
          <TRPCReactProvider>
            <Navbar />
            {children}
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
