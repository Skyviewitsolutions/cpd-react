import React from "react";
import "./eventCard.css";
import EventImg from "../../assets/Images/USNV.png";
import { generatePath } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DummyWorkhshopImage from "../../assets/Images/dommy_workshopImage.png";
import { BsFillCalendarDateFill } from "react-icons/bs";
import BookBtn from "../button/BookBtn/BookBtn";
import Button from "../button/Button/Button";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { InlineShareButtons } from "sharethis-reactjs";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { getCalendarData } from "../../utils/calendar";
import DefaultImg from "../../assets/Images/default.png"

import Subscribe from "../button/Subscribe";
// here we are designing a single card for all the events ;


const EventsCard = (props) => {
  
  const navigate = useNavigate();

  const {
    data,
    key,
    imagePath,
    videoPath,
    createEvent,
    showEdit,
    viewDetails,
    handleDeleteEvent,
    handleUpdateEvent,
    eventsToBeShown,
    showSubscribe ,
    joinEvent ,
    leaveEvent,
    isSubscribed ,
    loading ,

    setEventsToBeShown,
    showCustomCalendar,
    setShowCustomCalendar,
  } = props;

  const image = imagePath + data?.event_photo;

  var isPaid = data?.paid == 1 ? true : false;

  var sessionType = data?.priceType == 1 ? "hourly" : "Sessional";

  const showEventCalendar = async (data) => {
    setEventsToBeShown([]);
    setShowCustomCalendar(true);
    var slots = JSON.parse(data?.timeslots);
    const calendarData = await getCalendarData(slots);
    setEventsToBeShown(calendarData);
  };

  const showMembersList = (id) =>{
    
  }

  return (
    <div className="eventCont">
      <div className="eventImg">
        <img src={data?.event_photo ? image : DefaultImg} alt="" />
      </div>
      <div className="worshopCrdDtls d-flex">
        <div className="col-lg-6 col-6 ">
          <div className="workshopTitle">
            <h5>{data.event_title} </h5>
          </div>
          <div
            className="d-flex worshopBx align-items-center"
            style={{ marginBottom: "17px" }}
          >
            {isPaid ? (
              <>
                <h6 style={{ width: "20%" }}>Price</h6>:
                <span style={{ marginLeft: "9px", width: "70%" }}>
                  {data.price} HKD / {sessionType}
                </span>
              </>
            ) : (
              <h6>Free</h6>
            )}
          </div>
          <div className="d-flex worshopBx align-items-center enrolled" onClick={() => showMembersList()}>
             Members ({data?.members_count})
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex worshopBx align-items-center">
            <h6>Availability</h6>:
            <span
              style={{ marginLeft: "9px" }}
              onClick={() => showEventCalendar(data)}
            >
              <BsFillCalendarDateFill color="#2c6959" size={17} />
            </span>
          </div>
          <div className="d-flex worshopBx align-items-center">
            <h6>Author</h6>:
            <span style={{ marginLeft: "9px" }}>{data?.creator_name}</span>
          </div>
          <div className="d-flex worshopBx align-items-center">
            <h6>Mode</h6>:
            <span style={{ marginLeft: "9px" }}>{data?.session_type}</span>
          </div>
          <div className="d-flex worshopBx align-items-center">
            <h6 className="viewDetailsBtn" onClick={() => viewDetails(data)}>
              View Details
            </h6>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between px-2 mb-2 align-items-center">
        <div className="shareBtn2">
          <InlineShareButtons
            config={{
              alignment: "center",
              color: "social", // set the color of buttons (social, white)
              enabled: true, // show/hide buttons (true, false)
              font_size: 16, // font size for the buttons
              labels: null, // button labels (cta, counts, null)
              language: "en", // which language to use (see LANGUAGES)
              networks: [
                // which networks to include (see SHARING NETWORKS)
                "whatsapp",
                "linkedin",
                //   "messenger",
                "facebook",
                "email",
              ],
              padding: 12, // padding within buttons (INTEGER)
              radius: 4, // the corner radius on each button (INTEGER)
              show_total: false,
              size: 40, // the size of each button (INTEGER)

              // OPTIONAL PARAMETERS//
              //   url: "https://cpdedu.com/myCommunity", // (defaults to current url)
              //   image: data.image ? image : event_cardimg, // (defaults to og:image or twitter:image)
              //   description: data?.description, // (defaults to og:description or twitter:description)
              //   title: data?.display_name, // (defaults to og:title or twitter:title)
              //  message:
              //    "https://cpdedu.com/myCommunity" + "\n" + data?.description, // (only for email sharing)
              //  subject: data?.display_name, // (only for email sharing)
            }}
          />
        </div>
        {showEdit && (
          <div className="workshopEdit" style={{ height: "30px" }}>
            <FiEdit color="#2c6959" onClick={() => handleUpdateEvent(data)} />
            <AiOutlineDelete
              color="#2c6959"
              onClick={() => handleDeleteEvent(data._id)}
            />
          </div>
        )}
        {showSubscribe &&
          (isSubscribed ? (
            <Subscribe
              text="UNSUBSCRIBE"
              onClick={() => leaveEvent(data._id)}
              loading={loading}
            />
          ) : (
            <Subscribe
              text="SUBSCRIBE"
              onClick={() => joinEvent(data._id)}
              loading={loading}
            />
          ))}
      </div>
    </div>
  );
};

export default EventsCard;
