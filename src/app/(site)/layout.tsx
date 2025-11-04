import NavEditorial from '@/components/ui/common/NavEditorial';
import { Analytics } from '@vercel/analytics/react';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavEditorial />
      {children}
      <Analytics />
    </>
  );
}
