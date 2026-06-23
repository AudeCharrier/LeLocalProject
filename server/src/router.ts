import express from "express";
import cartActions from "./modules/cart/cartAction";

const router = express.Router();

import authMiddleware from "./Middlewares/authMiddleware";
import authActions from "./modules/Authentification/AuthentificationAction";

/* ************************************************************************* */
// Auth routes (publiques)
/* ************************************************************************* */
router.post("/api/auth/register", authActions.register);
router.post("/api/auth/login/client", authActions.loginClient);
router.post("/api/auth/login/admin", authActions.loginAdmin);
router.get("/api/auth/me", authMiddleware.requireAuth, authActions.me);

/* ************************************************************************* */
// Time slots (public)
/* ************************************************************************* */
import timeSlotActions from "./modules/timeSlot/timeSlotActions";

router.get("/api/timeslots", timeSlotActions.browse);

/* ************************************************************************* */
// Spaces (public)
/* ************************************************************************* */
// Define space-related routes
import spaceActions from "./modules/space/spaceActions";

router.get("/api/spaces", spaceActions.browse);
router.get("/api/spaces/:id/availability", spaceActions.readAvailability);

/* ************************************************************************* */
// Bookings (protégé client)
/* ************************************************************************* */

/* ************************************************************************* */
// Events (public)
/* ************************************************************************* */
import eventActions from "./modules/event/eventActions";

router.get("/api/events", eventActions.browseUpcomingEvents);
router.get(
  "/api/events/participants",
  eventActions.browseSumParticipantsToEvent,
);

/* ************************************************************************* */
// Dashboard Client (protégé client)
/* ************************************************************************* */
import dashboardClientActions from "./modules/dashboardClient/dashboardClientActions";

// Invoice
router.get(
  "/api/invoice/:bookingId",
  authMiddleware.requireAuth,
  dashboardClientActions.readInvoice,
);
// 1.past events the user attended
router.get(
  "/api/dashboard/client/:userId/events/past",
  authMiddleware.requireAuth,
  dashboardClientActions.browsePastEvents,
);

router.get(
  "/api/dashboard/client/:userId/events/upcoming",
  authMiddleware.requireAuth,
  dashboardClientActions.browseUpcomingEvents,
);

router.get(
  "/api/dashboard/client/:userId/bookings/past",
  authMiddleware.requireAuth,
  dashboardClientActions.browseOldBookings,
);

router.get(
  "/api/dashboard/client/:userId/bookings/upcoming",
  authMiddleware.requireAuth,
  dashboardClientActions.browseUpcomingBookings,
);

router.get(
  "/api/dashboard/client/:userId/billing",
  authMiddleware.requireAuth,
  dashboardClientActions.browseBookingHistory,
);

router.get(
  "/api/dashboard/client/:userId/stats",
  authMiddleware.requireAuth,
  dashboardClientActions.browseStats,
);

router.post(
  "/api/dashboard/client/:userId/claims",
  authMiddleware.requireAuth,
  dashboardClientActions.addClaim,
);

/* ************************************************************************* */
// Dashboard Admin (protégé admin)
/* ************************************************************************* */
import dasboardAdminActions from "./modules/dashboardAdmin/dashboardAdminActions";

router.get(
  "/api/dashboard/admin/stats",
  authMiddleware.requireAdmin,
  dasboardAdminActions.browseAdminStats,
);

router.get(
  "/api/dashboard/admin/bookings",
  authMiddleware.requireAdmin,
  dasboardAdminActions.browseAdminBookings,
);

router.get(
  "/api/dashboard/admin/claims",
  authMiddleware.requireAdmin,
  dasboardAdminActions.browseClaims,
);

/* ************************************************************************* */
// Panier (protégé client)
/* ************************************************************************* */
router.get("/api/cart/:userId", authMiddleware.requireAuth, cartActions.browse);
router.post("/api/cart", authMiddleware.requireAuth, cartActions.add);
router.patch("/api/cart/:id", authMiddleware.requireAuth, cartActions.edit);
router.delete("/api/cart/:id", authMiddleware.requireAuth, cartActions.destroy);
router.delete(
  "/api/cart/user/:userId",
  authMiddleware.requireAuth,
  cartActions.destroyAll,
);

import { upload } from "../public/upload/upload";
/* ************************************************************************* */
// Create Event (protégé admin)
/* ************************************************************************* */
import createEventFormAction from "./modules/createEventForm/createEventFormAction";

router.get(
  "/api/createEvent",
  authMiddleware.requireAdmin,
  createEventFormAction.browse,
);
router.post(
  "/api/createEvent",
  authMiddleware.requireAdmin,
  upload.single("image"),
  createEventFormAction.create,
);

/* ************************************************************************* */
// Payment (protégé client)
/* ************************************************************************* */
import paymentActions from "./modules/Payment/PaymentAction";

router.post(
  "/api/payment/create-intent",
  authMiddleware.requireAuth,
  paymentActions.createIntent,
);

/* ************************************************************************* */
// Define booking-related routes

import bookingActions from "./modules/bookingActions/bookingActions";

router.post("/api/bookings", authMiddleware.requireAuth, bookingActions.add);
router.post("/api/booking", authMiddleware.requireAuth, bookingActions.create);
// insert activity booked into activity table

export default router;
