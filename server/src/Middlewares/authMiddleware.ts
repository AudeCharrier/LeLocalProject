import type { RequestHandler } from "express";
import jwtUtil from "../modules/Authentification/Jwt";

const requireAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token manquant ou mal formaté." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwtUtil.verifyToken(token);
    req.user = { id: payload.id, email: payload.email, role: payload.role };
    next();
  } catch {
    res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

const requireAdmin: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token manquant ou mal formaté." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwtUtil.verifyToken(token);

    if (payload.role !== "admin") {
      res.status(403).json({ message: "Accès réservé aux administrateurs." });
      return;
    }

    req.user = { id: payload.id, email: payload.email, role: payload.role };
    next();
  } catch {
    res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

export default { requireAuth, requireAdmin };
