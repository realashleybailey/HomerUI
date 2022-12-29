import db from '../db/connect';
import { Request, Response } from 'express';
import { getAllDatabase } from '../helpers/database';
import { respondError, respondNotFoundError } from '../helpers/errors';

const getMessages = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user ? (req as any).user.id : 1;

    // Get all the messages from the database where the user id is the user id
    const { err, row: messages } = await getAllDatabase(db, 'SELECT * FROM messages WHERE user_id = ?', [userId]);

    // If there is an error, return an error or if the messages do not exist, return an empty null
    if (err) return respondError(res, err);

    // If the messages do not exist, return an error
    if (!messages) return respondNotFoundError(res);

    // Return the messages
    res.json(messages);
};

const getMessage = async (req: Request, res: Response) => {

};

const postMessage = async (req: Request, res: Response) => {

};

const putMessage = async (req: Request, res: Response) => {

};

const deleteMessage = async (req: Request, res: Response) => {

};

export { getMessages, getMessage, postMessage, putMessage, deleteMessage}