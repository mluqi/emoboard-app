"use client";

import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/context/AuthProvider";
import { Toaster } from "sonner";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "EmoBoard",
//   description:
//     "Your public space to store and reflect on your deepest thoughts and feelings.",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} ${nunito.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
