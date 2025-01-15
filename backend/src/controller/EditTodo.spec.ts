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
      findById: jest.fn(),
    } as unknown as TodoRepository;
    const sut = new EditTodo(todoRepository);
    return { sut, todoRepository };
  };

  it("should return 400 if id is not found", async () => {
    const { sut } = makeSut();

    const invalidId = new mongoose.Types.ObjectId().toString();
    const httpRequest = {
      params: {
        id: invalidId,
      },
      body: {
        title: "any_title",
        description: "any_description",
        done: false,
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(`No Todo found with id: ${invalidId}`);
  });

  it("should return 400 if no title is provided", async () => {
    const { sut, todoRepository } = makeSut();

    jest.spyOn(todoRepository, "findById").mockResolvedValueOnce(TODO_DUMMY);
    const anyId = new mongoose.Types.ObjectId().toString();
    const httpRequest = {
      params: {
        id: anyId,
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
    const { sut, todoRepository } = makeSut();

    jest.spyOn(todoRepository, "findById").mockResolvedValueOnce(TODO_DUMMY);
    const anyId = new mongoose.Types.ObjectId().toString();
    const httpRequest = {
      params: { id: anyId },
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
    const { sut, todoRepository } = makeSut();

    jest.spyOn(todoRepository, "findById").mockResolvedValueOnce(TODO_DUMMY);
    const anyId = new mongoose.Types.ObjectId().toString();
    const httpRequest = {
      params: { id: anyId },
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
    const { sut, todoRepository } = makeSut();

    jest.spyOn(todoRepository, "findById").mockResolvedValueOnce(TODO_DUMMY);
    const anyId = new mongoose.Types.ObjectId().toString();
    const httpRequest = {
      params: { id: anyId },
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
    const { sut, todoRepository } = makeSut();

    jest.spyOn(todoRepository, "findById").mockResolvedValueOnce(TODO_DUMMY);
    const anyId = new mongoose.Types.ObjectId().toString();
    const httpRequest = {
      params: {
        id: anyId,
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
    const validId = new mongoose.Types.ObjectId().toString();
    const httpRequest = {
      params: {
        id: validId,
      },
      body: {
        title: "any_title",
        description: "any_description",
        done: false,
      },
    };
    await sut.handle(httpRequest);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith(validId);
  });

  it("should return 500 if db throws", async () => {
    const { sut, todoRepository } = makeSut();

    jest
      .spyOn(todoRepository, "findById")
      .mockRejectedValueOnce(new Error("Server error"));
    const validId = new mongoose.Types.ObjectId().toString();
    const httpRequest = {
      params: {
        id: validId,
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
});
