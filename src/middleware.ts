import { NextRequest, NextResponse } from "next/server";
import { getJWTSecretKey } from "./lib/auth";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const headersToken = request.cookies.get("token")?.value;

  console.log("Token", headersToken);

  try {
    if (pathname === "/login" || pathname === "/register") {
      if (headersToken) return NextResponse.redirect(`${origin}`);
      return NextResponse.next();
    }
    if (!headersToken) {
      return NextResponse.redirect(`http://localhost:3000/login`);
    }
    const verifyToken = await jwtVerify(
      headersToken,
      new TextEncoder().encode(getJWTSecretKey())
    );

    console.log("Verify Auth", verifyToken);
    if (verifyToken) {
      return NextResponse.next();
    }

    return NextResponse.json(
      { error: { message: "Authentication required" } },
      { status: 401 }
    );
  } catch (error) {
    console.log(error);
  }
}
export const config = {
  matcher: ["/", "/login", "/protected"],
};
