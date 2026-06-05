import express from "express";
import dashboardActions from "./modules/dashboard/dashboardActions";

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
/* router.get("/api/space/:id", spaceActions.read);
router.post("/api/space", spaceActions.add); */

/* ************************************************************************* */
// Define event-related routes
import eventActions from "./modules/event/eventActions";

router.get("/api/events", eventActions.browseUpcomingEvents);

/* ************************************************************************* */
// Dashboard Client:

// 1.past events the user attended
router.get(
  "/api/dashboard/client/:userId/events/past",
  dashboardActions.browsePastEvents,
);

// 2.upcoming events the user is registered for
router.get(
  "/api/dashboard/client/:userId/events/upcoming",
  dashboardActions.browseUpcomingEvents,
);

// 3.upcoming space bookings for a specific user
router.get(
  "/api/dashboard/client/:userId/bookings/upcoming",
  dashboardActions.browseUpcomingBookings,
);

// 4.full billing history for a specific user
router.get(
  "/api/dashboard/client/:userId/billing",
  dashboardActions.browseBookingHistory,
);

/* ************************************************************************* */

export default router;
