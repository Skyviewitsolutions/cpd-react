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
import CustomFilter from "../../Component/CustomFilter/CustomFilter";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";
import EventsCard from "../../Component/EventsCard/EventsCard";
import CommunityCard from "../../Component/CommmunityCard/CommunityCard";
import showToast from "../../Component/CustomToast/CustomToast";


const EventDetails = (props) => {

  const location = useLocation();
  const [allCommunity, setAllCommunity] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [loading, setLoading] = useState(false);
  const [myCommunity, setMyCommunity] = useState([]);

  // adding form data here ;

 
  const navigate = useNavigate();

  const getCommunityUrl = endpoints.community.getAllCommunity;

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

  // adding join api

  const joinCommunity = (id) => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const url = `${endpoints.community.joinCommunity}${id}`;

      axios
        .get(url, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            showToast("Community joined successfully",  "success" );
            getAllCommunity();
            getMyCommunity();
          } else if (!res.data.result) {
            showToast(res.data?.message,  "warning" );
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      showToast("Please login",  "warning" );
    }
  };

  const leaveCommunity = (id) => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const url = `${endpoints.community.leaveCommunity}${id}`;
      axios
        .get(url, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            showToast("Community left successfully",  "success" );
            getAllCommunity();
            getMyCommunity();
          } else if (!res.data.result) {
            showToast(res.data?.message,  "warning" );
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      showToast("Please login", "warning" );
    }
  };

  return (
    <>
      <Homepage_header />
      <Networking_headers />
      <div className="p-4">
        <Event_header eventDetails={location?.state?.eventDetails} />

        <div className="row">
          <div className="col-lg-3 d-lg-block d-none  ps-5 pe-5 mb-5 d-lg-block d-none">
            <CustomFilter />
          </div>
          <div className="col-lg-9 col-md-12 col-12">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12  evntBtn eventDetailsTitle">
                <h5>Domain Based</h5>
              </div>
            </div>
            <div className="eventListPersonShow"></div>
            <div className="row mt-2">
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
                        
                        <CommunityCard
                          data={itm}
                          key={index}
                          imagePath={imagePath}
                          isSubscribed={isSubscribed}
                          getMyCommunity={getMyCommunity}
                          getAllCommunity={getAllCommunity}
                          showSubscribe={true}
                          joinCommunity={joinCommunity}
                          leaveCommunity={leaveCommunity}
                          showEdit={false}
                          loading={loading}
                        />
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
};

export default EventDetails;
