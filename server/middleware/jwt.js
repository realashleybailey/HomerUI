import jwt from 'jsonwebtoken';
import config from '../config.js';

function jwtVerify(req, res, next) {

    // Get the token from the request header
    const token = req.headers.authorization;

    // If the token is not present, return an error
    if (!token) return res.status(401).json({ message: 'Access denied' });

    // If the token is present, verify it
    jwt.verify(token, config.secret, (err, decoded) => {

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