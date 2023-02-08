import React from "react";
import "./workshopCard.css";
import { generatePath } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dommy_workshopImage from "../../assets/Images/dommy_workshopImage.png";
import { BsFillCalendarDateFill } from "react-icons/bs";
import BookBtn from "../button/BookBtn/BookBtn";

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
    key,
  } = props;

  const navigate = useNavigate();

  var domain = workshop?.domain?.title;
  var industry = workshop?.industry?.title;

  return (
    <div className="card" key={key}>
      <div className="workshopcard_media">
        <img
          src={imageName && img}
          alt=""
          onClick={() => showCoachDetails(workshop)}
        />
        <div className="tags_onImage">
          <h6>Workshop</h6>
        </div>
      </div>
      <div className="workshopcard_descriptionBox">
        <div className="d-flex justify-content-between align-items-center">
          <h4>{workshop.title}</h4>
          <h6>
            Availability : {" "}
            <span
              style={{ marginLeft: "9px" }}
              onClick={() => showWorkshopOnCalendar(workshop)}
            >
              <BsFillCalendarDateFill color="#2c6959" size={17} />
            </span>
          </h6>
        </div>

        <div className="workshop_FreeBox">
          {/* <h6>{(workshop.is_paid == 1 )? "Paid" : "Free"}</h6> */}
          <div className="viewDetailsBox"></div>
        </div>
        <div className="domainBox">
          <h6>Price : {workshop.price} $</h6>
          <div>
            <h6>Domain : {domain}</h6>
            <h6>Industry : {industry}</h6>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h6 id="enrolled col-7">
            Currently Enrolled ({workshop.workshop_members_count}/
            {workshop.max_members})
          </h6>
          <div className="col-5">
            {showBookBtn && (
              <BookBtn
                status={enrollStatus}
                onClick={() => enrollWorkshop(workshop)}
                styles={{
                  height: "30px",
                  paddingTop: "2px",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopCard;
