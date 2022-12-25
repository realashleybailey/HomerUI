import db from '../../db/connect'
import { getDatabase, getAllDatabase, writeDatabase } from '../../helpers/database'

// Create a function that will update the setting based on the id and post data
async function setSetting(req: any, res: any) {

    // Get the settings id from the request user
    const settingsId = req.user.settings_id;

    // Get the id from the request parameters
    const setting = req.params.id;

    // Get the value from the request body
    const value = req.body.data || null;

    // Write the setting to the database
    // @ts-expect-error TS(2339): Property 'err' does not exist on type 'unknown'.
    const { err, this: that } = await writeDatabase(db, 'UPDATE settings SET ' + setting + ' = ? WHERE id = ?', [value, settingsId]);

    // If there is an error, return an error
    if (err) return res.status(500).json({ message: 'Something went wrong' });

    // Return a success message
    res.json({ message: 'Setting updated', lastId: that.lastID });
};

// Create a function that will update all the settings based on the post data
async function setSettings(req: any, res: any) {

    // Get the settings id from the request user
    const settingsId = req.user.settings_id;

    // Get the data from the request body
    const data = req.body || null;

    // Loop break
    let error = false;

    // Loop through the data
    for (const [key, value] of Object.entries(data)) {

        // Update the setting in the database
        // @ts-expect-error TS(2339): Property 'err' does not exist on type 'unknown'.
        const { err } = await writeDatabase(db, 'UPDATE settings SET ' + key + ' = ? WHERE id = ?', [value, settingsId]);

        // If there is an error, set the error to err and break the loop
        if (err) error = err;
        if (err) break;
    }

    // If there is an error, return an error
    if (error) return res.status(500).json({ message: 'Something went wrong' });

    // Return a success message
    res.json({ message: 'Settings updated' });

};


// Create a function that will get the settings from the database where the row id is 1
async function getSettings(req: any, res: any) {

    // Get the settings id from the request user
    const settingsId = req.user ? req.user.settings_id : 1;

    // BASE SETTINGS
    // Get the settings from the database where the row id is settings id
    const { err, row: settings } = await getDatabase(db, 'SELECT * FROM settings WHERE id = ' + settingsId);

    // If there is an error, return an error or if the settings do not exist, return an error
    if (err || !settings) return res.status(500).json({ message: 'Something went wrong', error: err });


    // BASE LINKS
    // Get the links from the database where the settings id is the settings id
    const { err: err2, row: links } = await getAllDatabase(db, 'SELECT * FROM links WHERE settings_id = ' + settingsId);

    // If there is an error, dont add the links to the links array
    if (!err2) settings.links = links || [];


    // BASE MESSAGE
    // Get the message from the database where the settings id is the settings id
    const { err: err3, row: message } = await getDatabase(db, 'SELECT * FROM messages WHERE settings_id = ' + settingsId);

    // If there is an error, dont add the message to the message array
    if (!err3) settings.message = message || [];


    // Return the settings
    res.json(settings);
};

// Create a function that will get the setting from the database where the row id is 1
async function getSetting(req: any, res: any) {

    // Get the settings id from the request user and the setting from the request parameters
    const settingsId = req.user ? req.user.settings_id : 1;
    const setting = req.params.id;

    // Get the setting from the database where the row id is settings id and the column name is the setting
    const { err, row } = await getDatabase(db, 'SELECT ' + setting + ' FROM settings WHERE id = ' + settingsId);

    // If there is an error, return an error or if the setting does not exist, return an error
    if (err || !row) return res.status(500).json({ message: 'Something went wrong', error: err });

    // Return the setting
    res.json(row);
};

export default { setSettings, setSetting, getSettings, getSetting };