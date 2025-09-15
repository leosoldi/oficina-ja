import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'oficinaja_secret';

export class AuthService {
  static async register(data: any) {
    const {
      email,
      password,
      name,
      provider = 'manual',
      type,
      phone,
      cnpj,
      address,
      city,
      state,
      zipCode,
      description
    } = data;

    if (!email || !password || !name || !type) {
      return { status: 400, message: 'Campos obrigatórios ausentes' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (type === 'motorista') {
      const exists = await prisma.motorista.findUnique({ where: { email } });
      if (exists) return { status: 400, message: 'Email já cadastrado' };

      const user = await prisma.motorista.create({
        data: {
          email,
          nome: name,
          password: hashedPassword,
          provider
        },
      });

     const token = jwt.sign({
        id: user.id,
        type,
        name: user.nome,
        email: user.email
      }, JWT_SECRET, { expiresIn: '7d' });


      return { status: 201, message: 'Motorista criado', token, type };
    }

    if (type === 'oficina') {
      const exists = await prisma.oficina.findUnique({ where: { email } });
      if (exists) return { status: 400, message: 'Email já cadastrado' };

      const user = await prisma.oficina.create({
        data: {
          email,
          nome: name,
          password: hashedPassword,
          telefone: phone,
          cnpj,
          endereco: address,
          cidade: city,
          estado: state,
          cep: zipCode,
          descricao: description,
          provider
        },
      });

     const token = jwt.sign({
        id: user.id,
        type,
        name: user.nome,
        email: user.email
      }, JWT_SECRET, { expiresIn: '7d' });


      return { status: 201, message: 'Oficina criada', token, type };
    }

    return { status: 400, message: 'Tipo inválido' };
  }

  static async login(data: any) {
    const { email, password, type } = data;

    if (type === 'motorista') {
      const user = await prisma.motorista.findUnique({ where: { email } });
      if (!user || !user.password) return { status: 400, message: 'Credenciais inválidas' };

      const match = await bcrypt.compare(password, user.password);
      if (!match) return { status: 401, message: 'Senha incorreta' };

     const token = jwt.sign({
        id: user.id,
        type,
        name: user.nome,
        email: user.email
      }, JWT_SECRET, { expiresIn: '7d' });


      return { status: 200, message: 'Login realizado', token, type };
    }

    if (type === 'oficina') {
      const user = await prisma.oficina.findUnique({ where: { email } });
      if (!user || !user.password) return { status: 400, message: 'Credenciais inválidas' };

      const match = await bcrypt.compare(password, user.password);
      if (!match) return { status: 401, message: 'Senha incorreta' };

     const token = jwt.sign({
        id: user.id,
        type,
        name: user.nome,
        email: user.email
      }, JWT_SECRET, { expiresIn: '7d' });


      return { status: 200, message: 'Login realizado', token, type };
    }

    return { status: 400, message: 'Tipo inválido' };
  }

  static async googleAuth(data: any) {
    const { email, nome, avatar, googleId, type } = data;
    console.log(type)

    if (type === 'motorista') {
      let user = await prisma.motorista.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.motorista.create({
          data: { email, nome, avatar, googleId, provider: 'google' },
        });
      }

     const token = jwt.sign({
        id: user.id,
        type,
        name: user.nome,
        email: user.email
      }, JWT_SECRET, { expiresIn: '7d' });


      return { status: 200, token, type };
    }

    if (type === 'oficina') {
      let user = await prisma.oficina.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.oficina.create({
          data: { email, nome, avatar, googleId, provider: 'google' },
        });
      }

     const token = jwt.sign({
        id: user.id,
        type,
        name: user.nome,
        email: user.email
      }, JWT_SECRET, { expiresIn: '7d' });

      return { status: 200, token, type };
    }

    return { status: 400, message: 'Tipo inválido' };
  }
}
