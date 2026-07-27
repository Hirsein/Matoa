import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'matoa-super-secret-jwt-key-2026';

export interface AuthenticatedUserPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  autoEcoleId?: string;
  codeEleveUnique?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUserPayload;
}

export function signJwtToken(payload: AuthenticatedUserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwtToken(token: string): AuthenticatedUserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthenticatedUserPayload;
  } catch (err) {
    return null;
  }
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Accès non autorisé. Jeton manquant.' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyJwtToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Session expirée ou jeton invalide.' });
  }

  req.user = decoded;
  next();
}

export function requireRoles(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Non authentifié.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Accès refusé pour votre rôle.' });
    }

    next();
  };
}
