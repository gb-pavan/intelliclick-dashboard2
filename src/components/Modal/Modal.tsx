import React,{ ReactNode } from 'react';
import './Modal.css';

interface ModalProps{
  isOpen: boolean;
  closeModal: () => void;
  children?: ReactNode;
}

const Modal = ({ isOpen, closeModal, children }:ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
