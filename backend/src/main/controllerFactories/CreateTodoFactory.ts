import { CreateTodo } from "../../controller/CreateTodo";
import { MongoTodoRepository } from "../../repositories/MongoTodoRepository";

export const makeCreateTodoController = (): CreateTodo => {
  const mongoTodoRepository = new MongoTodoRepository();
  return new CreateTodo(mongoTodoRepository);
};
