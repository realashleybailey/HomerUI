import chalk from "chalk";
import { ValidationError } from "class-validator";
import { Response } from "express";

const defaultError = new Error("Something went wrong");

/**
 * Generate a 500 response
 * Create a function that will generate a response for errors
 * @param res 
 * @param err 
 * @returns 
 */
const respondError = (res: Response, err?: Error | string | ValidationError[]) => {
    // Log the error
    console.error(chalk.red(err));

    // Create a variable to store the error
    let error: { message: string, errors?: ValidationError[] } = { message: 'Something went wrong' };

    // If the error is a Error, return the error
    if (err instanceof Error) error = { message: err.message };

    // If the error is a string, create a new error
    if (typeof err === 'string') error = { message: err };

    // If the error is an array of validation errors, create a new error
    if (Array.isArray(err)) error = { message: 'Validation error', errors: err };

    // Return a 500 response
    return res.status(500).json(error);
};

/**
 * Generate a 401 response
 * Create a function that will generate a response for auth errors
 * @param res 
 * @param err 
 * @returns 
 */
const respondAuthError = (res: Response, err: Error | string = defaultError) => {
    // Log the error
    console.error(chalk.red(err));

    // If the error is a string, create a new error
    if (typeof err === 'string') err = new Error(err);

    // Return a 401 response
    return res.status(401).json({ message: err.message });
}

/**
 * Generate a 400 response
 * Create a function that will generate a response for validation errors
 * @param res 
 * @param err 
 * @returns 
 */
const respondValidationError = (res: Response, err: Error | string = defaultError) => {
    // Log the error
    console.error(chalk.red(err));

    // If the error is a string, create a new error
    if (typeof err === 'string') err = new Error(err);

    // Return a 400 response
    return res.status(400).json({ message: err.message });
}

/**
 * Generate a 404 response
 * Create a function that will generate a response for not found errors
 * @param res
 * @param err
 * @returns
 */
const respondNotFoundError = (res: Response, err: Error | string = defaultError) => {
    // Log the error
    console.error(chalk.red(err));

    // If the error is a string, create a new error
    if (typeof err === 'string') err = new Error(err);

    // Return a 404 response
    return res.status(404).json({ message: err.message });
}

export { respondError, respondAuthError, respondValidationError, respondNotFoundError}