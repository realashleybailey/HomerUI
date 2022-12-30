import db from "../db/connect";
import { Response, Request } from "express";
import { getDatabase, getAllDatabase, writeDatabase } from "../helpers/database";
import { respondError, respondNotFoundError } from "../helpers/errors";

const getPositions = async (req: Request, res: Response) => {

};

const postPositions = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user ? (req as any).user.id : 1;
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