import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "./models/Todo";
import NewTodo from "./sections/NewTodo";
import Todos from "./sections/Todos";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const backendURL =
    process.env.REACT_APP_BACKEND_URL ||
    "https://todo-backend-ag9a.onrender.com";

  const handleRequestForTodos = async () => {
    console.log(backendURL);
    const response = await axios.get(`${backendURL}/api/todos`);
    setTodos(response.data);
  };

  const handleToggleDone = async (id: string) => {
    const todo = todos.filter((todo) => todo._id === id)[0];
    await axios.put(`${backendURL}/api/todos/${id}`, {
      ...todo,
      done: !todo.done,
    });

    setTodos((prevState) =>
      prevState.map((todo) =>
        todo._id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${backendURL}/api/todos/${id}`);
    setTodos((prevState) => prevState.filter((todo) => todo._id !== id));
  };

  const handleTodoUpdate = async (
    id: string,
    title: string,
    description: string,
    done: boolean
  ) => {
    await axios.put(`${backendURL}/api/todos/${id}`, {
      title,
      description,
      done,
    });
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo._id === id ? { _id: id, title, description, done } : todo
      )
    );
  };

  useEffect(() => {
    handleRequestForTodos();
  }, []);

  return (
    <>
      <div className="container">
        <NewTodo
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          callForUpdatedTodos={handleRequestForTodos}
        />
        <hr style={{ marginTop: "3em" }} />
        <Todos
          todos={todos}
          toggleDone={handleToggleDone}
          deleteTodo={handleDelete}
          updateTodo={handleTodoUpdate}
        />
      </div>
    </>
  );
}

export default App;
