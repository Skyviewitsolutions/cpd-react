import React from "react";
import "./Checkbox_sidenav.css";
const Checkbox_sidenav = (props) => {
  return (
    <>
      <div className="form-check checkbox_div">
        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
        <label className="form-check-label" for="flexCheckChecked">
          {props.text}
        </label>
      </div>
    </>
  );
};

export default Checkbox_sidenav;
