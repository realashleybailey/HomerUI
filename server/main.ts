import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { join } from "path";

import { createProxyMiddleware } from "http-proxy-middleware";
import { Server } from "socket.io";

// Load Routers
import websocketRouter from "./routes/websocket";
import apiRouter from "./routes/api";

import Tabler from "./helpers/tabler";
import morganMiddleware from "./middleware/morgan";

import swaggerUI from "swagger-ui-express";
import swaggerDOC from "./swagger.json";

// Debugging purposes

const storeHosts: object[] = [];
const tabler = new Tabler({ padding: 3, colors: ['\x1b[33m', '\x1b[32m', '\x1b[35m'] })

const updateConsole = (data: any) => {
    storeHosts.push(data);
    console.clear();
    tabler.buildTable(storeHosts, ["SERVER", "HOST", "PORT"]);
}



///////////////////////////////////////////////////////////////////
////////////////////// PRODUCTION SERVER //////////////////////////
///////////////////////////////////////////////////////////////////

// Create Express App
if (process.env.NODE_ENV == "prod") {
 
const APP = express();
const PORT = process.env.PORT || 8181;

// Start server
const SERVER = APP.listen(PORT, () => {
    updateConsole({
        server: "Homer V2",
        host: "http://127.0.0.1",
        port: PORT.toString()
    })
});

// Start SOCKET.IO server
const IO = new Server(SERVER, {
    allowEIO3: true,
    path: "/ws"
});


// Load websocket router
websocketRouter(IO);

// Enable CORS and JSON body parsing
APP.use(cors({ origin: "*" }));
APP.use(bodyParser.json());

// Serve entire public folder
APP.use("/api", apiRouter);

APP.use("/", express.static(join(__dirname, "../app/dist")));
APP.use(/(?!(\/ws|\/socket.io)).*/, (req, res) => {
  res.sendFile("index.html", { root: join(__dirname, "../app/dist") });
});

}

///////////////////////////////////////////////////////////////////
//////////// TEST SERVER FOR DEVELOPMENT PURPOSES /////////////////
///////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV == "dev") {
// Create Express App
const TEST = express();
const TEST_PORT = 5353;

// Start TEST server
const TEST_SERVER = TEST.listen(TEST_PORT, () => {
    updateConsole({
        server: "Homer V2 Test",
        host: "http://127.0.0.1",
        port: TEST_PORT.toString()
    })
});

// Start SOCKET.IO server
const TEST_IO = new Server(TEST_SERVER, {
  allowEIO3: true,
  path: "/ws"
});

// Load websocket router
websocketRouter(TEST_IO);

// Enable CORS and JSON body parsing and MORGAN logging
TEST.use(cors({ origin: "*" }));
TEST.use(bodyParser.json());
TEST.use(morganMiddleware);

// Serve entire public folder
TEST.use("/api", apiRouter);
TEST.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDOC));

TEST.use(/(?!(\/ws|\/socket.io)).*/, createProxyMiddleware({
    target: "http://localhost:5173",
    changeOrigin: true
}));

}

