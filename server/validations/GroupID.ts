import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getDatabase } from "../helpers/database";
import db from "../db/connect";

@ValidatorConstraint({ name: 'ValidateGroupID', async: true })
export class ValidateGroupID implements ValidatorConstraintInterface {
    validate(groupID: string, args: ValidationArguments) {
        return new Promise(async (resolve) => {
            const { err, row } = await getDatabase(db, 'SELECT * FROM groups WHERE id = ? AND user_id = ?', [groupID, (args.object as any).userid]);
            if (err) resolve(false);
            resolve(!!row);
        }) as Promise<boolean>;
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Group ID must be a valid group ID that belongs to this user'
    }
}