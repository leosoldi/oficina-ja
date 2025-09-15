import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  static async register(req: Request, res: Response) {
    const result = await AuthService.register(req.body);
    return res.status(result.status).json(result);
  }

  static async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body);
    return res.status(result.status).json(result);
  }

  static async googleAuth(req: Request, res: Response) {
    const result = await AuthService.googleAuth(req.body);
    return res.status(result.status).json(result);
  }
}
