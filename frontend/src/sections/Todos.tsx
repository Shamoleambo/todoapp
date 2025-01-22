import { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "../models/Todo";
import SingleTodo from "../components/SingleTodo";

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
      <>
        {todos.map((todo) => (
          <SingleTodo key={todo._id} todo={todo} />
        ))}
      </>
    </div>
  );
};

export default Todos;
