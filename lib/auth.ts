import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { jwtVerify, SignJWT } from 'jose';

// Lazy getter for JWT_SECRET to avoid build-time errors
const getJWTSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return secret;
};

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}

export const generateToken = (payload: JWTPayload): string => {
  const JWT_SECRET = getJWTSecret();
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    console.log('[Auth] Generating token with JWT_SECRET length:', JWT_SECRET.length);
    console.log('[Auth] Token payload:', { userId: payload.userId, email: payload.email });
  }
  
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  
  if (isDev) {
    console.log('[Auth] Generated token:', token.substring(0, 20) + '...');
  }
  
  return token;
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const JWT_SECRET = getJWTSecret();
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      console.log('[Auth] Verifying token with JWT_SECRET length:', JWT_SECRET.length);
      console.log('[Auth] Token to verify:', token.substring(0, 20) + '...');
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
    if (isDev) {
      console.log('[Auth] Token verification SUCCESS:', { userId: decoded.userId, email: decoded.email });
    }
    
    return decoded;
  } catch (error) {
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      console.log('[Auth] Token verification ERROR:', error instanceof Error ? error.message : 'Unknown error');
    }
    return null;
  }
};

// Edge Runtime compatible JWT verification for middleware
export const verifyTokenEdge = async (token: string): Promise<JWTPayload | null> => {
  try {
    const JWT_SECRET = getJWTSecret();
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      console.log('[Auth Edge] Verifying token with JWT_SECRET length:', JWT_SECRET.length);
      console.log('[Auth Edge] Token to verify:', token.substring(0, 20) + '...');
    }
    
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    const decoded = payload as any;
    
    if (isDev) {
      console.log('[Auth Edge] Token verification SUCCESS:', { userId: decoded.userId, email: decoded.email });
    }
    
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };
  } catch (error) {
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      console.log('[Auth Edge] Token verification ERROR:', error instanceof Error ? error.message : 'Unknown error');
    }
    return null;
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const extractTokenFromHeader = (authorization: string | undefined): string | null => {
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }
  return authorization.substring(7);
}; 