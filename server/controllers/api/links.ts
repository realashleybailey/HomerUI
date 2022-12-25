import db from '../../db/connect'

// Create a function that will add a new link to the database using the current users settings id
function addLink(req: any, res: any) {

    // Get the settings id from the request user
    const settingsId = req.user.settings_id;

    // Get the data from the request body
    const data = req.body || null;

    // Error check if the data is null
    if (!data) return res.status(400).json({ message: 'No data' });

    // Split data into name icon url and target
    const { name, icon, url, target } = data;

    // Insert the link into the database
    db.run('INSERT INTO links (settings_id, name, icon, url, target) VALUES (?, ?, ?, ?, ?)', [settingsId, name, icon, url, target], function (err) {

        // If there is an error, return an error
        if (err) return res.status(500).json({ message: 'Something went wrong' });

        // Return a success message
        res.json({
            id: this.lastID,
            ...req.body
        });

    });
}

// Create a function that will delete a link from the database using the id for the link
function deleteLink(req: any, res: any) {

    // Get the id from the request parameters
    const id = req.body.id;

    // Get the settings id from the request user
    const settingsId = req.user.settings_id;

    // Delete the link from the database where the id is the id and the settings id is the settings id
    db.run('DELETE FROM links WHERE id = ? AND settings_id = ?', [id, settingsId], (err) => {

        // If there is an error, return an error
        if (err) return res.status(500).json({ message: 'Something went wrong' });

        // Return a success message
        res.json(req.body);

    });

}

export default { addLink, deleteLink };