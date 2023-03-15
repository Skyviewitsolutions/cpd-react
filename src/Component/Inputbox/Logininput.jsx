import React from "react";
import "./Logininput.css";

const Logininput = (props) => {
  const { value, setValue } = props;
  return (
    <>
      <div className="inputf">
        <div id="iicon">{props.licon}</div>
        <div id="itext">
          <input
            type={props.type}
            placeholder={props.place}
            value={value}
            onChange={setValue}
            autoComplete="off"
          ></input>
        </div>
        <div id="ipass">{props.ricon}</div>
      </div>
    </>
  );
};

export default Logininput;
