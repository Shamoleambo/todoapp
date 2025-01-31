import { useState } from "react";
import Modal from "../components/Modal";
import { Todo } from "../models/Todo";

type EditModalProps = {
  todo: Todo;
  setShowModal: (show: boolean) => void;
};

const EditModal: React.FC<EditModalProps> = ({ todo, setShowModal }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [done, setDone] = useState(todo.done);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <Modal setModal={setShowModal}>
      <h3>Edit</h3>
      <div className="formContainer">
        <form>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <input
            type="checkbox"
            id="done"
            name="done"
            checked={done}
            onClick={() => {
              setDone((prevState) => !prevState);
            }}
          />
          <label htmlFor="done">Done</label>
          <div className="buttonsContainer">
            <button type="submit" onClick={handleSubmit}>
              Ok
            </button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
