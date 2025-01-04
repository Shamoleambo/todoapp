import { HttpRequest, HttpResponse } from "../protocols/http";
import { Controller } from "./Controller";

export class NewTodo implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.title) {
      return {
        statusCode: 400,
        body: "No title in this Todo",
      };
    } else if (!httpRequest.body.description) {
      return {
        statusCode: 400,
        body: "No description in the Todo",
      };
    }
  }
}
