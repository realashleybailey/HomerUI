import db from '../../db/connect'
import { getAllDatabase } from '../../helpers/database'


const getServices = async (req: any, res: any) => {

    // Get the user id from the request user
    const userId = req.user ? req.user.id : 1;

    // Get all the services from the database where the user id is the user id
    const { err: err2, row: services } = await getAllDatabase(db, 'SELECT * FROM services WHERE user_id = ' + userId);

    // If there is an error, return an error or if the services do not exist, return an empty null
    if (err2) return res.status(500).json({ message: 'Something went wrong' });

    // Return the services
    res.json(services);
};

const getGroups = async (req: any, res: any) => {

    // Get the user id from the request user
    const userId = req.user ? req.user.id : 1;

    // Get all the groups from the database where the user id is the user id
    const { err, row } = await getAllDatabase(db, 'SELECT * FROM groups WHERE user_id = ' + userId);

    // If there is an error, return an error or if the services do not exist, return an empty null
    if (err) return res.status(500).json({ message: 'Something went wrong' });

    // Return the groups
    res.json(row);
};

export default { getServices, getGroups };