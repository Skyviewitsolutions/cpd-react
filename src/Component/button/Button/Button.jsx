import React from "react";
import { Spinner } from "react-bootstrap";
import "./button.css";

const Button = (props) => {
  const { title, loading, onClick, style } = props;
  return (
    <>
      {loading ? (
        <button className="customBtn" style={style}>
          <Spinner
            animation="border"
            variant="light"
            style={{ width: "20px", height: "20px" }}
          />
        </button>
      ) : (
        <button className="customBtn" onClick={onClick} style={style}>
          {title}
        </button>
      )}
    </>
  );
};

export default Button;
