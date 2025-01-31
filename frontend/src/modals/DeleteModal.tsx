import Modal from "../components/Modal";
import classes from "./DeleteModal.module.css";

const DeleteModal: React.FC<{
  deleteTodo: () => void;
  setShowModal: (show: boolean) => void;
}> = ({ deleteTodo, setShowModal }) => {
  const handleDelete = () => {
    deleteTodo();
    setShowModal(false);
  };

  return (
    <Modal setModal={setShowModal}>
      <div className={classes.container}>
        <h3>Are you sure you want to delete this task?</h3>
        <div className={classes.buttonsContainer}>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setShowModal(false)}>No</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
