import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Route {
  [key: string]: Boolean;
}

const publicOnlyUrls: Route = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-accout": true,
  "/github/start": true,
  "/github/complete": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isPublicUrl = publicOnlyUrls[request.nextUrl.pathname];

  if (!session.id) {
    if (!isPublicUrl) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (isPublicUrl) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
