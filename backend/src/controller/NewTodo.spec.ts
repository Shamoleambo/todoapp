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
});
