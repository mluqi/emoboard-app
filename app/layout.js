"use client";

import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AuthProvider } from "@/components/context/AuthProvider";
import { Toaster } from "sonner";
import Header from "@/app/(private)/components/Header";
import MobileBottomNavbar from "@/components/layout/MobileBottomNavbar";
import Footer from "@/components/layout/Footer";

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
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${nunitoSans.variable} ${nunito.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main>{children}</main>
              <MobileBottomNavbar />
              <Footer />
            </div>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
