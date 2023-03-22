import React from "react";
import "./Footer.css";
import footer_mail from "../../assets/Images/footer_mail.svg";
import insta_footer from "../../assets/Images/insta_footer.svg";
import youtube_footer from "../../assets/Images/youtube_footer.svg";
import linkdin_footer from "../../assets/Images/linkdin_footer.svg";
import twitter_footer from "../../assets/Images/twitter_footer.svg";
import cpd_logo from "../../assets/Images/cpd_logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate("");

  return (
    <>
      <div className="row footer_section">
        <div className="col-lg-3 col-md-6 col-12  footer_listname ">
          <div className="logo_img">
            <img src={cpd_logo} alt=""></img>
          </div>
          <ul type="none" className="footer_list">
            <li>70 Central ABC street Hong Kong</li>
            <li>Centeral Hong Kong</li>
            <li>Show on Map</li>
          </ul>
          <div className="icon_outer">
            <img src={youtube_footer} alt=""></img>
            <img src={linkdin_footer} alt=""></img>
            <img src={insta_footer} alt=""></img>
            <img src={twitter_footer} alt=""></img>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-12 footer_listname border-left">
          <h5>Need Help</h5>
          <ul type="none" className="footer_list ">
            <li>Sales & Service Support</li>
            <li id="number">+852-9669-2582</li>
            <li>Monday-Friday:9.00-20.00</li>
            <li>Saturday:9.00-15.00</li>
            <li id="info">
              <img src={footer_mail} alt=""></img>info@cpdedu.com
            </li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 col-12 footer_listname border-left">
          <h5>Information</h5>
          <ul type="none" className="footer_list">
            <li style={{ cursor: "no-drop" }}>About Us</li>
            <li style={{ cursor: "no-drop" }}>Delivery Information</li>
            <li style={{ cursor: "no-drop" }}>Privacy Policy</li>
            <li style={{ cursor: "no-drop" }}>Sales</li>
            <li style={{ cursor: "no-drop" }}>Terms & Conditions</li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 col-12 footer_listname border-left">
          <h5>Accounts</h5>
          <ul type="none" className="footer_list context-menu ">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/networking")}>My Network</li>
            <li style={{ cursor: "no-drop" }}>My Jobs</li>
            <li style={{ cursor: "no-drop" }}>My Events</li>
            <li style={{ cursor: "no-drop" }}>Contacts Us</li>
          </ul>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-11 col-11">
            <p className="copyright">
              Copyright 2022 CPD@EDU.All Rights Reserved
            </p>
          </div>
          <div className="col-lg-4 col-md-1 col-1"></div>
        </div>
      </div>
    </>
  );
};

export default Footer;
