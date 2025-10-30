import { NextRequest, NextResponse } from "next/server";

const CHOOSE = "/choose";

function isMobileUA(ua: string) {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
}

function normalize(mode?: string | null): "3d" | "2d" | undefined {
  if (!mode) return undefined;
  if (mode === "flat") return "2d";
  if (mode === "3d" || mode === "2d") return mode;
  return undefined;
}

export function middleware(req: NextRequest) {
  const { nextUrl, headers, cookies } = req;
  const url = nextUrl.clone();

  const qp = normalize(url.searchParams.get("view"));
  const cookieMode = normalize(cookies.get("viewMode")?.value);

  const path = url.pathname;
  const isRoot = path === "/";
  const is3D = path === "/3d";
  const is2D = path === "/2d";
  const isChoose = path === CHOOSE;
  const mobile = isMobileUA(headers.get("user-agent") || "");

  if (qp) {
    const res = NextResponse.redirect(new URL(`/${qp}`, req.url));
    res.cookies.set("viewMode", qp, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  if ((isRoot || isChoose) && cookieMode) {
    return NextResponse.redirect(new URL(`/${cookieMode}`, req.url));
  }

  if (isRoot && !cookieMode) {
    return NextResponse.redirect(new URL(mobile ? "/2d" : CHOOSE, req.url));
  }

  if (is3D && !cookieMode && mobile) {
    return NextResponse.redirect(new URL("/2d", req.url));
  }

  if (isChoose && !cookieMode && mobile) {
    return NextResponse.redirect(new URL("/2d", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/3d", "/2d", "/choose"],
};
