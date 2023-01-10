import db from '../db/connect';
import { Request, Response } from 'express';
import { getAllDatabase, getDatabase, writeDatabase } from '../helpers/database';
import { respondAuthError, respondError, respondNotFoundError } from '../helpers/errors';
import { ValidateID } from '../helpers/validateID';
import { ValidateMessage } from '../models/ValidateMessage';
import { validate } from 'class-validator';

const getMessages = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

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
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get the message id from the request params
    const { err, id } = await ValidateID(req.params.id);

    // If there is an error, return an error or if the message id does not exist, return an empty null
    if (err) return respondError(res, err);

    // Get the message from the database where the user id is the user id and the message id is the message id
    const { err: err2, row: message } = await getDatabase(db, 'SELECT * FROM messages WHERE user_id = ? AND id = ?', [userId, id]);

    // If there is an error, return an error or if the message does not exist, return an empty null
    if (err2) return respondError(res, err);

    // If the message does not exist, return an error
    if (!message) return respondNotFoundError(res);

    // Return the message
    res.json(message);
};

const postMessage = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get the message from the request body
    const message = req.body;

    // Create a message validate object
    let messageValidate = new ValidateMessage();

    messageValidate.title = message.title;
    messageValidate.content = message.content;
    messageValidate.style = message.style;
    messageValidate.disabled = message.disabled;

    // Validate the message
    const errors = await validate(messageValidate);
    if (errors.length > 0) return respondError(res, errors);

    // Insert the message into the database
    const { err, result } = await writeDatabase(db, 'INSERT INTO messages (user_id, title, content, style, disabled) VALUES (?, ?, ?, ?, ?)', [userId, message.title, message.content, message.style, message.disabled]);

    // If there is an error, return an error
    if (err) return respondError(res, err);

    // Add the message id to the message and the user id to the message
    // message.id = result.insertId;
    message.user_id = userId;

    // Return the message
    res.json(message);
};

const putMessage = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get the message id from the request params
    const { err, id } = await ValidateID(req.params.id);

    // If there is an error, return an error or if the message id does not exist, return an empty null
    if (err) return respondError(res, err);

    // Get the message from the database
    const { err: err2, row: oldMessage } = await getDatabase(db, 'SELECT * FROM messages WHERE user_id = ? AND id = ?', [userId, id]);

    // If there is an error, return an error
    if (err2) return respondError(res, err);

    // If the message does not exist, return an error
    if (!oldMessage) return respondNotFoundError(res);

    // Get the message from the request body
    const message = req.body;

    // Merge the old message with the new message
    const newMessage = { ...oldMessage, ...message };

    // Create a message validate object
    let messageValidate = new ValidateMessage();

    // Set the message validate object to the new message
    messageValidate.title = message.title;
    messageValidate.content = message.content;
    messageValidate.style = message.style;
    messageValidate.disabled = message.disabled;

    // Validate the message
    const errors = await validate(messageValidate);
    if (errors.length > 0) return respondError(res, errors);

    // Update the message in the database where the user id is the user id and the message id is the message id
    const { err: err3 } = await writeDatabase(db, 'UPDATE messages SET title = ?, content = ?, style = ?, disabled = ? WHERE user_id = ? AND id = ?', [message.title, message.content, message.style, message.disabled, userId, id]);

    // If there is an error, return an error or if the message does not exist, return an empty null
    if (err3) return respondError(res, err);

    // Return the message
    res.json(newMessage);
};

const deleteMessage = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get the message id from the request params
    const { err, id } = await ValidateID(req.params.id);

    // If there is an error, return an error
    if (err) return respondError(res, err);

    // Delete the message from the database where the user id is the user id and the message id is the message id
    const { err: err2 } = await writeDatabase(db, 'DELETE FROM messages WHERE user_id = ? AND id = ?', [userId, id]);

    // If there is an error, return an error
    if (err2) return respondError(res, err);

    // Return a success message
    res.json({ message: 'Message deleted' });
};

export { getMessages, getMessage, postMessage, putMessage, deleteMessage}