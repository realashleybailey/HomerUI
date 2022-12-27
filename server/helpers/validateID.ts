import { validate } from 'class-validator';
import { ValidateID as ValID } from '../models/ValidateID';

const ValidateID = async (id: string) => {
    // Conver the string to a number
    let idINT = parseInt(id);
    
    // Get the service id from the request params
    const idValidate = new ValID();
    idValidate.id = idINT as any;

    // Validate the service id
    const errors = await validate(idValidate);

    // If there is an error, return an error or if the service id does not exist, return an empty null
    if (errors.length > 0) return { err: errors, id: null };
    
    // Return the service id
    return { err: undefined, id: idINT };
}

export { ValidateID };