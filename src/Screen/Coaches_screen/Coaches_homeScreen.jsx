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
import CustomFilter from "../../Component/CustomFilter/CustomFilter";
import useFetchCoachingsData from "../../assets/CustomHooks/useFetchCoachingsData";
import CreateBtn from "../../Component/button/CreateBtn/CreateBtn";
import NoDataImg from "../../assets/Images/noDataFound.png";
import { getCalendarData } from "../../utils/calendar";


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
                    // className="card__body-cover-image"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-5 col-12 nameBox">
                <div className="coachscreen_coachname position-relative">
                  <h5>
                    {data?.coach_info?.first_name} {data?.coach_info?.last_name}
                  </h5>
                  <div className="coaches_tooltip">
                  <GrPowerForceShutdown
                    // onMouseOver={() => setshowDescription(true)}
                    // onMouseOut={() => setshowDescription(false)}
                  />
                  <div className="tooltiptext ">
                <p> {description}</p>
                   
                 
                    {/* <h5>tooltip Heading</h5>
                    <p>tooltip Heading paragraph</p> */}
                  </div>
                  </ div>
                  {/* {showDescription && (
                    <div className="coachDesc">{description}</div>
                  )} */}
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
                    // style={{ marginLeft: "9px" }}
                    onClick={() => showCoachingsOnCalendar(data)}
                  >
                    <span style={{ marginRight: "10px" }}> :</span>
                    <BsFillCalendarDateFill color="#2c6959" size={20} />
                  </h5>
                </div>
                <div className="coaches_homescreen_availbalilityInner">
                  <h6>TimeSlot</h6>
                  <h5>
                  <span style={{ marginRight: "10px" }}> :</span>
                    {timing?.[0]} to {timing?.[1]}
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
  const [coachingListToBeShown2, setCoachingListToBeShown2] = useState([]);
  const [inputData, setInputData] = useState("");
  const [showBookCoachesSlot, setShowBookCoachesSlot] = useState(false);
  const [showCoachingsForm, setShowCoachingsForm] = useState(false);
  const [coachImgPath, setCoachImgPath] = useState("");
  const logedIn = localStorage.getItem("logedIn");

  // filter UseState here;
  const [filterByDomain, setFilterByDomain] = useState([]);
  const [filterByIndustry, setFilterByIndustry] = useState([]);

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
          setCoachingListToBeShown2(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  const showCoachingsOnCalendar = async (data) => {
    var slots = JSON.parse(data.availability_slot);
    const calendarData = await getCalendarData(slots);
    setEventsToBeShown(calendarData);
    setShowCalendar(true);
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
        console.log(res, "response");
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
    setCoachingListToBeShown2(allCoachings);
  };

  const handleShowMyCoachings = () => {
    setShowAllCoaching(false);
    setCoachingListToBeShown(myCoachings);
    setCoachingListToBeShown2(myCoachings);
  };

  const handleFilterCoachings = (val) => {
    var value = val.toLowerCase();
    setInputData(val);
    if (showAllCoaching) {
      var filteredData = allCoachings.filter((item, index) => {
        return item.title.toLowerCase().includes(value);
      });
      setCoachingListToBeShown(filteredData);
      setCoachingListToBeShown2(filteredData);
    } else {
      var filteredData = myCoachings.filter((item, index) => {
        return item.title.toLowerCase().includes(value);
      });
      setCoachingListToBeShown2(filteredData);
    }
  };

  // here we are filtering the coaching according to the domain and industry;

  useEffect(() => {
    var filterCoachingByDomain = coachingListToBeShown.filter((itm, index) => {
      var domain = itm.domain;
      var domainTitle = domain && domain?.title.toLowerCase();
      return filterByDomain.includes(domainTitle);
    });

    setCoachingListToBeShown2(filterCoachingByDomain);
  }, [filterByDomain , filterByDomain]);

  useEffect(() => {
    var filterCoachingByIndustry = coachingListToBeShown.filter(
      (itm, index) => {
        var industry = itm.industry;
        var industryTitle = industry && industry?.title.toLowerCase();
        return filterByIndustry.includes(industryTitle);
      }
    );
    setCoachingListToBeShown2(filterCoachingByIndustry);
  }, [filterByIndustry , filterByDomain]);



  return (
    <>
      <Homepage_header />

      <section className="coachScreen">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 d-lg-block d-none coachScreen_left">
              <h5 style={{ marginBottom: "20px" }}>Book Coaches</h5>

              <CustomFilter
                filterByDomain={filterByDomain}
                setFilterByDomain={setFilterByDomain}
                filterByIndustry={filterByIndustry}
                setFilterByIndustry={setFilterByIndustry}
              />
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
                        My Coachings
                      </button>

                      <CreateBtn onClick={() => setShowCoachingsForm(true)} />
                    </div>
                  </>
                )}
              </div>

              <div className="row ">
                {coachingListToBeShown2.length != 0 &&
                  coachingListToBeShown2.map((data, index) => {
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
        getCoachingList={getCoachingList}
        getMyCoachingsList={getMyCoachingsList}
        setShowAllCoaching={setShowAllCoaching}
      />

      <Footer />
    </>
  );
};

export default Coaches_homeScreen;
