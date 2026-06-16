import express from "express";
import cartActions from "./modules/cart/cartAction";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// Define time_slot-related routes

import timeSlotActions from "./modules/timeSlot/timeSlotActions";

router.get("/api/timeslots", timeSlotActions.browse);

/* ************************************************************************* */
// Define space-related routes
import bookingActions from "./modules/bookingActions/bookingActions";

router.post("/api/bookings", bookingActions.add);
router.post("/api/booking", bookingActions.create);
import spaceActions from "./modules/space/spaceActions";

router.get("/api/spaces", spaceActions.browse);

/* ************************************************************************* */
// Define event-related routes
import eventActions from "./modules/event/eventActions";

router.get("/api/events", eventActions.browseUpcomingEvents);
router.get(
  "/api/events/participants",
  eventActions.browseSumParticipantsToEvent,
); /* dans la table booking en vrai*/

/* ************************************************************************* */
// Dashboard Client:
import dashboardClientActions from "./modules/dashboardClient/dashboardClientActions";

// 1.past events the user attended
router.get(
  "/api/dashboard/client/:userId/events/past",
  dashboardClientActions.browsePastEvents,
);

// 2.upcoming events the user is registered for
router.get(
  "/api/dashboard/client/:userId/events/upcoming",
  dashboardClientActions.browseUpcomingEvents,
);

// 3.past space bookings for a specific user
router.get(
  "/api/dashboard/client/:userId/bookings/past",
  dashboardClientActions.browseOldBookings,
);

// 4.upcoming space bookings for a specific user
router.get(
  "/api/dashboard/client/:userId/bookings/upcoming",
  dashboardClientActions.browseUpcomingBookings,
);

// 5.bills for a specific user
router.get(
  "/api/dashboard/client/:userId/billing",
  dashboardClientActions.browseBookingHistory,
);

// 6.stats for a specific user
router.get(
  "/api/dashboard/client/:userId/stats",
  dashboardClientActions.browseStats,
);

// Create a claim for a specific user
router.post(
  "/api/dashboard/client/:userId/claims",
  dashboardClientActions.addClaim,
);

/* ************************************************************************* */
// Dashboard Admin:
import dasboardAdminActions from "./modules/dashboardAdmin/dashboardAdminActions";

router.get("/api/dashboard/admin/stats", dasboardAdminActions.browseAdminStats);

router.get(
  "/api/dashboard/admin/bookings",
  dasboardAdminActions.browseAdminBookings,
);

router.get(
  "/api/dashboard/admin/bookings",
  dasboardAdminActions.browseAdminBookings,
);

router.get("/api/dashboard/admin/claims", dasboardAdminActions.browseClaims);

/* ************************************************************************* */

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

import createEventFormAction from "./modules/createEventForm/createEventFormAction";

import { upload } from "../public/upload/upload";

router.get("/api/createEvent", createEventFormAction.browse);
router.post(
  "/api/createEvent",
  upload.single("image"),
  createEventFormAction.create,
);

import workshopActions from "./modules/activity/activityActions";

router.get("/api/activity", workshopActions.browse);

import paymentActions from "./modules/Payment/PaymentAction";

router.post("/api/payment/create-intent", paymentActions.createIntent);

export default router;
