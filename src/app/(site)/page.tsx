import { getArticleMetaList } from '@/libs/helpers/markdown';
import HeroEditorial from '@/components/ui/home/HeroEditorial';
import HomeSections from '@/components/ui/home/HomeSections';

export const runtime = 'nodejs';

export default async function FlatHome() {
  const all = await getArticleMetaList();
  return (
    <main className="min-h-screen bg-background p-3 sm:p-5 text-foreground">
      <HeroEditorial />
      <HomeSections />
    </main>
  );
}
