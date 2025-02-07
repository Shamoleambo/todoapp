import { useState } from "react";
import { Check, X } from "lucide-react";
import Modal from "../components/Modal";
import { Todo } from "../models/Todo";
import classes from "./EditModal.module.css";
import { checkIfFormDataIsValid } from "../utils/validateForm";

type EditModalProps = {
  todo: Todo;
  updateTodo: (
    id: string,
    title: string,
    description: string,
    done: boolean
  ) => void;
  setShowModal: (show: boolean) => void;
  setShowErrorModal: (show: boolean) => void;
};

const EditModal: React.FC<EditModalProps> = ({
  todo,
  updateTodo,
  setShowModal,
  setShowErrorModal,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [done, setDone] = useState(todo.done);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validData = checkIfFormDataIsValid(title, description);
    if (validData) updateTodo(todo._id, title, description, done);
    else {
      setShowModal(false);
      setShowErrorModal(true);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <Modal setModal={setShowModal} borderColor="lightgreen">
      <div className={classes.container}>
        <h3>Edit</h3>
        <form className={classes.form}>
          <div className={classes.inputContainer}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className={classes.checkBoxContainer}>
            <label htmlFor="done">Done</label>
            <input
              type="checkbox"
              id="done"
              name="done"
              checked={done}
              onChange={() => {
                setDone((prevState) => !prevState);
              }}
            />
          </div>
          <div className={classes.buttonsContainer}>
            <button id="confirm" onClick={handleSubmit}>
              <Check />
            </button>
            <button
              className={classes.cancelButton}
              onClick={() => setShowModal(false)}
            >
              <X />
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
