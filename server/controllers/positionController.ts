import db from "../db/connect";
import { Response, Request } from "express";
import { getAllDatabase, writeDatabase } from "../helpers/database";
import { respondAuthError, respondError, respondNotFoundError } from "../helpers/errors";

const getPositions = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get all the groups from the database where the user id is the user id
    const { err, row: groups } = await getAllDatabase(db, 'SELECT * FROM groups WHERE user_id = ? ORDER BY position', [userId]);

    // If there is an error, return an error or if the groups do not exist, return an empty null
    if (err) return respondError(res, err);

    // If the groups do not exist, return an error
    if (!groups) return respondNotFoundError(res);


    // Get all the services from the database where the user id is the user id
    const { err: err2, row: services } = await getAllDatabase(db, 'SELECT * FROM services WHERE user_id = ? ORDER BY position', [userId]);

    // If there is an error, return an error or if the services do not exist, return an empty null
    if (err2) return respondError(res, err2);

    // If the services do not exist, return an error
    if (!services) return respondNotFoundError(res);


    // Create an array of groups
    let positions = [];

    // Loop through the groups
    for (let group of groups) {
        // Create an object for the group
        const groupObject = {
            id: group.id,
            name: group.name,
            position: group.position,
            items: [] as any[]
        };

        // Loop through the services
        for (let service of services) {
            // If the group id is the same as the service group id
            if (group.id === service.group_id) {
                // Create an object for the service
                const serviceObject = {
                    id: service.id,
                    name: service.name,
                    position: service.position
                };

                // Push the service object to the group object
                groupObject.items.push(serviceObject);
            }
        }

        // Push the group object to the array of groups
        positions.push(groupObject);
    }

    // Return the array of groups
    res.json(positions);
    
};

const postPositions = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);
    
    const positions = req.body;


    for (let group of positions) {
        writeDatabase(db, 'UPDATE groups SET position = ? WHERE id = ? AND user_id = ?', [group.position, group.id, userId]);
        for (let service of group.items) {
            writeDatabase(db, 'UPDATE services SET position = ?, group_id = ? WHERE id = ? AND user_id = ?', [service.position, group.id, service.id, userId]);
        }
    }


    res.json({ success: true });

};

export { getPositions, postPositions };