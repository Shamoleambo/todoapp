import { HttpRequest, HttpResponse } from "../protocols/http";
import { Controller } from "./Controller";

export class EditTodo implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 400,
      body: `No Todo found with id: ${httpRequest.params.id}`,
    };
  }
}
