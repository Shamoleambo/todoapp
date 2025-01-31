import { createPortal } from "react-dom";
import { ReactNode } from "react";

const Modal: React.FC<{ children: ReactNode }> = ({ children }) => {
  return createPortal(
    <div className="container">{children}</div>,
    document.getElementById("modal")!
  );
};

export default Modal;
