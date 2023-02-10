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
import { generatePath, useNavigate } from "react-router-dom";
import CreateCoachingForm from "../../Component/Modal/CreateCoachingForm/CreateCoachingForm";
import CustomFilter from "../CustomFilter/CustomFilter";
import useFetchCoachingsData from "../../assets/CustomHooks/useFetchCoachingsData";
import CreateBtn from "../../Component/button/CreateBtn/CreateBtn";
import NoDataImg from "../../assets/Images/noDataFound.png";

const CoachingCard = (props) => {
  const {
    data,
    bookingStatus,
    timing,
    showCoachingsOnCalendar,
    showBookBtn,
    coachImgPath,
    bookCoaches,
  } = props;

  const navigate = useNavigate();

  const showCoachDetails = (dta) => {
    const coachId = dta.created_by;
    const path = generatePath("/coach-Details/:coachId", { coachId: coachId });
    navigate(path);
  };

  var description = data?.coach_info?.description;
  var coachInfo = data?.coach_info;
  var image = coachImgPath + "/" + coachInfo?.avtar;

  const [showDescription, setshowDescription] = useState(false);

  return (
    <>
      <div class=" col-lg-6 col-md-12 col-12 ">
        <div className="card_large">
          <div className="card CoachScreen_coachesList">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-12 img-box">
                <div
                  class=" img-box img-placeholder"
                  onClick={() => showCoachDetails(data)}
                >
                  <img
                    src={coachInfo?.avtar ? image : dommy_person}
                    alt="#"
                    className="card__body-cover-image"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-5 col-12 nameBox">
                <div className="coachscreen_coachname position-relative">
                  <h5>
                    {data?.coach_info?.first_name} {data?.coach_info?.last_name}
                  </h5>
                  <GrPowerForceShutdown
                    onMouseOver={() => setshowDescription(true)}
                    onMouseOut={() => setshowDescription(false)}
                  />
                  {showDescription && (
                    <div className="coachDesc">{description}</div>
                  )}
                </div>
                <h6>Title</h6>
                <p className="text-capitalize">{data.title}</p>
                <h6>Country</h6>
                <p>{data.coach_info?.nationality}</p>
                <h6> Expertise</h6>
                <p>
                  {coachInfo?.category} | {coachInfo?.subCategory}
                </p>
              </div>
              <div className="col-lg-5  col-md-4 col-12 availabilityBox">
                <div className="coaches_homescreen_availbalilityInner">
                  <h6>Availability </h6>
                  <h5
                    style={{ marginLeft: "9px" }}
                    onClick={() => showCoachingsOnCalendar(data)}
                  >
                    <span style={{ marginRight: "10px" }}> :</span>
                    <BsFillCalendarDateFill color="#2c6959" size={17} />
                  </h5>
                </div>
                <div className="coaches_homescreen_availbalilityInner">
                  <h6>TimeSlot</h6>
                  <h5>
                    :{timing?.[0]} to {timing?.[1]}
                  </h5>
                </div>

                <div className="coaches_homescreen_availbalilityInner">
                  <h6>Price </h6>{" "}
                  <h5>
                    {" "}
                    :<span> $</span> {data.price}{" "}
                    {data.payment_type == "1" ? "Hourly" : "Sessional"}
                  </h5>
                </div>

                {showBookBtn && (
                  <div className="coachesScreenBook">
                    <BookBtn
                      status={bookingStatus}
                      onClick={() => bookCoaches(data)}
                      styles={{ position: "absolute" }}
                    />
                  </div>
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
  const [inputData, setInputData] = useState("");
  const [allEnrolledWorkshops, setAllEnrolledWorkshops] = useState([]);
  const [showBookCoachesSlot, setBookCoachesSlot] = useState(false);
  const [showCoachingsForm, setShowCoachingsForm] = useState(false);
  const [coachImgPath, setCoachImgPath] = useState("");
  const logedIn = localStorage.getItem("logedIn");

  const allCoachesList = useFetchCoachingsData(
    endpoints.coaches.allCoachingList
  );

  var userDetails = localStorage.getItem("users");
  var userType = JSON.parse(userDetails);
  userType = userType?.user_type;

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
          var coachPath = res.data?.avatar_image_path;
          setCoachImgPath(coachPath);
          setAllCoachings(val);
          setCoachingListToBeShown(val);
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

  const bookCoaches = (coachData) => {
    if (logedIn) {
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
            getMyCoachingsList();
            getAllEnrolledCoachings();
            toast("Coaching booked successfully", { type: "success" });
          } else if (res.data.result == false) {
            toast(res.data.message, { type: "warning" });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error here");
        });
    } else {
      toast("Please login ", { type: "warning" });
    }
  };

  // 0/1/2/3=Cancelled/Pending/Confirmed/booknow;

  // writing code for filtering the coachings ;

  const handleShowAllCoachings = () => {
    setShowAllCoaching(true);
    setCoachingListToBeShown(allCoachings);
  };

  const handleShowMyCoachings = () => {
    setShowAllCoaching(false);
    setCoachingListToBeShown(myCoachings);
  };

  const handleFilterCoachings = (val) => {
    var value = val.toLowerCase();
    setInputData(val);
    if (showAllCoaching) {
      var filteredData = allCoachings.filter((item, index) => {
        return item.title.toLowerCase().includes(value);
      });
      setCoachingListToBeShown(filteredData);
    } else {
      var filteredData = myCoachings.filter((item, index) => {
        return item.title.toLowerCase().includes(value);
      });
      setCoachingListToBeShown(filteredData);
    }
  };

  console.log(logedIn, "logedIn");

  return (
    <>
      <Homepage_header />

      <section className="coachScreen">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 d-lg-block d-none coachScreen_left">
              <h5 style={{ marginBottom: "20px" }}>Book Coaches</h5>
              <CustomFilter />
            </div>
            <div className="col-lg-10 col-md-12 col-12 coachScreen_right">
              <div className="row">
                <div className="col-lg-7 col-md-12 col-12">
                  <div className="coach_searchBar ">
                    <div className="form-group ">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search Here"
                        value={inputData}
                        onChange={(e) => handleFilterCoachings(e.target.value)}
                      />
                      <HiSearch id="coach_search" />
                    </div>
                  </div>
                </div>

                {logedIn && userType == 2 && (
                  <>
                    <div className="coachBtnCont col-5">
                      <button
                        className="coachingBtn"
                        style={{
                          background: showAllCoaching ? "#2c6959" : "white",
                          color: showAllCoaching ? "white" : "#2c6959",
                        }}
                        onClick={handleShowAllCoachings}
                      >
                        All
                      </button>

                      <button
                        className="coachingBtn"
                        style={{
                          background: !showAllCoaching ? "#2c6959" : "white",
                          color: !showAllCoaching ? "white" : "#2c6959",
                        }}
                        onClick={handleShowMyCoachings}
                      >
                        My workshops
                      </button>

                      <CreateBtn onClick={() => setShowCoachingsForm(true)} />
                    </div>
                  </>
                )}
              </div>

              <div className="row ">
                {coachingListToBeShown.length != 0 &&
                  coachingListToBeShown.map((data, index) => {
                    var id = data._id;
                    var timing = data?.availability_timing;
                    timing = timing ? timing?.split(",") : null;

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
                          showBookBtn={showAllCoaching}
                          key={index}
                          coachImgPath={coachImgPath}
                          bookCoaches={bookCoaches}
                          showCoachingsOnCalendar={showCoachingsOnCalendar}
                        />
                      </>
                    );
                  })}

               
              </div>

              {coachingListToBeShown.length == 0 && (
                  <div className="noDataCont">
                    <img src={NoDataImg} alt="" />
                  </div>
                )}
                
            </div>
          </div>
        </div>
      </section>

      <CustomCalendar
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        eventsToBeShown={eventsToBeShown}
      />

      <BookCoaches
        BookCoachesShow={showBookCoachesSlot}
        setBookCoachesShow={showBookCoachesSlot}
      />

      <CreateCoachingForm
        showCoachingsForm={showCoachingsForm}
        setShowCoachingsForm={setShowCoachingsForm}
      />

      <Footer />
    </>
  );
};

export default Coaches_homeScreen;
