import { badRequest } from "../helpers/httResponse";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { Controller } from "./Controller";

export class NewTodo implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredParams = ["title", "description", "done"];
    for (const param of requiredParams) {
      if (!httpRequest.body[param])
        return badRequest(`Missing param: ${param}`);
    }
  }
}
