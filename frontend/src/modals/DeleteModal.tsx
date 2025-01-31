import Modal from "../components/Modal";

const DeleteModal: React.FC<{ onClick: (show: boolean) => void }> = ({
  onClick,
}) => {
  return (
    <Modal>
      <h1>Hello Delete Modal</h1>
      <div className="confirm-buttons-container">
        <button onClick={() => onClick(false)}>Yes</button>
        <button onClick={() => onClick(false)}>No</button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
