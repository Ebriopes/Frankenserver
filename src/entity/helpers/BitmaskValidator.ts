import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class HasOnlyOneBitConstraint implements ValidatorConstraintInterface {
  validate(bit: number, args: ValidationArguments) {
    let base = bit;

    while (base) {
      if ((base & 1) === 1) return base >> 1 === 0;

      base >>= 1;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `${args.value} is not a equal to 2^n, to some n`;
  }
}

export function BitmaskUniqueValue(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validationOptions,
      validator: HasOnlyOneBitConstraint,
      constraints: [],
    });
  };
}
