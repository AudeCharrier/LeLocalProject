import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// Define time_slot-related routes

import timeSlotActions from "./modules/timeSlot/timeSlotActions";

router.get("/api/timeslots", timeSlotActions.browse);

/* ************************************************************************* */
// Define space-related routes

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

/* ************************************************************************* */
// Dashboard Admin:
import dasboardAdminActions from "./modules/dashboardAdmin/dashboardAdminActions";

router.get(
  "/api/dashboard/admin/bookings",
  dasboardAdminActions.browseAdminBookings,
);

/* ************************************************************************* */

export default router;
