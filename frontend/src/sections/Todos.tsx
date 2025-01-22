import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "../models/Todo";

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleRequestForTodos = async () => {
    const response = await axios.get("http://localhost:8080/api/todos");
    setTodos(response.data);
  };

  useEffect(() => {
    handleRequestForTodos();
  }, []);

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
