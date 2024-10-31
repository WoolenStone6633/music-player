import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken } from "./app/lib/apiCalls";

export default function middleware(req: NextRequest) {
  // refreshAccessToken()
  const res = NextResponse.next()

  return res
}

export const config = {
  matcher: '/player',
}