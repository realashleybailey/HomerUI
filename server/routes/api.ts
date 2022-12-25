// Import modules
import express from "express";

// Import middleware
import jwtVerify from "../middleware/jwt";

import { join } from "path";

// Import controllers
import login from "../controllers/api/login";
import users from "../controllers/api/users";
import autologin from "../controllers/api/autologin";
import settings from "../controllers/api/settings";
import links from "../controllers/api/links";
import services from "../controllers/api/services";
import { existsSync } from "fs";

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

// Serve json file for services
router.get("/supportedapps", (req, res) => {
    res.sendFile("SupportedAppsList.json", { root: join(__dirname, "../supportedapps/") });
});

router.get("/supportedapps/config/:appname", (req, res) => {

    // Clean id to prevent path traversal
    const id = req.params.appname.replace(/[^a-zA-Z0-9]/g, "");
    const path = join(__dirname, "../supportedapps/", id);

    // Check if folder exists
    if (!existsSync(path)) return res.status(404).send("Not found");

    // Send file
    res.sendFile('config.json', { root: path });
});

// Create api route for getting stats
// router.get("/apps/:id/stats", services.getStats);

export default router;
