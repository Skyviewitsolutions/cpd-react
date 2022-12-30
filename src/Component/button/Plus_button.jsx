import React from "react";
import "./Plus_button.css";
import { useState } from "react";
import {FaPlusCircle} from "react-icons/fa";
const Plus_button = (props) => {
  const { onClick } = props;
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
     <button className="plus_button " onClick={onClick}>
      <FaPlusCircle className="plus_button_icon"/>
      </button>
      <span className="plus_button_span   plusCommunity">{props.text}</span>
    </>
  );
};

export default Plus_button;
