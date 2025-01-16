import { EditTodo } from "../../controller/EditTodo";
import { MongoTodoRepository } from "../../repositories/MongoTodoRepository";

export const makeEditTodo = (): EditTodo => {
  const todoRepository = new MongoTodoRepository();
  return new EditTodo(todoRepository);
};
