import { badRequest } from "../helpers/httResponse";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { Controller } from "./Controller";

export class DeleteTodo implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return badRequest(`No Todo found with id: ${httpRequest.params.id}`);
  }
}
