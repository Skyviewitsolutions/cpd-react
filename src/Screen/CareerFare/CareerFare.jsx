import React, { useEffect, useState } from "react";
import "./careerFare.css";
import Footer from "../../Component/Footer/Footer";
import "../../fonts/Inter-Bold.ttf";
import "../../fonts/Inter-Regular.ttf";
import { HiSearch } from "react-icons/hi";
// import eye from "../../assets/Images/eye.svg";
// import { CgHeart } from "react-icons/cg";
// import workshop_bannerImage from "../../assets/Images/workshop_bannerImage.png";
// import dommy_workshopImage from "../../assets/Images/dommy_workshopImage.png";
// import WorkshsopSidenav from "../Workshop/WorkshsopSidenav";
// import WorkshopEnroll from "../../Component/Modal/WorkshopEnroll/WorkshopEnroll";
import { endpoints } from "../../Component/services/endpoints";
import axios from "axios";
// import { BsFillCalendarDateFill } from "react-icons/bs";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";
// import { toast } from "react-toastify";
// import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
// import BookBtn from "../../Component/button/BookBtn/BookBtn";
import { useNavigate, generatePath } from "react-router-dom";
import CustomFilter from "../../Component/CustomFilter/CustomFilter";
// import CreateWorkshopForm from "../../Component/Modal/CreateWorkshopForm/CreateWorkshopForm";
import NoDataImg from "../../assets/Images/noDataFound.png";
import { getCalendarData } from "../../utils/calendar";
import Loader from "../../Component/Loader/Loader";
import CreateCareerFareForm from "../../Component/Modal/CreateCareerFareForm/CreateCareerFareForm";
import showToast from "../../Component/CustomToast/CustomToast";
import CareerFareCard from "../../Component/CareerFareCard/CareerFareCard";
import img2 from "../../assets/Images/careerfaretopimg.svg";
import CoachNotification from "../../Component/CoachNotification/CoachNotification";
import HomepageHeader from "../../Component/Header/Homepage_header";

const CareerFare = () => {
  const navigate = useNavigate("");
  // const [modalShow, setModalShow] = React.useState(false);
  const token = localStorage.getItem("token");
  const [allIncubationList, setAllIncubationList] = useState([]);
  // const [imagePath, setImagePath] = useState("");
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);
  const [eventsToBeShown, setEventsToBeShown] = useState([]);
  const [myEnrolledIncubation, setMyEnrolledIncubation] = useState([]);
  const [myWorkshopList, setMyWorkshopList] = useState([]);
  const [showAllIncubation, setShowAllIncubation] = useState(true);
  const [inputData, setInputData] = useState("");
  const [workshopToBeShown, setWorkshopToBeShown] = useState([]);
  const [createCareerFare, setCreateCareerFare] = useState([]);
  const [showCareerFareForm, setShowCareerFareForm] = useState(false);
  const [filterByIndustry, setFilterByIndustry] = useState([]);
  const [filterByDomain, setFilterByDomain] = useState([]);
  // const [updateWorkshop, setUpdateWorkshop] = useState(false);
  // const [selectedWorkshopForUpdate, setSelectedWorkshopForUpdate] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedIncubation, setSelectedIncubation] = useState({});
  const [updateIncubation, setUpdateIncubation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  var userDetails = localStorage.getItem("users");
  var userType = JSON.parse(userDetails);
  const userId = userType ? userType._id : 0;

  userType = userType?.user_type;

  const getAllIncubation = () => {
    const url = endpoints.incubation.getIncubation;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    setLoading(true);
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false);
        if (res.data.result) {
          let val = res.data.message;
          // let filteredData = val.filter((item) => item.created_by !== userId);
          // setWorkshopToBeShown(val);
          // setCreateCareerFare(filteredData);
          setAllIncubationList(val);
          setCreateCareerFare(val);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "this is the error h");
      });
  };

  const showWorkshopOnCalendar = async (data) => {
    setEventsToBeShown([]);
    var slots = JSON.parse(data.availability_slot);
    const calendarData = await getCalendarData(slots);
    setEventsToBeShown(calendarData);
    setShowCustomCalendar(true);
  };

  // getting all the enrolled workshop list;

  const getAllEnrolledList = () => {
    const url = endpoints.incubation.enrolledIncubation;
    let formdata = new FormData();
    formdata.append("member_id", userId);

    const getConfig = {
      url: url,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };

    setLoading(true);
    axios(getConfig)
      .then((res) => {
        setLoading(false);
        if (res.data.result) {
          const val = res.data.message;

          setMyEnrolledIncubation(val);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error here");
      });
  };

  // writing code for enrolling the workshop

  const enrollIncubation = (incubationData) => {
    const token = localStorage.getItem("token");

    if (token) {
      const id = incubationData._id;

      let formdata = new FormData();
      formdata.append("incubation_id", id);

      const url = endpoints.incubation.joinIncubation;

      const getConfig = {
        url: url,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      };

      setLoading(true);
      axios(getConfig)
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            showToast("incubation enrolled successfully", "success");
            getAllEnrolledList();
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "error here");
        });
    } else {
      showToast("Please login", "warning");
    }
  };

  const getMyIncubation = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = endpoints.incubation.getIncubation + "?created_by=" + userId;
    setLoading(true);
    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          setLoading(false);
          const val = res.data.message;
          setMyWorkshopList(val);
          // setWorkshopToBeShown(val);
          setCreateCareerFare(val);
          // setShowAllIncubation(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error here");
      });
  };

  useEffect(() => {
    if (showAllIncubation === true) {
      getAllEnrolledList();
      getAllIncubation();
    }
  }, []);

  // 0/1/2/3=Cancelled/Pending/Confirmed/booknow;

  const handleShowAllIncubation = () => {
    setShowAllIncubation(true);
    // setWorkshopToBeShown(allIncubationList);
    // setCreateCareerFare(allIncubationList);
    getAllIncubation();
  };

  const handleShowMyIncubation = () => {
    setShowAllIncubation(false);
    // setWorkshopToBeShown(myWorkshopList);
    // setCreateCareerFare(myWorkshopList);
    getMyIncubation();
  };

  const handleInputData = (val) => {
    var value = val.toLowerCase();
    setInputData(val);
    if (showAllIncubation) {
      let filteredData = allIncubationList.filter((data, index) => {
        return data.title.toLowerCase().includes(value);
      });
      // setWorkshopToBeShown(filteredData);
      setCreateCareerFare(filteredData);
    } else {
      let filteredData = allIncubationList.filter((data, index) => {
        return data.title.toLowerCase().includes(value);
      });
      // setWorkshopToBeShown(filteredData);
      setCreateCareerFare(filteredData);
    }
  };

  const showIncubationDetails = (dta) => {
    const careerFareId = dta._id;
    const path = generatePath("/career-fare-details/:careerFareId", {
      careerFareId: careerFareId,
    });
    navigate(path);
  };

  // here we are filtering the coaching according to the domain and industry;

  useEffect(() => {
    const filterIncubationByIndustry = allIncubationList.filter((itm, index) => {
      let industry = itm.industry;
      let industryTitle = industry && industry?.title.toLowerCase();
      return filterByIndustry.includes(industryTitle);
    });

    const filterIncubationByDomain = filterIncubationByIndustry.filter((itm, index) => {
      let domain = itm.domain;
      let domainTitle = domain && domain?.title.toLowerCase();
      return filterByDomain.includes(domainTitle);
    });
    setCreateCareerFare(filterIncubationByDomain);
  }, [filterByDomain]);

  useEffect(() => {
    const filterIncubationByDomain = allIncubationList.filter((itm, index) => {
      let domain = itm.domain;
      let domainTitle = domain && domain?.title.toLowerCase();
      return filterByDomain.includes(domainTitle);
    });

    const filterIncubationByIndustry = filterIncubationByDomain.filter((itm, index) => {
      let industry = itm.industry;
      let industryTitle = industry && industry?.title.toLowerCase();
      return filterByIndustry.includes(industryTitle);
    });
    setCreateCareerFare(filterIncubationByIndustry);
  }, [filterByIndustry]);

  const handleEdit = (data) => {
    setShowCareerFareForm(true);
    setSelectedIncubation(data);
    setUpdateIncubation(true);
  };

  const deleteIncubation = (id) => {
    var formdata = new FormData();
    formdata.append("_id", id);
    const url = endpoints.incubation.deleteIncubation;

    const getConfig = {
      url: url,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };

    setLoading(true);
    axios(getConfig)
      .then((res) => {
        setLoading(false);
        if (res.data.result) {
          getMyIncubation();
          showToast("incubation deleted successfully", "success");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "delete incubation error");
      });
  };

  const onUnjoinHandler = (id) => {
    console.log(id);
    const url = endpoints.incubation.unjoinIncubation;
    let formdata = new FormData();
    formdata.append("membership_id", id);
    const getConfig = {
      url: url,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    };
    setLoading(true);
    axios(getConfig)
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data.result) {
          getAllEnrolledList();
          showToast("incubation unjoin sucessfully", "success");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error here");
      });
  };
  const notificationClicked = () => {
    debugger;
    setShowNotification(true);
  };

  return (
    <div className="workshopContainer">
      <HomepageHeader notificationClicked={notificationClicked} />
      <CoachNotification
        showNotification={showNotification}
        setShowNotification={setShowNotification}
        notificationCount={notificationCount}
        setNotificationCount={setNotificationCount}
      />
      <div className="workshopwiper">
        <section className="Workshop_section1" style={{ background: "#e4fde5" }}>
          <div className="row ">
            <div className="col-lg-8 col-md-7 col-12 workshop_headingblock ">
              <h1>Enroll Incubation </h1>
              <h5>Identify The Skills You Need To Advance Your Career</h5>
              <h6>Search For The Most Popular Ideas Here</h6>
            </div>
            <div className="col-lg-4 col-md-5 col-12 ">
              <div className="workshop_imageblock">
                <img src={img2} alt="incubationImg" />
              </div>
            </div>
          </div>
          <div className="row workshop_searchBox col-12">
            <div className="col-8 col-md-12 col-lg-2">
              <h5 className="workshopHdTitle">This Week's Top Ideas</h5>
            </div>
            <div className="col-12 col-md-12 col-lg-10">
              <div className="row">
                <div className="col-lg-7 col-md-12 col-12">
                  <div className="workshop_searchBar">
                    <div className="form-group">
                      <input type="text" class="form-control" placeholder="Search Here" value={inputData} onChange={(e) => handleInputData(e.target.value)} />
                      <HiSearch id="workshop_search" />
                    </div>{" "}
                  </div>
                </div>

                <div className="coachBtnCont col-lg-5 col-md-12 col-12 d-flex justify-content-between" style={{ width: "33%" }}>
                  <button
                    className="coachingBtn"
                    style={{
                      border: showAllIncubation ? "2px solid #2c6959" : "2px solid #d4d9d6",
                    }}
                    onClick={handleShowAllIncubation}>
                    All
                  </button>

                  <button
                    className="coachingBtn"
                    style={{
                      border: !showAllIncubation ? "2px solid #2c6959" : "2px solid #d4d9d6",
                    }}
                    onClick={handleShowMyIncubation}>
                    My Incubation
                  </button>
                  <button className="coachingBtn createCoachingBtn" onClick={() => setShowCareerFareForm(true)}>
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="Workshop_section2">
          <div className="row">
            <div className="col-lg-2 col-md-12 col-12 mb-4 " style={{ marginTop: "-12px" }}>
              <CustomFilter filterByDomain={filterByDomain} setFilterByDomain={setFilterByDomain} filterByIndustry={filterByIndustry} setFilterByIndustry={setFilterByIndustry} />
            </div>
            <div className="col-lg-10 col-md-12 col-12 mt-3">
              <div className="row">
                {createCareerFare?.map((item, index) => {
                  let id = item?._id;

                  let enrollStatus = 3;

                  let enrolled = myEnrolledIncubation?.filter((itm) => itm.incubation_id === id);
                  console.log({ status: myEnrolledIncubation });

                  if (enrolled.length !== 0) {
                    let datas = enrolled[0];
                    let status = datas.status;
                    enrollStatus = status;
                  }

                  return (
                    <div key={id + index} className="col-lg-4 col-md-12 col-12 workshop-card px-4">
                      <CareerFareCard
                        data={item}
                        showWorkshopOnCalendar={showWorkshopOnCalendar}
                        enrollIncubation={enrollIncubation}
                        enrollStatus={enrollStatus}
                        img={item.image}
                        showBookBtn={showAllIncubation}
                        showIncubationDetails={showIncubationDetails}
                        showEdit={!showAllIncubation}
                        handleEdit={handleEdit}
                        deleteIncubation={deleteIncubation}
                        onUnjoinHandler={() => onUnjoinHandler(enrolled[0]._id)}
                      />
                    </div>
                  );
                })}
              </div>
              {createCareerFare?.length === 0 && (
                <div className="noDataCont">
                  <img src={NoDataImg} alt="" />
                </div>
              )}
            </div>
          </div>

          <CustomCalendar showCalendar={showCustomCalendar} setShowCalendar={setShowCustomCalendar} eventsToBeShown={eventsToBeShown} />

          <CreateCareerFareForm
            setUpdateIncubation={setUpdateIncubation}
            updateIncubation={updateIncubation}
            showCareerFareForm={showCareerFareForm}
            setShowCareerFareForm={setShowCareerFareForm}
            selectedIncubation={selectedIncubation}
            getAllIncubation={getAllIncubation}
            setShowAllIncubation={setShowAllIncubation}
            getMyIncubation={getMyIncubation}
          />
        </section>
      </div>
      <Footer />
      {loading && <Loader />}
    </div>
  );
};

export default CareerFare;
