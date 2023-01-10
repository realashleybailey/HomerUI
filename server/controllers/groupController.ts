import db from "../db/connect";
import { Request, Response } from "express";
import { getDatabase, getAllDatabase, writeDatabase } from "../helpers/database";
import { respondAuthError, respondError, respondNotFoundError } from "../helpers/errors";
import { validate } from "class-validator";
import { ValidateID } from "../helpers/validateID";
import { ValidateGroup } from "../models/ValidateGroup";

/**
 * Get all the groups from the database
 * @param req
 * @param res
 * @returns
 */
const getGroups = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get all the groups from the database where the user id is the user id
    const { err, row: groups } = await getAllDatabase(db, 'SELECT * FROM groups WHERE user_id = ? ORDER BY position', [userId]);

    // If there is an error, return an error or if the groups do not exist, return an empty null
    if (err) return respondError(res, err);

    // If the groups do not exist, return an error
    if (!groups) return respondNotFoundError(res);

    // Return the groups
    res.json(groups);
};

/**
 * Get a group from the database
 * @param req
 * @param res
 * @returns
 */
const getGroup = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get the group id from the request params
    const { err, id } = await ValidateID(req.params.id);

    // If there is an error, return an error or if the group id does not exist, return an empty null
    if (err) return respondError(res, err);

    // Get the group from the database where the user id is the user id and the group id is the group id
    const { err: err2, row: group } = await getDatabase(db, 'SELECT * FROM groups WHERE user_id = ? AND id = ?', [userId, id]);

    // If there is an error, return an error or if the group does not exist, return an empty null
    if (err2) return respondError(res, err);

    // If the group does not exist, return an error
    if (!group) return respondNotFoundError(res);

    // Return the group
    res.json(group);
};

/**
 * Create a group in the database
 * @param req
 * @param res
 * @returns
 */
const postGroup = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get the group from the request body
    const group = req.body;

    // Create a new ValidateGroup object
    const groupValidate = new ValidateGroup();
    
    // Set the properties of the ValidateGroup object
    groupValidate.name = group.name;
    groupValidate.icon = group.icon;

    // Validate the group
    const errors = await validate(groupValidate);
    if (errors.length > 0) return respondError(res, errors);
    
    // Insert the group into the database
    const { err, result } = await writeDatabase(db, 'INSERT INTO groups (user_id, name, icon) VALUES (?, ?, ?)', [userId, group.name, group.icon]);

    // If there is an error, return an error or if the group does not exist, return an empty null
    if (err) return respondError(res, err);

    // Add the group id and user id to the group
    // group.id = result.lastID;
    group.user_id = userId;

    // Return the result
    res.json(group);
};

/**
 * Update a group in the database
 * @param req
 * @param res
 * @returns
 */
const putGroup = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get the group id from the request params
    const { err, id } = await ValidateID(req.params.id);

    // If there is an error, return an error
    if (err) return respondError(res, err);

    // Get the group from the database where the user id is the user id and the group id is the group id
    const { err: err2, row: oldGroup } = await getDatabase(db, 'SELECT * FROM groups WHERE user_id = ? AND id = ?', [userId, id]);

    // If there is an error, return an error
    if (err2) return respondError(res, err);

    // If the group does not exist, return an error
    if (!oldGroup) return respondNotFoundError(res);

    // Get the group from the request body
    const group = req.body;

    // Merge the old group with the new group
    const newGroup = { ...oldGroup, ...group };

    // Create a new ValidateGroup object
    const groupValidate = new ValidateGroup();

    // Set the properties of the ValidateGroup object
    groupValidate.name = newGroup.name;
    groupValidate.icon = newGroup.icon;

    // Validate the group
    const errors = await validate(groupValidate);

    if (errors.length > 0) return respondError(res, errors);

    // Update the group in the database
    const { err: err3 } = await writeDatabase(db, 'UPDATE groups SET name = ?, icon = ? WHERE user_id = ? AND id = ?', [newGroup.name, newGroup.icon, userId, id]);

    // If there is an error, return an error
    if (err3) return respondError(res, err);

    // Return the result
    res.json(group);
};

/**
 * Delete a group from the database
 * @param req
 * @param res
 * @returns
 */
const deleteGroup = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get the group id from the request params
    const { err, id } = await ValidateID(req.params.id);

    // If there is an error, return an error
    if (err) return respondError(res, err);

    // Check if there are any services related to the group
    const { err: err1, row: services } = await getAllDatabase(db, 'SELECT * FROM services WHERE user_id = ? AND group_id = ?', [userId, id]);

    // If there is an error, return an error
    if (err1) return respondError(res, err);

    // If there are any services related to the group, return an error
    if (services.length > 0) return respondError(res, 'There are services related to this group');

    // Delete the group from the database where the user id is the user id and the group id is the group id
    const { err: err2 } = await writeDatabase(db, 'DELETE FROM groups WHERE user_id = ? AND id = ?', [userId, id]);

    // If there is an error, return an error
    if (err2) return respondError(res, err);

    // Return a success message
    res.json({ message: 'Group deleted' });
};

export { getGroups, getGroup, postGroup, putGroup, deleteGroup };