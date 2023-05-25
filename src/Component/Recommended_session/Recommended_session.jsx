import React, { useEffect, useState } from "react";
import "./Recommended_session.css";
import star from "../../assets/Images/star.svg";
import download_icon from "../../assets/Images/download_icon.svg";
import Analytic from "../../assets/Icons/Artboard13.svg";
import Conflict_mgmnt from "../../assets/Icons/Artboard49.svg";
import Human_resorces from "../../assets/Icons/Artboard53.svg";
import main_chatroom from "../../assets/Images/main_chatroom.svg";
import Homepage_button from "../button/Homepage_button";
import Coaches1 from "../../assets/Icons/Artboard26.svg";
import Coaches2 from "../../assets/Icons/Artboard27.svg";
import Coaches3 from "../../assets/Icons/Artboard28.svg";
import axios from "axios";
import User from "../../assets/Icons/user.png";
import { endpoints, imgPath } from "../services/endpoints";
import BookBtn from "../button/BookBtn/BookBtn";
import showToast from "../CustomToast/CustomToast";
import DefaultImg from "../../assets/Images/default.png"
import { generatePath , useNavigate } from "react-router-dom";


const Recommended_session = () => {
  // here we are going to get the list of coaching ;

  const [coachingList, setCoachingList] = useState([]);
  const [coachImgPath, setCoachImgPath] = useState("");
  const [allEnrolledCoachings, setAllEnrolledCoachings] = useState([]);
  const token = localStorage.getItem("token");
  const [selectedCoaching, setSelectedCoaching] = useState("");
  const [loading, setLoading] = useState(false);
  const [allWorkShopList, setAllWorkShopList] = useState([]);
  const [allEnrolledWorkshops, setAllEnrolledWorkshops] = useState([]);
  const [allRecommendList , setAllRecommendedList] = useState([])

  const navigate = useNavigate();


  const getCoachingList = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const url = endpoints.coaches.allCoachesList;

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data;
          var coachPath = res.data?.avatar_image_path;
          setCoachImgPath(coachPath);
          setCoachingList(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  const getAllEnrolledCoachings = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const url = endpoints.coaches.enrolledCoaching;

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          var val = res.data.data;
          setAllEnrolledCoachings(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  const bookCoaches = (coachData) => {
    var token = localStorage.getItem("token");
    if (token) {
      var id = coachData._id;
      var url = `${endpoints.coaches.enrollCoaching}${id}`;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      setSelectedCoaching(id);
      setLoading(true);

      axios
        .get(url, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            getAllEnrolledCoachings();
            showToast("Coaching booked successfully", "success");
          } else if (res.data.result == false) {
            showToast(res.data.message, "warning");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error here");
        });
    } else {
      showToast("Please login ", "warning");
    }
  };

  const getAllWorkshop = () => {
    const url = endpoints.workshop.allWorkshop;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          var val = res.data.data;
          setAllWorkShopList(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error h");
      });
  };

  const getAllEnrolledList = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = endpoints.workshop.myEnrolledWorkshop;

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data;
          setAllEnrolledWorkshops(val);
        }
      })
      .catch((err) => {
        console.log(err, "error here");
      });
  };

  const getAllRecommendedList = () =>{
    
  }

  useEffect(() => {
    getCoachingList();
    getAllEnrolledCoachings();
    getAllWorkshop();
    getAllEnrolledList();
    getAllRecommendedList();
  }, []);

  // writing code for enrolling the workshop

  const enrollWorkshop = (workShopData) => {
    const token = localStorage.getItem("token");
    if (token) {
      var id = workShopData._id;
      const url = `${endpoints.workshop.enrollWorkshop}${id}`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .get(url, { headers: headers })
        .then((res) => {
          if (res.data.result) {
            showToast("workshop enrolled successfully", "success");
            getAllEnrolledList();
          }
        })
        .catch((err) => {
          console.log(err, "error here");
        });
    } else {
      showToast("Please login", "warning");
    }
  };

  const showCoachDetails = (dta) => {
    const coachId = dta.created_by;
    const path = generatePath("/coach-Details/:coachId", { coachId: coachId });
    navigate(path);
  };

  const showWorkshopDetails = (dta) => {
    const workshopId = dta._id;
    const path = generatePath("/workshopDetails/:workshopId", {
      workshopId: workshopId,
    });
    navigate(path);
  };

  return (
    <>
      <div className="recommended_box">
        <div className="recommended_header">
          <h5>Recommended Session</h5>
        </div>
        <div className="recommended">
        <div className="coaches_heading">
            <h5>WORKSHOPS</h5>
          </div>
          {allWorkShopList.length != 0 &&
            allWorkShopList.map((workshop, index) => {
              var id = workshop._id;
              var timing = workshop.availability_timing;
              timing = timing.split(",");

              var enrollStatus = 3;

              var enrolled = allEnrolledWorkshops.filter((itm, ind) => {
                return itm.workshop_id == id;
              });

              if (enrolled.length != 0) {
                var datas = enrolled[0];
                var status = datas.status;
                enrollStatus = status;
              }
              const image = imgPath.workshop + workshop.image;
              var domain = workshop?.domain?.title;
              var industry = workshop?.industry?.title;
              var isPaid = workshop?.is_paid;
              var sessionType = workshop.payment_type == 1 ? "hour" : "session";

              return (
                <div className="recommended_details" onClick={() => showWorkshopDetails(workshop)}>
                  <div className="recommended_imgbox">
                    <img src={workshop?.image ? image : DefaultImg} alt="" />
                    <div className="recommended_name">
                      <h4>{workshop.title}</h4>
                      <h5>
                        {domain} & {industry}
                      </h5>
                      <div className="views_box">
                        <h5>
                          Total members : {workshop?.workshop_members_count}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div
                    className=" w-1 bookbtnBold"
                    style={{ marginRight: "-11px" }}
                  >
                    <BookBtn
                      status={enrollStatus}
                      onClick={() => enrollWorkshop(workshop)}
                      styles={{ height: "33px", fontSize: "13px" }}
                    />
                  </div>
                </div>
              );
            })}

          
          <div className="coaches_heading">
            <h5>COACHES</h5>
          </div>
          {coachingList &&
            coachingList.map((item, index) => {
              const coachImg = coachImgPath + "/" + item?.coach_info?.avtar;

              var coachInfo = item?.coach_info;
              var image = coachImgPath + "/" + coachInfo?.avtar;

              var coachingDomain = item?.domain?.title;
              var coachingIndustry = item?.industry?.title;
              var description = item?.coach_info?.description;
              var id = item._id;

              var bookingStatus = 3;
              var enrolled = allEnrolledCoachings.filter((itm, ind) => {
                return itm.coaching_id == id;
              });

              if (enrolled.length != 0) {
                var datas = enrolled[0];
                var status = datas.status;
                bookingStatus = status;
              }

              return (
                <div className="recommended_details cursor" key={index + 1} onClick={() => showCoachDetails(item)}>
                  <div className="recommended_imgbox" key={index}>
                    {item?.coach_info?.avtar ? (
                      <img src={image} alt="alternate" />
                    ) : (
                      <img src={DefaultImg} alt=""></img>
                    )}
                    <div className="recommended_name">
                      <h4>{item?.title}</h4>
                      <h5>
                        {coachingDomain} | {coachingIndustry}
                      </h5>

                      <div className="Coaches_views_box">
                        <span>{description}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className=" w-1 bookbtnBold"
                    style={{ marginRight: "-11px" }}
                  >
                    <BookBtn
                      status={bookingStatus}
                      onClick={() => bookCoaches(item)}
                      styles={{ height: "33px", fontSize: "13px" }}
                      // loading={selectedCoaching != item._id && loading}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Recommended_session;
