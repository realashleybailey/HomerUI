import db from "../db/connect";
import { Request, Response } from "express";
import { getDatabase, getAllDatabase, writeDatabase } from "../helpers/database";
import { respondAuthError, respondError, respondNotFoundError } from "../helpers/errors";
import { validate } from "class-validator";
import { ValidateService } from "../models/ValidateService";
import { ValidateID } from "../helpers/validateID";

/**
 * Get all the services from the database
 * @param req 
 * @param res 
 * @returns 
 */
const getServices = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get all the services from the database where the user id is the user id
    const { err, row: services } = await getAllDatabase(db, 'SELECT * FROM services WHERE user_id = ? ORDER BY position', [userId]);

    // If there is an error, return an error or if the services do not exist, return an empty null
    if (err) return respondError(res, err);

    // Remove the username and password from the services
    services.forEach((service: any) => {
        delete service.username;
        delete service.password;
    });

    // Return the services
    res.json(services);
};

/**
 * Get a service from the database
 * @param req
 * @param res
 * @returns
 */
const getService = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get the service id from the request params
    const { err, id } = await ValidateID(req.params.id);

    // If there is an error, return an error or if the service id does not exist, return an empty null
    if (err) return respondError(res, err);

    // Get the service from the database where the user id is the user id and the service id is the service id
    const { err: err2, row: service } = await getDatabase(db, 'SELECT * FROM services WHERE user_id = ? AND id = ?', [userId, id]);

    // If there is an error, return an error or if the service does not exist, return an empty null
    if (err2) return respondError(res, err);

    // If the service does not exist, return an error
    if (!service) return respondNotFoundError(res);

    // Remove the username and password from the service
    delete service.username;
    delete service.password;

    // Return the service
    res.json(service);
};

/**
 * Create a new service in the database
 * @param req
 * @param res
 * @returns
 */
const postService = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get the service from the request body
    const service = req.body;

    // Create a new ValidateService object
    let serviceValidate = new ValidateService();

    // Set the properties of the ValidateService object
    serviceValidate.userid = userId;
    serviceValidate.groupId = service.groupId;
    serviceValidate.name = service.name;
    serviceValidate.subtitle = service.subtitle;
    serviceValidate.appid = service.appid;
    serviceValidate.icon = service.icon || '';
    serviceValidate.logo = service.logo || '';
    serviceValidate.url = service.url;
    serviceValidate.endpoint = service.endpoint || '';
    serviceValidate.license = service.license || '';
    serviceValidate.description = service.description || '';
    serviceValidate.enhanced = service.enhanced || false;
    serviceValidate.type = service.type || 'web';
    serviceValidate.tag = service.tag || '';

    // Validate the service
    const errors = await validate(serviceValidate);
    if (errors.length > 0) return respondError(res, errors);

    // Insert the service into the database
    const { err, result } = await writeDatabase(db, 'INSERT INTO services (user_id, group_id, name, subtitle, appid, icon, logo, url, endpoint, license, description, enhanced, type, tag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userId, serviceValidate.groupId, serviceValidate.name, serviceValidate.subtitle, serviceValidate.appid, serviceValidate.icon, serviceValidate.logo, serviceValidate.url, serviceValidate.endpoint, serviceValidate.license, serviceValidate.description, serviceValidate.enhanced, serviceValidate.type, serviceValidate.tag]);

    // If there is an error, return an error
    if (err) return respondError(res, err);

    // Return the result
    res.json(result)
};

/**
 * Update a service in the database
 * @param req
 * @param res
 * @returns
 */
const putService = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get the service id from the request params
    const { err, id } = await ValidateID(req.params.id);

    // If there is an error, return an error
    if (err) return respondError(res, err);

    // Get the service from the database where the user id is the user id and the service id is the service id
    const { err: err2, row: oldService } = await getDatabase(db, 'SELECT * FROM services WHERE user_id = ? AND id = ?', [userId, id]);

    // If there is an error, return an error
    if (err2) return respondError(res, err);

    // If the service does not exist, return an error
    if (!oldService) return respondNotFoundError(res);

    // Get the service from the request body
    const service = req.body;

    // Merge the old service with the new service
    const newService = { ...oldService, ...service };

    // Create a new ValidateService object
    let serviceValidate = new ValidateService();

    // Set the properties of the ValidateService object
    serviceValidate.userid = userId;
    serviceValidate.groupId = newService.groupId;
    serviceValidate.name = newService.name;
    serviceValidate.subtitle = newService.subtitle;
    serviceValidate.appid = newService.appid;
    serviceValidate.icon = newService.icon || '';
    serviceValidate.logo = newService.logo || '';
    serviceValidate.url = newService.url;
    serviceValidate.endpoint = newService.endpoint || '';
    serviceValidate.license = newService.license || '';
    serviceValidate.description = newService.description || '';
    serviceValidate.enhanced = newService.enhanced || false;
    serviceValidate.type = newService.type || 'web';
    serviceValidate.tag = newService.tag || '';

    // Validate the service
    const errors = await validate(serviceValidate);

    if (errors.length > 0) return respondError(res, errors);

    // Update the service in the database
    const { err: err3, result } = await writeDatabase(db, 'UPDATE services SET group_id = ?, name = ?, subtitle = ?, appid = ?, icon = ?, url = ?, endpoint = ?, license = ?, description = ?, enhanced = ?, type = ?, tag = ? WHERE user_id = ? AND id = ?', [service.groupId, service.name, service.subtitle, service.appid, service.icon, service.url, service.endpoint, service.license, service.description, service.enhanced, service.type, service.tag, userId, id]);

    // If there is an error, return an error
    if (err3) return respondError(res, err);

    // Return the result
    res.json(result)
};

/**
 * Delete a service from the database
 * @param req
 * @param res
 * @returns
 */
const deleteService = async (req: Request, res: Response) => {
    // Get the user id from the request user
    const userId = (req as any).user.id;
    if (!userId) return respondAuthError(res);

    // Get the service id from the request params
    const { err, id } = await ValidateID(req.params.id);

    // If there is an error, return an error or if the service id does not exist, return an empty null
    if (err) return respondError(res, err);

    // Delete the service from the database where the user id is the user id and the service id is the service id
    const { err: err2 } = await writeDatabase(db, 'DELETE FROM services WHERE user_id = ? AND id = ?', [userId, id]);

    // If there is an error, return an error
    if (err2) return respondError(res, err);

    // Return a success message
    res.json({ message: 'Service deleted' })
};

export { getServices, getService, postService, putService, deleteService }