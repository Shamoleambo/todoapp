import Modal from "../components/Modal";

const ErrorModal: React.FC<{ setModal: (show: boolean) => void }> = ({
  setModal,
}) => {
  return (
    <Modal setModal={setModal} borderColor="red">
      <div style={{ backgroundColor: "white" }}>
        <h3 style={{ margin: 0 }}>Title or description of Todo are invalid</h3>
        <button onClick={() => setModal(false)}>Ok</button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
