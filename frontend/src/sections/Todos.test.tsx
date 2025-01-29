import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom";
import Todos from "./Todos";

describe("Todos component", () => {
  jest.mock("axios");
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it("fetches and display todos on mount", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
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
      ],
    });

    render(<Todos />);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:8080/api/todos"
    );

    await waitFor(() => {
      expect(screen.getByText("any_title_1")).toBeInTheDocument();
      expect(screen.getByText("any_title_2")).toBeInTheDocument();
    });
  });
});
