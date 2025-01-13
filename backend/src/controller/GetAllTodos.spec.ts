import { Todo } from "../models/Todo";
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

const TODOS_DUMMY: Partial<Todo>[] = [
  {
    _id: "any_id_1",
    title: "first_todo",
    description: "_first_todo",
    done: false,
  },
  {
    _id: "any_id_1",
    title: "second_todo",
    description: "second_todo",
    done: false,
  },
];

describe("GetAllTodos Controller", () => {
  it("should call the method findAll from the todoRepository once", async () => {
    const { sut, todoRepository } = makeSut();

    const findAllSpy = jest.spyOn(todoRepository, "findAll");
    const httpRequest = {};
    await sut.handle(httpRequest);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
  }, 15000);

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

  it("should return all todos on 200", async () => {
    const { sut, todoRepository } = makeSut();

    jest
      .spyOn(todoRepository, "findAll")
      .mockResolvedValueOnce(TODOS_DUMMY as Todo[]);
    const httpRequest = {};
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(TODOS_DUMMY);
  });
});
