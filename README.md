# 🌐 Joy Lin — Interactive 2D/3D Portfolio

**Live Demo:** [joy-lin-portfolio.vercel.app/2d](https://joy-lin-portfolio.vercel.app/2d)  
A personal interactive portfolio built with **Next.js**, **React Three Fiber**, and **TailwindCSS** — blending a minimalist 2D layout with immersive 3D scenes.

---

## ✨ Features

- 🪄 2D and 3D portfolio modes (toggle view)
- 🧭 Smooth navigation with interactive elements
- 🧱 Modular Markdown-based article system
- 📸 Built-in photo journal support with responsive image grid and captions
- 🌓 Dark mode friendly, pixel-inspired aesthetic
- ⚡️ Optimized for Vercel deployment

---

## 🛠️ Tech Stack

| Category | Tools / Libraries |
|-----------|-------------------|
| Framework | [Next.js 15](https://nextjs.org/) |
| UI & Styling | [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| Markdown | [React Markdown](https://github.com/remarkjs/react-markdown), `remark-gfm`, `remark-breaks` |
| 3D / Canvas | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Three.js](https://threejs.org/) |
| Hosting | [Vercel](https://vercel.com/) |

---

## 🧩 Project Structure

```

joy-portfolio/
├─ public/                      # Static assets (icons, OG images, small thumbs)
│  └─ ...
├─ src/
│  ├─ app/                      # Next.js App Router pages/routes
│  │  └─ ...                    # e.g. (2d), (3d), articles/[slug], layout.tsx
│  ├─ components/               # Reusable UI components
│  ├─ contents/
│  │  └─ articles/              # Markdown/MDX articles (your Naples post, etc.)
│  ├─ libs/                     # Helpers/utilities (date, markdown loaders, etc.)
│  └─ types/                    # TypeScript types/interfaces
├─ middleware.ts                # Next.js middleware (at repo root)
├─ .gitignore
├─ eslint.config.mjs
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ README.md
└─ tsconfig.json


````

---

## 🚀 Getting Started

```bash
# 1. Clone this repository
git clone https://github.com/joylin0123/joy-lin-portfolio.git
cd joy-lin-portfolio

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev

# 4. Visit
http://localhost:3000/2d
````

---

## 🧠 Development Notes

* **Markdown articles** are rendered through a custom `Markdown` component with table, image, and caption support.
* **Images** are optimized using Tailwind + grid layouts for responsive alignment.
* **3D scene** (React Three Fiber) includes rotating elements, camera controls, and interactive billboards.

---

## 🖼️ Deployment

This project is automatically deployed to **Vercel** on each push to the `main` branch.

**Production URL:**
👉 [https://joy-lin-portfolio.vercel.app/2d](https://joy-lin-portfolio.vercel.app/2d)

---

## 📄 License

This project is open for educational and personal portfolio purposes.
© 2025 Joy Lin. All rights reserved.

---

### 🪶 Author

**Joy Lin**
[GitHub @joylin0123](https://github.com/joylin0123)
