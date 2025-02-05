import { Check } from "lucide-react";
import Modal from "../components/Modal";
import classes from "./ErrorModal.module.css";

const ErrorModal: React.FC<{ setModal: (show: boolean) => void }> = ({
  setModal,
}) => {
  return (
    <Modal setModal={setModal} borderColor="red">
      <div className={classes.container}>
        <h3>Title or description of Todo are invalid</h3>
        <button onClick={() => setModal(false)}>
          <Check />
        </button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
