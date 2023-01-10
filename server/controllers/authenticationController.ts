import db from "../db/connect";
import { respondError, respondAuthError } from "../helpers/errors";

import { getDatabase, writeDatabase } from "../helpers/database";
import { generateAccessToken } from "../helpers/generateAccessToken";
import { Request, Response } from "express";
import { compare } from "bcrypt";

/**
 * Login a user and return the user and the access token
 * @param req 
 * @param res 
 * @returns 
 */
const getLogin = async (req: Request, res: Response) => {
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Get the user from the database where the username is the username and the password is the password
    const { err, row: user } = await getDatabase(db, 'SELECT * FROM users WHERE username = ?', [username]);

    // If there is an error, return an error
    if (err) return respondError(res, err);

    // If the user does not exist, return an error
    if (!user) return respondAuthError(res, 'User does not exist');

    // Verify the password matches the password in the database
    const validPassword = await compare(password, user.password);


    // If the password is not valid, return an error
    if (!validPassword) return respondAuthError(res, 'Username or password is incorrect');

    // Generate an access token
    const token = generateAccessToken(user);

    // Return the user and the access token
    res.json({ user, token });
};

/**
 * Logout a user
 * @param req
 * @param res
 * @returns
 */
const getLogout = async (req: Request, res: Response) => {
    console.log(req.body);
};



export { getLogin, getLogout };