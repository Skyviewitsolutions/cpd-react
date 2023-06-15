import React from "react";
import "./careerFareCard.css";
import DefaultImg from "../../assets/Images/default.png";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Button from "../button/Button/Button";
import { useNavigate, generatePath } from "react-router-dom";
import BookBtn from "../button/BookBtn/BookBtn";
import { endpoints } from "../services/endpoints";
import axios from "axios";
import { useState } from "react";

const CareerFareCard = (props) => {
  let {
    data,
    showWorkshopOnCalendar,
    enrollIncubation,
    enrollStatus,
    img,
    showBookBtn,
    imageName,
    showIncubationDetails,
    showEdit,
    handleEdit,
    key,
    deleteIncubation,
    onUnjoinHandler,
  } = props;

  return (
    <div className="workshopCard">
      <div className="card" key={key}>
        <div className="workshopcard_media">
          <img src={img ? img : DefaultImg} alt="" onClick={() => showIncubationDetails(data)} />
          <div className="tags_onImage">
            <h6>Incubation</h6>
          </div>
        </div>
        <div className="worshopCrdDtls ">
          <div className="col-lg-12 col-12 ">
            <div className="carerTitle">
              <h5>{data.title}</h5>
            </div>
            <div className="d-flex worshopBx align-items-center" style={{ marginBottom: "10px" }}>
              <h6>{data.company}</h6>
            </div>
            <div className="d-flex worshopBx align-items-center">
              <h6 style={{ width: "100px" }}>Partners</h6>:
              <span style={{ marginLeft: "12px" }}>
                {data?.partners?.map((item, index) => {
                  return item + `${index !== data.partners.length - 1 ? ", " : ""}`;
                })}
              </span>
            </div>
            <div className="d-flex worshopBx align-items-center">
              <h6 style={{ width: "100px" }}>Sponsors</h6>:
              <span style={{ marginLeft: "12px" }}>
                {data?.sponsers?.map((item, index) => {
                  return item + `${index !== data.sponsers.length - 1 ? ", " : ""}`;
                })}
              </span>
            </div>
            <div className="d-flex worshopBx align-items-center">
              <h6 style={{ width: "100px" }}>Industry</h6>:<span style={{ marginLeft: "12px" }}>{data?.industry?.title}</span>
            </div>
            {showBookBtn && (
              <BookBtn
                status={enrollStatus}
                onUnjoinHandler={onUnjoinHandler}
                onClick={() => enrollIncubation(data)}
                styles={{
                  height: "30px",
                  margin: "5px 0px",
                }}
                title="Join Now"
              />
            )}
            {showEdit && (
              <div className="workshopEdit" style={{ marginTop: "10px", width: "50%" }}>
                <FiEdit color="#2c6959" onClick={() => handleEdit(data)} />
                <AiOutlineDelete color="#2c6959" onClick={() => deleteIncubation(data._id)} />
              </div>
            )}
          </div>
        </div>
        <div className="col-12"></div>
      </div>
    </div>
  );
};

export default CareerFareCard;
