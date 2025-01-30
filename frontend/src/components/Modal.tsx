import { ReactNode } from "react";

const Modal: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Modal;
