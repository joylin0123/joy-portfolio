import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL(
        'https://zzajzhjkwtjciowztuws.supabase.co/storage/v1/object/public/photos/*',
      ),
    ],
  },
};

export default nextConfig;
