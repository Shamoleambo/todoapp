import { HttpResponse } from "../protocols/http";

export const badRequest = (message: string): HttpResponse => {
  return {
    statusCode: 400,
    body: message,
  };
};
