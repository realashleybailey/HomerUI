import axios from "axios";
import { Socket } from "socket.io"

const getStats = async (socket: Socket, service: any, meta: any) => {

    const { status, data } = await axios.get(service.endpoint + meta.url, {
        auth: {
            username: service.username,
            password: service.password
        }
    });

    if (status !== 200) return socket.emit(`service-${service.id}`, { error: 'Something went wrong' });

    let statReturn: any[] = [];

    (meta.query as any[]).forEach(function (query: string, index) {

        const statData = data[query];

        statReturn.push({
            value: statData,
            prefix: meta.prefix[index] || '',
        })
    })

    socket.emit(`service-${service.id}`, statReturn);
}

export { getStats }