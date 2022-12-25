import db from "../../db/connect";

import { join } from "path";
import { Socket } from "socket.io";
import { getDatabase } from "../../helpers/database";

import NodeCache from "node-cache";
import SupportedApps from "../../supportedapps/SupportedAppsList.json";

const cache = new NodeCache({
    stdTTL: 60,
});

const service = async (socket: Socket, data: any) => {

    // Get the id from the data
    const { id } = data;

    // Check if the id is in the cache
    let appService = cache.get(id) as any;

    // If the id is not in the cache
    if (!appService) {
        // Get the service from the database where the id is the service id
        const { err: err1, row: service } = await getDatabase(db, 'SELECT * FROM services WHERE id = ' + id);

        // If there is an error
        if (err1) return socket.emit(`service-${id}`, { error: 'Something went wrong' });

        // Put the service in the cache and set in appService
        cache.set(id, service);
        appService = service;
    }

    // App ID of the service
    const appId = appService.appid;

    // Get the app from the supported apps where the app id is the service app id
    const app = SupportedApps.apps.find(app => app.appid === appId);

    // Check if the app exists
    if (!app) return socket.emit(`service-${id}`, { error: 'Something went wrong', message: 'App not found' });

    
    const appName = app.name.replaceAll(/[^a-zA-Z]/g, '');
    const classFile = join(__dirname, '../../supportedapps/' + appName + '/' + appName + '.ts');

    const ServiceApp = (await import(classFile)).default

    if (typeof ServiceApp !== 'function') return socket.emit(`service-${id}`, { error: 'Something went wrong', message: 'Service App not Function' });

    const appRequest = new ServiceApp({ 
        url: appService.url,
        username: appService.username,
        password: appService.password,
    });

    const appData = await appRequest.livestats();

    socket.emit(`service-${appService.id}`, appData);
};

export default service;