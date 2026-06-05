import express from "express";
import dashboardActions from "./modules/dashboard/dashboardActions";
import itemActions from "./modules/item/itemActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
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

/* ************************************************************************* */

export default router;
