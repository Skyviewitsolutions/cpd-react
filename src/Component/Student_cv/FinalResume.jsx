import React from "react";
import "./FinalResume.css";
import Header from "../Header/Header";
import dommyuserperson from "../../assets/Images/dommyuserperson.jfif";
import infosysdommy from "../../assets/Images/infosysdommy.png";
import edu_logo from "../../assets/Images/edu_logo.jpeg";
import { useLocation } from "react-router-dom";
import "../../fonts/Inter-Bold.ttf";
import "../../fonts/Inter-Regular.ttf";


const FinalResume = () => {

  const location = useLocation();
  var resumeData = location.state ;
  var resumeData = JSON.parse(resumeData);

  return (
    <>
      <Header />
      <div className="resume-wrapper">
        <div className="container">
          <section className="resumeimg_row">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-12">
                <div className="resume_img">
                  <img src={dommyuserperson} />
                </div>
              </div>

              <div className="col-lg-9 col-md-9 col-12 resume_nameBox">
                <h1> James</h1>
                <h5>Marketing Manager Tech : IT Services</h5>
                <h6>
                  Seoul Campus : 26, Kyungheedae-ro, Dongdaemun-gu, Seoul,
                  02447, Republic of Korea
                </h6>
                <h5> Tel. +82-2-961-0114</h5>
              </div>
            </div>
          </section>
          <section className="resumedetails_row">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-12 ">
                <div className="resumedetails_left">
                  <h5>Details</h5>
                  <p>Male</p>
                  <p>Nationality:Bang Kok</p>
                  <p>Background:</p>

                  <h5> Domain & Industry</h5>
                  <p>Tech (IT Sector)</p>
                  <h5>Professional Skills</h5>
                  <p>Interpersonal Skills</p>
                  <p>Communication Skills</p>
                  <p>Leadership</p>
                  <h5>Languages</h5>
                  <p>English, Cantonese</p>
                  <h5>Hobbies</h5>
                  <p>Learning</p>
                  <p>Marketing</p>
                  <p>Investing</p>
                </div>
              </div>
              <div className="col-lg-9 col-md-9 col-12 ">
                <div className="resumedetails_right">
                  <h5>About Summary</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make..
                  </p>
                  <hr />
                  <h5>Employment History</h5>
                  <div className="resume_company">
                    <div className="resume_educationimg">
                      <img src={infosysdommy} alt="" />
                    </div>

                    <div className="resume_companyhistory">
                      <p>Marketing Manager (IT Company)</p>
                      <p>2018-2022</p>
                    </div>
                  </div>
                  <hr />
                  <h5>Education Detail</h5>
                  <div className="resume_company">
                    <div className="resume_educationimg">
                      <img src={edu_logo} alt="" />
                    </div>
                    <div className="resume_companyhistory">
                      <h6>KYUNG HEE UNIVERSITY</h6>
                      <p>Marketing Manager (IT Company)</p>
                      <p>2018-2022</p>
                    </div>
                  </div>
                  <hr />
                  <h5>Domain & Industry</h5>
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                      <p>
                        <span className="resume_domainspan">Domain:</span>{" "}
                        Technology
                      </p>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <p>
                        <span className="resume_domainspan">Industry:</span>{" "}
                        Software
                      </p>
                    </div>
                  </div>

                  <p>
                    In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the
                  </p>

                  <hr />
                  <h5>Goal</h5>
                  <h6 className="resume_goal">
                    Becoming an expert in our field
                  </h6>
                  <p>Master of Business Administration</p>
                  <p>2018-2022</p>
                  <hr />
                  <button className="resume_submitbutton">
                    Go To Homepage
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default FinalResume;
