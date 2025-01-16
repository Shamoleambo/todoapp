import { badRequest } from "../helpers/httResponse";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { TodoRepository } from "../repositories/TodoRepository";
import { Controller } from "./Controller";

export class DeleteTodo implements Controller {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    await this.todoRepository.findById(id);
    return badRequest(`No Todo found with id: ${httpRequest.params.id}`);
  }
}
