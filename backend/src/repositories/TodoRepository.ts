import { Todo } from "../models/Todo";

export interface TodoRepository {
  save(todo: Todo): Promise<Todo>;
  findAll(): Promise<Todo[]>;
  findById(id: string): Promise<Todo>;
}
