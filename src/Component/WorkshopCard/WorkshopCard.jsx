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
    <div className="workshopCard">
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
{/* <div className="workshopcard_descriptionBox">
  <div className="col-lg-12 col-md-12 col-12">
    <h5>{workshop.title} </h5>
    </div>
    <div className="row">
    <div className="col-lg-6 col-md-6 col-6">
      <div className="workshopCardAvail">
<h6>Availability </h6> <h5
              style={{ marginLeft: "9px" }}
              onClick={() => showWorkshopOnCalendar(workshop)}
            >: 
              <BsFillCalendarDateFill color="#2c6959" size={17} />
            </h5>

            </div>

    </div>
    <div className="col-lg-6 col-md-6 col-6">
    <div className="workshopCardAvail">
    <h6>Price  </h6><h5> : ${workshop.price}</h5>
    </div>
    <div className="workshopCardAvail">
    <h6>Domain </h6><h5>: {domain}</h5>
    </div>
    
<h6>Industry </h6><h5>: {industry}</h5>


    </div>
    </div>
   <div className="row">
    <div className="col-lg-6 col-md-6 col-12">
    <h6 id="enrolled ">
            Currently Enrolled ({workshop.workshop_members_count}/
            {workshop.max_members})
          </h6>
    </div>
    <div className="col-lg-6 col-md-6 col-12">
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
  
</div> */}




    </div>
    </div>
  );
};

export default WorkshopCard;
