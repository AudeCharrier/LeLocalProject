import type { RequestHandler } from "express";
import cartRepository from "./cartRepository";

// Browse — GET /api/cart/:userId
// Retourne tous les articles du panier avec le détail des événements
const browse: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const items = await cartRepository.readAll(userId);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// Add — POST /api/cart
// Body attendu : { user_id, event_id, quantity }
const add: RequestHandler = async (req, res, next) => {
  try {
    const newItem = {
      users_id: Number(req.body.users_id),
      id_activity: Number(req.body.event_id),
      quantity: Number(req.body.quantity) || 1,
    };

    const insertId = await cartRepository.create(newItem);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// Edit — PATCH /api/cart/:id
// Body attendu : { quantity }
const edit: RequestHandler = async (req, res, next) => {
  try {
    const cartItemId = Number(req.params.id);
    const quantity = Number(req.body.quantity);

    if (quantity < 1) {
      res.sendStatus(400);
      return;
    }

    const affectedRows = await cartRepository.updateQuantity(
      cartItemId,
      quantity,
    );

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

// Destroy — DELETE /api/cart/:id
// Supprime un article précis du panier
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const cartItemId = Number(req.params.id);
    const affectedRows = await cartRepository.destroy(cartItemId);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

// DestroyAll — DELETE /api/cart/user/:userId
// Vide tout le panier d'un utilisateur (ex: après paiement)
const destroyAll: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    await cartRepository.destroyAll(userId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, add, edit, destroy, destroyAll };
