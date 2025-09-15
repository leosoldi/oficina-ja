
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: string | JwtPayload;
  }
}

declare module 'express-session' {
  interface SessionData {
    userType?: 'motorista' | 'oficina';
  }
}
