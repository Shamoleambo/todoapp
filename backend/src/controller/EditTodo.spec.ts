import mongoose from "mongoose";
import { Controller } from "./Controller";
import { EditTodo } from "./EditTodo";

describe("EditTodoController", () => {
  type SutTypes = {
    sut: Controller;
  };

  const makeSut = (): SutTypes => {
    const sut = new EditTodo();
    return { sut };
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
});
