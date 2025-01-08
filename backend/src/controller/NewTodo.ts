import { badRequest } from "../helpers/httResponse";
import { TodoModel } from "../models/Todo";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { TodoRepository } from "../repositories/TodoRepository";
import { Controller } from "./Controller";

export class NewTodo implements Controller {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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

    const { title, description, done } = httpRequest.body;
    const todo = new TodoModel({ title, description, done });

    await this.todoRepository.save(todo);
  }
}
