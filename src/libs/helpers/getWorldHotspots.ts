import { HOTSPOTS } from "../constants/hotspots";

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
