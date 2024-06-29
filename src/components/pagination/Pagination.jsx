import React from "react";
import styles from "./pagination.module.css";
import { useNavigate } from "react-router-dom";

const Pagination = ({ page, hasPrev, hasNext, callback, setCallback }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => {
          navigate(`?page=${Number(page) - 1}`);
          setCallback(!callback);
        }}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={() => {
          navigate(`?page=${Number(page) + 1}`);
          setCallback(!callback);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
