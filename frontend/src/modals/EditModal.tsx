import Modal from "../components/Modal";
import { Todo } from "../models/Todo";

type EditModalProps = {
  todo: Todo;
  setShowModal: (show: boolean) => void;
};

const EditModal: React.FC<EditModalProps> = ({ todo, setShowModal }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Modal setModal={setShowModal}>
      <h3>Edit</h3>
      <div className="formContainer">
        <form>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={todo.title} />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={todo.description}
          />
          <input type="checkbox" id="done" name="done" checked={todo.done} />
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
