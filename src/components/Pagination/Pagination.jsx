import React from "react";
import styles from "./Pagination.module.css"; // Import styles
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, onNext, onPrev }) => {
  return (
    <div className={styles.pagination}>
      <button onClick={onPrev} disabled={currentPage === 1} className={styles.pageBtn}>
        <MdOutlineSkipPrevious/> Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={onNext} disabled={currentPage === totalPages} className={styles.pageBtn}>
        Next <MdOutlineSkipNext/>
      </button>
    </div>
  );
};

export default Pagination;
