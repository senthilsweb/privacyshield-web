//#components/brand-logo.tsx
import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

const BrandLogo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Shield className="h-6 w-6" />
      <div className="flex flex-col">
        <span className="font-semibold">TemplrJS</span>
        <span className="text-xs text-muted-foreground">Fullstack App Framework</span>
      </div>
    </Link>
  );
};

export default BrandLogo;