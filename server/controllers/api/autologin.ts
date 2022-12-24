import db from '../../db/connect.js'

function users(req: any, res: any) {
    // Get current user from the database using the user.id from the JWT token
    db.get('SELECT * FROM users WHERE id = ?', [req.user.id], (err, row) => {

        // If there is an error, return an error
        if (err) return res.status(500).json({ message: 'Something went wrong' });

        // If the user does not exist, return an error
        if (!row) return res.status(404).json({ message: 'User not found' });

        // Check if autologin is enabled by seeing if its null if it is return an error that autologin is not enabled
        if (!row.autologin) return res.status(401).json({ message: 'Autologin is not enabled' });

        // Return the user
        res.json({ "autologin": row.autologin });

    });
}

export default users;