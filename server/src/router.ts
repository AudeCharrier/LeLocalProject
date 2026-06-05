import express from "express";
import cartActions from "./modules/cart/cartAction";
import dashboardActions from "./modules/dashboard/dashboardActions";
import itemActions from "./modules/item/itemActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import spaceActions from "./modules/space/spaceActions";

router.get("/api/spaces", spaceActions.browse);
/* router.get("/api/space/:id", spaceActions.read);
router.post("/api/space", spaceActions.add); */

/* ************************************************************************* */
// Define dashboard-related routes

// Client dashboard — past and upcoming events for a specific user
router.get(
  "/api/dashboard/client/:userId/events/past",
  dashboardActions.browsePastEvents,
);
router.get(
  "/api/dashboard/client/:userId/events/upcoming",
  dashboardActions.browseUpcomingEvents,
);

// Client dashboard — upcoming booking space for a specific user
router.get(
  "/api/dashboard/client/:userId/bookings/upcoming",
  dashboardActions.browseUpcomingBookings,
);

/* ************************************************************************* */
// À ajouter dans ton router.ts existant
// -------------------------------------------

// Panier — récupère tous les articles d'un utilisateur (avec détail des events)
router.get("/api/cart/:userId", cartActions.browse);

// Panier — ajoute un article (ou incrémente si déjà présent)
router.post("/api/cart", cartActions.add);

// Panier — modifie la quantité d'un article
router.patch("/api/cart/:id", cartActions.edit);

// Panier — supprime un article précis
router.delete("/api/cart/:id", cartActions.destroy);

// Panier — vide tout le panier d'un utilisateur (après paiement par ex.)
router.delete("/api/cart/user/:userId", cartActions.destroyAll);
export default router;
