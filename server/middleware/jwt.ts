import jwt from 'jsonwebtoken';
import config from '../config';

function jwtVerify(req: any, res: any, next: any) {

    // Get the token from the request header
    let token = req.headers.authorization;

    // If the token is not present, return an error
    if (!token) return res.status(401).json({ message: 'Access denied' });

    // If bearer is present, remove it
    if (token.startsWith('Bearer ')) token = token.slice(7, token.length);

    // If the token is present, verify it
    jwt.verify(token, config.secret, (err: any, decoded: any) => {

        // If the token is invalid, return an error
        if (err) return res.status(401).json({ message: 'Access denied' });

        // Check if the token is expired
        if (decoded.exp < Date.now() / 1000) return res.status(401).json({ message: 'Access denied' });

        // Place decoded user data on the request object
        req.user = decoded.user;

        // Call the next middleware
        next();

    });

}

export default jwtVerify;