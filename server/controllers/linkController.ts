import db from "../db/connect";
import { Request, Response } from "express";
import { getDatabase, getAllDatabase, writeDatabase } from "../helpers/database";
import { respondError, respondNotFoundError } from "../helpers/errors";
import { validate } from "class-validator";
import { ValidateID } from "../helpers/validateID";
import { ValidateLink } from "../models/ValidateLink";

const getLinks = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user ? (req as any).user.id : 1;

    // Get all the links from the database where the user id is the user id
    const { err, row: links } = await getAllDatabase(db, 'SELECT * FROM links WHERE user_id = ?', [userId]);

    // If there is an error, return an error or if the links do not exist, return an empty null
    if (err) return respondError(res, err);

    // If the links do not exist, return an error
    if (!links) return respondNotFoundError(res);

    // Return the links
    res.json(links);
};

const getLink = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user ? (req as any).user.id : 1;

    // Get the link id from the request params
    const { err, id } = await ValidateID(req.params.id);
    
    // If there is an error, return an error or if the link id does not exist, return an empty null
    if (err) return respondError(res, err);

    // Get the link from the database where the user id is the user id and the link id is the link id
    const { err: err2, row: link } = await getDatabase(db, 'SELECT * FROM links WHERE user_id = ? AND id = ?', [userId, id]);

    // If there is an error, return an error or if the link does not exist, return an empty null
    if (err2) return respondError(res, err);

    // If the link does not exist, return an error
    if (!link) return respondNotFoundError(res);

    // Return the link
    res.json(link);
};

const postLink = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user ? (req as any).user.id : 1;

    // Get the link from the request body
    const link = req.body;

    // Get the link from the request body
    let linkValidate = new ValidateLink();

    linkValidate.name = link.name;
    linkValidate.icon = link.icon;
    linkValidate.url = link.url;
    linkValidate.target = link.target || '_self';

    // Validate the link
    const errors = await validate(linkValidate);
    if (errors.length > 0) return respondError(res, errors);

    // Insert the link into the database
    const { err, result } = await writeDatabase(db, 'INSERT INTO links (user_id, name, icon, url, target) VALUES (?, ?, ?, ?, ?)', [userId, link.name, link.icon, link.url, link.target]);

    // If there is an error, return an error
    if (err) return respondError(res, err);

    // Add the link id and the user id to the link
    // link.id = result.lastID;
    link.user_id = userId;

    // Return the link
    res.json(link);
};

const putLink = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user ? (req as any).user.id : 1;

    // Get the link id from the request params
    const { err, id } = await ValidateID(req.params.id);

    // If there is an error, return an error
    if (err) return respondError(res, err);

    // Get the link from the database where the user id is the user id and the link id is the link id
    const { err: err2, row: oldLink } = await getDatabase(db, 'SELECT * FROM links WHERE user_id = ? AND id = ?', [userId, id]);

    // If there is an error, return an error
    if (err2) return respondError(res, err);

    // If the link does not exist, return an error
    if (!oldLink) return respondNotFoundError(res);

    // Get the link from the request body
    const link = req.body;

    // Merge the old link with the new link
    const newLink = { ...oldLink, ...link };

    // Create a new ValidateLink object
    let linkValidate = new ValidateLink();

    // Set the properties of the ValidateLink object
    linkValidate.name = newLink.name;
    linkValidate.icon = newLink.icon;
    linkValidate.url = newLink.url;
    linkValidate.target = newLink.target || '_self';

    // Validate the link
    const errors = await validate(linkValidate);
    if (errors.length > 0) return respondError(res, errors);

    // Update the link in the database
    const { err: err3 } = await writeDatabase(db, 'UPDATE links SET name = ?, icon = ?, url = ?, target = ? WHERE user_id = ? AND id = ?', [newLink.name, newLink.icon, newLink.url, newLink.target, userId, id]);

    // If there is an error, return an error
    if (err3) return respondError(res, err);

    // Return the link
    res.json(newLink);
};

const deleteLink = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user ? (req as any).user.id : 1;

    // Get the link id from the request params
    const { err, id } = await ValidateID(req.params.id);

    // If there is an error, return an error
    if (err) return respondError(res, err);

    // Delete the link from the database where the user id is the user id and the link id is the link id
    const { err: err2 } = await writeDatabase(db, 'DELETE FROM links WHERE user_id = ? AND id = ?', [userId, id]);

    // If there is an error, return an error
    if (err2) return respondError(res, err);

    // Return a success message
    res.json({ message: 'Link deleted' });
};

export { getLinks, getLink, postLink, putLink, deleteLink };