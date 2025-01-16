import { Todo, TodoModel } from "../models/Todo";
import { TodoRepository } from "./TodoRepository";

export class MongoTodoRepository implements TodoRepository {
  async save(todo: Todo): Promise<Todo> {
    return await TodoModel.create(todo);
  }

  async findAll(): Promise<Todo[]> {
    return await TodoModel.find();
  }

  async findById(id: string): Promise<Todo> {
    return await TodoModel.findById(id);
  }
}
