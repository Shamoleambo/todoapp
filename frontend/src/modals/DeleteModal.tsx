import Modal from "../components/Modal";
import classes from "./DeleteModal.module.css";

const DeleteModal: React.FC<{ onClick: (show: boolean) => void }> = ({
  onClick,
}) => {
  return (
    <Modal>
      <div className={classes.container}>
        <h3>Are you sure you want to delete this task?</h3>
        <div className={classes.buttonsContainer}>
          <button onClick={() => onClick(false)}>Yes</button>
          <button onClick={() => onClick(false)}>No</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
