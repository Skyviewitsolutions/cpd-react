import React, { useEffect, useState } from "react";
import "./Coaches_homeScreen.css";
import dommy_person from "../../assets/Images/dommy_person.jfif";
import time from "../../assets/Images/time.svg";
import "../../fonts/Inter-Bold.ttf";
import "../../fonts/Inter-Regular.ttf";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import { HiSearch } from "react-icons/hi";
import Sidenavbar from "../../Component/navbar/Sidenavbar";
import { GrPowerForceShutdown } from "react-icons/gr";
import BookCoaches from "../../Component/Modal/BookCoaches/BookCoaches";
import { endpoints } from "../../Component/services/endpoints";
import axios from "axios";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import BookBtn from "../../Component/button/BookBtn/BookBtn";
import { generatePath , useNavigate } from "react-router-dom";


const CoachingCard = (props) => {

  
  const {
    data,
    bookingStatus,
    timing,
    showCoachingsOnCalendar,
    showBookBtn,
    bookCoaches,
  }  = props;

  const navigate = useNavigate();

  const showCoachDetails = (dta) =>{
    const coachId = dta.created_by;
    const path = generatePath("/coach-Details/:coachId" , {coachId : coachId});
    navigate(path)
  }
  
  return (
    <>
      <div class=" col-lg-6 col-md-12 col-12 ">
        <div className="card_large">
          <div className="card CoachScreen_coachesList">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-12 img-box">
                <div class=" img-box img-placeholder" onClick={() => showCoachDetails(data)}>
                  <img
                    src={dommy_person}
                    alt="#"
                    className="card__body-cover-image"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-5 col-12 nameBox">
                <div className="coachscreen_coachname">
                  <h5>
                    {data?.coach_info?.first_name} {data?.coach_info?.last_name}
                  </h5>
                </div>

                <h6>Country</h6>
                <p>{data.coach_info?.nationality}</p>
                <h6> Expertise</h6>
                <p>
                  {data?.coach_info?.job_title[0]} |{" "}
                  {data?.coach_info?.industry[0]}
                </p>
              </div>
              <div className="col-lg-5  col-md-4 col-12 availabilityBox">
                <h6>
                  Availability :{" "}
                  <span
                    style={{ marginLeft: "9px" }}
                    onClick={() => showCoachingsOnCalendar(data)}
                  >
                    <BsFillCalendarDateFill color="#2c6959" size={17} />
                  </span>
                </h6>
                <h6>
                  TimeSlot :{" "}
                  <span>
                    {" "}
                    {timing[0]} to {timing[1]}
                  </span>
                </h6>
                <h6>
                  Price :<span> $</span>{" "}
                  <span>
                    {data.price}{" "}
                    {data.payment_type == "1" ? "Hourly" : "Sessional"}
                  </span>
                </h6>

                {showBookBtn && (
                  <BookBtn
                    status={bookingStatus}
                    onClick={() => bookCoaches(data)}
                    styles={{ position: "absolute" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Coaches_homeScreen = () => {

  const [showCalendar, setShowCalendar] = useState(false);
  const [allCoachings, setAllCoachings] = useState([]);
  const [eventsToBeShown, setEventsToBeShown] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [allEnrolledCoachings, setAllEnrolledCoachings] = useState([]);
  const [showAllCoaching, setShowAllCoaching] = useState(true);
  const [myCoachings, setMyCoachings] = useState([]);
  const [coachingListToBeShown, setCoachingListToBeShown] = useState([]);
  var userDetails = localStorage.getItem("users");
  var userType = JSON.parse(userDetails);
  userType = userType.user_type;


  const getCoachingList = () => {

    const token = localStorage.getItem("token");
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
          setAllCoachings(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  // get all days of the month ;

  var allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getDaysOfMonth = async (day) => {
    var d = new Date();
    var getTot = daysInMonth(d.getMonth(), d.getFullYear()); //Get total
    var date = [];
    for (var i = 1; i <= getTot; i++) {
      //looping through days in month
      var newDate = new Date(d.getFullYear(), d.getMonth(), i);
      if (newDate.getDay() == day) {
        date.push(newDate);
      }
    }

    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
    return date;
  };

  // get selected dates of thee year ;

  const buildDates = async (startDate, months) => {
    return Array.from(
      {
        length: months,
      },
      function (_, i) {
        var date = new Date(startDate.getTime());
        var mnth = date.getMonth();
        date.setMonth(mnth + i);
        if (date.getMonth() !== (mnth + i) % 12) {
          date.setDate(0);
        }
        return date;
      }
    );
  };

  const showCoachingsOnCalendar = async (data) => {
    setShowCalendar(true);
    var events = [];

    var availability_type = data.availability_type;
    var slots = JSON.parse(data.availability_slot);
    var isRepeated = data.is_repeated == "1" ? true : false;
    var title = data?.title;

    if (availability_type === "1") {
      var dateArray = [];
      var selectedDays = slots.days;
      var startTime = slots.startTime;
      var startDate = slots.startDate;
      var endDate = slots.endDate;
      var endTime = slots.endTime;

      if (isRepeated) {
        for (var i = 0; i < selectedDays.length; i++) {
          var daysNum = allDays.indexOf(selectedDays[i]);
          var dates = await getDaysOfMonth(daysNum);
          dateArray.push(...dates);
        }
      } else {
        for (var i = 0; i < selectedDays.length; i++) {
          var daysNum = allDays.indexOf(selectedDays[i]);
          var dates = await getDaysOfMonth(daysNum);
          dates = dates[0];
          dateArray.push(dates);
        }
      }

      var endDate = slots.endDate;

      if (endDate) {
        var filteredDate = dateArray.filter((date, index) => {
          console.log(new Date(endDate).getTime(), "enddd");
          return date.getTime() < new Date(endDate).getTime();
        });
        dateArray = filteredDate;
      }

      dateArray.map((itm) => {
        var date = itm.getDate() < 10 ? `0${itm.getDate()}` : itm.getDate();
        var month =
          itm.getMonth() + 1 < 10
            ? `0${itm.getMonth() + 1}`
            : itm.getDate() + 1;
        var year = itm.getFullYear();

        var startDte = `${year}-${month}-${date}T${startTime}`;
        var endDte = `${year}-${month}-${date}T${endTime}`;

        var evnt = {
          start: new Date(startDte),
          end: new Date(endDte),
          title: title,
        };

        events.push(evnt);
      });
      setEventsToBeShown(events);
    } else if (availability_type === "2") {
      var dateArray = [];
      var selectedDates = slots.dates;
      var startTime = slots.startTime;
      var startDate = slots.startDate;
      var endDate = slots.endDate;
      var endTime = slots.endTime;

      if (isRepeated) {
        var allDates = [];
        var startMonth = new Date(startDate).getMonth();

        // var dates = await getDates(startDate, endDate);

        var currentDate = new Date();
        var mm = currentDate.getMonth() + 1;
        var yyyy = currentDate.getFullYear();

        var dates = selectedDates.map((num, index) => {
          var numm = num.length < 2 ? `0${num}` : num;
          var createdDate = `${mm}/${numm}/${yyyy}`;
          var date = new Date(createdDate);
          return date;
        });

        for (var j = 0; j < dates.length; j++) {
          var count = 11 - startMonth;
          var date = await buildDates(dates[j], count);
          allDates.push(...date);
        }

        allDates.map((itm) => {
          var date = itm.getDate() < 10 ? `0${itm.getDate()}` : itm.getDate();
          var month =
            itm.getMonth() + 1 < 10
              ? `0${itm.getMonth() + 1}`
              : itm.getDate() + 1;
          var year = itm.getFullYear();
          var startDte = `${year}-${month}-${date}T${startTime}`;
          var endDte = `${year}-${month}-${date}T${endTime}`;

          var evnt = {
            start: new Date(startDte),
            end: new Date(endDte),
            title: "Event 1",
          };

          events.push(evnt);
        });
        setEventsToBeShown(events);
      } else {
        var currentDate = new Date();
        var mm = currentDate.getMonth() + 1;
        var yyyy = currentDate.getFullYear();

        var allDates = selectedDates.map((num, index) => {
          var numm = num.length < 2 ? `0${num}` : num;
          var createdDate = `${mm}/${numm}/${yyyy}`;
          var date = new Date(createdDate);
          return date;
        });

        allDates.map((itm) => {
          var date = itm.getDate() < 10 ? `0${itm.getDate()}` : itm.getDate();
          var month =
            itm.getMonth() + 1 < 10
              ? `0${itm.getMonth() + 1}`
              : itm.getDate() + 1;
          var year = itm.getFullYear();
          var startDte = `${year}-${month}-${date}T${startTime}`;
          var endDte = `${year}-${month}-${date}T${endTime}`;

          var evnt = {
            start: new Date(startDte),
            end: new Date(endDte),
            title: title,
          };

          events.push(evnt);
        });
        setEventsToBeShown(events);
      }
    }
  };

  const bookCoaches = (coachData) => {
    var id = coachData._id;
    var url = `${endpoints.coaches.enrollCoaching}${id}`;

    console.log(url);

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
          toast("Coaching booked successfully", { type: "success" });
        } else if (res.data.result == false) {
          toast(res.data.message, { type: "warning" });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "this is the error here");
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

  const getMyCoachingsList = () => {
    const url = endpoints.coaches.myCoachings;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          var val = res.data.data;
          setMyCoachings(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    getAllEnrolledCoachings();
    getCoachingList();
    if (userType == 2) {
      getMyCoachingsList();
    }
  }, []);

  // 0/1/2/3=Cancelled/Pending/Confirmed/booknow;

  return (
    <>
      <Homepage_header />

      <section className="coachScreen">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 d-lg-block d-none coachScreen_left">
              <h5>Book Coaches</h5>
              <Sidenavbar />
            </div>
            <div className="col-lg-10 col-md-12 col-12 coachScreen_right">
              <div className="coach_searchBar d-flex justify-content-around">
                <div className="form-group d-flex position-relative col-lg-6 col-12">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Here"
                  />
                  <HiSearch id="coach_search" />
                </div>
                {userType == 2 && (
                  <div className="row d-flex col-5 ml-4 justify-content-around">
                    <button
                      className="coachingBtn"
                      style={{
                        background: showAllCoaching ? "#2c6959" : "white",
                        color: showAllCoaching ? "white" : "#2c6959",
                      }}
                      onClick={() => setShowAllCoaching(true)}
                    >
                      All
                    </button>
                    <button
                      className="coachingBtn"
                      style={{
                        background: !showAllCoaching ? "#2c6959" : "white",
                        color: !showAllCoaching ? "white" : "#2c6959",
                      }}
                      onClick={() => setShowAllCoaching(false)}
                    >
                      My coachings
                    </button>
                  </div>
                )}
              </div>

              <div className="row ">
                {/* here we are getting all the coachings lister */}
                {showAllCoaching == false &&
                  myCoachings.length != 0 &&
                  myCoachings.map((data, index) => {
                    var id = data._id;
                    var timing = data.availability_timing;
                    timing = timing.split(",");

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
                      <>
                        <CoachingCard
                          data={data}
                          bookingStatus={bookingStatus}
                          timing={timing}
                          showBookBtn={false}
                          bookCoaches={bookCoaches}
                          showCoachingsOnCalendar={showCoachingsOnCalendar}
                        />
                      </>
                    );
                  })}

                {showAllCoaching == true &&
                  allCoachings.length != 0 &&
                  allCoachings.map((data, index) => {
                    var id = data._id;
                    var timing = data.availability_timing;
                    timing = timing.split(",");

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
                      <>
                        <CoachingCard
                          data={data}
                          bookingStatus={bookingStatus}
                          timing={timing}
                          bookCoaches={bookCoaches}
                          showBookBtn={true}
                          showCoachingsOnCalendar={showCoachingsOnCalendar}
                        />
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CustomCalendar
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        eventsToBeShown={eventsToBeShown}
      />
      <Footer />
    </>
  );
};

export default Coaches_homeScreen;
