import { Todo } from "../models/Todo";

export interface TodoRepository {
  save(todo: Todo): Promise<Todo>;
}
