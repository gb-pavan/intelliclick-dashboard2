import React,{ ReactNode } from 'react';
import './Modal.css'; // This is for styling, you can customize it

interface ModalProps{
  isOpen: boolean;
  closeModal: () => void;
  children?: ReactNode; // ReactNode allows for any valid React child
}

const Modal = ({ isOpen, closeModal, children }:ModalProps) => {
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