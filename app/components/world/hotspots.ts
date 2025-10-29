export type Hotspot = {
  id: "resume" | "articles" | "projects";
  label: string;
  url: string;
  /** Offsets from island center: [dx, dy, dz] in meters */
  pos: [number, number, number];
  kind?: "crate" | "board";
  size?: [number, number, number];
};

export const HOTSPOTS: Hotspot[] = [
  {
    id: "resume",
    label: "Resume",
    url: "/resume",
    pos: [-2.0, 0.2, 0.0],
    kind: "board",
    size: [1.2, 0.8, 0.08],
  },
  {
    id: "articles",
    label: "Articles",
    url: "/articles",
    pos: [2.4, 0.2, 0.6],
    kind: "board",
    size: [0.9, 0.6, 0.9],
  },
  {
    id: "projects",
    label: "Projects",
    url: "/projects",
    pos: [0.0, 0.2, -2.6],
    kind: "board",
    size: [1.2, 0.8, 0.08],
  },
];

export const INTERACT_RADIUS = 1.6;

/** Convert offset hotspots into world positions using island center + water level */
export function getWorldHotspots(center: [number, number], waterY: number) {
  const baseY = waterY + 0.4; // always visible above water
  return HOTSPOTS.map((h) => {
    const [dx, dy, dz] = h.pos;
    return {
      ...h,
      worldPos: [center[0] + dx, baseY + dy, center[1] + dz] as [
        number,
        number,
        number
      ],
    };
  });
}
