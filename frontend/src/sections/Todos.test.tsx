import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Todos from "./Todos";
import { Todo } from "../models/Todo";

describe("Todos component", () => {
  it("fetches and display todos on mount", async () => {
    const todos = [
      {
        _id: "any_id_1",
        title: "any_title_1",
        description: "any_description_1",
        done: false,
      },
      {
        _id: "any_id_2",
        title: "any_title_2",
        description: "any_description_2",
        done: false,
      },
    ];

    render(
      <Todos
        todos={todos}
        toggleDone={jest.fn()}
        deleteTodo={jest.fn()}
        updateTodo={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("any_title_1")).toBeInTheDocument();
      expect(screen.getByText("any_title_2")).toBeInTheDocument();
    });
  });

  it("displays a message when there are no todos returned from the api", async () => {
    const todos: Todo[] = [];
    render(
      <Todos
        todos={todos}
        toggleDone={jest.fn()}
        deleteTodo={jest.fn()}
        updateTodo={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("no todos available")).toBeInTheDocument();
    });
  });
});
