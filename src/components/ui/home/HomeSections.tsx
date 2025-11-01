import HomePhotoSection from './HomePhotoSection';
import HomeArticleSection from './HomeArticleSection';
import HomeAboutSection from './HomeAboutSection';

export default async function HomeSections() {
  return (
    <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
      <HomeAboutSection />
      <HomeArticleSection />
      <HomePhotoSection />
    </div>
  );
}
