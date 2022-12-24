import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config.js';
import db from '../../db/connect.js'

// Create a function that will verify the user's credentials and return a JWT token
// that will be used to authenticate the user on subsequent requests.

function login(req, res) {
    // Get credentials from request body
    const { username, password } = req.body;

    // Check if the username and password are present
    if (!(username && password)) return res.status(400).json({ message: 'Username and password are required' });

    // Check if the user exists in the database
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {

        // If the user does not exist, return an error
        if (!row) return res.status(401).json({ message: 'Username or password is incorrect' });

        // Check if the password is correct
        if (!await bcrypt.compare(password, row.password)) return res.status(401).json({ message: 'Username or password is incorrect' });

        // Strip the password from the user
        delete row.password;
        delete row.autologin;

        // If the user exists, generate a JWT token
        const token = jwt.sign({ user: row }, config.secret, { expiresIn: '7d' });

        // Return the JWT token
        res.json({ token });

    });
}

export default login;