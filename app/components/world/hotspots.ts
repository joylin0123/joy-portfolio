export type Hotspot = {
  id: "resume" | "articles" | "projects";
  label: string;
  url: string;
  pos: [number, number, number];
  kind?: "crate" | "board";
  size?: [number, number, number];
};

export const HOTSPOTS: Hotspot[] = [
  {
    id: "resume",
    label: "Resume",
    url: "/resume",
    pos: [-2.0, 0.0, 0.0],
    kind: "board",
    size: [1.2, 0.8, 0.08],
  },
];

export const INTERACT_RADIUS = 1.6;

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
