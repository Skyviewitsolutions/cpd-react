import React from "react";
import "./bookBtn.css";

const BookBtn = (props) => {

    const { onClick, status , styles  } = props;

  return (
    <>
      {status == 3 && (
        <button className="bookBtn" onClick={onClick} style={{...styles}}>
          Book Now
        </button>
      )}
      {status == 1 && (
        <button className="bookBtn" style={{background : "#bfc756" , ...styles}}>
          Pending
        </button>
      )}
      {status == 2 && (
        <button className="bookBtn" style={{background : "#79da83" , ...styles}}>
          Confirmed
        </button>
      )}
      {status == 0 && (
        <button className="bookBtn" style={{background : "#f5474a"  , ...styles}}>
          Cancelled
        </button>
      )}
    </>
  );
};

export default BookBtn;
