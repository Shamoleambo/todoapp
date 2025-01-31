import Modal from "../components/Modal";
import { Todo } from "../models/Todo";

type EditModalProps = {
  todo: Todo;
  setShowModal: (show: boolean) => void;
};

const EditModal: React.FC<EditModalProps> = ({ todo, setShowModal }) => {
  return (
    <Modal setModal={setShowModal}>
      <h3>Edit Modal: {todo.title}</h3>
    </Modal>
  );
};

export default EditModal;
