import React from "react";
import "./Month_days.css";
import { BsFillCalendar2DateFill } from "react-icons/bs";

const Month_days = () => {
  return (
    <>
      <div className="Event_date">
        <BsFillCalendar2DateFill />
        <input type="date" />
      </div>
    </>
  );
};

export default Month_days;
