import { DeleteTodo } from "../../controller/DeleteTodo";
import { MongoTodoRepository } from "../../repositories/MongoTodoRepository";

export const makeDeleteTodo = (): DeleteTodo => {
  const todoRepository = new MongoTodoRepository();
  const deleteTodo = new DeleteTodo(todoRepository);
  return deleteTodo;
};
