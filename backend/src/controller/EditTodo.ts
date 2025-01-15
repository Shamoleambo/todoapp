import { badRequest } from "../helpers/httResponse";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { TodoRepository } from "../repositories/TodoRepository";
import { Controller } from "./Controller";

export class EditTodo implements Controller {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.todoRepository.findById(httpRequest.params.id);

      const validateRequiredFields = ["title"];
      for (const field of validateRequiredFields) {
        if (!httpRequest.body[field])
          return badRequest(`Missing param: ${field}`);
      }

      const validatePossibleBlankFields = ["title", "description"];
      for (const field of validatePossibleBlankFields) {
        if (!httpRequest.body[field].trim())
          return badRequest(`Invalid field: ${field}`);
      }

      return badRequest(`No Todo found with id: ${httpRequest.params.id}`);
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
