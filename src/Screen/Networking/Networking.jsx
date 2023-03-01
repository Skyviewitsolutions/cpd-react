import React from "react";
import "./Networking.css";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Event_cards from "../../Component/Cards/Event_cards";
import Event_button from "../../Component/button/Event_button";
import Plus_button from "../../Component/button/Plus_button";
import AddCommunitySidebar from "../../Component/AddCommunitySidebar/AddCommunitySidebar";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import { useNavigate } from "react-router-dom";
import AddEvent_Modal from "../../Component/Modal/AddEvent_Modal";
import { endpoints } from "../../Component/services/endpoints";
import Networking_headers from "../../Component/Header/Networking_headers";
import axios from "axios";
import { HiSearch } from "react-icons/hi";
import { FaPlusCircle } from "react-icons/fa";
import NoDataImg from "../../assets/Images/noDataFound.png";
import CustomFilter from "../../Component/CustomFilter/CustomFilter";
import CreateBtn from "../../Component/button/CreateBtn/CreateBtn";
import Button from "../../Component/button/Button/Button";
import EventsCard from "../../Component/EventsCard/EventsCard";
import {toast ,ToastContainer } from "react-toastify";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";
import { BiPlusCircle } from "react-icons/bi";

const Networking = () => {

  const [eventsToBeShown, setEventsToBeShown] = useState([]);
  const [showCustomCalendar , setShowCustomCalendar] = useState(false)
  const navigate = useNavigate("");
  const [imagePath, setImagePath] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [allEvent, setAllEvent] = useState([]);
  const [shortEvent, setShortEvent] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const token = localStorage.getItem('token')

  const getAllEventsApi = endpoints.events.getAllEvents;

  const getAllEvents = () => {
    axios
      .get(getAllEventsApi)
      .then((res) => {
        if (res.data.result === true) {
          const val = res.data.data;
          const eventId = res.data.data[0]._id;
          localStorage.setItem("eventId", eventId);
          const imgPath = res.data.image_path;
          const videoPath = res.data.video_path;
          setImagePath(imgPath);
          setVideoPath(videoPath);
          setAllEvent(val);
          if (val.length > 3) {
            var shrtEvent = [val[0], val[1], val[2]];
            setShortEvent(shrtEvent);
          } else {
            setShowAllEvents(true);
          }
        }
      })
      .catch((err) => {
        console.log(err, "this is events error");
      });
  };

  useEffect(() => {
    getAllEvents(getAllEvents);
  }, []);

  const viewDetails = (data) => {
    navigate("/event-details", { state: { eventDetails: data } });
  };

  return (
    <>
      <Homepage_header />
      <Networking_headers />
      <div className="networking_wrapper">
        <div className="row">
          <div className="col-lg-3  ">
            <CustomFilter />
          </div>
          <div className="col-lg-9 col-md-12 col-12 ">
            <section>
              <div className="row d-flex align-items-center">
                <div className="col-lg-7 col-md-6 col-12">
                  <div className="networkingsearchBox">
                    <div className="form-group">
                      <HiSearch id="networking_search" />
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search Here"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-6 col-12 d-flex">
                  <div className="eventBtn">
                <Button title="View Community" onClick={() => navigate("/community")}/>
              </div>
              {token &&
              <div className="createEvnet" onClick={() => navigate("/add-event")}>
                <h6>Create Event</h6>
                <BiPlusCircle color="white" size={20}/>
              </div>}
                </div>
              </div>
            </section>
            <section className="eventCardsection">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="latest">
                    <h3>Latest</h3>
                  
                  </div>
                </div>
              </div>
              <div className="row">
                {allEvent.length != 0 &&
                  allEvent.map((itm, index) => {
                    return (
                      <>
                        <div className="col-sm-12 col-md-6 col-lg-4 ">
                          <EventsCard
                            data={itm}
                            key={index}
                            imagePath={imagePath}
                            videoPath={videoPath}
                            viewDetails={viewDetails}
                            showEdit={false}
                            showCustomCalendar={showCustomCalendar}
                            setShowCustomCalendar={setShowCustomCalendar}
                            eventsToBeShown={eventsToBeShown}
                            setEventsToBeShown={setEventsToBeShown}
                          />
                        </div>
                      </>
                    );
                  })}
              </div>
              {allEvent.length == 0 && (
                <div className="noDataCont">
                  <img src={NoDataImg} alt="" />
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <CustomCalendar
        showCalendar={showCustomCalendar}
        setShowCalendar={setShowCustomCalendar}
        eventsToBeShown={eventsToBeShown}
      />
       <ToastContainer />
      <Footer />
    </>
  );
};

export default Networking;
