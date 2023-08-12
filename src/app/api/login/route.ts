import { getJWTSecretKey } from "@/lib/auth";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.username === "admin" && body.password === "admin") {
    const jwt = await new SignJWT({
      username: body.username,
      role: "admin", // Set your own roles
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1m") // Set your own expiration time
      .sign(new TextEncoder().encode(getJWTSecretKey()));

    cookies().set("token", jwt, {
      httpOnly: true,
    });

    return NextResponse.json({ accessToken: jwt }, { status: 200 });
  }

  return NextResponse.json(
    { Error: "Failed to create token" },
    { status: 400 }
  );
}
