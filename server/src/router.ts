import express from "express";
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
// Client dashboard routes

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
