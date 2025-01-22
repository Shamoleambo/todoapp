import { Todo } from "../models/Todo";
import styles from "./SingleTodo.module.css";

type TodoProps = {
  todo: Todo;
};

const SingleTodo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoInfo}>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <button>Done</button>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default SingleTodo;
