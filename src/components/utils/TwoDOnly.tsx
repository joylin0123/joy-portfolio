import { cookies } from 'next/headers';

export default async function TwoDOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const mode = cookieStore.get('viewMode')?.value; // '2d' | '3d' | undefined
  if (mode !== '2d') return null;
  return <>{children}</>;
}
