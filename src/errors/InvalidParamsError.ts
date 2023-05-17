import { HttpStatusCode } from "axios";

interface InvalidParamsOptions {
    message?: string;
    error?: HttpStatusCode;
    invalidParams?: string[];
}

export default class InvalidParamsError extends Error {
  constructor(options: InvalidParamsOptions = {}) {
    const { message, error, invalidParams } = options || {};
    super(
      JSON.stringify({
        message: message || "There are some invalid params in the request",
        error: error || 400,
        invalidParams: invalidParams || [],
      })
    );
  }
}
