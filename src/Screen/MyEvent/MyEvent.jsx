import React from "react";
import Footer from "../../Component/Footer/Footer";
import "./MyEvent.css";
import MyEventCards from "../../Component/Cards/MyEventCards";
import Homepage_header from "../../Component/Header/Homepage_header";
import { useState, useEffect } from "react";
import { endpoints } from "../../Component/services/endpoints";
import axios from "axios";
import Networking_headers from "../../Component/Header/Networking_headers";
import NoDataImg from "../../assets/Images/noDataFound.png";
import CustomFilter from "../../Component/CustomFilter/CustomFilter";
import EventsCard from "../../Component/EventsCard/EventsCard";
import { generatePath, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";
import { fontFamily } from "@mui/system";
import Loader from "../../Component/Loader/Loader";


const MyEvent = () => {

  const [createdEvent, setCreatedEvent] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [imgFiles, setImgFiles] = useState(null);
  const [eventsToBeShown, setEventsToBeShown] = useState([]);
  const [showCustomCalendar , setShowCustomCalendar] = useState(false);
  const [loading , setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getMyEvents = () => {
    const createEventsUrl = endpoints.events.createdEvents;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    setLoading(true)
    axios
      .get(createEventsUrl, { headers: headers })
      .then((res) => {
        setLoading(false)
        if (res.data.result === true) {
          const val = res.data.data;
          const imgPath = res.data.image_path;
          const videoPath = res.data.video_path;
          setImagePath(imgPath);
          setVideoPath(videoPath);
          setCreatedEvent(val);
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err, "Created event data error");
      });
  };

  useEffect(() => {
    getMyEvents();
  }, []);

  const viewDetails = (data) => {
    navigate("/event-details", { state: { eventDetails: data } });
  };

  const handleUpdateEvent = (data) => {
    // var dtta = { ...data, image_path: imagePath, video_path: videoPath };
    // navigate("/add-event", { state: dtta });
    const path = generatePath("/eventEdit/:eventId" , {eventId : data?._id});
    navigate(path)
  };

  const handleDeleteEvent = (id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
    setLoading(true)
    const url = `${endpoints.events.delete}${id}`;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false)
        if (res.data.result == true) {
          toast("Events deleted successfully", { type: "success" });
          getMyEvents();
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err, "events error");
      });
  };

  return (
    <>
      <Homepage_header />
      <Networking_headers title="My Events" />
      <div className="">
        <div className=" row">
          {/* <div className="col-lg-3 d-lg-block d-none mt-5 ps-5 pe-5 mb-5 d-lg-block d-none">
            <CustomFilter />
          </div> */}

          <div className="col-12 col-md-12 col-lg-12 mt-5 mx-4">
            <h4
              style={{
                fontWeight: "700",
                fontFamily: "Poppins-SemiBold",
                color: "var(--black)",
              }}
            >
              My Events List
            </h4>
            <div className="row">
              {createdEvent.length != 0 &&
                createdEvent.map((itm, index) => {
                  return (
                    <>
                      <div className="col-lg-3 col-md-4 col-12 mt-3 mb-5">
                        {itm && (
                          <EventsCard
                            data={itm}
                            key={index}
                            imagePath={imagePath}
                            videoPath={videoPath}
                            createEvent={getMyEvents}
                            viewDetails={viewDetails}
                            showEdit={true}
                            handleUpdateEvent={handleUpdateEvent}
                            handleDeleteEvent={handleDeleteEvent}
                            showCustomCalendar={showCustomCalendar}
                            setShowCustomCalendar={setShowCustomCalendar}
                            eventsToBeShown={eventsToBeShown}
                            setEventsToBeShown={setEventsToBeShown}
                          />
                        )}
                      </div>
                    </>
                  );
                })}

              {createdEvent.length == 0 && (
                <div className="noDataCont">
                  <img src={NoDataImg} alt="" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CustomCalendar
        showCalendar={showCustomCalendar}
        setShowCalendar={setShowCustomCalendar}
        eventsToBeShown={eventsToBeShown}
      />
      <ToastContainer />
      {loading && <Loader />}
      <Footer />
    </>
  );
};

export default MyEvent;
