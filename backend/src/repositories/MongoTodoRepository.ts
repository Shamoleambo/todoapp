import { Document } from "mongoose";
import { Todo, TodoModel } from "../models/Todo";
import { TodoRepository } from "./TodoRepository";

export class MongoTodoRepository implements TodoRepository {
  async save(todo: Todo): Promise<Document> {
    return await TodoModel.create(todo);
  }

  async findAll(): Promise<Document[]> {
    return await TodoModel.find();
  }

  async findById(id: string): Promise<Document> {
    return await TodoModel.findById(id);
  }
}
