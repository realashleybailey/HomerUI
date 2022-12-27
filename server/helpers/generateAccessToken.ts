import { sign } from 'jsonwebtoken';
import config from '../config';

/**
 * Generate a JWT token for the user
 * @param user 
 * @returns string
 */
export const generateAccessToken = (user: any): string => {

    // Strip certain properties from the user object
    delete user.password;
    delete user.autologin;

    // Expire the token in 7 days
    const expiresIn = '7d';
    const secret = config.secret;

    // User object to be encoded in the JWT token
    const dataStoredInToken = {
        user: user
    };

    // Return the JWT token
    return sign(dataStoredInToken, secret, { expiresIn });
}