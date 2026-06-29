import type { RequestHandler } from "express";
import Joi from "joi";
import type { Schema } from "joi";

const eventsOftheDaySchema = {
  // Schéma pour valider req.params
  browseByDate: Joi.object({
    date: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/) // Force le format AAAA-MM-JJ via Regex
      .required()
      .messages({
        "string.pattern.base": "La date doit être au format valide YYYY-MM-DD.",
        "any.required": "La date est obligatoire.",
      }),
  }),
};

const validateEventsDate: RequestHandler = (req, res, next) => {
  const { error } = eventsOftheDaySchema.browseByDate.validate(req.params);

  if (error) {
    res.status(400).json({
      error:
        "La date de l'événement est invalide (format attendu : YYYY-MM-DD).",
    });
    return;
  }

  next();
};

export default { validateEventsDate };
