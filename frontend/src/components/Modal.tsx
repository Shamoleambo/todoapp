import { createPortal } from "react-dom";
import { ReactNode } from "react";
import classes from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
  setModal: (show: boolean) => void;
  borderColor?: string;
};

const Modal: React.FC<ModalProps> = ({
  children,
  setModal,
  borderColor = "none",
}) => {
  return createPortal(
    <>
      <div className={classes.backdrop} onClick={() => setModal(false)} />
      <div
        className={classes.container}
        style={{ border: `2px solid ${borderColor}` }}
      >
        {children}
      </div>
    </>,
    document.getElementById("modal")!
  );
};

export default Modal;
