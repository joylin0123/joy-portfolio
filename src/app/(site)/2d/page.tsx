export default function FlatHome() {
  return (
    <main className="min-h-[100dvh] p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Joy — Projects & Articles</h1>

      <nav className="flex gap-3 mb-6">
        <a className="underline" href="/articles">Articles</a>
        <a className="underline" href="/resume">Resume</a>
        <a className="underline" href="/3d?view=3d">Switch to 3D</a>
      </nav>

      <p className="opacity-70">Lightweight mobile-friendly view.</p>
    </main>
  );
}
