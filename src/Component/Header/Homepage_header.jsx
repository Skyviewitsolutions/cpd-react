import { useState } from "react";
import "./Homepage_header.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import pimg from "../../assets/Images/user_profile.svg";
import points from "../../assets/Images/points.svg";
import cpd_logo from "../../assets/Images/cpd_logo.png";
// import home from "../../assets/Images/home.svg";
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
import enroll_courcess from "../../assets/Icons/Artboard15.svg";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { RiNotification2Fill } from "react-icons/ri";
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
import {BsFillFileEarmarkPostFill} from "react-icons/bs";


const Homepage_header = () => {

  const navigate = useNavigate("");
  const [isHovering, setIsHovering] = useState(false);
  const token = localStorage.getItem("token");
  var userDetails = localStorage.getItem("users");
  const [activeNavbar, setActiveNavbar] = useState("");
  userDetails = JSON.parse(userDetails);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  document.addEventListener("click", () => {
    setIsHovering(false);
  });

  const logOut = () => {
    localStorage.removeItem("token");
    toast("Logout Successfully");
    navigate("/");
    window.location.reload();
  };

  const profile = () => {
    navigate("/resume");
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
      navigate("/coaches_screen");
    } else if (selected === "events") {
      localStorage.setItem("activeNavbar", selected);
      setActiveNavbar(selected);
      navigate("/networking");
    } else if (selected === "workShop") {
      localStorage.setItem("activeNavbar", selected);
      setActiveNavbar(selected);
      navigate("/workshop_screen");
    } else if (selected === "job") {
      localStorage.setItem("activeNavbar", selected);
      setActiveNavbar(selected);
    } else if (selected === "carrier") {
      localStorage.setItem("activeNavbar", selected);
      setActiveNavbar(selected);
    }
    else if (selected === "mycourse") {
      localStorage.setItem("activeNavbar", selected);
      setActiveNavbar(selected);
      navigate("/mycourse");
    } 
  };

  const handleResume = () => {
    if(userDetails.user_type == 1){
      navigate("/resume");
    }
    else if(userDetails.user_type == 2){
      navigate("/coachesForm")
    }
  };

  return (
    <>
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
                onClick={() => navigate("/")}
              >
                <img src={home} alt="" className="nav-icons" />
                <h6>Home</h6>
              </Nav.Link>
              <Nav.Link className="nav_img working" onClick={() => handleResume()}>
                <BsFillFileEarmarkPostFill className="nav-icons" size={22} style={{marginBottom : "5px"  , marginTop : "4px"}} color="#2c6959"/>
                <h6>My Resume</h6>
              </Nav.Link>
              <Nav.Link
                className="nav_img working"
                onClick={() => navigate("/myCommunity")}
              >
                <img src={my_Community} alt="" className="nav-icons" />
                <h6>My Community</h6>
              </Nav.Link>
              <Nav.Link className="nav_img working"
              onClick={() => navigate("/mycourse")}
              >
                <img src={my_course} alt="" className="nav-icons" />
                <h6>My Course</h6>
              </Nav.Link>
              <Nav.Link
                className="nav_img working"
                onClick={() => navigate("/myEvents")}
              >
                <img src={my_events} alt="" className="nav-icons" />
                <h6>My Events</h6>
              </Nav.Link>
              <Nav.Link className="nav_img working">
                <img src={my_jobs} alt="" className="nav-icons" />
                <h6>My Jobs</h6>
              </Nav.Link>
             
              <Nav.Link className="nav_img working">
                <img src={message} alt="" className="nav-icons" />

                <h6>Notification</h6>
              </Nav.Link>
              <Nav.Link className="nav_img working">
                <img src={learning} alt="" className="nav-icons" />
                <h6>Learning</h6>
              </Nav.Link>

              {token ? (
                <Form className="d-flex userprofile_block">
                  <div
                    className="userprofile_row1"
                    onMouseOver={() => setIsHovering(true)}
                  >
                    <img src={pimg} alt="" className="home" />
                    <span className="userName">{userDetails?.name}</span>

                    {isHovering && (
                      <div className="logouts">
                        <div className="user_profile" onClick={logOut}>
                          <span style={{ fontWeight: "bold" }}>
                            <HiOutlineLogout />
                          </span>
                          <span
                            style={{ marginLeft: "10px", fontWeight: "600" }}
                          >
                            Logout
                          </span>
                        </div>
                       
                      </div>
                    )}
                  </div>
                </Form>
              ) : (
                <Nav.Link className="nav_img">
                  <button
                    type="submit"
                    className="BtnLogin"
                    onClick={() => navigate("/loginpage")}
                  >
                    {" "}
                    <span>
                      <AiOutlineLogin />
                    </span>{" "}
                    Login{" "}
                  </button>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      {/***********************SECOND NAVBAR IN HOME PAGE************************/}

      <div className="second-Nave d-lg-block d-none">
        <Nav justify variant="tabs" className="header2_afterlogin">
          <Nav.Item
            className="nav2_img working"
            onClick={() => handleNavbar("coaches")}
          >
            <Nav.Link>
              <img src={coaches} alt="" className="coaches" />
              <h6>Book</h6>
              <h5>Coaches</h5>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item
            className="nav2_img working"
            onClick={() => handleNavbar("workShop")}
            style={{ cursor: "pointer" }}
          >
            <Nav.Link>
              <img src={workshop} alt="" className="coaches" />
              <h6>Enroll Courses</h6>
              <h5>Workshop</h5>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav2_img" onClick={() => handleNavbar("events")}>
            <Nav.Link>
              <img src={networking} alt="" className="coaches" />
              <h6>Networking</h6>
              <h5>Events</h5>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav2_img working">
            <Nav.Link disabled>
              <img src={job} alt="" className="coaches" />
              <h6>Job</h6>
              <h5>Board</h5>{" "}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav2_img working">
            <Nav.Link disabled>
              <img src={fare} alt="" className="coaches" />
              <h6>Career</h6>
              <h5>Fare</h5>{" "}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="click_forem_box working">
              <h5>
                <a href="">Available Resources</a>
              </h5>
              <h4>For Employers</h4>
              <h6 id="click_forem">
                <a href="">Click to Forum</a>
              </h6>
            </Nav.Link>
          </Nav.Item>
          <ToastContainer />
        </Nav>
      </div>
      {/****************************slider in mobile and tab ***************************/}
      <div className="headerslider">
        <OwlCarousel
          className="owl-theme category d-lg-none"
          id="category"
          items={5}
          margin={10}
          dots={false}
          {...options}
          nav
        >
          <div class="item">
            <div
              className="slidernav2"
              onClick={() => navigate("/coaches_screen")}
            >
              <div className="sliderInner">
                <img src={coacheswhite} alt="" className="coaches" />
                <h6>Book</h6>
                <h5>Coaches</h5>
              </div>
            </div>
          </div>
          <div class="item">
            <div
              className="slidernav2"
              onClick={() => navigate("/workshop_screen")}
              style={{ cursor: "pointer" }}
            >
              <div className="sliderInner">
                <img src={enrollcourseswhite} alt="" className="coaches" />
                <h6>Enroll Courses</h6>
                <h5>Workshop</h5>
              </div>
            </div>
          </div>
          <div class="item">
            <div className="slidernav2" onClick={() => navigate("/networking")}>
              <div className="sliderInner">
                <img src={networkingwhite} alt="" className="coaches" />
                <h6>Networking</h6>
                <h5>Events</h5>
              </div>
            </div>
          </div>
          <div class="item">
            <div className="slidernav2">
              <div className="sliderInner">
                <img src={jobswhite} alt="" className="coaches" />
                <h6>Job</h6>
                <h5>Board</h5>
              </div>
            </div>
          </div>

          <div class="item">
            <div className="slidernav2">
              <div className="sliderInner">
                <img src={carrerwhite} alt="" className="coaches" />
                <h6>Carrer</h6>
                <h5>Fare</h5>
              </div>
            </div>
          </div>
          <div class="item">
            <div className="slidernav2">
              <div className=" sliderInnerForum click_forem_box working">
                <h5>
                  <a href="">Available Resources</a>
                </h5>
                <h4>For Employers</h4>
                <h6 id="click_forem">
                  <a href="">Click to Forum</a>
                </h6>
              </div>
            </div>
          </div>
        </OwlCarousel>
      </div>
    </>
  );
};

export default Homepage_header;
