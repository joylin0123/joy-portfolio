export type Hotspot = {
  id: "resume" | "articles" | "projects";
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
    pos: [-2.6, 0.0, 0.0],
    kind: "board",
    size: [1.2, 0.8, 0.08],
    offset: [-4.6, 0.0],
    y: -3.2,
  },
];

export const INTERACT_RADIUS = 3.0;

export function getWorldHotspots(center: [number, number], waterY: number) {
  const baseY = waterY + 0.4;
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
