import React from "react";
import "./Homepage_button.css";

const Homepage_button = (props) => {

  const {onClick} = props ;
  
  return (
    <>
      <div>
        <button
          className="view"
          style={{ borderColor: props.brColor, color: props.fontColor }}
          onClick={onClick}
        >
          {props.text}
        </button>
      </div>
    </>
  );
};

export default Homepage_button;
