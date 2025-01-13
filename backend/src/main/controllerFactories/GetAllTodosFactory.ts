import { GetAllTodos } from "../../controller/GetAllTodos";
import { MongoTodoRepository } from "../../repositories/MongoTodoRepository";

export const makeGetAllTodos = (): GetAllTodos => {
  const todoRepository = new MongoTodoRepository();
  const getAllTodos = new GetAllTodos(todoRepository);
  return getAllTodos;
};
