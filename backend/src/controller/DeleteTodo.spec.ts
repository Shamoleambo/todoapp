import { Todo } from "../models/Todo";
import { TodoRepository } from "../repositories/TodoRepository";
import { Controller } from "./Controller";
import { DeleteTodo } from "./DeleteTodo";

describe("DeleteTodo Controller", () => {
  const TODO_DUMMY = {
    _id: "valid_id",
    title: "any_title",
    description: "any_description",
    done: false,
  } as unknown as Todo;

  type SutTypes = {
    sut: Controller;
    todoRepository: TodoRepository;
  };

  const makeSut = (): SutTypes => {
    const todoRepository = {
      findById: jest.fn().mockImplementationOnce((id: string) => {
        if (id === "valid_id") return Promise.resolve(TODO_DUMMY);
        return Promise.resolve(null);
      }),
    } as unknown as TodoRepository;
    const sut = new DeleteTodo(todoRepository);
    return { sut, todoRepository };
  };

  it("should return 400 if no Todo is found with provided id", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      params: {
        id: "invalid_id",
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("No Todo found with id: invalid_id");
  });

  it("should call todoRepository findById once and with the correct param", async () => {
    const { sut, todoRepository } = makeSut();

    const findByIdSpy = jest.spyOn(todoRepository, "findById");
    const httpRequest = {
      params: {
        id: "valid_id",
      },
    };
    await sut.handle(httpRequest);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith("valid_id");
  });
});
