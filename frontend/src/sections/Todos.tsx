import SingleTodo from "../components/SingleTodo";
import { Todo } from "../models/Todo";

type TodosProps = {
  todos: Todo[];
  toggleDone: (id: string) => void;
  deleteTodo: (id: string) => void;
};

const Todos: React.FC<TodosProps> = ({ todos, toggleDone, deleteTodo }) => {
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
              toggleDone={toggleDone}
              deleteTodo={deleteTodo}
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
