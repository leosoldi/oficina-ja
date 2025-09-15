// src/middlewares/isAuthenticated.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const JWT_SECRET = process.env.JWT_SECRET || 'oficinaja_secret';

  if (!authHeader) return res.status(401).json({ message: 'Token não fornecido' });

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
