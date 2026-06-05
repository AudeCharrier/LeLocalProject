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

export default router;
