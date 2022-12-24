import db from "../../db/connect.js";
import { getDatabase } from "../../helpers/database.js";

const service = async (data) => {

    // Get the id from the data
    const { id } = data;

    // // Get the appid for the service from the database where the query id is the service id
    // const { err: err1, row: service } = await getDatabase(db, 'SELECT * FROM services WHERE id = ' + id);

    // // If there is an error, ignore
    // if (err1) return;

    // Create a room for the service
    socket.join(service.id);
};

export default service;