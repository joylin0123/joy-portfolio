export type Hotspot = {
  id: "resume" | "articles" | "projects" | "contact" | "github";
  label: string;
  url: string;
  pos: [number, number, number];
  kind?: "crate" | "board";
  size?: [number, number, number];
  offset?: [number, number];
  y?: number;
};

export const HOTSPOTS: Hotspot[] = [
  {
    id: "resume",
    label: "Resume",
    url: "/resume",
    pos: [-2.6, 0, 0],
    kind: "board",
    offset: [-4.6, 0],
    y: -3.2,
  },
  {
    id: "articles",
    label: "Articles",
    url: "/articles",
    pos: [-0.6, 0, 2.2],
    kind: "board",
    offset: [-0.6, 2.2],
    y: -3.2,
  },
  {
    id: "contact",
    label: "Contact",
    url: "/contact",
    pos: [2.7, 0, 1.4],
    kind: "board",
    offset: [2.7, 1.4],
    y: -3.2,
  },
];

export const INTERACT_RADIUS = 2.5;
