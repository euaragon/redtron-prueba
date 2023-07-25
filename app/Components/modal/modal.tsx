import React from "react";

export const Modal = ({ children, onClose}: any) => {
  return (
    <article  className="modal" onClick={()=>onClose()} >
      {children}
    </article>
  );
};
