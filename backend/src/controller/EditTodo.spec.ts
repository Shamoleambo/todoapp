import mongoose from "mongoose";
import { TodoRepository } from "../repositories/TodoRepository";
import { Controller } from "./Controller";
import { EditTodo } from "./EditTodo";
import { Todo, TodoModel } from "../models/Todo";

describe("EditTodoController", () => {
  const TODO_DUMMY = {
    _id: "any_id",
    title: "any_title",
    description: "any_description",
    done: false,
  } as unknown as mongoose.Document<any, any, Todo>;

  type SutTypes = {
    sut: Controller;
    todoRepository: TodoRepository;
  };

  const makeSut = (): SutTypes => {
    const todoRepository = {
      findById: jest.fn((id: string) => {
        if (id === "valid_id") return Promise.resolve(TODO_DUMMY);
        return Promise.resolve(null);
      }),
    } as unknown as TodoRepository;
    const sut = new EditTodo(todoRepository);
    return { sut, todoRepository };
  };

  it("should return 400 if id is not found", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      params: {
        id: "invalid_id",
      },
      body: {
        title: "any_title",
        description: "any_description",
        done: false,
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(`No Todo found with id: invalid_id`);
  });

  it("should return 400 if no title is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      params: {
        id: "valid_id",
      },
      body: {
        description: "any_description",
        done: false,
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(`Missing param: title`);
  });

  it("should return 400 if no description is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      params: { id: "valid_id" },
      body: {
        title: "any_title",
        done: false,
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Missing param: description");
  });

  it("should return 400 if no done field is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      params: { id: "valid_id" },
      body: {
        title: "any_title",
        description: "any_description",
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Missing param: done");
  });

  it("should return 400 if the title is blank space string", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      params: { id: "valid_id" },
      body: {
        title: "   ",
        description: "any_description",
        done: false,
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Invalid field: title");
  });

  it("should return 400 if the description is a blank space string", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      params: {
        id: "valid_id",
      },
      body: {
        title: "any_title",
        description: "   ",
        done: false,
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Invalid field: description");
  });

  it("should call todoRepository findById and call it with correct id", async () => {
    const { sut, todoRepository } = makeSut();

    const findByIdSpy = jest.spyOn(todoRepository, "findById");
    const httpRequest = {
      params: {
        id: "valid_id",
      },
      body: {
        title: "any_title",
        description: "any_description",
        done: false,
      },
    };
    await sut.handle(httpRequest);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith("valid_id");
  });

  it("should return 500 if db throws", async () => {
    const { sut, todoRepository } = makeSut();

    jest
      .spyOn(todoRepository, "findById")
      .mockRejectedValueOnce(new Error("Server error"));
    const httpRequest = {
      params: {
        id: "valid_id",
      },
      body: {
        title: "any_title",
        description: "any_description",
        done: false,
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual("Server error");
  });

  it("should save the updated todo", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      params: {
        id: "valid_id",
      },
      body: {
        title: "new_title",
        description: "new_description",
        done: true,
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      _id: "any_id",
      title: "new_title",
      description: "new_description",
      done: true,
    });
  });
});
