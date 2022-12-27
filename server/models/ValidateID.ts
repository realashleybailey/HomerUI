import { IsInt } from "class-validator";

export class ValidateID {
    @IsInt({
        message: 'ID must be an integer'
    })
    id: number;
}