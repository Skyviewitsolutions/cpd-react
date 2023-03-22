import React from "react";
import "./Certification.css";
import Homepage_button from "../button/Homepage_button";
import main_chatroom from "../../assets/Images/main_chatroom.svg";
import H1 from "../../assets/Icons/H1.png";
import H2 from "../../assets/Icons/H2.png";
import days_timing from "../../assets/Images/days_timing.svg";
import black_suitcase from "../../assets/Images/black_suitcase.svg";

const Certification = () => {
  return (
    <>
      <div className="design_outbox">
        <h5 id="certification">CERTIFICATION</h5>

        <div className="designprogram_box">
          <div className="career_foundry">
            <h6>Career Foundry UX</h6>
            <h5>Design Program</h5>
          </div>
          <Homepage_button
            text="Active"
            brColor="#2c6959"
            fontColor="#2c6959"
          />
        </div>
      </div>
      <div className="certification_index">
        <div className="design_details">
          <div className="design_profile">
            <div className="design_profilepic">
              <img src={H1} alt=""></img>
            </div>
            <div className="design_name">
              <h4>
                Associate Director-Marketing, Star Sports Hong Kong Disneyland
              </h4>

              <h6>Mumbai, Maharashtra</h6>
              <h6>via Fidanto</h6>
              <div className="days_box">
                <img src={days_timing} alt=""></img>
                <h6>4days ago</h6>
                <img src={black_suitcase} alt=""></img>
                <h6>Full Time</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="design_details">
          <div className="design_profile">
            <div className="design_profilepic">
              <img src={main_chatroom} alt=""></img>
            </div>
            <div className="design_name">
              <h4>
                <a href="">
                  Associate Director-Investigations and Due to Diligence
                </a>
              </h4>
              <span style={{ fontSize: "12px", fontWeight: "400" }}>
                Netrika, Consulting and investigtaion
              </span>
              <h6>Mumbai, Maharashtra</h6>
              <h6>via Fidanto</h6>
              <div className="days_box">
                <img src={days_timing} alt=""></img>
                <h6>4days ago</h6>
                <img src={black_suitcase} alt=""></img>
                <h6>Full Time</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="design_details">
          <div className="design_profile">
            <div className="design_profilepic">
              <img src={H2} alt=""></img>
            </div>
            <div className="design_name">
              <h4>
                Associate Director-Marketing, Star Sports Hong Kong Disneyland
              </h4>
              <h6>Mumbai, Maharashtra</h6>
              <h6>via Fidanto</h6>
              <div className="days_box">
                <img src={days_timing} alt=""></img>
                <h6>4days ago</h6>
                <img src={black_suitcase} alt=""></img>
                <h6>Full Time</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certification;
