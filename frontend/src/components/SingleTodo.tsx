import { Todo } from "../models/Todo";
import styles from "./SingleTodo.module.css";

type TodoProps = {
  todo: Todo;
  done: boolean;
  toggleDone: (id: string) => void;
  deleteTodo: (id: string) => void;
};

const SingleTodo: React.FC<TodoProps> = ({
  todo,
  done,
  toggleDone,
  deleteTodo,
}) => {
  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoInfo}>
        <h3 className={done ? `${styles.done}` : ""}>{todo.title}</h3>
        <p className={done ? `${styles.done}` : ""}>{todo.description}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <button type="button" onClick={() => toggleDone(todo._id)}>
          Done
        </button>
        <button type="button">Edit</button>
        <button type="button" onClick={() => deleteTodo(todo._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleTodo;
