import { jwtVerify } from 'jose'

type userType = {
  id: string
  clientName: string
  clientEmail: string
}

interface UserJWTPayload {
  user?: userType[]
  iat: number
  exp: number
}

export const getJWTSecretKey = () => {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length === 0) {
    throw new Error('JWT secret is not set in the env variable')
  }
  return secret
}

export const verifyAuth = async (token: string) => {
  try {
    const verifyToken = await jwtVerify(
      token,
      new TextEncoder().encode(getJWTSecretKey())
    )
    console.log('Auth Verify 2', verifyToken)

    return verifyToken
  } catch (error) {
    return null
  }
}
