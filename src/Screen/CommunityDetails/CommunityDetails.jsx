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
import { useLocation } from "react-router-dom";

const CommunityDetails = (props) => {

  const location = useLocation();
  const selectedCommunity = location.state;

  const [communityEventDetails, setCommunityEventDetails] = useState([]);
  const [picPath, setPicPath] = useState("");
  const [shortCommunityEvent, setShortCommunityEvent] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);

  const communityEventApi = endpoints.events.getAllEvents;

  const communityEvent = () => {
    axios
      .get(communityEventApi)
      .then((res) => {
        if (res.data.result === true) {
          var val = res.data.data;
          console.log(val, "value");

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

  useEffect(() => {
    communityEvent();
  }, []);

  

  return (
    <>
      <Homepage_header />
      <Networking_headers />
      <div className="container">
        <Community_header communityDetails={selectedCommunity} />
        <div className="row">
          <div className="col-lg-3 d-lg-block d-none mt-5 ps-5 pe-5 mb-5 d-lg-block d-none">
            <Sidenav_communityFinance />
          </div>
          <div className="col-lg-9 col-md-12 col-12">
            <div className="row ">
              <div className="col-12 col-md-12 col-lg-12 mt-5 cmntyBtn">
                <h5>Latest Session</h5>
                <button
                  className="btn btn-success showDetailsbtn"
                  onClick={() => setShowAllEvents(!showAllEvents)}
                >
                  {showAllEvents ? "View Less" : "View All"}
                </button>
              </div>
            </div>
            <div className="eventListPersonShow"></div>

            <div className="row mt-5">
              {showAllEvents
                ? communityEventDetails.length != 0 &&
                  communityEventDetails.map((itm, index) => {
                    return (
                      <>
                        <div className="col-sm-12 col-md-6 col-lg-4 ">
                          <DetailsCard
                            data={itm}
                            key={index}
                            picPath={picPath}
                          />
                        </div>
                      </>
                    );
                  })
                : shortCommunityEvent.map((itm, index) => {
                    return (
                      <>
                        <div className="col-sm-12 col-md-6 col-lg-4 ">
                          <DetailsCard
                            data={itm}
                            key={index}
                            picPath={picPath}
                          />
                        </div>
                      </>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CommunityDetails;
