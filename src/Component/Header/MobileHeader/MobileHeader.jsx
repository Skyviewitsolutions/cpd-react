// In this file we are creating a header which will be designed for the mobile screen only;

import React from "react";
import "./mobileHeader.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import cpd_logo from "../../../assets/Images/cpd_logo.png";
import { useNavigate } from "react-router-dom";
import pimg from "../../../assets/Images/user_profile.svg";
import { useState } from "react";
import coaches from "../../../assets/Images/coaches.svg";
import workshop from "../../../assets/Images/workshop.svg";
import networking from "../../../assets/Images/networking.svg";
import job from "../../../assets/Images/job.svg";
import fare from "../../../assets/Images/fare.svg";
import coachesW from "../../../assets/Icons/coachesWhite.png";
import workshopW from "../../../assets/Icons/workshopWhite.png";
import networkingW from "../../../assets/Icons/networkingWhite.png";
import jobsW from "../../../assets/Icons/jobsWhite.png";
import fareW from "../../../assets/Icons/fareWhite.png";
import home from "../../../assets/Icons/Artboard1.svg";
import my_Community from "../../../assets/Icons/Artboard2.svg";
import my_course from "../../../assets/Icons/Artboard3.svg";
import my_events from "../../../assets/Icons/Artboard4.svg";
import my_jobs from "../../../assets/Icons/Artboard5.svg";
import message from "../../../assets/Icons/Artboard6.svg";
import learning from "../../../assets/Icons/Artboard7.svg";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";


const MobileHeader = (props) => {

  const { userDetails, handleNavbar, activeNavbar } = props;
  const navigate = useNavigate();

  const handleResume = () => {
    if (userDetails.user_type == 1) {
      navigate("/resume");
    } else if (userDetails.user_type == 2) {
      navigate("/coaches-form");
    }
    localStorage.removeItem("activeNavbar")
  };

  const handleNavigation = (path) =>{
    navigate(path)
    localStorage.removeItem("activeNavbar")
  }

  return (
    <>
      <div className="mobileHeader">
        <img
          src={cpd_logo}
          alt=""
          className="cpd_logo"
          onClick={() => navigate("/")}
        />
        {[false].map((expand) => (
          <Navbar key={expand} expand={expand} className="right_side_menu">
            <div className="mobile-menu-containr">
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton className="navHead">
                  <div className="userDetls">
                    <img src={pimg} alt="" className="home" />
                    <h6>{userDetails?.name}</h6>
                  </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1">
                    {/* here we are showing the second navbar  */}
                    <div className=" mobileNav">
                      <div className="mobileNavCont d-flex justify-between align-center">
                        {activeNavbar === "coaches" ? (
                          <div
                            className="headerBoxs activeHeader"
                            onClick={() => handleNavbar("coaches")}
                          >
                            <div className="activeHeaderBox">
                              <img src={coachesW} alt="" className="coaches" />
                              <h6>Book</h6>
                              <h5>Coaches</h5>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="headerBoxs "
                            onClick={() => handleNavbar("coaches")}
                          >
                            <img src={coaches} alt="" className="coaches" />
                            <h6>Book</h6>
                            <h5>Coaches</h5>
                          </div>
                        )}

                        {activeNavbar === "workShop" ? (
                          <div
                            className="headerBoxs"
                            onClick={() => handleNavbar("workShop")}
                          >
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
                          <div
                            className="headerBoxs"
                            onClick={() => handleNavbar("workShop")}
                          >
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

                        {activeNavbar === "events" ? (
                          <div
                            className="headerBoxs"
                            onClick={() => handleNavbar("events")}
                          >
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
                          <div
                            className="headerBoxs"
                            onClick={() => handleNavbar("events")}
                          >
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

                        <div className="headerBoxs">
                          <img src={job} alt="" className="coaches" />
                          <h6>Job</h6>
                          <h5>Board</h5>{" "}
                        </div>

                        <div className="headerBoxs">
                          <img
                            src={fare}
                            alt=""
                            className="coaches"
                            style={{ width: "24px" }}
                          />
                          <h6>Career</h6>
                          <h5>Fare</h5>{" "}
                        </div>

                        <div className=" headerBoxDta">
                          <div className="click_forem_box">
                            <h5>Available Resources</h5>
                            <h5 className="forEmpl">For Employers</h5>
                            <h6 className="clickFormu">Click to Forum</h6>
                          </div>
                        </div>
                      </div>
                    </div>

                    <NavDropdown.Item>
                      <div className="navDropItem" onClick={() => handleNavigation("/")}>
                        <img src={home} alt="" className="nav-icons" />
                        <h6>Home</h6>
                      </div>
                      <div className="navDropItem"   onClick={() => handleResume()}>
                        <BsFillFileEarmarkPostFill
                          className="nav-icons"
                          size={17}
                          style={{ marginBottom: "5px", marginTop: "4px"  , marginRight : "4px" , marginLeft : "2px"}}
                          color="#2c6959"
                        />
                        <h6>My Resume</h6>
                      </div>
                      <div className="navDropItem"   onClick={() => handleNavigation("/myCommunity")}>
                        <img src={my_Community} alt="" className="nav-icons" />
                        <h6>My Community</h6>
                      </div>
                      <div className="navDropItem" onClick={() => handleNavigation("/myCourses")}>
                        <img src={my_course} alt="" className="nav-icons" />
                        <h6>My Course</h6>
                      </div>
                      <div className="navDropItem" onClick={() => handleNavigation("/myEvents")}>
                        <img src={my_events} alt="" className="nav-icons" />
                        <h6>My Events</h6>
                      </div>
                      <div className="navDropItem">
                        <img src={my_jobs} alt="" className="nav-icons" />
                        <h6>My Jobs</h6>
                      </div>
                      <div className="navDropItem">
                        <img src={message} alt="" className="nav-icons" />
                        <h6>Notification</h6>
                      </div>
                      <div className="navDropItem">
                        <img src={learning} alt="" className="nav-icons" />
                        <h6>My Calendar</h6>
                      </div>
                      <div className="navDropItem">
                        <HiOutlineLogout
                          style={{ marginBottom: "5px", marginTop: "4px"  , marginRight : "4px" , marginLeft : "2px"}}
                          color="#2c6959"
                          size={18}
                        />
                        <h6>Logout</h6>
                      </div>
                    </NavDropdown.Item>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>
          </Navbar>
        ))}
      </div>
    </>
  );
};

export default MobileHeader;
