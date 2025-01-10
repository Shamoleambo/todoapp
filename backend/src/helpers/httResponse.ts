import { HttpResponse } from "../protocols/http";

export const badRequest = (message: string): HttpResponse => ({
  statusCode: 400,
  body: message,
});

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body,
});
