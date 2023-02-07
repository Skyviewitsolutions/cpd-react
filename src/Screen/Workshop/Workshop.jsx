import React, { useEffect, useState } from "react";
import "./Workshop.css";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import "../../fonts/Inter-Bold.ttf";
import "../../fonts/Inter-Regular.ttf";
import { HiSearch } from "react-icons/hi";
import eye from "../../assets/Images/eye.svg";
import { CgHeart } from "react-icons/cg";
import workshop_bannerImage from "../../assets/Images/workshop_bannerImage.png";
import dommy_workshopImage from "../../assets/Images/dommy_workshopImage.png";
import WorkshsopSidenav from "./WorkshsopSidenav";
import WorkshopEnroll from "../../Component/Modal/WorkshopEnroll/WorkshopEnroll";
import { endpoints } from "../../Component/services/endpoints";
import axios from "axios";
import { BsFillCalendarDateFill } from "react-icons/bs";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";
import { toast } from "react-toastify";
import BookBtn from "../../Component/button/BookBtn/BookBtn";
import { generatePath , useNavigate } from "react-router-dom";


const WorkshopCard = (props) => {

  const {
    workshop,
    showWorkshopOnCalendar,
    enrollWorkshop,
    enrollStatus,
    img,
    showBookBtn,
    key,
  } = props;
  const navigate = useNavigate()

  const showCoachDetails = (dta) => {
    const coachId = dta.created_by;
    const path = generatePath("/coach-Details/:coachId", { coachId: coachId });
    navigate(path);
  };

  return (
    <>
      <div className="col-lg-4 col-md-12 col-12 workshop-card " key={key} onClick={() => showCoachDetails(workshop)}>
        <div className="card">
          <div className="workshopcard_media">
            <img src={workshop.image ? img : dommy_workshopImage} alt="" />
            <div className="tags_onImage">
              <h6>Workshop</h6>
            </div>
          </div>
          <div className="workshopcard_descriptionBox">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4>{workshop.title}</h4>
              <h6>
                Availability :{" "}
                <span
                  style={{ marginLeft: "9px" }}
                  onClick={() => showWorkshopOnCalendar(workshop)}
                >
                  <BsFillCalendarDateFill color="#2c6959" size={17} />
                </span>
              </h6>
            </div>

            <div className="workshop_FreeBox">
              {/* <h6>{(workshop.is_paid == 1 )? "Paid" : "Free"}</h6> */}
              <div className="viewDetailsBox"></div>
            </div>
            <div className="domainBox">
              <h6>Price : {workshop.price} $</h6>
              <h6>Domain : {workshop?.domain_info?.title}</h6>
            </div>
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h6 id="enrolled col-7">
                Currently Enrolled ({workshop.workshop_members_count}/
                {workshop.max_members})
              </h6>
              <div className="col-5">
              {showBookBtn && (
                <BookBtn
                  status={enrollStatus}
                  onClick={() => enrollWorkshop(workshop)}
                  styles={{
                    height: "30px",
                    paddingTop: "2px",
                  }}
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

const Workshop = () => {

  const navigate = useNavigate("");
  const [modalShow, setModalShow] = React.useState(false);
  const token = localStorage.getItem("token");
  const [allWorkShopList, setAllWorkShopList] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);
  const [eventsToBeShown, setEventsToBeShown] = useState([]);
  const [myEnrolledWorkshop, setMyEnrolledWorkshop] = useState([]);
  const [myWorkshopList, setMyWorkshopList] = useState([]);
  const [showAllWorkshop, setShowAllWorkshop] = useState(true);
  var userDetails = localStorage.getItem("users");
  var userType = JSON.parse(userDetails);
  userType = userType.user_type;

  //  getting workshop list ;

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
          var imgPath = res.data.workshop_image_path;
          setImagePath(imgPath);
          setAllWorkShopList(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error h");
      });
  };

  // handling calendar to show workshop on calendar;

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

  var getDates = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  // get all days of the month ;

  const getDaysOfMonth = async (day, num) => {
    var d = new Date();
    var getTot = daysInMonth(d.getMonth() + num, d.getFullYear()); //Get total
    var date = [];
    for (var i = 1; i <= getTot; i++) {
      //looping through days in month
      var newDate = new Date(d.getFullYear(), d.getMonth() + num, i);
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

  const showWorkshopOnCalendar = async (data) => {
    setShowCustomCalendar(true);

    var availability_type = data.availability_type;
    var slots = JSON.parse(data.availability_slot);
    var isRepeated = data.is_repeated == "1" ? true : false;
    var title = data?.title;

    var selectedDays = slots.days;
    var duration = slots.duration;
    var startTime = slots.startTime;
    var startDate = slots.startDate;
    var endDate = slots.endDate;
    var endTime = slots.endTime;

    var events = [];

    var strtTime = startTime.slice(0, 2);
    var edTime = endTime.slice(0, 2);

    var hoursPerDay = edTime - strtTime;
    var totalDaysRequired = Math.ceil(duration / hoursPerDay);

    if (availability_type === "1") {
      var dateArray = [];
      for (var i = 0; i < selectedDays.length; i++) {
        var daysNum = allDays.indexOf(selectedDays[i]);

        for (var j = 0; j < 3; j++) {
          var dates = await getDaysOfMonth(daysNum, j);
          dateArray.push(...dates);
        }
      }

      dateArray = dateArray.map((itm, index) => {
        var dta = itm.getTime();
        return dta;
      });
      dateArray.sort();
      dateArray = dateArray.map((itm, index) => {
        var dta = new Date(itm);
        return dta;
      });

      dateArray = dateArray.slice(0, totalDaysRequired);

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

      var allDates = [];
      var startMonth = new Date(startDate).getMonth();

      var dates = await getDates(startDate, endDate);

      for (var j = 0; j < dates.length; j++) {
        var count = 11 - startMonth;
        var date = await buildDates(dates[j], count);
        allDates.push(...date);
      }

      allDates = allDates.slice(0, totalDaysRequired);
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
  };

  // writing code for enrolling the workshop

  const enrollWorkshop = (workShopData) => {
    var id = workShopData._id;
    const url = `${endpoints.workshop.enrollWorkshop}${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          toast("workshop enrolled successfully", { type: "success" });
          getAllEnrolledList();
        }
      })
      .catch((err) => {
        console.log(err, "error here");
      });
  };

  // getting all the enrolled workshop list;

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
          setMyEnrolledWorkshop(val);
        }
      })
      .catch((err) => {
        console.log(err, "error here");
      });
  };

  const getMyWorkshop = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = endpoints.workshop.myWorkshop;

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data;
          setMyWorkshopList(val);
        }
      })
      .catch((err) => {
        console.log(err, "error here");
      });
  };

  useEffect(() => {
    getAllEnrolledList();
    getAllWorkshop();
    if (userType == 2) {
      getMyWorkshop();
    }
  }, []);

  // 0/1/2/3=Cancelled/Pending/Confirmed/booknow

  return (
    <>
      <Homepage_header />
      <div className="workshopwiper">
        <section className="Workshop_section1">
          <div className="row ">
            <div className="col-lg-8 col-md-7 col-12 workshop_headingblock ">
              <h1>Enroll Workshop</h1>
              <h5>Identify The Skills Yor Need To Advance Your Career</h5>
              <h6>Search For The Most Popular Workshops Skills Here</h6>
            </div>
            <div className="col-lg-4 col-md-5 col-12 ">
              <div className="workshop_imageblock">
                <img src={workshop_bannerImage} />
              </div>
            </div>
          </div>
          <div className="row workshop_searchBox">
            <div className="col-12 col-md-12 col-lg-4">
              <h5>This Week's Top Enroll Workshop</h5>
            </div>
            <div className="col-12 col-md-12 col-lg-8">
              <div className="workshop_searchBar d-flex justify-content-around">
                <div className="form-group d-flex position-relative col-lg-6 col-12">
                  <HiSearch id="workshop_search" />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Here"
                  />
                </div>
                {userType == 2 && (
                  <div className="row d-flex col-5 ml-4 justify-content-around">
                    <button
                      className="coachingBtn"
                      style={{
                        background: showAllWorkshop ? "#2c6959" : "white",
                        color: showAllWorkshop ? "white" : "#2c6959",
                      }}
                      onClick={() => setShowAllWorkshop(true)}
                    >
                      All
                    </button>
                    <button
                      className="coachingBtn"
                      style={{
                        background: !showAllWorkshop ? "#2c6959" : "white",
                        color: !showAllWorkshop ? "white" : "#2c6959",
                      }}
                      onClick={() => setShowAllWorkshop(false)}
                    >
                      My workshops
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="Workshop_section2">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-12 ">
              <WorkshsopSidenav />
            </div>
            <div className="col-lg-9 col-md-12 col-12 ">
              <div className="row">
                {showAllWorkshop &&
                  allWorkShopList.length != 0 &&
                  allWorkShopList.map((workshop, index) => {
                    const img = `${imagePath}/${workshop.image}`;
                    var id = workshop._id;
                    var timing = workshop.availability_timing;
                    timing = timing.split(",");

                    var enrollStatus = 3;

                    var enrolled = myEnrolledWorkshop.filter((itm, ind) => {
                      return itm.workshop_id == id;
                    });

                    if (enrolled.length != 0) {
                      var datas = enrolled[0];
                      var status = datas.status;
                      enrollStatus = status;
                    }
                    return (
                      <>
                        <WorkshopCard
                          workshop={workshop}
                          showWorkshopOnCalendar={showWorkshopOnCalendar}
                          enrollWorkshop={enrollWorkshop}
                          enrollStatus={enrollStatus}
                          img={img}
                          key={index}
                          showBookBtn={true}
                        />
                      </>
                    );
                  })}

                {!showAllWorkshop &&
                  myWorkshopList.map((workshop, index) => {
                    const img = `${imagePath}/${workshop.image}`;
                    var id = workshop._id;
                    var timing = workshop.availability_timing;
                    timing = timing.split(",");

                    var enrollStatus = 3;

                    var enrolled = myEnrolledWorkshop.filter((itm, ind) => {
                      return itm.workshop_id == id;
                    });

                    if (enrolled.length != 0) {
                      var datas = enrolled[0];
                      var status = datas.status;
                      enrollStatus = status;
                    }

                    return (
                      <>
                        <WorkshopCard
                          workshop={workshop}
                          showWorkshopOnCalendar={showWorkshopOnCalendar}
                          enrollWorkshop={enrollWorkshop}
                          enrollStatus={enrollStatus}
                          img={img}
                          key={index}
                          showBookBtn={false}
                        />
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* <WorkshopEnroll show={true} onHide={() => setModalShow(false)} /> */}
          <CustomCalendar
            showCalendar={showCustomCalendar}
            setShowCalendar={setShowCustomCalendar}
            eventsToBeShown={eventsToBeShown}
            setEventsToBeShown={setEventsToBeShown}
          />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Workshop;
