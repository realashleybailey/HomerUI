import db from '../db/connect';
import os from 'os';
import { Request, Response } from 'express';
import { getAllDatabase } from '../helpers/database';

const getStatus = async (req: Request, res: Response) => {

    // Debug
    const debug = (req.query.debug === 'true');

    // Get the debug from the request query
    let status = {
        name: 'HomerUI' as string,
        database: false as boolean,
        cpus: 0 as number,
        memory: 0 as number,
        platform: '' as string,
        release: '' as string,
        hostname: '' as string,
        freemem: 0 as number,
        version: '1.0.0' as string,
    };

    // Check if database exists
    status.database = await getDatabaseBool(debug);
    status.cpus = os.cpus().length;
    status.memory = os.totalmem();
    status.platform = os.platform();
    status.release = os.release();
    status.hostname = os.hostname();
    status.freemem = os.freemem();

    res.json(status);
};

async function getDatabaseBool(debug: boolean) {
    const database = await getAllDatabase(db, 'SELECT id FROM users' + (debug ? 'WHERE id = 10' : ''));

    if (database.err) {
        return false;
    }

    return database.row.length > 0 || false;
}

export { getStatus };