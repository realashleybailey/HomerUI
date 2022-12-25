import express from "express";
import bodyParser from "body-parser";
// import morgan from "morgan";
import cors from "cors";

import { createProxyMiddleware } from "http-proxy-middleware";
import { Server } from "socket.io";

// Load Routers
import websocketRouter from "./routes/websocket";
import apiRouter from "./routes/api";

import Tabler from "./helpers/tabler";
// Debugging purposes


const objFirst = {
    server: "Homer V2",
    host: "https://homer-v2.herokuapp.com",
    port: "4040",
}
const objSecond = {
    server: "Homer V2 Test",
    host: "https://homer-v2.herokuapp.com",
    port: "4141",
}
const objThird = {
    server: "Homer V2 Test",
    host: "https://homersaddsa-v2.herokuapp.com",
    port: "4141",
}

const test = [objFirst, objSecond, objThird];

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
const APP = express();
const PORT = process.env.PORT || 5252;

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
// APP.use(morgan("tiny"));

// Serve entire public folder
APP.use("/api", apiRouter);

APP.use("/", express.static("../dist"));
APP.use(/(?!(\/ws|\/socket.io)).*/, (req, res) => {
  res.sendFile("index.html", { root: "../dist" });
});

///////////////////////////////////////////////////////////////////
//////////// TEST SERVER FOR DEVELOPMENT PURPOSES /////////////////
///////////////////////////////////////////////////////////////////


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
// TEST.use(morgan('tiny'));

// Serve entire public folder
TEST.use("/api", apiRouter);
TEST.use(/(?!(\/ws|\/socket.io)).*/, createProxyMiddleware({
    target: "http://localhost:5173",
    changeOrigin: true
}));
