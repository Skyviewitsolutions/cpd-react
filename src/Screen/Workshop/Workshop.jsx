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
import WorkshopCard from "../../Component/WorkshopCard/WorkshopCard";
import BookBtn from "../../Component/button/BookBtn/BookBtn";
import { useNavigate, generatePath } from "react-router-dom";
import CustomFilter from "../../Component/CustomFilter/CustomFilter";
import CreateWorkshopForm from "../../Component/Modal/CreateWorkshopForm/CreateWorkshopForm";
import NoDataImg from "../../assets/Images/noDataFound.png";
import { getCalendarData } from "../../utils/calendar";
import Loader from "../../Component/Loader/Loader";
import showToast from "../../Component/CustomToast/CustomToast";


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
  const [inputData, setInputData] = useState("");
  const [workshopToBeShown, setWorkshopToBeShown] = useState([]);
  const [workshopToBeShown2, setWorkshopToBeShown2] = useState([]);
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);
  const [filterByIndustry, setFilterByIndustry] = useState([]);
  const [filterByDomain, setFilterByDomain] = useState([]);
  const [updateWorkshop, setUpdateWorkshop] = useState(false);
  const [selectedWorkshopForUpdate, setSelectedWorkshopForUpdate] = useState(
    {}
  );


  var userDetails = localStorage.getItem("users");
  var userType = JSON.parse(userDetails);
  userType = userType?.user_type;

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
          setWorkshopToBeShown(val);
          setWorkshopToBeShown2(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error h");
      });
  };

  const showWorkshopOnCalendar = async (data) => {
    setEventsToBeShown([])
    var slots = JSON.parse(data.availability_slot);
    const calendarData = await getCalendarData(slots);
    setEventsToBeShown(calendarData);
    setShowCustomCalendar(true);
  };
  // writing code for enrolling the workshop

  const enrollWorkshop = (workShopData) => {
    const token = localStorage.getItem('token');
    if(token){
    var id = workShopData._id;
    const url = `${endpoints.workshop.enrollWorkshop}${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          showToast("workshop enrolled successfully",  "success");
          getAllEnrolledList();
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
          if (!showAllWorkshop) {
            setWorkshopToBeShown(val);
            setWorkshopToBeShown2(val);
          }
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

  // 0/1/2/3=Cancelled/Pending/Confirmed/booknow;

  const handleShowAllWorkshop = () => {
    setShowAllWorkshop(true);
    setWorkshopToBeShown(allWorkShopList);
    setWorkshopToBeShown2(allWorkShopList);
  };

  const handleShowMyWorkshop = () => {
    setShowAllWorkshop(false);
    setWorkshopToBeShown(myWorkshopList);
    setWorkshopToBeShown2(myWorkshopList);
  };

  const handleInputData = (val) => {
    var value = val.toLowerCase();
    setInputData(val);
    if (showAllWorkshop) {
      var filteredData = allWorkShopList.filter((data, index) => {
        return data.title.toLowerCase().includes(value);
      });
      setWorkshopToBeShown(filteredData);
      setWorkshopToBeShown2(filteredData);
    } else {
      var filteredData = myWorkshopList.filter((data, index) => {
        return data.title.toLowerCase().includes(value);
      });
      setWorkshopToBeShown(filteredData);
      setWorkshopToBeShown2(filteredData);
    }
  };

  const showCoachDetails = (dta) => {
    const workshopId = dta._id;
    const path = generatePath("/workshopDetails/:workshopId", {
      workshopId: workshopId,
    });
    navigate(path);
  };

  const handleDetails = (dta) =>{
    const communityId = dta._id;
    const path = generatePath("/community-details/:communityId", {
      communityId: communityId,
    });
    navigate(path , { communityDetails : JSON.stringify(dta)});
  }

  // here we are filtering the coaching according to the domain and industry;

  useEffect(() => {
    var filterWorkshopByDomain = workshopToBeShown.filter((itm, index) => {
      var domain = itm.domain;
      var domainTitle = domain && domain?.title.toLowerCase();
      return filterByDomain.includes(domainTitle);
    });
    setWorkshopToBeShown2(filterWorkshopByDomain);
  }, [filterByDomain, filterByIndustry]);

  useEffect(() => {
    var filterWorkshopByIndustry = workshopToBeShown.filter((itm, index) => {
      var industry = itm.industry;
      var industryTitle = industry && industry?.title.toLowerCase();
      return filterByIndustry.includes(industryTitle);
    });
    setWorkshopToBeShown2(filterWorkshopByIndustry);
  }, [filterByIndustry, filterByDomain]);

  const handleEdit = (data) => {
    setUpdateWorkshop(true);
    setSelectedWorkshopForUpdate(data);
    setShowWorkshopForm(true);
  };

  const deleteWorkshop = (id) => {
    const url = `${endpoints.workshop.deleteWorkshop}${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          getMyWorkshop();
          showToast("workshop deleted successfully",  "success" );
        }
      })
      .catch((err) => {
        console.log(err, "delete workshop error");
      });
  };

  return (
    <div className="workshopContainer">
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
          <div className="row workshop_searchBox col-12">
            <div className="col-8 col-md-12 col-lg-2">
              <h5 className="workshopHdTitle">This Week's Top Enroll Workshop</h5>
            </div>
            <div className="col-12 col-md-12 col-lg-10">
              <div className="row">
                <div className="col-lg-7 col-md-12 col-12">
                  <div className="workshop_searchBar">
                    <div className="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search Here"
                        value={inputData}
                        onChange={(e) => handleInputData(e.target.value)}
                      />
                      <HiSearch id="workshop_search" />
                    </div>{" "}
                  </div>
                </div>
                {userType == 2 && (
                  <>
                    <div
                      className="coachBtnCont col-lg-5 col-md-12 col-12 d-flex justify-content-between"
                      style={{ width: "33%" }}
                    >
                      <button
                        className="coachingBtn"
                        style={{
                          border : showAllWorkshop ? "2px solid #2c6959" : "2px solid #d4d9d6"
                        }}
                        onClick={handleShowAllWorkshop}
                      >
                        All
                      </button>

                      <button
                        className="coachingBtn"
                        style={{
                          border : !showAllWorkshop ? "2px solid #2c6959" : "2px solid #d4d9d6"
                        }}
                        onClick={handleShowMyWorkshop}
                      >
                        My workshops
                      </button>
                      <button
                        className="coachingBtn createCoachingBtn"
                        onClick={() => setShowWorkshopForm(true)}
                      >
                        Create
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="Workshop_section2">
          <div className="row">
            <div className="col-lg-2 col-md-12 col-12 mb-4 " style={{marginTop : '-12px'}}>
              <CustomFilter
                filterByDomain={filterByDomain}
                setFilterByDomain={setFilterByDomain}
                filterByIndustry={filterByIndustry}
                setFilterByIndustry={setFilterByIndustry}
              />
            </div>
            <div className="col-lg-10 col-md-12 col-12 mt-3">
              <div className="row">
                {workshopToBeShown2.length != 0 &&
                  workshopToBeShown2.map((workshop, index) => {
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
                        <div className="col-lg-4 col-md-12 col-12 workshop-card px-4">
                          <WorkshopCard
                            workshop={workshop}
                            showWorkshopOnCalendar={showWorkshopOnCalendar}
                            enrollWorkshop={enrollWorkshop}
                            enrollStatus={enrollStatus}
                            img={img}
                            key={index}
                            showBookBtn={showAllWorkshop}
                            imageName={workshop.image}
                            showCoachDetails={showCoachDetails}
                            showEdit={!showAllWorkshop}
                            handleEdit={handleEdit}
                            deleteWorkshop={deleteWorkshop}
                          />
                        </div>
                      </>
                    );
                  })}
              </div>
              {workshopToBeShown.length == 0 && (
                <div className="noDataCont">
                  <img src={NoDataImg} alt="" />
                </div>
              )}
            </div>
          </div>

          <CustomCalendar
            showCalendar={showCustomCalendar}
            setShowCalendar={setShowCustomCalendar}
            eventsToBeShown={eventsToBeShown}
          />

          <CreateWorkshopForm
            showWorkshopForm={showWorkshopForm}
            setShowWorkshopForm={setShowWorkshopForm}
            getAllWorkshop={getAllWorkshop}
            getMyWorkshop={getMyWorkshop}
            setShowAllWorkshop={setShowAllWorkshop}
            updateWorkshop={updateWorkshop}
            setUpdateWorkshop={setUpdateWorkshop}
            selectedWorkshopForUpdate={selectedWorkshopForUpdate}
            setSelectedWorkshopForUpdate={setSelectedWorkshopForUpdate}
            imagePath={imagePath}
          />
        </section>
      </div>
      <Footer />
      </div>
  );
};

export default Workshop;
