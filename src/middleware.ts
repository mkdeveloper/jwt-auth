import { NextRequest, NextResponse } from 'next/server'
import { getJWTSecretKey, verifyAuth } from './lib/auth'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl

  // const headersToken = request.headers.get('Authorization')?.split(' ')
  const headersToken = request.cookies.get('token')?.value
  console.log('Token', headersToken)

  try {
    if (pathname === '/login' || pathname === '/register') {
      if (headersToken) return NextResponse.redirect(`${origin}`)
      return NextResponse.next()
    }
    if (!headersToken) {
      // return NextResponse.redirect(`http://localhost:3000/login`)
      return NextResponse.redirect(`https://jwt-auth-phi.vercel.app/login`)
      // return NextResponse.json(
      //   { error: { message: 'Token Not Found' } },
      //   { status: 400 }
      // )
    }
    const verifyToken = await jwtVerify(
      headersToken,
      new TextEncoder().encode(getJWTSecretKey())
    )
    // const verifyToken = await verifyAuth(headersToken)
    console.log('Verify Auth', verifyToken)
    if (verifyToken) {
      // console.log(verifyToken?.user[0]?.id)
      // const id = verifyToken?.user[0]?.id
      // const response = NextResponse.next()
      // response.cookies.set('clientId', id)
      // return response
      return NextResponse.next()
    }

    return NextResponse.json(
      { error: { message: 'Authentication required' } },
      { status: 401 }
    )
  } catch (error) {
    console.log(error)
  }
}
export const config = {
  matcher: ['/', '/login', '/protected'],
}
