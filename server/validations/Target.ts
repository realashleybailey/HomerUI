import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'ValidateTarget', async: false })
export class ValidateTarget implements ValidatorConstraintInterface {
    validate(target: string, args: ValidationArguments) {
        const targets = ['_blank', '_self', '_parent', '_top']
        return !!targets.find(t => t === target)
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'App ID must be a valid app ID'
    }
}