import React from "react";
import "./careerFareCard.css";
import DefaultImg from "../../assets/Images/default.png";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Button from "../button/Button/Button";
import { useNavigate, generatePath } from "react-router-dom";
import BookBtn from "../button/BookBtn/BookBtn";

const CareerFareCard = (props) => {
  const {
    workshop,
    showWorkshopOnCalendar,
    enrollWorkshop,
    enrollStatus,
    img,
    showBookBtn,
    imageName,
    showCoachDetails,
    showEdit,
    handleEdit,
    key,
    deleteWorkshop,
  } = props;

  const navigate = useNavigate();

  var domain = workshop?.domain?.title;
  var industry = workshop?.industry?.title;
  var isPaid = workshop?.is_paid;
  var sessionType = workshop.payment_type == 1 ? "hour" : "session";

  return (
    <div className="workshopCard">
      <div className="card" key={key}>
        <div className="workshopcard_media">
          <img
            src={imageName ? img : DefaultImg}
            alt=""
            onClick={() => showCoachDetails(workshop)}
          />
          <div className="tags_onImage">
            <h6>Workshop</h6>
          </div>
        </div>
        <div className="worshopCrdDtls ">
          <div className="col-lg-12 col-12 ">
            <div className="carerTitle">
              <h5>Software development</h5>
            </div>
            <div
              className="d-flex worshopBx align-items-center"
              style={{ marginBottom: "10px" }}
            >
              <h6>Skyview smart solution</h6>
            </div>
            <div className="d-flex worshopBx align-items-center">
              <h6 style={{width : '100px'}}>Requirement</h6>:
              <span style={{marginLeft : '12px'}}>Software ,  coding , designing </span>
            </div>
            <div className="d-flex worshopBx align-items-center">
              <h6 style={{width : '100px'}}>Sponsors</h6>:
              <span style={{marginLeft : '12px'}}>skyview , softflew , xperienceit </span>
            </div>
            <div className="d-flex worshopBx align-items-center">
              <h6  style={{width : '100px'}}>Industry</h6>:
              <span style={{ marginLeft: "12px" }}>{industry}</span>
            </div>
            {showBookBtn && (
              <BookBtn
                status={enrollStatus}
                onClick={() => enrollWorkshop(workshop)}
                styles={{
                  height: "30px",
                  margin: "5px 0px",
                }}
                title="Join Now"
              />
            )}
            {showEdit && (
              <div className="workshopEdit" style={{marginTop : "10px" , width : "50%" ,  }}>
                <FiEdit color="#2c6959" onClick={() => handleEdit(workshop)} />
                <AiOutlineDelete
                  color="#2c6959"
                  onClick={() => deleteWorkshop(workshop._id)}
                />
              </div>
            )}
          </div>
          </div>
          <div className="col-12">
            
        </div>
      </div>
    </div>
  );
};

export default CareerFareCard;
