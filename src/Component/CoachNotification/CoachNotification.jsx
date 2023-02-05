import React, { useEffect, useState } from "react";
import "./coachNotification.css";
import { Modal } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import UserImg from "../../assets/Images/user2.jpeg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { endpoints } from "../services/endpoints";

const CoachNotification = (props) => {
  const { showNotification, setShowNotification } = props;
  const [allNotifiedCoachings, setAllNotifiedCoachings] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [allNotifiedWorkshops, setAllNotifiedWorkshops] = useState([]);
  const [coachingImgPath, setCoachingImgPath] = useState("");
  const [workshopImgPath, setWorkshopImgPath] = useState("");

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
          console.log(res, "sssd");
          var val = res.data.data;
          setAllNotifiedWorkshops(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
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
          toast("Coaching request cancelled successfully", { type: "success" });
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
          toast("Coaching request cancelled successfully", { type: "success" });
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
          toast("Workshop request cancelled successfully", { type: "success" });
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
          toast("Workshop request cancelled successfully", { type: "success" });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error here");
      });
  };

  return (
    <Modal show={showNotification}>
      <div className="coachNotif">
        <div className="coachHeader">
          <h5>All Notification</h5>
          <div className="coachCut" onClick={() => setShowNotification(false)}>
            <IoCloseSharp size={19} color="white" />
          </div>
        </div>
        <div style={{minHeight : "200px"}}>
          <h6 className="px-3 py-2 bg-secondary text-light text-center">
            Coachings
          </h6>
          {allNotifiedCoachings.length != 0 &&
            allNotifiedCoachings.map((item, index) => {
              var userProfile = item?.user_profile;
              var status = item?.status;
              return (
                <>
                  {status == 1 && (
                    <div
                      className="row d-flex px-2 py-2 mx-1 flex-direction-row col-12 align-items-center boxxx "
                      key={index}
                    >
                      <div className="userImg col-2">
                        <img src={UserImg} alt="" />
                      </div>
                      <div className="userDetails col-10 d-flex flex-column justify-content-center">
                        <h5 className="text-secondary fs-6">
                          {userProfile?.first_name} {userProfile?.last_name}
                        </h5>
                        <div className="justify-content-start">
                          <button
                            className="splBtn"
                            onClick={() => CancelCoachingRequest(item)}
                          >
                            Cancel
                          </button>
                          <button
                            className="splBtn"
                            onClick={() => ConfirmedCoachingRequest(item)}
                          >
                            Confirmed
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </div>
        <div>
          <h6 className="px-3 py-2 bg-secondary text-light text-center">
            Workshops
          </h6>
          {allNotifiedWorkshops.length != 0 &&
            allNotifiedWorkshops.map((item, index) => {
              var userProfile = item?.user_profile;
              var status = item?.status;
              return (
                <>
                  {status == 1 && (
                    <div
                      className="row d-flex px-2 py-2 mx-1 flex-direction-row col-12 align-items-center boxxx "
                      key={index}
                    >
                      <div className="userImg col-2">
                        <img src={UserImg} alt="" />
                      </div>
                      <div className="userDetails col-10 d-flex flex-column justify-content-center">
                        <h5 className="text-secondary fs-6">
                          {userProfile?.first_name} {userProfile?.last_name}
                        </h5>
                        <div className="justify-content-start">
                          <button
                            className="splBtn"
                            onClick={() => cancelWorkshopRequest(item)}
                          >
                            Cancel
                          </button>
                          <button
                            className="splBtn"
                            onClick={() => confirmWorkshopRequest(item)}
                          >
                            Confirmed
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </div>
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default CoachNotification;
