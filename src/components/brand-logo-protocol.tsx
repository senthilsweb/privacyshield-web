'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { useState } from 'react';

interface BrandLogoProtocolProps {
  className?: string;
  variant?: 'default' | 'mobile';
}

const BrandLogoProtocol: React.FC<BrandLogoProtocolProps> = ({ 
  className, 
  variant = 'default' 
}) => {
  const [logoError, setLogoError] = useState(false);

  const handleLogoError = () => {
    setLogoError(true);
  };

  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center",
        variant === 'mobile' ? "py-2" : "py-1",
        className
      )}
    >
      {!logoError ? (
        <div className="relative flex items-center">
          <Image
            src="/logo.svg"
            alt="Privacy Shield Logo"
            width={variant === 'mobile' ? 140 : 180}
            height={variant === 'mobile' ? 40 : 50}
            className="dark:hidden"
            priority
            onError={handleLogoError}
          />
          <Image
            src="/logo-dark.svg"
            alt="Privacy Shield Logo"
            width={variant === 'mobile' ? 140 : 180}
            height={variant === 'mobile' ? 40 : 50}
            className="hidden dark:block"
            priority
            onError={handleLogoError}
          />
        </div>
      ) : (
        <div 
          className={cn(
            "flex flex-col",
            variant === 'mobile' ? "gap-0" : "gap-0.5"
          )}
        >
          <span 
            className={cn(
              "font-bold",
              variant === 'mobile' ? "text-xl" : "text-2xl"
            )}
          >
            Privacy Shield
          </span>
          <span 
            className={cn(
              "text-muted-foreground",
              variant === 'mobile' ? "text-sm" : "text-lg"
            )}
          >
            Data Anonymizer
          </span>
        </div>
      )}
    </Link>
  );
};

export default BrandLogoProtocol;