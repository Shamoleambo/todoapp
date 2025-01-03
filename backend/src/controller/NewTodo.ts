import { HttpRequest, HttpResponse } from "../protocols/http";
import { Controller } from "./Controller";

export class NewTodo implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: "No title in this Todo",
    };
  }
}
