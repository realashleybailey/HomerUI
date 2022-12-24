import service from '../controllers/websocket/service.js';

const WEBSOCKET = (io) => {

    io.on('connection', (socket) => {
        socket.emit('CONNECT', socket.id);

        socket.on('service', (data) => {
            socket.join(`service-${data.id}`);
        });
    });

}

export default WEBSOCKET;