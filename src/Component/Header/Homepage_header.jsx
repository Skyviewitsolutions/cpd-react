import { useState, useEffect } from "react";
import "./Homepage_header.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import pimg from "../../assets/Images/user_profile.svg";
import cpd_logo from "../../assets/Images/cpd_logo.png";
import home from "../../assets/Icons/Artboard1.svg";
import my_Community from "../../assets/Icons/Artboard2.svg";
import my_course from "../../assets/Icons/Artboard3.svg";
import my_events from "../../assets/Icons/Artboard4.svg";
import my_jobs from "../../assets/Icons/Artboard5.svg";
import message from "../../assets/Icons/Artboard6.svg";
import learning from "../../assets/Icons/Artboard7.svg";
import coaches from "../../assets/Images/coaches.svg";
import workshop from "../../assets/Images/workshop.svg";
import networking from "../../assets/Images/networking.svg";
import job from "../../assets/Images/job.svg";
import fare from "../../assets/Images/fare.svg";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlineLogin } from "react-icons/ai";
import coacheswhite from "../../assets/Images/coacheswhite.png";
import enrollcourseswhite from "../../assets/Images/enrollcourseswhite.png";
import networkingwhite from "../../assets/Images/networkingwhite.png";
import jobswhite from "../../assets/Images/jobswhite.png";
import carrerwhite from "../../assets/Images/carrerwhite.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import Header2 from "./Header2";
import { IoMdLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import showToast from "../CustomToast/CustomToast";

// here we are importing the white icons;

import coachesW from "../../assets/Icons/coachesWhite.png";
import workshopW from "../../assets/Icons/workshopWhite.png";
import networkingW from "../../assets/Icons/networkingWhite.png";
import jobsW from "../../assets/Icons/jobsWhite.png";
import fareW from "../../assets/Icons/fareWhite.png";
import MobileHeader from "./MobileHeader/MobileHeader";

const Homepage_header = () => {
  const navigate = useNavigate("");
  const [isHovering, setIsHovering] = useState(false);
  const token = localStorage.getItem("token");
  var userDetails = localStorage.getItem("users");
  const [activeNavbar, setActiveNavbar] = useState("");
  userDetails = JSON.parse(userDetails);

  document.addEventListener("click", () => {
    setIsHovering(false);
  });

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("users");
    localStorage.setItem("loginedIn", false);
    localStorage.removeItem("activeNavbar");
    showToast("Logout Successfully", "success");
    navigate("/");
    // window.location.reload();
  };

  const options = {
    margin: 20,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 2,
        margin: 10,
      },
      400: {
        items: 3,
        margin: 10,
      },
      600: {
        items: 4,
      },
      700: {
        items: 5,
      },
    },
  };

  const handleNavbar = (selected) => {
    if (selected === "coaches") {
      localStorage.setItem("activeNavbar", selected);
      setActiveNavbar(selected);
      navigate("/coachings");
    } else if (selected === "events") {
      localStorage.setItem("activeNavbar", selected);
      setActiveNavbar(selected);
      navigate("/networking");
    } else if (selected === "workShop") {
      localStorage.setItem("activeNavbar", selected);
      setActiveNavbar(selected);
      navigate("/workshops");
    } else if (selected === "job") {
      localStorage.setItem("activeNavbar", selected);
      setActiveNavbar(selected);
      navigate("/job-board");
    } else if (selected === "career-fare") {
      localStorage.setItem("activeNavbar", selected);
      setActiveNavbar(selected);
      navigate("/career-fare")
    }
  };

  const handleResume = () => {
    if (userDetails.user_type == 1) {
      navigate("/resume");
    } else if (userDetails.user_type == 2) {
      navigate("/coaches-form");
    } else if (userDetails.user_type == 3) {
      navigate("/employer-form");
    }
    localStorage.removeItem("activeNavbar");
  };

  // here we are writing code for the selection of the navbar ;

  useEffect(() => {
    const activeNav = localStorage.getItem("activeNavbar");
    setActiveNavbar(activeNav);
  }, []);

  // here we are handling the navigation;

  const handleNavigation = (path) => {
    navigate(path);
    localStorage.removeItem("activeNavbar");
  };

  const pathName = window.location.pathname;

  return (
    <>
      {token ? (
        <div className="first-Nave">
          <Navbar bg="light" expand="lg" className="header1_afterlogin ">
            <Navbar.Brand>
              <img
                src={cpd_logo}
                alt=""
                className="cpd_logo"
                onClick={() => navigate("/")}
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto justify-content-end nav_middlebox flex-grow-1 pe-3">
                <Nav.Link
                  className="nav_img working"
                  onClick={() => handleNavigation("/")}
                >
                  <img src={home} alt="" className="nav-icons" />
                  <h6>Home</h6>
                </Nav.Link>
                {/* <Nav.Link
                  className="nav_img working"
                  onClick={() => handleResume()}
                >
                  <BsFillFileEarmarkPostFill
                    className="nav-icons"
                    size={22}
                    style={{ marginBottom: "5px", marginTop: "4px" }}
                    color="#2c6959"
                  />
                  <h6>My Resume</h6>
                </Nav.Link>
                <Nav.Link
                  className="nav_img working"
                  onClick={() => handleNavigation("/myCommunity")}
                >
                  <img src={my_Community} alt="" className="nav-icons" />
                  <h6>My Community</h6>
                </Nav.Link>
                <Nav.Link
                  className="nav_img working"
                  onClick={() => handleNavigation("/myCourses")}
                >
                  <img src={my_course} alt="" className="nav-icons" />
                  <h6>My Course</h6>
                </Nav.Link>
                <Nav.Link
                  className="nav_img working"
                  onClick={() => handleNavigation("/myEvents")}
                >
                  <img src={my_events} alt="" className="nav-icons" />
                  <h6>My Events</h6>
                </Nav.Link>
                <Nav.Link className="nav_img working">
                  <img src={my_jobs} alt="" className="nav-icons" />
                  <h6>My Jobs</h6>
                </Nav.Link> */}

                <Nav.Link className="nav_img working">
                  <img src={message} alt="" className="nav-icons" />
                  <h6>Notification</h6>
                </Nav.Link>

                <Nav.Link className="nav_img working">
                  <img src={learning} alt="" className="nav-icons" />
                  <h6>My Calendar</h6>
                </Nav.Link>

                <Form className="d-flex userprofile_block">
                  <div
                    className="userprofile_row1"
                    onMouseOver={() => setIsHovering(true)}
                  >
                    <img src={pimg} alt="" className="home" />

                    {isHovering && (
                      <div className="logouts">
                        <div className=" userName">
                          <span>{userDetails?.name}</span>
                        </div>
                        <div
                          className="logoutBtn working"
                          onClick={() => handleResume()}
                        >
                          <BsFillFileEarmarkPostFill
                            className="nav-icons"
                            size={18}
                            color="#2c6959"
                          />
                          <span style={{ marginLeft: "10px" }}>My Resume</span>
                        </div>
                        <div
                          className="logoutBtn"
                          onClick={() => handleNavigation("/myCommunity")}
                        >
                          <img
                            src={my_Community}
                            alt=""
                            className="nav-icons"
                          />
                          <span style={{ marginLeft: "10px" }}>
                            My Community
                          </span>
                        </div>
                        <div
                          className="logoutBtn"
                          onClick={() => handleNavigation("/myCourses")}
                        >
                          <img src={my_course} alt="" className="nav-icons" />

                          <span style={{ marginLeft: "10px" }}>My Course</span>
                        </div>
                        <div
                          className="logoutBtn"
                          onClick={() => handleNavigation("/myEvents")}
                        >
                          <img src={my_events} alt="" className="nav-icons" />

                          <span style={{ marginLeft: "10px" }}>My Events</span>
                        </div>
                        <div className="logoutBtn">
                          <img src={my_jobs} alt="" className="nav-icons" />

                          <span style={{ marginLeft: "10px" }}>My Jobs</span>
                        </div>
                        <div className="logoutBtn" onClick={handleResume}>
                          <FaUser color="#2c6959" size={18} />
                          <span style={{ marginLeft: "12px" }}>My Profile</span>
                        </div>
                        <div className="logoutBtn" onClick={logOut}>
                          <IoMdLogOut size={18} color="#2c6959" />
                          <span style={{ marginLeft: "12px" }}>Logout</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Form>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      ) : (
        <Header2 />
      )}

      {/***********************SECOND NAVBAR IN HOME PAGE************************/}

      <div className="row secondNave">
        <div className="col-10 d-flex justify-between align-center">
          {pathName === "/coachings" ? (
            <div
              className="headerBox activeHeader"
              onClick={() => handleNavbar("coaches")}
            >
              <div className="activeHeaderBox">
                <img src={coachesW} alt="" className="coaches" />
                <h6>Book</h6>
                <h5>Coaches</h5>
              </div>
            </div>
          ) : (
            <div className="headerBox " onClick={() => handleNavbar("coaches")}>
              <img src={coaches} alt="" className="coaches" />
              <h6>Book</h6>
              <h5>Coaches</h5>
            </div>
          )}

          {pathName === "/workshops" ? (
            <div className="headerBox" onClick={() => handleNavbar("workShop")}>
              <div className="activeHeaderBox">
                <img
                  src={workshopW}
                  alt=""
                  className="coaches"
                  style={{ width: "24px" }}
                />
                <h6>Enroll Courses</h6>
                <h5>Workshop</h5>
              </div>
            </div>
          ) : (
            <div className="headerBox" onClick={() => handleNavbar("workShop")}>
              <img
                src={workshop}
                alt=""
                className="coaches"
                style={{ width: "24px" }}
              />
              <h6>Enroll Courses</h6>
              <h5>Workshop</h5>
            </div>
          )}

          {pathName === "/networking" ? (
            <div className="headerBox" onClick={() => handleNavbar("events")}>
              <div className="activeHeaderBox">
                <img
                  src={networkingW}
                  alt=""
                  className="coaches"
                  style={{ width: "24px" }}
                />
                <h6>Networking</h6>
                <h5>Events</h5>
              </div>
            </div>
          ) : (
            <div className="headerBox" onClick={() => handleNavbar("events")}>
              <img
                src={networking}
                alt=""
                className="coaches"
                style={{ width: "24px" }}
              />
              <h6>Networking</h6>
              <h5>Events</h5>
            </div>
          )}
          {pathName === "/job-board" ? (
            <div className="headerBox" onClick={() => handleNavbar("job")}>
              <div className="activeHeaderBox">
                <img src={jobsW} alt="" className="coaches" />
                <h6>Job</h6>
                <h5>Board</h5>{" "}
              </div>
            </div>
          ) : (
            <div className="headerBox" onClick={() => handleNavbar("job")}>
              <img src={job} alt="" className="coaches" />
              <h6>Job</h6>
              <h5>Board</h5>{" "}
            </div>
          )}
          {pathName === "/career-fare" ? (
            <div className="headerBox" onClick={() => handleNavbar("career-fare")}>
               <div className="activeHeaderBox">
              <img  src={fareW} alt=""  className="coaches" style={{ width: "24px" }} />
              <h6>Career</h6>
              <h5>Fare</h5>{" "}
            </div>
            </div>
          ) : (
            <div className="headerBox" onClick={() => handleNavbar("career-fare")}>
              <img src={fare} alt="" className="coaches" style={{ width: "24px" }} />
              <h6>Career</h6>
              <h5>Fare</h5>{" "}
            </div>
          )}
        </div>
        <div className="col-2 click_forem_box">
          <div>
            <h5>Available Resources</h5>
            <h5 className="forEmpl">For Employers</h5>
            <h6 className="clickFormu">Click to Forum</h6>
          </div>
        </div>
      </div>

      <MobileHeader
        userDetails={userDetails}
        handleNavbar={handleNavbar}
        activeNavbar={activeNavbar}
        setActiveNavbar={activeNavbar}
      />
    </>
  );
};

export default Homepage_header;
