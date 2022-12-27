import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import SupportedApps from "../supportedapps/SupportedAppsList.json";

@ValidatorConstraint({ name: 'ValidateAppID', async: false })
export class ValidateAppID implements ValidatorConstraintInterface {
    validate(appId: string, args: ValidationArguments) {
        return !!SupportedApps.apps.find(app => app.appid === appId)
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'App ID must be a valid app ID'
    }
}