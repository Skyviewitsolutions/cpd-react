import React from "react";
import "./workshopCard.css";
import { generatePath } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dommy_workshopImage from "../../assets/Images/dommy_workshopImage.png";
import { BsFillCalendarDateFill } from "react-icons/bs";
import BookBtn from "../button/BookBtn/BookBtn";
import Button from "../button/Button/Button";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import DefaultImg from "../../assets/Images/default.png"

const WorkshopCard = (props) => {
  
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
        <div className="worshopCrdDtls d-flex">
          <div className="col-lg-6 col-6 ">
            <div className="workshopTitle">
              <h5>{workshop.title} </h5>
            </div>
            <div
              className="d-flex worshopBx align-items-center"
              style={{marginBottom : "17px"}}
            >
              {isPaid ? (
                <>
                  <h6 style={{ width: "25%" }}>Price</h6>:
                  <span style={{ marginLeft: "9px" }}>
                    {workshop.price} HKD / {sessionType}
                  </span>
                </>
              ) : (
                <h6>Free</h6>
              )}
            </div>
            <div className="d-flex worshopBx align-items-center enrolled">
              Enrolled ({workshop.workshop_members_count}/{workshop.max_members}
              )
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex worshopBx align-items-center">
              <h6 style = {{width : "60%"}}>Availability</h6>:
              <span
                style={{ marginLeft: "9px" }}
                onClick={() => showWorkshopOnCalendar(workshop)}
              >
                <BsFillCalendarDateFill color="#2c6959" size={17} />
              </span>
            </div>
            <div className="d-flex worshopBx align-items-center">
              <h6>Domain</h6>:
              <span
                style={{ marginLeft: "9px" }}
              >
                {domain}
              </span>
            </div>
            <div className="d-flex worshopBx align-items-center">
              <h6>Industry</h6>:
              <span
                style={{ marginLeft: "9px" }}
              >
                {industry}
              </span>
            </div>
            {showBookBtn && (
              <BookBtn
                status={enrollStatus}
                onClick={() => enrollWorkshop(workshop)}
                styles={{
                  height: "30px",
                  margin : '5px 0px'
                }}
              />
            )}
            {showEdit && (
              <div className="workshopEdit">
                <FiEdit color="#2c6959" onClick={() => handleEdit(workshop)} />
                <AiOutlineDelete
                  color="#2c6959"
                  onClick={() => deleteWorkshop(workshop._id)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopCard;
