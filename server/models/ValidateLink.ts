import { IsString, Length, Validate } from "class-validator";
import { ValidateTarget } from "../validations/Target";

export class ValidateLink {
    @Length(1, 35, {
        message: 'Name must be between 1 and 35 characters'
    })
    @IsString({
        message: 'Name must be a string'
    })
    name: string;

    @Length(1, 35, {
        message: 'Icon must be between 1 and 35 characters'
    })
    @IsString({
        message: 'Icon must be a string'
    })
    icon: string;

    @IsString({
        message: 'URL must be a string'
    })
    url: string;

    @IsString({
        message: 'Target must be a string'
    })
    @Validate(ValidateTarget, {
        message: 'Target must be a valid target'
    })
    target: string;
}