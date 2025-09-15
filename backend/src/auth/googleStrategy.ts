import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findOrCreateUserByEmail(
  type: 'motorista' | 'oficina',
  userData: {
    email: string;
    nome: string;
    avatar?: string;
    googleId: string;
    provider: 'google';
  }
) {
  if (type === 'motorista') {
    let user = await prisma.motorista.findFirst({
      where: {
        OR: [
          { email: userData.email },
          { googleId: userData.googleId },
        ],
      },
    });

    if (!user) {
      try {
        user = await prisma.motorista.create({ data: userData });
      } catch (error: any) {
        if (error.code === 'P2002') {
          user = await prisma.motorista.findFirst({
            where: {
              OR: [
                { email: userData.email },
                { googleId: userData.googleId },
              ],
            },
          });
        } else {
          throw error;
        }
      }
    }

    return user;
  } else {
    console.log(userData.email);

    let user = await prisma.oficina.findFirst({
      where: {
        OR: [
          { email: userData.email },
          { googleId: userData.googleId },
        ],
      },
    });

    if (!user) {
      try {
        user = await prisma.oficina.create({ data: userData });
      } catch (error: any) {
        if (error.code === 'P2002') {
          user = await prisma.oficina.findFirst({
            where: {
              OR: [
                { email: userData.email },
                { googleId: userData.googleId },
              ],
            },
          });
        } else {
          throw error;
        }
      }
    }

    return user;
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0]?.value;
      const googleId = profile.id;
      const nome = profile.displayName;
      const avatar = profile.photos?.[0]?.value;

      if (!email || !googleId || !nome) {
        return done(new Error('Informações do Google incompletas'));
      }

      const type = req.query.state as 'motorista' | 'oficina';

      try {
        const user = await findOrCreateUserByEmail(type, {
          email,
          nome,
          avatar,
          googleId,
          provider: 'google',
        });

        if (!user) {
          return done(new Error('Usuário não encontrado ou não pôde ser criado'));
        }

        done(null, {
          id: user.id,
          nome: user.nome,
          email: user.email,
          type,
        });
      } catch (err) {
        done(err as Error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
