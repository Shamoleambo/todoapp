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

      if (!httpRequest.body.title.trim()) {
        return badRequest("Invalid field: title");
      }
      return {
        statusCode: 400,
        body: `No Todo found with id: ${httpRequest.params.id}`,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
