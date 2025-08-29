import React from "react";
import "./ThankYouModal.css";

const ThankYouModal = ({ show, onClose, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-icon">✓</div>
        <h2 className="modal-title">Thank You!</h2>
        <p className="modal-message">{message}</p>

        <button className="modal-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ThankYouModal;
