import React, { useState, useEffect } from "react";
import "./communityDetails.css";
import Footer from "../../Component/Footer/Footer";
import Homepage_header from "../../Component/Header/Homepage_header";
import Sidenav_communityFinance from "../../Component/navbar/Sidenav_communityFinance";
import Checkbox_sidenav from "../../Component/Inputbox/Checkbox_sidenav";
import Plus_button from "../../Component/button/Plus_button";
import Event_button from "../../Component/button/Event_button";
import All_members from "../../Component/Cards/All_members";
import Community_header from "../../Component/Header/Community_header";
import { BiFilterAlt } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import { TfiMenuAlt } from "react-icons/tfi";
import { HiOutlineGlobe } from "react-icons/hi";
import Networking_headers from "../../Component/Header/Networking_headers";
import DetailsCard from "../../Component/Cards/DetailsCard";
import { endpoints } from "../../Component/services/endpoints";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import CustomFilter from "../../Component/CustomFilter/CustomFilter";
import EventsCard from "../../Component/EventsCard/EventsCard";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";
import { ToastContainer, toast } from "react-toastify";
import { generatePath, useNavigate } from "react-router-dom";
import NoDataImg from "../../assets/Images/noDataFound.png"

const CommunityDetails = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCommunity = location.state;
  const [communityEventDetails, setCommunityEventDetails] = useState([]);
  const [picPath, setPicPath] = useState("");
  const [shortCommunityEvent, setShortCommunityEvent] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [eventsToBeShown, setEventsToBeShown] = useState([]);

  const getMyEventsApi = endpoints.events.myEvents;

  const { communityId } = useParams();
  console.log(communityId, "communityId");

  const [myEvent, setMyEvent] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const communityEvent = () => {
    const communityEventApi = `${endpoints.events.eventsByCommunityId}${communityId}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(communityEventApi, { headers: headers })
      .then((res) => {
        console.log(res, "response here which can be shown");
        if (res.data.result === true) {
          var val = res.data.data;

          setCommunityEventDetails(val);
          const path = res.data.image_path;
          setPicPath(path);

          if (val.length > 3) {
            var shortEvent = [val[0], val[1], val[2]];
            setShortCommunityEvent(shortEvent);
          } else {
            setShowAllEvents(true);
          }
        }
      })
      .catch((err) => {
        console.log(err, "this is community details events error");
      });
  };

  const getMyEvents = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(getMyEventsApi, { headers: headers })
      .then((res) => {
        if (res.data.result === true) {
          const val = res.data.data;
          const imgPath = res.data.image_path;
          const videoPath = res.data.video_path;
          setImagePath(imgPath);
          // setVideoPath(videoPath);
          setMyEvent(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is events error");
      });
  };

  useEffect(() => {
    communityEvent();
    getMyEvents();
  }, []);

  const viewDetails = (data) => {
    var eventId = data._id;
    const path = generatePath("/event-full-details/:eventId", {
      eventId: eventId,
    });
    navigate(path);
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
          console.log(res, "join community response");
          setLoading(false);
          if (res.data.result) {
            toast("Events joined successfully", { type: "success" });
            communityEvent();
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
            communityEvent();
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

  return (
    <>
      <Homepage_header />
      <Networking_headers />
      <div className="p-4">
        <Community_header communityDetails={selectedCommunity} />
        <div className="row">
          <div className="col-lg-3 d-lg-block d-none mt-1 ps-5 pe-5 mb-5 d-lg-block d-none">
            <CustomFilter />
          </div>
          <div className="col-lg-9 col-md-12 col-12">
            <div className="row ">
              <div className="col-12 col-md-12 col-lg-12 mt-2 cmntyBtn lttitle">
                <h5>Latest Session</h5>
                {/* <button
                  className="btn btn-success showDetailsbtn"
                  onClick={() => setShowAllEvents(!showAllEvents)}
                >
                  {showAllEvents ? "View Less" : "View All"}
                </button> */}
              </div>
            </div>
            <div className="eventListPersonShow"></div>

            <div className="row mt-2">
              {communityEventDetails.length != 0 &&
                communityEventDetails.map((itm, index) => {
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
                          imagePath={picPath}
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

              {communityEventDetails.length == 0 && (
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
      <Footer />
    </>
  );
};

export default CommunityDetails;
