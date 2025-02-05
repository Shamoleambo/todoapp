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
  const mockToggleDone = jest.fn();

  it("renders the todo title and description correctly", () => {
    render(
      <SingleTodo
        todo={mockTodo}
        done={false}
        toggleDone={mockToggleDone}
        deleteTodo={jest.fn()}
        updateTodo={jest.fn()}
      />
    );

    expect(screen.getByText("any_title")).toBeInTheDocument();
    expect(screen.getByText("any_description")).toBeInTheDocument();
  });

  it("renders a button for done, edit and delete", () => {
    render(
      <SingleTodo
        todo={mockTodo}
        done={false}
        toggleDone={mockToggleDone}
        deleteTodo={jest.fn()}
        updateTodo={jest.fn()}
      />
    );

    const doneButton = screen.getByTestId("done");
    const editButton = screen.getByTestId("edit");
    const deleteButton = screen.getByTestId("delete");

    expect(doneButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(doneButton).toBeEnabled();
    expect(editButton).toBeEnabled();
    expect(deleteButton).toBeEnabled();
    expect(doneButton).toHaveAttribute("type", "button");
    expect(editButton).toHaveAttribute("type", "button");
    expect(deleteButton).toHaveAttribute("type", "button");
  });

  it("calls toggleTodo to update the todo in the db to set it's status to done", () => {
    render(
      <SingleTodo
        todo={mockTodo}
        done={false}
        toggleDone={mockToggleDone}
        deleteTodo={jest.fn()}
        updateTodo={jest.fn()}
      />
    );

    const doneButton = screen.getByTestId("done");
    doneButton.click();

    expect(mockToggleDone).toHaveBeenCalledTimes(1);
    expect(mockToggleDone).toHaveBeenCalledWith(mockTodo._id);
  });
});
