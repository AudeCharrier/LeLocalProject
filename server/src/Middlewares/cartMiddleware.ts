import type { RequestHandler } from "express";
import Joi from "joi";

// Schéma pour la CRÉATION (POST)
const addEventSchema = Joi.object({
  users_id: Joi.number().integer().positive().required(),
  event_id: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().required(),
  total_price: Joi.number().min(0).required(),
});

// Schéma pour la MISE À JOUR (PUT/PATCH)
const updateCartSchema = Joi.object({
  quantity: Joi.number().integer().positive().optional(),
  total_price: Joi.number().min(0).optional(),
}).min(1); // Au moins un des deux champs doit être fourni

// schéma pour la SUPPRESSION d'un item (delete)
const deleteItemSchema = Joi.object({
  eventId: Joi.number().integer().positive().required(),
});

// fonction de validation du body (add, edit)
const validateBody = (schema: Joi.ObjectSchema): RequestHandler => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      res.status(400).json({
        errors: error.details.map((detail) => detail.message),
      });
      return;
    }

    req.body = value;
    next();
  };
};

// LES MIDDLEWARES PRÊTS À L'EMPLOI

const validateAddEventCart = validateBody(addEventSchema);
const validateUpdateCart = validateBody(updateCartSchema);

// Validation pour les params d'URL (delete)
const validateDeleteItem: RequestHandler = (req, res, next) => {
  const { error } = deleteItemSchema.validate(req.params);

  if (error) {
    res
      .status(400)
      .json({ error: "L'identifiant de l'événement est invalide." });
    return;
  }
  next();
};

export default { validateAddEventCart, validateUpdateCart, validateDeleteItem };
