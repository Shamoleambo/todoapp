import { useState, useEffect } from "react";
import axios from "axios";
import NewTodo from "./sections/NewTodo";
import Todos from "./sections/Todos";
import "./App.css";
import { Todo } from "./models/Todo";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleRequestForTodos = async () => {
    const response = await axios.get("http://localhost:8080/api/todos");
    setTodos(response.data);
  };

  const handleToggleDone = (id: string) => {
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo._id === id ? { ...todo, done: !todo.done } : todo
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
      <Todos todos={todos} toggleDone={handleToggleDone} />
    </>
  );
}

export default App;
