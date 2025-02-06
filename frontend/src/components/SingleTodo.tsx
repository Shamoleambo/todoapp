import React from "react";
import { useState } from "react";
import { Check, Circle, Pencil, X } from "lucide-react";
import DeleteModal from "../modals/DeleteModal";
import { Todo } from "../models/Todo";
import styles from "./SingleTodo.module.css";
import EditModal from "../modals/EditModal";
import ErrorModal from "../modals/ErrorModal";

type TodoProps = {
  todo: Todo;
  done: boolean;
  toggleDone: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (
    id: string,
    title: string,
    description: string,
    done: boolean
  ) => void;
};

const SingleTodo: React.FC<TodoProps> = ({
  todo,
  done,
  toggleDone,
  deleteTodo,
  updateTodo,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  return (
    <>
      <div
        className={`${styles.todoContainer} ${
          done ? styles.doneContainer : ""
        }`}
      >
        <div className={styles.todoInfo}>
          <h3 className={done ? `${styles.done}` : ""}>{todo.title}</h3>
          <p className={done ? `${styles.done}` : ""}>{todo.description}</p>
        </div>
        <div className={styles.buttonsContainer}>
          <button
            type="button"
            data-testid="done"
            onClick={() => toggleDone(todo._id)}
          >
            {done ? <Circle /> : <Check />}
          </button>
          <button
            type="button"
            data-testid="edit"
            onClick={() => setShowEditModal(true)}
          >
            <Pencil />
          </button>
          <button
            type="button"
            data-testid="delete"
            onClick={() => setShowDeleteModal(true)}
          >
            <X />
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal
          deleteTodo={() => deleteTodo(todo._id)}
          setShowModal={setShowDeleteModal}
        />
      )}
      {showEditModal && (
        <EditModal
          todo={todo}
          updateTodo={updateTodo}
          setShowModal={setShowEditModal}
          setShowErrorModal={setShowErrorModal}
        />
      )}
      {showErrorModal && <ErrorModal setModal={setShowErrorModal} />}
    </>
  );
};

export default SingleTodo;
