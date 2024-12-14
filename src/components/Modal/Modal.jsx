import React from 'react';
import './Modal.css'; // This is for styling, you can customize it

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="close-btn" onClick={closeModal}>X</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
