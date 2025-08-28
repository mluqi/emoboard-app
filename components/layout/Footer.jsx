import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur-md mt-auto">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-5 px-4 gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} EmoBoard. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
