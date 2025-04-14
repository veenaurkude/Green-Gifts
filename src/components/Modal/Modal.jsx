import React, {useEffect} from "react";
import styles from "./Modal.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  // AOS Init
        useEffect(() => {
          AOS.init({
            duration: 500,
            offset: 100,
            easing: "ease-in-out",
            delay: 0,
            once: true,
          });
        }, []);

  return (
    <div className={styles.modalOverlay} data-aos="fade-up">
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;