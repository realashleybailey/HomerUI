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


import { getLogin, getLogout } from "../controllers/authenticationController";
import { getServices, getService, postService, putService, deleteService } from "../controllers/serviceController";
import { getGroups, getGroup, postGroup, putGroup, deleteGroup } from "../controllers/groupController";
import { getLinks, getLink, postLink, putLink, deleteLink } from "../controllers/linkController";
import { getPositions, postPositions } from "../controllers/positionController";

import { getStatus } from "../controllers/statusController";
import { deleteMessage, getMessage, getMessages, postMessage, putMessage } from "../controllers/messageController";

const router = express.Router();

///////////////////////////
// Authentication Routes //
///////////////////////////

router.post("/auth/login", getLogin
// #swagger.tags = ['Authentication']
// #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/definitions/User" }}}}
// #swagger.responses[200] = { description: 'Login successful', schema: { $ref: "#/definitions/UserResponse" } }
// #swagger.responses[401] = { description: 'Username or password is incorrect' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
);

router.get("/auth/logout", jwtVerify, getLogout
// #swagger.tags = ['Authentication']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'Logout successful' }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
);


////////////////////
// Service Routes //
////////////////////

router.get("/service", jwtVerify, getServices
// #swagger.tags = ['Service']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'List of services', schema: { $ref: "#/definitions/ServicesResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
);

router.get("/service/:id", jwtVerify, getService
// #swagger.tags = ['Service']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'Service', schema: { $ref: "#/definitions/Service" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[404] = { description: 'Service not found' }
);

router.post("/service", jwtVerify, postService
// #swagger.tags = ['Service']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/definitions/Service" }}}}
// #swagger.responses[200] = { description: 'Service created', schema: { $ref: "#/definitions/ServiceResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
);

router.put("/service/:id", jwtVerify, putService
// #swagger.tags = ['Service']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/definitions/Service" }}}}
// #swagger.responses[200] = { description: 'Service updated', schema: { $ref: "#/definitions/ServiceResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[404] = { description: 'Service not found' }
);

router.delete("/service/:id", jwtVerify, deleteService
// #swagger.tags = ['Service']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'Service deleted' }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[404] = { description: 'Service not found' }
);


///////////////////
// Group Routes  //
///////////////////

router.get("/group", jwtVerify, getGroups
// #swagger.tags = ['Group']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'List of groups', schema: { $ref: "#/definitions/GroupsResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
);

router.get("/group/:id", jwtVerify, getGroup
// #swagger.tags = ['Group']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'Group', schema: { $ref: "#/definitions/Group" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[404] = { description: 'Group not found' }
);

router.post("/group", jwtVerify, postGroup
// #swagger.tags = ['Group']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/definitions/Group" }}}}
// #swagger.responses[200] = { description: 'Group created', schema: { $ref: "#/definitions/GroupResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
);

router.put("/group/:id", jwtVerify, putGroup
// #swagger.tags = ['Group']
// #swagger.security = [{ "bearerAuth
// #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/definitions/Group" }}}}
// #swagger.responses[200] = { description: 'Group updated', schema: { $ref: "#/definitions/GroupResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[404] = { description: 'Group not found' }
);

router.delete("/group/:id", jwtVerify, deleteGroup
// #swagger.tags = ['Group']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'Group deleted' }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[404] = { description: 'Group not found' }
);


/////////////////
// Link Routes //
/////////////////

router.get("/link", jwtVerify, getLinks
// #swagger.tags = ['Link']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'List of links', schema: { $ref: "#/definitions/LinksResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
);

router.get("/link/:id", jwtVerify, getLink
// #swagger.tags = ['Link']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'Link', schema: { $ref: "#/definitions/Link" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[404] = { description: 'Link not found' }
);

router.post("/link", jwtVerify, postLink
// #swagger.tags = ['Link']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/definitions/Link" }}}}
// #swagger.responses[200] = { description: 'Link created', schema: { $ref: "#/definitions/LinkResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
);

router.put("/link/:id", jwtVerify, putLink
// #swagger.tags = ['Link']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/definitions/Link" }}}}
// #swagger.responses[200] = { description: 'Link updated', schema: { $ref: "#/definitions/LinkResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[404] = { description: 'Link not found' }
);

router.delete("/link/:id", jwtVerify, deleteLink
// #swagger.tags = ['Link']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'Link deleted' }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[404] = { description: 'Link not found' }
);

////////////////////
// Message Routes //
////////////////////

router.get("/message", jwtVerify, getMessages
// #swagger.tags = ['Message']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'List of messages', schema: { $ref: "#/definitions/MessagesResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
);

router.get("/message/:id", jwtVerify, getMessage
// #swagger.tags = ['Message']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'Message', schema: { $ref: "#/definitions/Message" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[404] = { description: 'Message not found' }
);

router.post("/message", jwtVerify, postMessage
// #swagger.tags = ['Message']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/definitions/Message" }}}}
// #swagger.responses[200] = { description: 'Message created', schema: { $ref: "#/definitions/MessageResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
);

router.put("/message/:id", jwtVerify, putMessage
// #swagger.tags = ['Message']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/definitions/Message" }}}}
// #swagger.responses[200] = { description: 'Message updated', schema: { $ref: "#/definitions/MessageResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[404] = { description: 'Message not found' }
);

router.delete("/message/:id", jwtVerify, deleteMessage
// #swagger.tags = ['Message']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'Message deleted' }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
// #swagger.responses[404] = { description: 'Message not found' }
);

/////////////////////
// Position Routes //
/////////////////////

router.get("/position", jwtVerify, getPositions
// #swagger.tags = ['Position']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.responses[200] = { description: 'List of positions', schema: { $ref: "#/definitions/PositionsResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
);

router.post("/position", jwtVerify, postPositions
// #swagger.tags = ['Position']
// #swagger.security = [{ "bearerAuth": [] }]
// #swagger.requestBody = { required: true, content: { "application/json": { schema: { $ref: "#/definitions/Position" }}}}
// #swagger.responses[200] = { description: 'Position created', schema: { $ref: "#/definitions/PositionResponse" } }
// #swagger.responses[401] = { description: 'Unauthorized' }
// #swagger.responses[500] = { description: 'Internal server error' }
// #swagger.responses[400] = { description: 'Bad request' }
);


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
router.get("/groups", services.getGroups);

// Create api route for listing groups

// Status
router.get("/status", getStatus);

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

// Catch all other routes
router.get("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
});

// Create api route for getting stats
// router.get("/apps/:id/stats", services.getStats);

export default router;
