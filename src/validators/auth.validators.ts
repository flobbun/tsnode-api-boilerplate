import { number, object, string } from "yup";

export const UserIntegrityValidator = object().shape({
  _id: string().required(),
  email: string().email().required(),
  iat: number().required(),
  exp: number().required(),
});

export const EmailValidator = object().shape({
  email: string().email().required(),
});
