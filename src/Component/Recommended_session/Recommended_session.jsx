import React from "react";
import "./Recommended_session.css";

import star from "../../assets/Images/star.svg";
import download_icon from "../../assets/Images/download_icon.svg";
import Analytic from "../../assets/Icons/Artboard13.svg";
import Conflict_mgmnt from "../../assets/Icons/Artboard49.svg";
import Human_resorces from "../../assets/Icons/Artboard53.svg";
import main_chatroom from "../../assets/Images/main_chatroom.svg";
import Homepage_button from "../button/Homepage_button";
import Coaches1 from "../../assets/Icons/Artboard26.svg";
import Coaches2 from "../../assets/Icons/Artboard27.svg";
import Coaches3 from "../../assets/Icons/Artboard28.svg";
const Recommended_session = () => {
  return (
    <>
     <div className="recommended_box">
        <div className="recommended_header">
          <h5>Recommended Session</h5>
        </div>
        <div className="recommended">      
                <div className="recommended_details">
            <div className="recommended_imgbox">
              <img src={Conflict_mgmnt} alt=""></img>
               <div className="recommended_name">
                <h4>CONFLICT MANAGEMENT</h4>
                <h5>WORK & LIFE BALANCE</h5>
                <div className="views_box">
                  <h6>4.4</h6>
                  <img src={star} alt=""></img>
                  <img src={download_icon} alt=""></img>

                  <h6>5M+</h6>
                </div>
              </div> 
            </div>
             <Homepage_button
              text="Enroll Now"
              brColor="#2c6959"
              fontColor="#2c6959"
            /> 
          </div>    

         <div className="recommended_details">
        
            <div className="recommended_imgbox">
              <img src={Analytic} alt=""></img>
               <div className="recommended_name">
                <h4>ANALYTIC INTELLIGENCE</h4>
                {/* <h5>Work & Life Balance</h5> */}
                <div className="views_box">
                  <h6>4.4</h6>
                  <img src={star} alt=""></img>
                  <img src={download_icon} alt=""></img>

                  <h6>5M+</h6>
                </div>
              </div> 
            </div>
             <Homepage_button
              text="Enroll Now"
              brColor="#2c6959"
              fontColor="#2c6959"
            /> 
          </div>

           <div className="recommended_details">
           
            <div className="recommended_imgbox">
              <img src={Human_resorces} alt=""></img>
               <div className="recommended_name">
                <h4>HUMAN RESOURCES</h4>
                <h5>MANAGEMENT</h5>
                <div className="views_box">
                  <h6>4.4</h6>
                  <img src={star} alt=""></img>
                  <img src={download_icon} alt=""></img>

                  <h6>5M+</h6>
                </div>
              </div> 
            </div>
            <Homepage_button
              text="Enroll Now"
              brColor="#2c6959"
              fontColor="#2c6959"
            /> 
          </div>

          <div className="coaches_heading">
            <h5>COACHES</h5>
          </div>

          <div className="recommended_details">
          <div className="recommended_imgbox">
              <img src={Coaches1} alt=""></img>
               <div className="recommended_name">
                <h4>Break Down Joy</h4>
                <h5>Developers of UI Design</h5>
                
                <div className="Coaches_views_box">
                  <span>Hey there, I m intrested to maitain your goal</span>
                  {/* <img src={star} alt=""></img>
                  <img src={download_icon} alt=""></img> */}

                  {/* <h6>5M+</h6> */}
                </div>
              </div> 
            </div>
             <Homepage_button
              text="Book Now"
              brColor="#2c6959"
              fontColor="#2c6959"
            /> 
          </div> 

           <div className="recommended_details">
           <div className="recommended_imgbox">
              <img src={Coaches2} alt=""></img>
               <div className="recommended_name">
                <h4>Harry Osborn</h4>
                <h5>Developers of UI Design</h5>
                <div className="Coaches_views_box">
                <span>Hey there, I m intrested to maitain your goal</span>
                </div>
              </div> 
            </div>
             <Homepage_button
              text="Book Now"
              brColor="#2c6959"
              fontColor="#2c6959"
            /> 
          </div>

           <div className="recommended_details">
           <div className="recommended_imgbox">
              <img src={Coaches3} alt=""></img>
               <div className="recommended_name">
                <h4>Jack Smith</h4>
                <h5>Developers of UI Design</h5>
                <div className="Coaches_views_box">
                <span>Hey there, I m intrested to maitain your goal</span>

                
                </div>
              </div> 
            </div>
             <Homepage_button
              text="Book Now"
              brColor="#2c6959"
              fontColor="#2c6959"
            /> 
          </div> 
        </div>
      </div> 
      
    </>
  );
};

export default Recommended_session;
