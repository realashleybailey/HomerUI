import { IsString, Length } from "class-validator";

export class ValidateGroup {
    @Length(1, 35, {
        message: 'Group name must be between 1 and 35 characters'
    })
    @IsString({
        message: 'Group name must be a string'
    })
    name: string;

    @IsString({
        message: 'Group icon must be a string'
    })
    icon: string;
}