import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import fs from "fs";
import https from "https";
import path from "path";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import sessionRoutes from "./routes/session.routes";
import routerAuth from "./routes/auth.routes";
import routerOficina from "./routes/oficina.routes";
import Motoristarouter from "./routes/motorista.routes";
import veiculoRouter from "./routes/veiculo.routes";
import servicoRoutes from "./routes/services.route";
import agendaRouter from "./routes/agenda.routes";
import openingRulesRoutes from "./routes/opening-rules.routes";
import appointmentsRoutes from "./routes/appointments.routes";
import checklistRouter from "./routes/checklist.routes";
import precadrouter  from "./routes/preCadastro.routes";
import "./auth/googleStrategy";
import clientesRoutes from "./routes/clientes.routes";



dotenv.config();

const app = express();

/** ---- CORS (com credenciais) ---- */
const allowedOrigins = [
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "https://oficinaja.com.br",
  "https://www.oficinaja.com.br",
];

const corsOptions: cors.CorsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true); // permite tools sem origin (curl/Insomnia)
    if (
      allowedOrigins.includes(origin) ||
      /^http:\/\/localhost(?::\d+)?$/.test(origin) ||
      /^http:\/\/127\.0\.0\.1(?::\d+)?$/.test(origin) ||
      /^http:\/\/192\.168\.\d+\.\d+(?::\d+)?$/.test(origin)
    ) {
      return cb(null, true); // ecoa a origem exata
    }
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // preflight para todas as rotas

app.use(express.json());

/** ---- Sessão ---- */
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,   // true somente em HTTPS
      sameSite: "lax", // ok para localhost:8080 -> 3334
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

/** ---- Rotas ---- */
app.use("/api/session", sessionRoutes);
app.use("/api/auth", routerAuth);
app.use("/api/", routerOficina);
app.use("/api/motorista", Motoristarouter);
app.use("/api/servicos", servicoRoutes);
app.use("/api/agenda", agendaRouter);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/", veiculoRouter);
app.use("/api/opening-rules", openingRulesRoutes);
app.use("/api/checklists", checklistRouter);
app.use("/api/pre-cadastro", precadrouter)
app.use("/api/cliente", clientesRoutes);


/** ---- Static ---- */
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

/** ---- Handler global de erros (DEVE ficar no final) ---- */
app.use((err: Error, req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

/** ---- Server ---- */
const isProduction = false;
const port = 3336;
const certPath = "/etc/nginx/ssl/oficinaja.com.br/";

let server: any;

if (isProduction) {
  const sslOptions = {
    key: fs.readFileSync(path.join(certPath, "privkey.pem")),
    cert: fs.readFileSync(path.join(certPath, "cert.pem")),
    ca: fs.readFileSync(path.join(certPath, "ca.pem")),
  };

  server = https.createServer(sslOptions, app);
  server.listen(port, () => {
    console.log(`✅ Servidor HTTPS rodando na porta ${port}`);
    console.log(`🌎 Ambiente: Produção`);
  });
} else {
  server = app.listen(port, () => {
    console.log(`🚀 Servidor HTTP rodando na porta ${port} (Modo DEV)`);
  });
}