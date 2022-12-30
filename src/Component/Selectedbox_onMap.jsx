import React from "react";
import "./Selectedbox_onMap.css";
import { BiFilterAlt } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import { TfiMenuAlt } from "react-icons/tfi";
import { HiOutlineGlobe } from "react-icons/hi";
import call_blue from "../assets/Images/call_blue.png";
import message_blue from "../assets/Images/message_blue.png";
import mail_blue from "../assets/Images/mail_blue.png";

const Selectedbox_onMap = () => {
  return (
    <>
      <div className="Selectedbox_onMap">
        <h5>Selected Members</h5>
        <div className="bottom_selectedbox_onMap">
          <img src={message_blue} alt="" className=""></img>
          <img src={mail_blue} alt="" className=""></img>
          <img src={call_blue} alt="" className=""></img>
        </div>
      </div>
    </>
  );
};

export default Selectedbox_onMap;
