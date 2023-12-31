import Provider from "@/components/NextAuth/provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { EdgeStoreProvider } from "../lib/edgestore";

import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Warehouse AI",
  description: "Wharehouse with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer autoClose={4000} />

        <Provider>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </Provider>
      </body>
    </html>
  );
}
