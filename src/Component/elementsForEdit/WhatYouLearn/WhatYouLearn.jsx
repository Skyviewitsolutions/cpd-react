// here we are going to manage the edition part of what you learn;
import React, { useState, useEffect, useRef, useMemo } from "react";
import "./whatYouLearn.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from "../../../Component/button/Button/Button";
import Star from "../../../assets/Icons/star.png";
import { BsPlusCircleFill } from "react-icons/bs";
import "../../../Screen/WorkshopEdit/workshopEdit.css";
import { IoMdCloseCircleOutline } from "react-icons/io";


const WhatYouLearn = (props) => {

  const editor = useRef(null);
  const {
    showWhatYouLearn,
    setShowWhatYouLearn,
    whatYouLearnPoints,
    setWhatYouLearnPoints,
  } = props;

  const [points, setPoinst] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleUpdate = () => {
    setWhatYouLearnPoints(points)
    setShowWhatYouLearn(false);
    setInputValue("")
  };

  const handleAdd = () => {
    setPoinst((item) => {
      return [...item, inputValue];
    });
    setInputValue("");
  };

  const handleRemove = (index) => {
    const filteredPoints = points.filter((item, ind) => {
      return ind !== index;
    });
    setPoinst(filteredPoints);
  };

useEffect(() =>{
  setPoinst(whatYouLearnPoints)
},[whatYouLearnPoints])

  return (
    <Modal show={showWhatYouLearn} size="lg">
      <div className="whlearn">
        <div className="dmInEdHeader">
          <h4>What you'll learn </h4>
          <AiOutlineCloseCircle
            color="white"
            size={25}
            onClick={() => setShowWhatYouLearn(false)}
          />
        </div>
        <div className="learnInput">
          <label htmlFor="">Topics</label>
          <div style={{ width: "100%" }} className="d-flex align-items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter topics here"
            />
            <BsPlusCircleFill
              size={28}
              color="var(--primary)"
              onClick={handleAdd}
            />
          </div>
        </div>

        <div className="learnPpp">
          {points.map((point, index) => {
            return (
              <div className="learnPPP" key={index}>
                <h6>
                  <img src={Star} alt="" />
                  {point}
                </h6>
                <IoMdCloseCircleOutline
                  color="var(--primary)"
                  size={23}
                  onClick={() => handleRemove(index)}
                />
              </div>
            );
          })}
        </div>
        <div
          className="d-flex justify-content-center "
          style={{ marginBottom: "20px" }}
        >
          <Button title="Update" onClick={handleUpdate} />
        </div>
      </div>
    </Modal>
  );
};

export default WhatYouLearn;
