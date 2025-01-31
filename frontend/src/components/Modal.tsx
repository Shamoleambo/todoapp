import { createPortal } from "react-dom";
import { ReactNode } from "react";
import classes from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
  setModal: (show: boolean) => void;
};

const Modal: React.FC<ModalProps> = ({ children, setModal }) => {
  return createPortal(
    <>
      <div className={classes.backdrop} onClick={() => setModal(false)} />
      <div className={classes.container}>{children}</div>
    </>,
    document.getElementById("modal")!
  );
};

export default Modal;
