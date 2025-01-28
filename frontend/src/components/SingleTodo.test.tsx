import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SingleTodo from "./SingleTodo";
import { Todo } from "../models/Todo";

describe("SingleTodo Component", () => {
  const mockTodo: Todo = {
    _id: "any_id",
    title: "any_title",
    description: "any_description",
    done: false,
  };

  it("renders the todo title and description correctly", () => {
    render(<SingleTodo todo={mockTodo} done={false} />);

    expect(screen.getByText("any_title")).toBeInTheDocument();
    expect(screen.getByText("any_description")).toBeInTheDocument();
  });
});
