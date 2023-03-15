import React from "react";
import "./User_profile.css";
import Homepage_button from "../button/Homepage_button";
import Tagsbtn from "../button/Tagsbtn";
import Tags_button from "../button/Tags_button";
import Index_button from "../button/Index_button";
import resume_update from "../../assets/Images/resume_update.svg";
import User from "../../assets/Images/user.png";
import status_courses from "../../assets/Images/status_courses.svg";
import upcoming_session from "../../assets/Images/upcoming_session.svg";
import community_activity from "../../assets/Images/community_activities.svg";
import tobe_applied from "../../assets/Images/tobeapplied.svg";
import communities from "../../assets/Images/communities.svg";
import tech from "../../assets/Images/tech.svg";
import retail from "../../assets/Images/retail.svg";
import negotiation_skills from "../../assets/Images/negotiation_skills.svg";
import { endpoints } from "../services/endpoints";
import { AiTwotoneBell } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CoachNotification from "../CoachNotification/CoachNotification";


const User_profile = () => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState({});
  const [userImg, setUserImg] = useState("");
  const [totalExperience, setTotalExperience] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  var userDetails = localStorage.getItem("users");

  const [university_name, setUniversity_name] = useState("");
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [allSkills, setAllSkills] = useState([]);

  const url = endpoints.authentication.userProfile;

  const getUserDetails = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data;

          var universityName = val.university_name;
          var universityName = universityName[0];
          setUniversity_name(universityName);

          var industryName = val.industry;
          var industryName = industryName[0];
          setIndustry(industryName);

          var domainn = val.domain;
          var domainn = domainn[0];
          setDomain(domainn);

          var skills = val.skills;
          setAllSkills(skills);

          setUsersData(val);

          var userImgPath = res.data.avtarPath;
          var userImg = userImgPath + res.data.data?.avtar;

          setUserImg(userImg);

          var startYearEmployment = val.start_year_educational;
          var endYearEmployment = val.end_year_employment;

          if (startYearEmployment.length != 0) {
            var startYearEmployment = startYearEmployment[0];
            var endYearEmployment =
              endYearEmployment[endYearEmployment.length - 1];

            var totalExperience =
              parseInt(endYearEmployment) - parseInt(startYearEmployment);
            setTotalExperience(totalExperience);
          }
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  var userType = JSON.parse(userDetails);
  userType = userType?.user_type;

  const viewProfile = () => {
    if (userType == 1) {
      navigate("/resume");
    } else if (userType == 2) {
      navigate("/coaches-form");
    }
  };

  const handleNotification = () =>{
    if(notificationCount > 0){
      setShowNotification(true)
    }
  }


  return (
    <>
      <div className="profile_box">
        <div className="profile_header d-flex justify-content-between">
          <div className="profile_photo_box">
            {userImg && <img src={userImg} className="userImgIcon" />}
          </div>
          {userType == 2 && (
            <div
              className="coachNotification"
              onClick={handleNotification}
            >
              <AiTwotoneBell color="white" size={26} className="bellIcon" />
              {notificationCount != 0 && <h6 className="badge">{notificationCount}</h6>}
            </div>
          )}
        </div>
        <div className="profile">
          <div className="profie_photo_box"></div>
          <div className="user_name">
            <h2>{usersData.first_name}</h2>
            <Homepage_button
              text="View profile"
              brColor="#2c6959"
              fontColor="#2c6959"
              onClick={viewProfile}
            />
          </div>
          {userType == 1 && (
            <div className="qualification">
              <h6>University : {university_name}</h6>
            </div>
          )}
          <div className="heading_box">
            <h6 className="heading userIn">
              <span> Total Experience :</span>
              <span> {totalExperience} years </span>
            </h6>
            <h6 className="heading userIn">
              <span style={{ width: "120px" }}> Industries :</span>{" "}
              <span> {industry}</span>
            </h6>
            <h6 className="heading userIn">
              <span>Domains </span> : <span>{domain}</span>
            </h6>
            <h6 className="heading userIn">
              <span>Skills </span>: <span> {allSkills.toString()}</span>
            </h6>
          </div>

          <hr className="tags_line" />
          <h5 className="heading heading_margin">Tags</h5>
          <div className="tagsbtn_outline">
            <Tagsbtn text="AI" />
            <Tagsbtn text="BigData" />
            <Tagsbtn text="laas" />
            <Tagsbtn text="paas" />
            <Tags_button text="Digital Plateform" />
            <Tags_button text="Project Management" />

            <h6 id="tags_clickmore">click more</h6>
          </div>
          <hr className="tags_line" />
          <h4 className="heading2 heading_margin">YOUR STATUS</h4>
          <hr className="tags_line" />
          <div className="yourstatus_box heading_margin">
            <div className="yourstatus_innerbox">
              <img
                src={resume_update}
                alt="resume_update"
                className="status_img"
              />
              <h6>Resume Update</h6>
            </div>
          </div>
          <hr className="tags_line" />
          <div className="yourstatus_box heading_margin">
            <div className="yourstatus_innerbox">
              <img src={status_courses} alt="courses" className="status_img" />
              <h6>Status of Course</h6>
            </div>
            <Index_button text="25% done" brline="Yellow" />
          </div>
          <hr className="tags_line" />
          <div className="yourstatus_box heading_margin">
            <div className="yourstatus_innerbox">
              <img
                src={upcoming_session}
                alt="upcoming_session"
                className="status_img"
              />
              <h6>Upcoming Session</h6>
            </div>
            <Index_button text="View(2)" brline="Red" />
          </div>
          <hr className="tags_line" />
          <div className="yourstatus_box heading_margin">
            <div className="yourstatus_innerbox">
              <img
                src={community_activity}
                alt="community_activity"
                className="status_img"
              />
              <h6>Community Activities</h6>
            </div>
            <Index_button text="1 Activity" brline="gray" />
          </div>
          <hr className="tags_line" />
          <div className="yourstatus_box heading_margin">
            <div className="yourstatus_innerbox">
              <img
                src={tobe_applied}
                alt="tobe_applied"
                className="status_img"
              />
              <h6>To be applied</h6>
            </div>
            <Index_button text="Applied 2" brline="gray" />
          </div>
          <hr className="tags_line" />
          <h4 className="heading2 heading_margin">MOST RECENTLY USE</h4>

          <div className="yourstatus_box heading_margin">
            <div className="yourstatus_innerbox">
              <img src={communities} alt="communities" className="status_img" />
              <h6>Community</h6>
            </div>
          </div>

          <div className="yourstatus_box heading_margin">
            <div className="yourstatus_innerbox">
              <img src={tech} alt="tech" className="status_img" />
              <h6>Tech</h6>
            </div>
          </div>

          <div className="yourstatus_box heading_margin">
            <div className="yourstatus_innerbox">
              <img src={retail} alt="retail" className="status_img" />
              <h6>Retail</h6>
            </div>
          </div>

          <div className="yourstatus_box heading_margin">
            <div className="yourstatus_innerbox">
              <img src={status_courses} alt="courses" className="status_img" />
              <h6>Courses</h6>
            </div>
          </div>
          <div className="yourstatus_box heading_margin">
            <div className="yourstatus_innerbox">
              <img
                src={negotiation_skills}
                alt="negotiation_skills"
                className="status_img"
              />
              <h6>Negotiations skills</h6>
            </div>
          </div>
          <div className="yourstatus_box heading_margin">
            <Index_button text="See All" brline="gray" />
          </div>
        </div>

        <CoachNotification
          showNotification={showNotification}
          setShowNotification={setShowNotification}
          notificationCount={notificationCount}
          setNotificationCount={setNotificationCount}
        />
      </div>
    </>
  );
};

export default User_profile;
