import { createPortal } from "react-dom";
import { ReactNode } from "react";
import classes from "./Modal.module.css";

const Modal: React.FC<{
  children: ReactNode;
  setModal: (show: boolean) => void;
}> = ({ children, setModal }) => {
  return createPortal(
    <>
      <div className={classes.backdrop} onClick={() => setModal(false)} />
      <div className={classes.container}>{children}</div>
    </>,
    document.getElementById("modal")!
  );
};

export default Modal;
