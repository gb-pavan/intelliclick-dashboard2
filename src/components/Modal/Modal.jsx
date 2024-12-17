import React from 'react';
import './Modal.css'; // This is for styling, you can customize it

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={(e) => {
            e.stopPropagation(); // Stop event from bubbling to the overlay
            closeModal();
          }}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
