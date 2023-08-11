import { getJWTSecretKey } from '@/lib/auth'
import { SignJWT } from 'jose'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const body = await request.json()

  // Make that below if condition as your own backend api call to validate user
  if (body.username === 'admin' && body.password === 'admin') {
    const jwt = await new SignJWT({
      username: body.username,
      role: 'admin', // Set your own roles
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d') // Set your own expiration time
      .sign(new TextEncoder().encode(getJWTSecretKey()))
    // const response = NextResponse.next()

    // response.headers.set('Authorization', 'Bearer ' + jwt)
    // console.log('API RES', response.headers)
    cookies().set('token', jwt, {
      httpOnly: true,
    })

    return NextResponse.json({ accessToken: jwt }, { status: 200 })

    // const response = NextResponse.json(
    //   { success: true },
    //   { status: 200, headers: { 'content-type': 'application/json' } }
    // )

    // response.cookies.set({
    //   name: 'token',
    //   value: token,
    //   path: '/',
    // })

    // return response
  }

  return NextResponse.json({ success: false })
}
