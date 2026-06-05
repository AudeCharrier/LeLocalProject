import express from "express";
import dasboardClientActions from "./modules/dashboardClient/dashboardClientActions";
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
  dasboardClientActions.browsePastEvents,
);

// 2.upcoming events the user is registered for
router.get(
  "/api/dashboard/client/:userId/events/upcoming",
  dasboardClientActions.browseUpcomingEvents,
);

// 3.past space bookings for a specific user
router.get(
  "/api/dashboard/client/:userId/bookings/past",
  dasboardClientActions.browseOldBookings,
);

// 4.upcoming space bookings for a specific user
router.get(
  "/api/dashboard/client/:userId/bookings/upcoming",
  dasboardClientActions.browseUpcomingBookings,
);
router.get(
  "/api/dashboard/client/:userId/billing",
  dasboardClientActions.browseBookingHistory,
);

import dasboardAdminActions from "./modules/dashboardAdmin/dashboardAdminActions";

router.get(
  "/api/dashboard/admin/bookings",
  dasboardAdminActions.browseAdminBookings,
);

/* ************************************************************************* */

export default router;
