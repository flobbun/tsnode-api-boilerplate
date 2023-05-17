import { ObjectSchema } from "yup";
import InvalidParamsError from "../../errors/InvalidParamsError";
import { UserIntegrityValidator } from "../../validators/auth.validators";

type Target = "body" | "params" | "query";

export function ValidateRequest(schema: ObjectSchema<any>, t: Target = "body") {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    descriptor.value = function () {
      const isValid = schema.isValidSync(arguments[0][t], {
        abortEarly: false,
      });

      if (!isValid) {
        throw new InvalidParamsError();
      }

      return method.apply(this, arguments);
    };
  };
}

export function ValidateUserIntegrity() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    descriptor.value = function () {
      const { user } = arguments[0].body || {};
      if (!user || !user?._id) {
        throw new InvalidParamsError();
      }

      const isValid = UserIntegrityValidator.isValidSync(user, {
        abortEarly: false,
      });

      if (!isValid) {
        throw new InvalidParamsError();
      }

      return method.apply(this, arguments);
    };
  };
}