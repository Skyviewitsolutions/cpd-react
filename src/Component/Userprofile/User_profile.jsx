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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const User_profile = () => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState({});
  const [userImg, setUserImg] = useState("");
  const [totalExperience, setTotalExperience] = useState(0);

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
          console.log(val, "value here");

          var universityName = JSON.parse(val.university_name);
          var universityName = universityName[0];
          setUniversity_name(universityName);

          var industryName = JSON.parse(val.industry);
          var industryName = industryName[0];
          setIndustry(industryName);

          var domainn = JSON.parse(val.domain);
          var domainn = domainn[0];
          setDomain(domainn);

          var skills = JSON.parse(val.skills);
          setAllSkills(skills);

          setUsersData(val);

          var userImgPath = res.data.avtarPath;
          var userImg = userImgPath + res.data.data?.avtar_file;

          setUserImg(userImg);

          var startYearEmployment = JSON.parse(val.start_year_educational);
          var endYearEmployment = JSON.parse(val.end_year_employment);

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

  const updateProfile = () => {
    const val = {
      imageUrl: userImg,
      usersData: usersData,
    };
    console.log(val, "useProfile data..");
    navigate("/resume", { state: val });
  };

  const isJson = (str) => {
    try {
      let value = JSON.parse(str);
      value = value.join(", ");
      return value;
    } catch (e) {
      return str;
    }
  };

  return (
    <>
      <div className="profile_box">
        <div className="profile_header">
          <div className="profile_photo_box">
            {userImg && <img src={userImg} alt="" className="userImgIcon" />}
            {/* <img src={User} height="50px" width="50px" style={{borderRadius:"50%"}}/> */}
          </div>
        </div>
        <div className="profile">
          <div className="profie_photo_box"></div>
          <div className="user_name">
            <h2>{usersData.first_name}</h2>
            <Homepage_button
              text="View profile"
              brColor="#2c6959"
              fontColor="#2c6959"
              onClick={updateProfile}
            />
          </div>
          <div className="qualification">
            <h6>
              University : {university_name}
              {/* {JSON.parse(usersData.university_name).join(', ')} */}
            </h6>
          </div>
          <div className="heading_box">
            <h6 className="heading">
              <span> Total Experience: </span>
              {totalExperience} years
            </h6>
            <h6 className="heading">
              <span> Industries: {industry}</span>
            </h6>
            <h6 className="heading">
              <span>Domains: {domain}</span>
            </h6>
            <h6 className="heading">
              <span>Skills: {allSkills.toString()}</span>
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
              {/* <div className="percentage_box">
                <h5>75%</h5>
                <h4>complete</h4>
              </div> */}
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
      </div>
    </>
  );
};

export default User_profile;