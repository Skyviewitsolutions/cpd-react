import React from "react";
import Homepage_header from "../../Component/Header/Homepage_header";
import "./Home_screens.css";
import Footer from "../../Component/Footer/Footer";
import filter_home from "../../assets/Images/filter_home.svg";
import comment_red from "../../assets/Images/comment_red.svg";
import Homepage_cards from "../../Component/Cards/Homepage_cards";
import Homepage_chats from "../../Component/Homepage_chats/Homepage_chats";
import Recommended_session from "../../Component/Recommended_session/Recommended_session";
import Certification from "../../Component/Certification_homepage/Certification";
import User_profile from "../../Component/Userprofile/User_profile";
import { ToastContainer } from "react-toastify";
import MainLayout from "../../Layouts/MainLayout";


const Home_screens = () => {
  
  const token = localStorage.getItem("token");

  return (
    <>
      <MainLayout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-12 mt-5 userprofile_div">
              {token && <User_profile />}
              
            </div>
            <div className="col-lg-5 col-md-12 col-12  home_cards">
              <div className="all_notification">
                <h6> All notifications</h6>
                <span>
                  {" "}
                  <img src={filter_home} height="20px" width="20px" />
                  Filter
                </span>
              </div>
              <div className="hmgCrdCont">
                <Homepage_cards />
                <Homepage_cards />
                <Homepage_cards />
                <Homepage_cards />
                <Homepage_cards />
                <Homepage_cards />
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-12  chats_side">
              <Homepage_chats />
              <Recommended_session />
              <Certification />
            </div>
          </div>
          <ToastContainer />
        </div>
      </MainLayout>
    </>
  );
};

export default Home_screens;
