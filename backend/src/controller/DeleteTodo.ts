import { badRequest, ok } from "../helpers/httResponse";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { TodoRepository } from "../repositories/TodoRepository";
import { Controller } from "./Controller";

export class DeleteTodo implements Controller {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const todo = await this.todoRepository.findById(id);
      if (!todo)
        return badRequest(`No Todo found with id: ${httpRequest.params.id}`);
      return ok(`Success. Todo deleted with id: ${todo._id}`);
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
