import { Contains, IsBoolean, IsInt, IsString, Length, Validate } from "class-validator";
import { ValidateAppID } from "../validations/AppID";
import { ValidateGroupID } from "../validations/GroupID";

export class ValidateService {
    @Length(1, 35, {
        message: 'Name must be between 1 and 35 characters'
    })
    @IsString({
        message: 'Name must be a string'
    })
    name: string;
    
    @Length(1, 35, {
        message: 'Subtitle must be between 1 and 35 characters'
    })
    @IsString({
        message: 'Subtitle must be a string'
    })
    subtitle: string;

    @IsString({
        message: 'App ID must be a string'
    })
    @Validate(ValidateAppID, {
        message: 'App ID must be a valid app ID'
    })
    appid: string;

    @IsInt({
        message: 'User ID must be an integer'
    })
    userid: number;

    @IsInt({
        message: 'Group ID must be an integer'
    })
    @Validate(ValidateGroupID, this, {
        message: 'Group ID must be a valid group ID that belongs to this user'
    })
    groupId: number;

    @IsString({
        message: 'Icon must be a string'
    })
    icon: string;

    @IsString({
        message: 'Logo url must be a string'
    })
    logo: string;

    @IsString({
        message: 'URL must be a string'
    })
    url: string;

    @IsString({
        message: 'Endpoint must be a string'
    })
    endpoint: string;

    @IsString({
        message: 'License must be a string'
    })
    license: string;

    @IsString({
        message: 'Description must be a string'
    })
    description: string;

    @IsBoolean({
        message: 'Enhanced must be a boolean'
    })
    enhanced: boolean;
    
    @IsString({
        message: 'Type must be a string'
    })
    @Contains('Custom', {
        message: 'Type must be a valid type'
    })
    type: string;

    @IsString({
        message: 'Tag must be a string'
    })
    tag: string;
}