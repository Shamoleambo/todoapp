import { Todo } from "../models/Todo";
import styles from "./SingleTodo.module.css";

type TodoProps = {
  todo: Todo;
  done: boolean;
};

const SingleTodo: React.FC<TodoProps> = ({ todo, done }) => {
  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoInfo}>
        <h3 className={done ? `${styles.done}` : ""}>{todo.title}</h3>
        <p className={done ? `${styles.done}` : ""}>{todo.description}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <button>Done</button>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default SingleTodo;
