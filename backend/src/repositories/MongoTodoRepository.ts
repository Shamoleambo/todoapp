import { Document } from "mongoose";
import { Todo, TodoModel } from "../models/Todo";
import { TodoRepository } from "./TodoRepository";

export class MongoTodoRepository implements TodoRepository {
  async save(todo: Todo): Promise<Document> {
    return TodoModel.create(todo);
  }
}
