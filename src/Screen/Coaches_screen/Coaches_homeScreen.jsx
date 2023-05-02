import React, { useEffect, useState } from "react";
import "./Coaches_homeScreen.css";
import dommy_person from "../../assets/Images/dommy_person.jfif";
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
import CreateBtn from "../../Component/button/CreateBtn/CreateBtn";
import NoDataImg from "../../assets/Images/noDataFound.png";
import Loader from "../../Component/Loader/Loader";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiInfoCircle } from "react-icons/bi";
import { getCalendarData } from "../../utils/calendar";
import showToast from "../../Component/CustomToast/CustomToast";
import DefaultImg from "../../assets/Images/default.png"


const CoachingCard2 = (props) => {

  const {
    data,
    bookingStatus,
    timing,
    showCoachingsOnCalendar,
    showBookBtn,
    coachImgPath,
    bookCoaches,
    showEdit,
    handleEdit,
    deleteCoaching,
    selectedCoaching,
    loading,
    showAllCoaching,
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

  const handleCalendar = (e, data) => {
    e.stopPropagation();
    showCoachingsOnCalendar(data);
  };

  var coachingDomain = data?.domain?.title;
  var coachingIndustry = data?.industry?.title;

 

  return (
    <>
      <div className="col-lg-6 col-md-12 col-sm-12 position-relative">
        <div className="coachingCrd bg-white border-2  ">
          <div
            onClick={() => showCoachDetails(data)}
            className="d-flex justify-content-between"
          >
            <div className="col-lg-3 col-md-2 col-sm-12 ">
              <img
                src={coachInfo?.avtar ? image : DefaultImg}
                alt="#"
                className="coachImg"
              />
            </div>
            <div className="col-lg-4 col-md-5 col-sm-12">
              <div className="d-flex  pr-4 ">
                <h5 className="coachName">
                  {data?.coach_info?.first_name} {data?.coach_info?.last_name}
                </h5>
                {/* <div className="coaches_tooltip flex-1 d-flex justify-content-center">
                  <BiInfoCircle
                    size={25}
                    className="idetailsIcon"
                    color="#727273"
                  />
                  <div className="tooltiptext">
                    <p>{description} hel</p>
                  </div>
                </div> */}
              </div>
              <div className="coachContr">
                <h6>Country</h6>
                <span>{data.coach_info?.nationality}</span>
              </div>
              <div className="coachContr">
                <h6>Domain & Industry</h6>
                <span>
                  {coachingDomain} | {coachingIndustry}
                </span>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 d-flex  flex-column">
              <div className="d-flex coachCont2 justify-content-between align-items-center mb-2">
                <h6>Availability</h6>:
                <span onClick={(e) => handleCalendar(e, data)}>
                  <BsFillCalendarDateFill color="#2c6959" size={20} />
                </span>
              </div>
              <div className="d-flex coachCont2 justify-content-between">
                <h6>Title</h6>:<span>{data.title}</span>
              </div>
              {data.price != 0 ? (
                <div className="d-flex coachCont2 justify-content-between align-items-center">
                  <h6>Price</h6>:
                  <span>
                    {data.price} HKD /
                    {data.payment_type == "1" ? "hour" : "session"}
                  </span>
                </div>
              ) : (
                <div className="d-flex coachCont2 justify-content-between align-items-center">
                  <h6>Free</h6>
                </div>
              )}
            </div>
          </div>
          {showBookBtn && (
            <div className="mt-3 position-absolute w-1 bookbtnBold">
              <BookBtn
                status={bookingStatus}
                onClick={() => bookCoaches(data)}
                loading={selectedCoaching != data._id && loading}
              />
            </div>
          )}
          {showEdit && (
            <div className="d-flex justify-content-end mr-4 ">
              <div className="coachingEdit mt-3 editBtnBold">
                <FiEdit color="#2c6959" onClick={() => handleEdit(data)} />
                <AiOutlineDelete
                  color="#2c6959"
                  onClick={() => deleteCoaching(data._id)}
                />
              </div>
            </div>
          )}
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
  const [selectedCoaching, setSelectedCoaching] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [updateCoaching, setUpdateCoaching] = useState(false);
  const [selectedCoachingForUpdate, setSelectedCoachingForUpdate] = useState(
    []
  );
  const navigate = useNavigate();

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

    setLoading(true)

    const url = endpoints.coaches.allCoachesList;

    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false)
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
        setLoading(false)
        console.log(err, "this is the error");
      });
  };

  const showCoachingsOnCalendar = async (data) => {
    setEventsToBeShown([]);
    setShowCalendar(true);
    var slots = JSON.parse(data.availability_slot);
    const calendarData = await getCalendarData(slots);
    setEventsToBeShown(calendarData);
  };

  const getAllEnrolledCoachings = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const url = endpoints.coaches.enrolledCoaching;
    setLoading(true)

    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false)
        if (res.data.result) {
          var val = res.data.data;
          setAllEnrolledCoachings(val);
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err, "this is the error");
      });
  };

  const getMyCoachingsList = () => {
    const url = endpoints.coaches.myCoachings;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    setLoading(true)

    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false)
        if (res.data.result) {
          var val = res.data.data;
          setMyCoachings(val);
            setCoachingListToBeShown(val);
            setCoachingListToBeShown2(val);
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    getAllEnrolledCoachings();
    getCoachingList();
    // if (userType == 2) {
    //   getMyCoachingsList();
    // }
  }, []);

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
            getMyCoachingsList();
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
    } else {
      showToast("Please login ",  "warning" );
    }
  };

  const handleBookCoaches = (coachesData) => {
    setShowBookCoachesSlot(true);
  };

  // 0/1/2/3=Cancelled/Pending/Confirmed/booknow;

  // writing code for filtering the coachings ;

  const handleShowAllCoachings = () => {
    setShowAllCoaching(true);
    // setCoachingListToBeShown(allCoachings);
    // setCoachingListToBeShown2(allCoachings);
    getCoachingList()
  };

  const handleShowMyCoachings = () => {
    setShowAllCoaching(false);
    // setCoachingListToBeShown(myCoachings);
    // setCoachingListToBeShown2(myCoachings);
    getMyCoachingsList()
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

    var filterCoachingByIndustry = coachingListToBeShown.filter(
      (itm, index) => {
        var industry = itm.industry;
        var industryTitle = industry && industry?.title?.toLowerCase();
        return filterByIndustry.includes(industryTitle);
      }
    );

    var filterCoachingByDomain = filterCoachingByIndustry.filter((itm, index) => {
      var domain = itm.domain;
      var domainTitle = domain && domain?.title?.toLowerCase();
      return filterByDomain.includes(domainTitle);
    });
    setCoachingListToBeShown2(filterCoachingByDomain);
  }, [filterByDomain]);

  useEffect(() => {

    var filterCoachingByDomain = coachingListToBeShown.filter((itm, index) => {
      var domain = itm.domain;
      var domainTitle = domain && domain?.title?.toLowerCase();
      return filterByDomain.includes(domainTitle);
    });

    var filterCoachingByIndustry = filterCoachingByDomain.filter(
      (itm, index) => {
        var industry = itm.industry;
        var industryTitle = industry && industry?.title?.toLowerCase();
        return filterByIndustry.includes(industryTitle);
      }
    );
    setCoachingListToBeShown2(filterCoachingByIndustry);
  }, [filterByIndustry]);

  // writing code for updating and deleting coachings;

  const deleteCoaching = (id) => {
    const url = `${endpoints.coaches.deleteCoaching}${id}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    setLoading(true)
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false)
        if (res.data.result) {
          getMyCoachingsList();
          showToast("coaching deleted successfully",  "success" );
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err, "delete workshop error");
      });
  };

  const handleEdit = (data) => {
    setUpdateCoaching(true);
    setSelectedCoachingForUpdate(data);
    setShowCoachingsForm(true);
    const path = generatePath("/coachingEdit/:coachingId" , {coachingId : data._id})
    navigate(path)
  };

  console.log(filterByDomain  , "filterBy domainer")

  return (
    <>
      <Homepage_header />
      <section className="coachScreen">
        <div className="container-fluid">
          <div className="row d-flex justify-content-between">
            <div className="col-lg-2 d-lg-block d-none coachScreen_left">
              <h5 className="ml-3" style={{ marginLeft: "9px" }}>
                Book Coaches
              </h5>
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
                          border : showAllCoaching ? "2px solid #2c6959" : "2px solid #d4d9d6"
                        }}
                        onClick={handleShowAllCoachings}
                      >
                        All
                      </button>

                      <button
                        className="coachingBtn"
                        style={{
                          border : !showAllCoaching ? "2px solid #2c6959" : "2px solid #d4d9d6"
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
                        <CoachingCard2
                          data={data}
                          bookingStatus={bookingStatus}
                          timing={timing}
                          showBookBtn={showAllCoaching}
                          key={index}
                          coachImgPath={coachImgPath}
                          bookCoaches={bookCoaches}
                          selectedCoaching={selectedCoaching}
                          showCoachingsOnCalendar={showCoachingsOnCalendar}
                          showEdit={!showAllCoaching}
                          deleteCoaching={deleteCoaching}
                          handleEdit={handleEdit}
                          showAllCoaching={showAllCoaching}
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
        updateCoaching={updateCoaching}
        setUpdateCoaching={setUpdateCoaching}
        selectedCoachingForUpdate={selectedCoachingForUpdate}
        setSelectedCoachingForUpdate={setSelectedCoachingForUpdate}
        imagePath={imagePath}
      />

      
      
      {loading && <Loader />}
      <Footer />
    </>
  );
};

export default Coaches_homeScreen;
