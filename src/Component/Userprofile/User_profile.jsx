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
import {CgCommunity} from "react-icons/cg"

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

  // handling some of the variables here ;

  const [statusData, setStatusData] = useState({
    joinedCommunity: 0,
    joinedEvents: 0,
    joinedWorkshop: 0,
    joinedCoachings: 0,
    createdCommunity: 0,
    createdWorkshop: 0,
    createdEvents: 0,
    createdCoachings: 0,
  });

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

          // here we are updating the staus code ;
          console.log(res , "value");
          setStatusData((itm) => {
            return {
              ...itm,
              createdCoachings: res?.data?.createdCoachings,
              createdEvents: res?.data?.createdEvents,
              createdWorkshop: res?.data?.createdWorkshops,
              createdCommunity: res?.data?.createdCommunities,
              joinedCoachings: res?.data?.joinedCoachings,
              joinedWorkshop: res?.data?.joinedWorkshops,
              joinedEvents: res?.data?.joinedEevents,
              joinedCoachings: res?.data?.joinedCoachings,
            };
          });
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

  const handleNotification = () => {
    if (notificationCount > 0) {
      setShowNotification(true);
    }
  };

  return (
    <>
      <div className="profile_box">
        {/* <div className="profile_header d-flex justify-content-between">
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
        </div> */}
        <div className="profile">
          {/* <div className="profie_photo_box"></div>
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
              <span> {2} years </span>
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
          <hr className="tags_line" /> */}

          <div className="yourstatus_box ">
            <div className="yourstatus_innerbox">
            <img src={status_courses} alt="courses" className="status_img" />
              <h6>Joined Community</h6>
            </div>
            <h6 className="yrstatusDta">{statusData.joinedCommunity}</h6>
          </div>
          <hr className="tags_line" />
          <div className="yourstatus_box ">
            <div className="yourstatus_innerbox">
            <img
                src={tobe_applied}
                alt="tobe_applied"
                className="status_img"
              />
              <h6>Joined Events</h6>
            </div>
            <h6 className="yrstatusDta">{statusData.joinedEvents}</h6>
          </div>
          <hr className="tags_line" />
          <div className="yourstatus_box ">
            <div className="yourstatus_innerbox">
              <img
                src={upcoming_session}
                alt="upcoming_session"
                className="status_img"
              />
              <h6>Enrolled Workshop</h6>
            </div>
            <h6 className="yrstatusDta">{statusData.joinedWorkshop}</h6>
          </div>
          <hr className="tags_line" />
          <div className="yourstatus_box ">
            <div className="yourstatus_innerbox">
              <img
                src={community_activity}
                alt="community_activity"
                className="status_img"
              />
              <h6>Enrolled Coaching</h6>
            </div>
            <h6 className="yrstatusDta">{statusData.joinedCoachings}</h6>
          </div>
          <hr className="tags_line" />
          <div className="yourstatus_box ">
            <div className="yourstatus_innerbox">
            <img src={status_courses} alt="courses" className="status_img" />
              <h6>Created Community</h6>
            </div>
            <h6 className="yrstatusDta">{statusData.createdCommunity}</h6>
          </div>
          <hr className="tags_line" />
          <div className="yourstatus_box ">
            <div className="yourstatus_innerbox">
              <img
                src={tobe_applied}
                alt="tobe_applied"
                className="status_img"
              />
              <h6>Created Events</h6>
            </div>
            <h6 className="yrstatusDta">{statusData.createdEvents}</h6>
          </div>
          <hr className="tags_line" />
          {userType == 2 && (<>
          <div className="yourstatus_box ">
            <div className="yourstatus_innerbox">
            <img
                src={community_activity}
                alt="community_activity"
                className="status_img"
              />
              <h6>Created Coaching</h6>
            </div>
            <h6 className="yrstatusDta">{statusData.createdCoachings}</h6>
          </div>
          <hr className="tags_line" />
          <div className="yourstatus_box ">
            <div className="yourstatus_innerbox">
            <img
                src={upcoming_session}
                alt="upcoming_session"
                className="status_img"
              />
              <h6>Created Workshop</h6>
            </div>
            <h6 className="yrstatusDta">{statusData.createdWorkshop}</h6>
          </div>
          <hr className="tags_line" /> </>)}
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
