import { TodoModel } from "../models/Todo";
import { MongoTodoRepository } from "../repositories/MongoTodoRepository";
import { TodoRepository } from "../repositories/TodoRepository";
import { NewTodo } from "./NewTodo";

type SutTypes = {
  sut: NewTodo;
  todoRepositoryStub: TodoRepository;
};

const makeSut = (): SutTypes => {
  const todoRepositoryStub = new MongoTodoRepository();
  const sut = new NewTodo(todoRepositoryStub);
  return { sut, todoRepositoryStub };
};

describe("NewTodoController", () => {
  it("should return 400 if no title is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        description: "any_description",
        done: false,
      },
    };

    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Missing param: title");
  });

  it("should return 400 if no task description is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        title: "any_title",
        done: false,
      },
    };

    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Missing param: description");
  });

  it("should return 400 if no status of done is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description",
      },
    };

    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Missing param: done");
  });

  it("should return 400 if the title is an empty string", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        title: " ",
        description: "any_description",
        done: false,
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Invalid param: title");
  });

  it("should return 400 if the description is an empty string", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        title: "any_title",
        description: "  ",
        done: false,
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("Invalid param: description");
  });

  it("call the method to save the Todo", async () => {
    const { sut, todoRepositoryStub } = makeSut();

    const todoSaveSpy = jest.spyOn(todoRepositoryStub, "save");
    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description",
        done: false,
      },
    };
    await sut.handle(httpRequest);

    expect(todoSaveSpy).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if the db fails", async () => {
    const { sut, todoRepositoryStub } = makeSut();

    jest
      .spyOn(todoRepositoryStub, "save")
      .mockRejectedValueOnce(new Error("Server Error"));
    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description",
        done: false,
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual("Server Error");
  });

  it("should return 201 on success", async () => {
    const { sut, todoRepositoryStub } = makeSut();

    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description",
        done: false,
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toEqual(httpRequest.body.title);
    expect(response.body.description).toEqual(httpRequest.body.description);
    expect(response.body.done).toEqual(httpRequest.body.done);
  });
});
