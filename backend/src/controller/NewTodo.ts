import { badRequest } from "../helpers/httResponse";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { Controller } from "./Controller";

export class NewTodo implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredParams = ["title", "description", "done"];
    for (const param of requiredParams) {
      if (httpRequest.body[param] === undefined)
        return badRequest(`Missing param: ${param}`);
    }

    const validateFields = ["title", "description"];
    for (const param of validateFields) {
      if (!httpRequest.body[param].trim())
        return badRequest(`Invalid param: ${param}`);
    }
  }
}
