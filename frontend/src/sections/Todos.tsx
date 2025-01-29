import SingleTodo from "../components/SingleTodo";
import { Todo } from "../models/Todo";

const Todos: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  const handleToggleDone = (id: string) => {};

  return (
    <div>
      <h2>Todos</h2>
      <>
        {todos.length !== 0 ? (
          todos.map((todo) => (
            <SingleTodo
              key={todo._id}
              todo={todo}
              done={todo.done}
              toggleDone={handleToggleDone}
            />
          ))
        ) : (
          <p>no todos available</p>
        )}
      </>
    </div>
  );
};

export default Todos;
