import { ok } from "../helpers/httResponse";
import { Todo } from "../models/Todo";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { TodoRepository } from "../repositories/TodoRepository";
import { Controller } from "./Controller";

export class GetAllTodos implements Controller {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const todos = await this.todoRepository.findAll();
      return ok(todos);
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
