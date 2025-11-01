import NavEditorial from '@/components/ui/common/NavEditorial';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavEditorial />
      {children}
    </>
  );
}
