export const getJWTSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("JWT secret is not set in the env variable");
  }
  return secret;
};
