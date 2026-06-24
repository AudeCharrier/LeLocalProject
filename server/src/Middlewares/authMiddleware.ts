import type { RequestHandler } from "express";
import jwtUtil from "../modules/Authentification/Jwt";

const requireAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Veuillez vous connecter." });
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
    res.status(401).json({ message: "Veuillez vous connecter." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwtUtil.verifyToken(token);
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch (error) {
    console.error("JWT ERROR:", error);

    res.status(401).json({
      message: "Token invalide ou expiré.",
      error,
    });
  }
};

export default { requireAuth, requireAdmin };
