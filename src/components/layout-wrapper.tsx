// src/components/layout-wrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import { DefaultLayout } from "@/components/layouts/default-layout";
import { ProtocolLayout } from "@/components/layouts/protocol-layout";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isProtocolLayout = pathname.startsWith('/docs') || pathname.startsWith('/blog') || pathname.startsWith('/') || pathname.startsWith('/anonymizer');
  
  const LayoutComponent = isProtocolLayout ? ProtocolLayout : DefaultLayout;
  
  return <LayoutComponent>{children}</LayoutComponent>;
};