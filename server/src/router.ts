import express from "express";

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

export default router;
