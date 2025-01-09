import { badRequest, ok } from "../helpers/httResponse";
import { TodoModel } from "../models/Todo";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { TodoRepository } from "../repositories/TodoRepository";
import { Controller } from "./Controller";

export class CreateTodo implements Controller {
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

    try {
      await this.todoRepository.save(todo);
      return ok("Todo created");
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
