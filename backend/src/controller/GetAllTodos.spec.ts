import { MongoTodoRepository } from "../repositories/MongoTodoRepository";
import { TodoRepository } from "../repositories/TodoRepository";
import { Controller } from "./Controller";
import { GetAllTodos } from "./GetAllTodos";

type SutTypes = {
  sut: Controller;
  todoRepository: TodoRepository;
};

const makeSut = (): SutTypes => {
  const todoRepository = new MongoTodoRepository();
  const sut = new GetAllTodos(todoRepository);
  return { sut, todoRepository };
};

describe("GetAllTodos Controller", () => {
  it("should call the method findAll from the todoRepository once", async () => {
    const { sut, todoRepository } = makeSut();

    const findAllSpy = jest.spyOn(todoRepository, "findAll");
    const httpRequest = {};
    await sut.handle(httpRequest);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if db cannot be accessed", async () => {
    const { sut, todoRepository } = makeSut();

    jest
      .spyOn(todoRepository, "findAll")
      .mockRejectedValueOnce(new Error("Cannot access database"));
    const httpRequest = {};
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual("Cannot access database");
  });
});
