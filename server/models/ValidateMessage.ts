import { IsBoolean, IsString, Length } from "class-validator";

export class ValidateMessage {
    @Length(1, 35, {
        message: 'Title must be between 1 and 35 characters'
    })
    @IsString({
        message: 'Title must be a string'
    })
    title: string;

    @Length(1, 65, {
        message: 'Content must be between 1 and 65 characters'
    })
    @IsString({
        message: 'Content must be a string'
    })
    content: string;

    @IsString({
        message: 'Style must be a string'
    })
    style: string;

    @IsBoolean({
        message: 'Disabled must be a boolean'
    })
    disabled: boolean;
}