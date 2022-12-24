// Import modules
// @ts-expect-error TS(7016): Could not find a declaration file for module 'expr... Remove this comment to see the full error message
import express from "express";

// Import middleware
import jwtVerify from "../middleware/jwt.js";

// Import controllers
import login from "../controllers/api/login.js";
import users from "../controllers/api/users.js";
import autologin from "../controllers/api/autologin.js";
import settings from "../controllers/api/settings.js";
import links from "../controllers/api/links.js";
import services from "../controllers/api/services.js";

const router = express.Router();

// Create api route for the login endpoint
router.post("/login", login);

// Create api route for other endpoints
router.get("/users", jwtVerify, users);
router.get("/autologin", jwtVerify, autologin);

// Create api route for settings endpoints
router.get("/settings", settings.getSettings);
router.get("/settings/:id", settings.getSetting);

router.post("/settings", jwtVerify, settings.setSettings);
router.post("/settings/:id", jwtVerify, settings.setSetting);

// Create api route for adding and deleting links
router.post("/addlink", jwtVerify, links.addLink);
router.post("/deletelink", jwtVerify, links.deleteLink);

// Create api route for loading services
router.get("/services", services.getServices);

// Create api route for getting stats
router.get("/apps/:id/stats", services.getStats);

export default router;
