import React, { useState } from "react";
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
import { BsFillFileEarmarkPostFill } from "react-icons/bs";

import "./Header2.css";
import showToast from "../CustomToast/CustomToast";

const Header2 = () => {
  const navigate = useNavigate("");
  const [isHovering, setIsHovering] = useState(false);
  const token = localStorage.getItem("token");
  var userDetails = localStorage.getItem("users");
  const [activeNavbar, setActiveNavbar] = useState("");
  userDetails = JSON.parse(userDetails);
  const logOut = () => {
    localStorage.removeItem("token");
    showToast("Logout Successfully" , "success");
    navigate("/");
    window.location.reload();
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
                    onClick={() => navigate("/login")}
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
    </>
  );
};

export default Header2;
