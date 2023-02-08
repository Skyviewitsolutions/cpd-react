import React from "react";
import "./coachingCard.css";
import BookBtn from "../button/BookBtn/BookBtn";
import { BsFillCalendarDateFill } from "react-icons/bs";

const CoachingCard = (props) => {

  const {
    coaching,
    key,
    image,
    imageName,
    bookingStatus,
    bookCoaches,
    showWorkshopOnCalendar,
  } = props;


  var domain = coaching?.domain?.title;
  var industry = coaching?.industry?.title;

  return (
    <div className="card" key={key}>
      <div className="workshopcard_media">
        <img src={imageName && image} alt="" />
      </div>
      <div className="coachesDetailslistcard_descriptionBox">
        

        <div className="">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4>{coaching.title}</h4>
            <h6>
              Availability :{" "}
              <span
                style={{ marginLeft: "9px" }}
                onClick={() => showWorkshopOnCalendar(coaching)}
              >
                <BsFillCalendarDateFill color="#2c6959" size={17} />
              </span>
            </h6>
          </div>
        </div>

        <div className="domainBox d-flex justify-content-between">
          <h6>{coaching.is_paid == 1 ? `$ ${coaching.price}` : "Free"}</h6>
          <div>
            <h6>
              <span> Domain </span> : <span> {domain} </span>
            </h6>
            <h6>
              <span></span>Industry : <span> {industry} </span>
            </h6>
          </div>
        </div>
        <div className="domainBox">
          <div className="row">
            <div className="col-lg-7 col-md-8 col-12">
              <h6 id="enrolled">
                Total Enrolled ({coaching.coaching_members_count})
              </h6>
            </div>
            <div className="col-lg-5 col-md-4 col-12">
              <div className="">
                <BookBtn
                  status={bookingStatus}
                  styles={{
                    height: "30px",
                    paddingTop: "2px",
                  }}
                  onClick={() =>bookCoaches(coaching)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingCard;
