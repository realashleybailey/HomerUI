import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import { createProxyMiddleware } from 'http-proxy-middleware';
import { Server } from 'socket.io';

// Load Routers
import interfaceRouter from './routes/interface.js';
import websocketRouter from './routes/websocket.js';
import apiRouter from './routes/api.js';

// Create Express App
const APP = express();
const PORT = process.env.PORT || 5252;

// Enable CORS and JSON body parsing
APP.use(cors({ origin: '*' }))
APP.use(bodyParser.json());
APP.use(morgan('tiny'));

// Serve entire public folder
APP.use('/api', apiRouter);

APP.use('/', express.static('../dist'));
APP.use('/', (req, res) => {
    res.sendFile('index.html', { root: '../dist' });
});

///////////////////////////////////////////////////////////////////
//////////// TEST SERVER FOR DEVELOPMENT PURPOSES /////////////////
///////////////////////////////////////////////////////////////////

// Start server
const SERVER = APP.listen(PORT, () => {
    console.log('Homer V2 is running on port ' + PORT);
});

const TEST = express();
const TEST_PORT = 5353;

// Start TEST server
const TEST_SERVER = TEST.listen(TEST_PORT, () => {
    console.log('Homer V2 test is running on port ' + TEST_PORT);
});

// Start SOCKET.IO server
const io = new Server(TEST_SERVER, {
    allowEIO3: true,
    path: '/ws',
});

websocketRouter(io);

// Enable CORS and JSON body parsing and MORGAN logging
TEST.use(cors({ origin: '*' }))
TEST.use(bodyParser.json());
// TEST.use(morgan('tiny'));

TEST.use('/api', apiRouter);
TEST.use(/(?!(\/ws|\/socket.io)).*/, createProxyMiddleware({
    target: "http://localhost:5173",
    changeOrigin: true,
}));
