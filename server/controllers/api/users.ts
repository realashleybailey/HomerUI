import db from '../../db/connect'

function users(req: any, res: any) {
    // Get all users from the database
    db.all('SELECT * FROM users', (err, rows) => {

        // If there is an error, return an error
        if (err) return res.status(500).json({ message: 'Something went wrong' });

        // Strip the password from the users
        rows.forEach(row => delete row.password);
        rows.forEach(row => delete row.autologin);

        // Return the users
        res.json(rows);

    });
}

export default users;