import { Document } from "mongoose";
import { Todo } from "../models/Todo";
import { TodoRepository } from "./TodoRepository";

export class MongoTodoRepository implements TodoRepository {
  async save(todo: Todo): Promise<Document> {
    return null;
  }
}
