import { Controller } from "./Controller";
import { DeleteTodo } from "./DeleteTodo";

describe("DeleteTodo Controller", () => {
  const makeSut = (): Controller => {
    return new DeleteTodo();
  };

  it("should return 400 if no Todo is found with provided id", async () => {
    const sut = makeSut();

    const httpRequest = {
      params: {
        id: "invalid_id",
      },
    };
    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual("No Todo found with id: invalid_id");
  });
});
