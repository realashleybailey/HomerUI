import db from '../../db/connect.js'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { getDatabase, getAllDatabase, writeDatabase } from '../../helpers/database.js'


const getServices = async (req, res) => {

    // Get the user id from the request user
    const userId = req.user ? req.user.id : 1;

    // Get all the groups from the database where the user id is the user id
    const { err: err1, row: groups } = await getAllDatabase(db, 'SELECT * FROM groups WHERE user_id = ' + userId);

    // If there is an error, return an error or if the services do not exist, return an empty null
    if (err1) return res.status(500).json({ message: 'Something went wrong' });


    // Get all the services from the database where the user id is the user id
    const { err: err2, row: services } = await getAllDatabase(db, 'SELECT * FROM services WHERE user_id = ' + userId);

    // If there is an error, return an error or if the services do not exist, return an empty null
    if (err2) return res.status(500).json({ message: 'Something went wrong' });


    // Place the services in the groups in a array named items based on the group id
    groups.forEach(group => {
        group.items = services.filter(service => service.group_id === group.id);
    });

    // Return the services
    res.json(groups);
};

const getStats = async (req, res) => {

    // Get the appid for the service from the database where the query id is the service id
    const { err: err1, row: service } = await getDatabase(db, 'SELECT * FROM services WHERE id = ' + req.params.id);

    // If there is an error, return an error or if the service does not exist, return an empty null
    if (err1 || !service) return res.status(500).json({ message: 'Something went wrong' });

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);


    // Convert the above function to a promise
    const readFile = (file) => {
        return new Promise((resolve) => {
            fs.readFile(file, { encoding: 'utf8' }, (err, data) => {
                resolve({ err, data });
            });
        });
    };

    // Get the local file with name of the appid
    const { err, data: apiData } = await readFile(`${__dirname}/../../supportedapps/${service.appid}.json`);

    // If there is an error, return an error or if the service does not exist, return an empty null
    if (err) return res.status(500).json({ message: 'Something went wrong' });

    // Default return data
    let defaultReturn = [];

    // Parse the data
    const apiMeta = JSON.parse(apiData);

    apiMeta.stats.forEach(async function (stat, index) {

        // If apiMeta.stats[index].type is basic_auth, then use the basic auth
        if (apiMeta.type === 'basic_auth') {

            // Get the stats from the api
            const { status, data } = await axios.get(service.endpoint + stat.url, {
                auth: {
                    username: service.username,
                    password: service.password
                }
            });

            // If the status is not 200, return an error
            if (status !== 200) return res.status(500).json({ message: 'Something went wrong' });

            // Stat data is data[stat.query]
            const statData = data[stat.query];

            // Set the stats
            defaultReturn.push({
                name: stat.name,
                value: statData,
                prefix: stat.prefix,
            })
        }

        // If last index, return the stats
        if (index === apiMeta.stats.length - 1) {
            res.json(defaultReturn);
        }

    });

};

export default { getServices, getStats };