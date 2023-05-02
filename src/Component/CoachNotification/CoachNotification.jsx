import React, { useEffect, useState } from "react";
import "./coachNotification.css";
import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import UserImg from "../../assets/Icons/user.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { endpoints } from "../services/endpoints";
import profileimg from "../../assets/Images/profileimg.png";
import { MdOutlineNotificationsActive } from "react-icons/md";
import showToast from "../CustomToast/CustomToast";


const CoachNotification = (props) => {

  const {
    showNotification,
    setShowNotification,
    notificationCount,
    setNotificationCount,
  } = props;


  const [allNotifiedCoachings, setAllNotifiedCoachings] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [allNotifiedWorkshops, setAllNotifiedWorkshops] = useState([]);
  const [coachingUserImgPath, setCoachingUserImgPath] = useState("");
  const [workshopUserImgPath, setWorkshopUserImgPath] = useState("");
  

  const getAllNotifiedCoachings = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const url = endpoints.coaches.allCoachingNotification;

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          var val = res.data.data;
          setAllNotifiedCoachings(val);
          setNotificationCount(notificationCount + val.length);
          var imgPath = res.data.avatar_image_path;
          setCoachingUserImgPath(imgPath);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  const getAllNotifiedWorkshops = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const url = endpoints.workshop.allEnrollRequestWorkshop;

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          var val = res.data.data;
          setAllNotifiedWorkshops(val);
          setNotificationCount(notificationCount + val.length);
          var imgPath = res.data.avatar_image_path;
          setWorkshopUserImgPath(imgPath);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    setNotificationCount(0);
    getAllNotifiedCoachings();
    getAllNotifiedWorkshops();
  }, []);

  const CancelCoachingRequest = (dta) => {
    const id = dta._id;
    const url = `${endpoints.coaches.cancellCoaching}${id}&respond_code=0`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    setLoading(true);

    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false);
        if (res.data.result) {
          getAllNotifiedCoachings();
          showToast("Request cancelled successfully", "success");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error here");
      });
  };

  const ConfirmedCoachingRequest = (dta) => {
    const id = dta._id;
    const url = `${endpoints.coaches.confirmCoaching}${id}&respond_code=2`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    setLoading(true);

    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false);
        if (res.data.result) {
          getAllNotifiedCoachings();
          showToast("Request cancelled successfully", "success");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error here");
      });
  };

  const cancelWorkshopRequest = (dta) => {
    const id = dta._id;
    const url = `${endpoints.workshop.cancelWorkshop}${id}&respond_code=0`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    setLoading(true);

    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false);
        if (res.data.result) {
          getAllNotifiedWorkshops();
          showToast("Workshop request cancelled successfully", "success");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error here");
      });
  };

  const confirmWorkshopRequest = (dta) => {
    
    const id = dta._id;
    const url = `${endpoints.workshop.confirmWorkshop}${id}&respond_code=2`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    setLoading(true);

    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false);
        if (res.data.result) {
          getAllNotifiedWorkshops();
          showToast("Workshop request confirmed successfully", "success");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error here");
      });
  };

  const activeBx = {
    background : "var(--primary)" ,
    color : "white"  ,
    borderColor : "var(--primary)"
  }

  const inActiveBx = {
    background : "white" ,
    color : "var(--black)"  ,
    borderColor : "var(--lightgray)"
  }

  return (
    <Modal show={false} size="lg" >
      <div className="coachNotificationCont">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12 ">
            <div className="notificationHeader">
              <h5>
                {" "}
                All Notification{" "}
                <span>
                  <MdOutlineNotificationsActive />
                </span>
              </h5>
              <div
                className="coachCut"
                onClick={() => setShowNotification(false)}
              >
                <IoCloseSharp size={20} color="white" />
              </div>
            </div>
          </div>
        </div>
        <div className="notificationOuter">

    <div className="notificationToggle">
      <h6>All Notification</h6>
      <h6>My Notification</h6>
    </div>

          <div className="row" style={{ minHeight: "150px" }}>
            <div className="col-lg-12 col-md-12 col-12">
              <h6 className="px-3 py-2 bg-secondary text-light text-center notifyHeading">
                Coachings
              </h6>
            </div>

            {allNotifiedCoachings.length != 0 &&
              allNotifiedCoachings.map((item, index) => {
                var userProfile = item?.user_profile;
                var status = item?.status;
                var coachingInfo = item?.coaching_info;
                var userImage = coachingUserImgPath + "/" + userProfile?.avtar;

                if (status == 1) {
                  return (
                    <div key={index}>
                      <div className="row d-flex justify-content-center my-1">
                        <div className="col-lg-2 col-md-2 col-3">
                          <div className="notificationavatar">
                            <img
                              src={userProfile?.avtar ? userImage : UserImg}
                              alt=""
                            />
                          </div>
                        </div>

                        <div className="col-lg-9 col-md-10 col-9">
                          <div className=" d-flex items-center justify-between">
                            <div style={{ width: "46%" }}>
                              <div className="notificationName">
                                <h5>
                                  {userProfile?.first_name}{" "}
                                  {userProfile?.last_name}
                                </h5>
                                <p>{coachingInfo.title} </p>
                              </div>
                            </div>

                            <div className="notificationcancel">
                              <button
                                onClick={() => CancelCoachingRequest(item)}
                              >
                                cancel
                              </button>
                            </div>

                            <div className="notificationconfirme">
                              <button
                                onClick={() => ConfirmedCoachingRequest(item)}
                              >
                                confirmed
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}

            {allNotifiedCoachings.length == 0 && (
              <h6 className="text-center text-secondary">
                No notification found
              </h6>
            )}
          </div>
        </div>

        <div className="notificationOuter">
          <div className="row" style={{ minHeight: "150px" }}>
            {allNotifiedWorkshops.length != 0 && (
              <>
                <div className="col-lg-12 col-md-12 col-12">
                  <h6 className="px-3 py-2 bg-secondary text-light text-center">
                    Workshop
                  </h6>
                </div>

                {allNotifiedWorkshops.map((item, index) => {
                  var userProfile = item?.user_profile;
                  var status = item?.status;
                  var workshopInfo = item.workshop_info;
                  var userImage =
                    workshopUserImgPath + "/" + userProfile?.avtar;

                  return (
                    <>
                      {status == 1 && (
                        <>
                          <div className=" d-flex justify-content-center my-1">
                            <div
                              className="col-lg-2 col-md-2 col-3"
                              key={index}
                            >
                              <div className="notificationavatar">
                                <img
                                  src={userProfile?.avtar ? userImage : UserImg}
                                  alt=""
                                />
                              </div>
                            </div>

                            <div className="col-lg-9 col-md-10 col-9 ">
                              <div className=" d-flex items-center justify-between">
                                <div style={{ width: "46%" }}>
                                  <div className="notificationName">
                                    <h5>
                                      {userProfile?.first_name}{" "}
                                      {userProfile?.last_name}
                                    </h5>
                                    <p>{workshopInfo.title} </p>
                                  </div>
                                </div>

                                <div className="notificationcancel">
                                  <button
                                    onClick={() => cancelWorkshopRequest(item)}
                                  >
                                    cancel
                                  </button>
                                </div>

                                <div className="notificationconfirme">
                                  <button
                                    onClick={() => confirmWorkshopRequest(item)}
                                  >
                                    confirmed
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CoachNotification;
