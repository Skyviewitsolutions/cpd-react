import React, { useState, useEffect } from "react";
import "./CoachDetails.css";
import dommyperson from "../../assets/Images/dommyperson.jpg";
import coachesDetailscardimages from "../../assets/Images/coachesDetailscardimages.jpg";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import { BsCalendarDateFill } from "react-icons/bs";
import { endpoints } from "../../Component/services/endpoints";
import { useParams } from "react-router-dom";
import UserImg from "../../assets/Images/user.jpeg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import BookBtn from "../../Component/button/BookBtn/BookBtn";
import { generatePath, useNavigate } from "react-router-dom";
import NoDataImg from "../../assets/Images/noDataFound.png";
import CoachingCard from "../../Component/CoachingCard/CoachingCard";
import { getCalendarData } from "../../utils/calendar";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";
import showToast from "../../Component/CustomToast/CustomToast";
import Loader from "../../Component/Loader/Loader";
import DefaultImg from "../../assets/Images/default.png";


const CoachesDetails = () => {

  const [allCoachings, setAllCoachings] = useState([]);
  const [allWorkshops, setAllWorkshops] = useState([]);
  const [coachingImgPath, setCoachingImgPath] = useState("");
  const [workshopImgPath, setWorkshopImgPath] = useState("");
  const [coachImgPath, setCoachImgPath] = useState("");
  const [eventsToBeShown, setEventsToBeShown] = useState([]);
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);
  const [myEnrolledCoachings, setMyEnrolledCoachings] = useState([]);
  const [myEnrolledWorkshops, setMyEnrolledWorkshops] = useState([]);
  const [coachDetails, setCoachDetails] = useState({
    first_name: "",
    last_name: "",
    subCategory: "",
    category: "",
    avatar: "",
  });

  const [loading, setLoading] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { coachId } = useParams();

  const getCoachings = () => {
    const url = `${endpoints.coaches.coachingsByCoachId}${coachId}`;
    setLoading(true)
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false)
        if (res.data.result) {
          var data = res.data.data;
          var path = res.data.coaching_image_path;
          setCoachingImgPath(path);
          setAllCoachings(data);
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err, "this is the error");
      });
  };

  // 63db41c1048b6f3a6a00c382;

  const getWorkshops = () => {
    const url = `${endpoints.workshop.WorkshopByCoachId}${coachId}`;
    setLoading(true)
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false)
        if (res.data.result) {
          var data = res.data.data;
          var path = res.data.workshop_image_path;
          setWorkshopImgPath(path);
          setAllWorkshops(data);
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err, "this is the error");
      });
  };

  const getCoachDetails = () => {
    const url = `${endpoints.authentication.getProfileByID}?user_id=${coachId}`;
    setLoading(true)
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false)
        if (res.data.result) {
          var data = res.data.data[0];
          var imagePath = res.data.avtarPath;
          setCoachImgPath(imagePath);
          setCoachDetails((itm) => {
            return { ...itm, ...data };
          });
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err, "this is the error of details");
      });
  };

  const getAllEnrollWorkshops = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const url = endpoints.workshop.myEnrolledWorkshop;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          var val = res.data.data;
          setMyEnrolledWorkshops(val);
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
          setMyEnrolledCoachings(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    if (coachId) {
      getCoachings();
      getWorkshops();
      getCoachDetails();
      getAllEnrollWorkshops();
      getAllEnrolledCoachings();
    }
  }, []);

  const enrollWorkshop = (workShopData) => {
    var id = workShopData._id;
    const url = `${endpoints.workshop.enrollWorkshop}${id}`;

    if(token){
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(url, { headers: headers })
      .then((res) => {
        console.log(res, "this is the response");
        if (res.data.result) {
          showToast("workshop enrolled successfully",  "success" );
          getAllEnrollWorkshops();
          getWorkshops();
        } else if (res.data.result == false) {
          showToast(res.data.message,  "warning" );
        }
      })
      .catch((err) => {
        console.log(err, "error here");
      });
    }
    else {
      showToast("Please login" ,  "warning")
    }
  };

  const bookCoaches = (coachData) => {

    var id = coachData._id;
    var url = `${endpoints.coaches.enrollCoaching}${id}`;

    if (token) {
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
            getAllEnrolledCoachings();
            showToast("Coaching booked successfully",  "success" );
          } else if (res.data.result == false) {
            showToast(res.data.message,  "warning" );
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error here");
        });
    }
    else {
      showToast("Please login" ,  "warning")
    }
  };

  const showWorkshopDetails = (dta) => {
    const workshopId = dta._id;
    const path = generatePath("/workshopDetails/:workshopId", {
      workshopId: workshopId,
    });
    navigate(path);
  };

  const showCoachingDetails = (dta) => {
    const coachingId = dta._id;
    const path = generatePath("/coachingDetails/:coachingId", {
      coachingId: coachingId,
    });
    navigate(path);
  };

  const showWorkshopOnCalendar = async (data) => {
    setEventsToBeShown([])
    var slots = JSON.parse(data.availability_slot);
    const calendarData = await getCalendarData(slots);
    setEventsToBeShown(calendarData);
    setShowCustomCalendar(true);
  };


  // getting domain and industry of coach ;

  var domain = coachDetails?.domain?.[0];
  var industry = coachDetails?.industry?.[0];

  return (
    <>
      <Homepage_header />
      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-12 col-md-12 col-12 explore">
            <h5>Explore Coaching and Workshop</h5>
          </div>
        </div>
      </div>
      <div className="coachesDetailsWrapper">
        <section className="coachesDetailsSection1">
          <div className="coachesDetailsimagesBox">
            <img
              src={
                coachDetails?.avtar
                  ? `${coachImgPath}${coachDetails?.avtar}`
                  : DefaultImg
              }
              alt=""
            />
          </div>

          <div className="coachesDetailsDescription">
            <h4>
              Coach Name :{" "}
              <span style={{ color: "#2c6959" }}>
                {coachDetails.first_name} {coachDetails.last_name}
              </span>
            </h4>
            <h6>
              Speacility : {domain} | {industry}
            </h6>
            <p>{coachDetails.description}</p>
          </div>
        </section>
        <section className="Workshop_section2">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 ">
              <h5 className="coachesDetailsheading">Coaching List</h5>
              <div className="row">
                {allCoachings.length != 0 &&
                  allCoachings.map((coaching, index) => {
                    var id = coaching._id;
                    var enrolled = myEnrolledCoachings.filter((itm, ind) => {
                      return itm.coaching_id == id;
                    });

                    var image = coachingImgPath + "/" + coaching.image;
                   
                    var bookingStatus = 3;
                    if (enrolled.length != 0) {
                      var datas = enrolled[0];
                      var status = datas.status;
                      bookingStatus = status;
                    }

                    return (
                      <>
                        <div className="col-lg-3 col-md-6 col-12 workshop-card">
                          <CoachingCard
                            coaching={coaching}
                            key={index}
                            image={image}
                            imageName={coaching.image}
                            bookCoaches={bookCoaches}
                            showBookBtn={true}
                            bookingStatus={bookingStatus}
                            showWorkshopOnCalendar={showWorkshopOnCalendar}
                            showCoachingDetails={showCoachingDetails}
                          />
                        </div>
                      </>
                    );
                  })}

                {allCoachings.length == 0 && (
                  <div className="noDataCont">
                    <img src={NoDataImg} alt="" />
                  </div>
                )}
                <div className="viewDetailsBox"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="Workshop_section2">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12 ">
              <h5 className="coachesDetailsheading">Workshop List</h5>
              <div className="row">
                {allWorkshops.length != 0 &&
                  allWorkshops.map((workshop, index) => {
                    var id = workshop._id;

                    var enrollStatus = 3;

                    var enrolled = myEnrolledWorkshops.filter((itm, ind) => {
                      return itm.workshop_id == id;
                    });

                    if (enrolled.length != 0) {
                      var datas = enrolled[0];
                      var status = datas.status;
                      enrollStatus = status;
                    }

                    var image = workshopImgPath + "/" + workshop.image;

                    return (
                      <>
                        <div className="col-lg-3 col-md-6 col-12 workshop-card">
                          <WorkshopCard
                            workshop={workshop}
                            key={index}
                            img={image}
                            imageName={workshop.image}
                            showCoachDetails={showWorkshopDetails}
                            enrollWorkshop={enrollWorkshop}
                            enrollStatus={enrollStatus}
                            showWorkshopOnCalendar={showWorkshopOnCalendar}
                            showBookBtn={true}
                          />
                        </div>
                      </>
                    );
                  })}

                {allWorkshops.length == 0 && (
                  <div className="noDataCont">
                    <img src={NoDataImg} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <CustomCalendar
            showCalendar={showCustomCalendar}
            setShowCalendar={setShowCustomCalendar}
            eventsToBeShown={eventsToBeShown}
          />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CoachesDetails;
