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
    showCoachingDetails,
  } = props;

  var domain = coaching?.domain?.title;
  var industry = coaching?.industry?.title;

  const isPaid = coaching.is_paid;
  const sessionType = coaching.payment_type == 1 ? "hour" : "session"

  return (
    // <div className="card" key={key}>
    //   <div className="workshopcard_media"  onClick={() =>showCoachingDetails(coaching)}>
    //     <img src={imageName && image} alt="" />
    //   </div>
    //   <div className="coachesDetailslistcard_descriptionBox">
    //     <div className="">
    //       <div className="d-flex justify-content-between align-items-center mb-2">
    //         <h4>{coaching.title}</h4>
    //         <h6>
    //           Availability :{" "}
    //           <span
    //             style={{ marginLeft: "9px" }}
    //             onClick={() => showWorkshopOnCalendar(coaching)}
    //           >
    //             <BsFillCalendarDateFill color="#2c6959" size={17} />
    //           </span>
    //         </h6>
    //       </div>
    //     </div>

    //     <div className="domainBox d-flex justify-content-between">
    //       <h6>{coaching.is_paid == 1 ? `$ ${coaching.price}` : "Free"}</h6>
    //       <div>
    //         <h6>
    //           <span> Domain </span> : <span> {domain} </span>
    //         </h6>
    //         <h6>
    //           <span></span>Industry : <span> {industry} </span>
    //         </h6>
    //       </div>
    //     </div>
    //     <div className="domainBox">
    //       <div className="row">
    //         <div className="col-lg-6 col-md-6 col-12">
    //           <h6 id="enrolled">
    //             Total Enrolled ({coaching.coaching_members_count})
    //           </h6>
    //         </div>
    //         <div className="col-lg-6 col-md-6 col-12">

    //             <BookBtn
    //               status={bookingStatus}
    //               styles={{
    //                 height: "30px",
    //               }}
    //               onClick={() =>bookCoaches(coaching)}
    //             />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="workshopCard">
      <div className="card" key={key}>
        <div
          className="workshopcard_media"
          onClick={() => showCoachingDetails(coaching)}
        >
          <img src={imageName && image} alt="" />
        </div>
        <div className="worshopCrdDtls d-flex">
          <div className="col-lg-6 col-6 ">
            <div className="workshopTitle">
              <h5>{coaching.title} </h5>
            </div>
            <div
              className="d-flex worshopBx align-items-center"
              style={{ marginBottom: "17px" }}
            >
              {isPaid ? (
                <>
                  <h6 style={{ width: "25%" }}>Price</h6>:
                  <span style={{ marginLeft: "9px" , width : '70%' }}>
                    {coaching.price} $ / {sessionType}
                  </span>
                </>
              ) : (
                <h6>Free</h6>
              )}
            </div>
            <div className="d-flex worshopBx align-items-center enrolled">
              Enrolled ({coaching.coaching_members_count})
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex worshopBx align-items-center">
              <h6>Availability</h6>:
              <span
                style={{ marginLeft: "9px" }}
                onClick={() => showWorkshopOnCalendar(coaching)}
              >
                <BsFillCalendarDateFill color="#2c6959" size={17} />
              </span>
            </div>
            <div className="d-flex worshopBx align-items-center">
              <h6>Domain</h6>:
              <span style={{ marginLeft: "9px" }}>{domain}</span>
            </div>
            <div className="d-flex worshopBx align-items-center">
              <h6>Industry</h6>:
              <span style={{ marginLeft: "9px" }}>{industry}</span>
            </div>

            <BookBtn
              status={bookingStatus}
              onClick={() => bookCoaches(coaching)}
              styles={{
                height: "30px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingCard;
