import React, { useEffect, useState } from "react";
import "./EventDetails.css";
import Footer from "../../Component/Footer/Footer";
import Event_header from "../../Component/Header/Event_header";
import Homepage_header from "../../Component/Header/Homepage_header";
import Networking_headers from "../../Component/Header/Networking_headers";
import Sidenav_communityFinance from "../../Component/navbar/Sidenav_communityFinance";
import { useLocation, useNavigate } from "react-router-dom";
import Domain_cards from "../../Component/Cards/DomainCard/DomainCard";
import { endpoints } from "../../Component/services/endpoints";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import AddEvent_Modal from "../../Component/Modal/AddEvent_Modal";
import { BsChatDots } from "react-icons/bs";
import { BsFillCalendarDateFill } from "react-icons/bs";
// import Chat from "../../Component/Chat/Chat";
import CustomFilter from "../../Component/CustomFilter/CustomFilter";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";

const EventDetails = (props) => {
  
  const location = useLocation();

  const [allCommunity, setAllCommunity] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [showCommunityForm, setShowCommunityForm] = useState(false);
  const [communityId, setCommunityId] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [myCommunity, setMyCommunity] = useState([]);

  // adding form data here ;

  const [topics, setTopics] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescriptions] = useState("");
  const [tags, setTags] = useState("");
  const [imgFiles, setImgFiles] = useState(null);

  const navigate = useNavigate();

  const getCommunityUrl = endpoints.community.getAllCommunity;
  const addCommunityUrl = endpoints.community.addCommunity;

  const getAllCommunity = () => {
    axios
      .get(getCommunityUrl)
      .then((res) => {
        if (res.data.result === true) {
          const val = res.data.data;

          const imgPath = res.data.image_path;
          setImagePath(imgPath);
          // const communityId=res.data[0]._id;
          const comunityId = res.data.data[0]._id;
          localStorage.setItem("comunityId", comunityId);
          setCommunityId(comunityId);

          setAllCommunity(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  // my community api

  const getMyCommunity = () => {
    const token = localStorage.getItem("token");
    const getMycommunityUrl = endpoints.community.myCommunity;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    axios
      .get(getMycommunityUrl, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data;
          setMyCommunity(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    getAllCommunity(allCommunity);
    getMyCommunity();
  }, []);

  // Add community api implementation

  const addCommunity = () => {
    if (!topics) {
      toast("Topic is required", { type: "warning" });
    } else if (!displayName) {
      toast("Display name is required", { type: "warning" });
    } else if (!description) {
      toast("Description is required", { type: "warning" });
    } else if (!tags) {
      toast("Tags is required", { type: "warning" });
    } else {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("topic", topics);
      formData.append("display_name", displayName);
      formData.append("description", description);
      formData.append("image", imgFiles);
      formData.append("criteria", tags);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      axios
        .post(addCommunityUrl, formData, { headers: headers })
        .then((res) => {
          if (res.data.result) {
            toast("community created successfully", { type: "success" });
          } else if (!res.data.result) {
            toast(res.data?.message, { type: "warning" });
          }
        })
        .catch((err) => {
          console.log(err, "this is the error");
        });
    }

    // Update community Api Implementation
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const Updateapi = `https://admin.cpdedu.com/api/v1/community/update/=${communityId}`;

    axios
      .post(Updateapi, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          toast("community created successfully", { type: "success" });
        } else if (!res.data.result) {
          toast(res.data?.message, { type: "warning" });
        }
      })
      .catch((err) => {
        console.log(err, "this is the community update error");
      });
  };

  // adding join api

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const api = `https://admin.cpdedu.com/api/v1/community/join/=${communityId}`;

    axios
      .get(api, { headers: headers })
      .then((res) => {
        console.log(res, "Community join");
      })
      .catch((err) => {
        console.log(err, "this is the community join error");
      });
  }, []);

  // adding leave api

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const api = `https://admin.cpdedu.com/api/v1community/leave/=${communityId}`;

    axios
      .get(api, { headers: headers })
      .then((res) => {
        console.log(res, "Leave Community");
      })
      .catch((err) => {
        console.log(err, "this is the community leave error");
      });
  }, []);

  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <Homepage_header />
      <Networking_headers />
      <div className="p-4">
        <Event_header eventDetails={location.state.eventDetails} />
        <div className="calendarIcon" onClick={() => setShowCalendar(true)}>
          <BsFillCalendarDateFill color="#2c6959" size={32} />
        </div>{" "}
        {/* <div className="eventDetailsChat" onClick={() => setShowChat(true)}>
          <BsChatDots />
        </div> */}
        <div className="row">
          <div className="col-lg-3 d-lg-block d-none mt-5 ps-5 pe-5 mb-5 d-lg-block d-none">
           <CustomFilter />
          </div>
          <div className="col-lg-9 col-md-12 col-12">
            <></>
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12 mt-5 evntBtn">
                <h5>Domain Based</h5>
              </div>
            </div>
            <div className="eventListPersonShow"></div>
            <div className="row mt-3">
              {allCommunity.length != 0 &&
                allCommunity.map((itm, index) => {
                  const id = itm._id;

                  var isSubscribed = myCommunity.some((element) => {
                    if (element._id === id) {
                      return true;
                    }
                    return false;
                  });

                  return (
                    <>
                      <div className="col-sm-12 col-md-6 col-lg-4 px-3">
                        <Domain_cards
                          data={itm}
                          key={index}
                          imagePath={imagePath}
                          isSubscribed={isSubscribed}
                          getMyCommunity={getMyCommunity}
                          getAllCommunity={getAllCommunity}
                        />
                      </div>

                      {/* <div className="col-sm-12 col-md-6 col-lg-4 ">
                        <Add_committee
                          data={itm}
                          key={index}
                          imagePath={imagePath}
                          // isSubscribed={isSubscribed}
                          // getMyCommunity={getMyCommunity}
                          // getAllCommunity={getAllCommunity}
                        />
                      </div> */}
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <CustomCalendar
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
      />
      <Footer />
      {/* <Chat showChat={showChat} setShowChat={setShowChat} />   */}
    </>
  );
};

export default EventDetails;
