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
import { toast, ToastContainer } from "react-toastify";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";
import { BiPlusCircle } from "react-icons/bi";
import { generatePath } from "react-router-dom";


const Networking = () => {

  const [eventsToBeShown, setEventsToBeShown] = useState([]);
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);
  const navigate = useNavigate("");
  const [imagePath, setImagePath] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [allEvent, setAllEvent] = useState([]);
  const [myEvent , setMyEvent] = useState([])
  const [eventData, setEventData] = useState([]);
  const [shortEvent, setShortEvent] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputEvent, setInputEvent] = useState("");

  const token = localStorage.getItem("token");
  const getAllEventsApi = endpoints.events.getAllEvents;
  const getMyEventsApi = endpoints.events.myEvents;

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
          setEventData(val);
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


  const getMyEvents = () =>{
    const headers = {
      "Authorization" : `Bearer ${token}`
    }
    axios
      .get(getMyEventsApi , {headers : headers})
      .then((res) => {
        if (res.data.result === true) {
          const val = res.data.data;
          const imgPath = res.data.image_path;
          const videoPath = res.data.video_path;
          setImagePath(imgPath);
          setVideoPath(videoPath);
          // setEventData(val);
          setMyEvent(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is events error");
      });
  }

  useEffect(() => {
    getAllEvents();
    getMyEvents();
  }, []);

  const viewDetails = (data) => {
    var eventId = data._id;
    const path = generatePath("/event-full-details/:eventId" , {eventId : eventId})
    navigate(path);
  };

  const handleSearch = (e) => {

    var val = e.target.value;
    val = val.toLowerCase();
    setInputEvent(e.target.value);

    const filterEvent = eventData.filter((item, index) => {
      var eventTitle = item.event_title.toLowerCase();
      return eventTitle.includes(val);
    });

    setAllEvent(filterEvent);
    if (val == "") {
      setAllEvent(eventData);
    }
  };

  // writing code for joining and leaving the event

  const joinEvent = (id) => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url = `${endpoints.events.joinEvent}${id}`;

      axios
        .get(url, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            toast("Events joined successfully", { type: "success" });
            getAllEvents();
            getMyEvents();
          } else if (!res.data.result) {
            toast(res.data?.message, { type: "warning" });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      toast("Please login", { warning: "warning" });
    }
  };

  const leaveEvent = (id) => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const url = `${endpoints.events.leaveEvent}${id}`;
      axios
        .get(url, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            toast("Events left successfully", { type: "success" });
            getAllEvents();
            getMyEvents();
          } else if (!res.data.result) {
            toast(res.data?.message, { type: "warning" });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      toast("Please login", { type: "warning" });
    }
  };

  console.log(eventData , "myEvents h");

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
                  <div className="workshop_searchBar">
                    <div className="form-group">
                      
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search Here"
                        value={inputEvent}
                        onChange={(e) => handleSearch(e)}
                      />
                      <HiSearch id="networking_search" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-6 col-12 d-flex">
                  <div className="eventBtn">
                    <Button
                      title="View Community"
                      onClick={() => navigate("/community")}
                    />
                  </div>
                  {token && (
                    <div
                      className="createEvnet"
                      onClick={() => navigate("/add-event")}
                    >
                      <h6>Create Event</h6>
                      <BiPlusCircle color="white" size={20} />
                    </div>
                  )}
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
                    const id = itm._id;
                    var isSubscribed = myEvent.some((element) => {
                      if (element._id === id) {
                        return true;
                      }
                      return false;
                    });
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
                            showSubscribe={true}
                            isSubscribed={isSubscribed}
                            joinEvent={joinEvent}
                            leaveEvent={leaveEvent}
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
      {/* <ToastContainer /> */}
      <Footer />
    </>
  );
};

export default Networking;
