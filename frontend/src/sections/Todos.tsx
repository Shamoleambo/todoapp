import { useState } from "react";

const Todos: React.FC = () => {
  const [todos, setTodos] = useState([]);
  return (
    <div>
      <h2>Todos</h2>
    </div>
  );
};

export default Todos;
