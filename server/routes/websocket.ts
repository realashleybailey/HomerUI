import { Server } from "socket.io";
import service from "../controllers/websocket/service";

const WEBSOCKET = (io: Server) => {

  io.on("connection", (socket) => {

    socket.emit("CONNECT", socket.id);

    // Listen for everyting
    socket.onAny((event, ...args) => {
       
        // If the event is service, run the service function
        service(socket, args[0]);

    });

  });
};

export default WEBSOCKET;
