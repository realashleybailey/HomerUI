import service from '../controllers/websocket/service.js';

const WEBSOCKET = (io: any) => {

    io.on('connection', (socket: any) => {
        socket.emit('CONNECT', socket.id);

        socket.on('service', (data: any) => {
            socket.join(`service-${data.id}`);
        });
    });

}

export default WEBSOCKET;