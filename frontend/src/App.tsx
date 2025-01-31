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

  const handleRequestForTodos = async () => {
    const response = await axios.get("http://localhost:8080/api/todos");
    setTodos(response.data);
  };

  const handleToggleDone = async (id: string) => {
    const todo = todos.filter((todo) => todo._id === id)[0];
    await axios.put(`http://localhost:8080/api/todos/${id}`, {
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
    await axios.delete(`http://localhost:8080/api/todos/${id}`);
    setTodos((prevState) => prevState.filter((todo) => todo._id !== id));
  };

  const handleTodoUpdate = async (
    id: string,
    title: string,
    description: string,
    done: boolean
  ) => {
    await axios.put(`http://localhost:8080/api/todos/${id}`, {
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
      <NewTodo
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        callForUpdatedTodos={handleRequestForTodos}
      />
      <Todos
        todos={todos}
        toggleDone={handleToggleDone}
        deleteTodo={handleDelete}
        updateTodo={handleTodoUpdate}
      />
    </>
  );
}

export default App;
