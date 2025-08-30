"use client";

import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Footer = () => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/';
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className={cn(
        "w-full border-t bg-background/80 backdrop-blur-md mt-auto",
        !isAuthPage && "hidden md:block" // Sembunyikan di mobile, kecuali di halaman auth
      )}
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-5 px-4 gap-4">
        <p className="text-sm text-muted-foreground">
          © {currentYear} EmoBoard. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link
            href="/terms-and-conditions"
            className="hover:text-primary transition-colors"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
