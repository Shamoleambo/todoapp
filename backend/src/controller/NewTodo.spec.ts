import { NewTodo } from "./NewTodo";

describe("NewTodoController", () => {
  it("should return 400 if no title is provided", () => {
    const sut = new NewTodo();

    const httpRequest = {
      body: {
        description: "any_description",
        done: false,
      },
    };

    const response = sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("No title in this Todo");
  });

  it("should return 400 if no task description is provided", () => {
    const sut = new NewTodo();

    const httpRequest = {
      body: {
        title: "any_title",
        done: false,
      },
    };

    const response = sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("No description in the Todo");
  });

  it("should return 400 if no status of done is provided", () => {
    const sut = new NewTodo();

    const httpRequest = {
      body: {
        title: "any_title",
        description: "any_description",
      },
    };

    const response = sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("No status of done provided");
  });
});
