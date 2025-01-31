import { useState } from "react";
import DeleteModal from "../modals/DeleteModal";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
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
          <button type="button" onClick={() => setShowDeleteModal(true)}>
            Delete
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal
          deleteTodo={() => deleteTodo(todo._id)}
          setShowModal={setShowDeleteModal}
        />
      )}
    </>
  );
};

export default SingleTodo;
