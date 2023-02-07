import React from "react";
import { Spinner } from "react-bootstrap";
import "./button.css";

const Button = (props) => {
  const { title, loading, onClick } = props;
  return (
    <>
      <button
        className="customBtn"
        onClick={onClick}
      >
        {loading ? (
          <Spinner
            animation="border"
            variant="light"
            style={{ width: "20px", height: "20px" }}
          />
        ) : (
           title
        )}
      </button>
    </>
  );
};

export default Button;
