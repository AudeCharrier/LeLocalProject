import argon2 from "argon2";
import type { RequestHandler } from "express";
import Joi from "joi";
import authRepository from "./AuthentificationRepository";
import jwtUtil from "./Jwt";

const SALT_ROUNDS = 12;

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
const registerSchema = Joi.object({
  firstname: Joi.string().trim().required().messages({
    "string.empty": "Le prénom est requis.",
  }),
  lastname: Joi.string().trim().required().messages({
    "string.empty": "Le nom est requis.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Le format de l'email est invalide.",
    "string.empty": "L'email est requis.",
  }),
  password: Joi.string().pattern(passwordPattern).required().messages({
    "string.empty": "Le mot de passe est requis.",
    "string.pattern.base":
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
  }),
  phone_number: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Le numéro de téléphone est requis.",
      "string.pattern.base":
        "Le numéro de téléphone doit contenir 10 chiffres.",
    }),
  city: Joi.string().trim().allow("", null),
  adress: Joi.string().trim().allow("", null),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Le format de l'email est invalide.",
    "string.empty": "L'email est requis.",
    "any.required": "L'email est requis.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Le mot de passe est requis.",
    "any.required": "Le mot de passe est requis.",
  }),
  targetRole: Joi.string().valid("client", "admin").required(),
});

// Inscription : crée toujours un compte avec le role "client"
const register: RequestHandler = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      res.status(400).json({
        message: "Données invalides.",
        details: error.details.map((err) => err.message),
      });
      return;
    }

    const { firstname, lastname, email, password, phone_number, city, adress } =
      value;

    const existing = await authRepository.findByEmail(email);
    if (existing) {
      res
        .status(409)
        .json({ message: "Un compte existe déjà avec cet email." });
      return;
    }

    const passwordHash = await argon2.hash(password);

    const user = await authRepository.create({
      firstname,
      lastname,
      email,
      passwordHash,
      phone_number,
      city,
      adress,
    });

    if (!user) {
      res
        .status(500)
        .json({ message: "Erreur lors de la création du compte." });
      return;
    }

    const token = jwtUtil.signToken({
      id: user.id,
      email: user.email,
      role: user.role,
      firstname: user.firstname,
    });

    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      res.status(400).json({
        message: "Données invalides.",
        details: error.details.map((err) => err.message),
      });
      return;
    }

    /*value = res de joi*/
    const { email, password, targetRole } = value;
    const invalidCredentials = () =>
      res.status(401).json({ message: "Email ou mot de passe incorrect." });

    const user = await authRepository.findByEmail(email);
    if (!user) {
      invalidCredentials();
      return;
    }

    const passwordMatches = await argon2.verify(user.password, password);
    if (!passwordMatches) {
      invalidCredentials();
      return;
    }

    if (user.role !== targetRole) {
      res.status(403).json({
        message:
          targetRole === "admin"
            ? "Ce compte n'a pas les droits administrateur."
            : "Veuillez utiliser l'espace Admin pour vous connecter.",
      });
      return;
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstname: user.firstname,
    };

    const token = jwtUtil.signToken(payload);

    res.status(200).json({ token, user: payload });
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

// Profil de l'utilisateur connecté (req.user injecté par le middleware requireAuth)
const me: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Authentification requise." });
      return;
    }

    const user = await authRepository.findById(userId);
    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable." });
      return;
    }

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export default { register, login, me };
