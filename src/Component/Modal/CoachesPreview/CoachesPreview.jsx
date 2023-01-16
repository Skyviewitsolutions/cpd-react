import React ,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import "./coachesPreview.css";
import { useNavigate } from 'react-router-dom';
import infosysdommy from "../../../assets/Images/infosysdommy.png";
import dommyuserperson from "../../../assets/Images/dommyuserperson.jfif";
// import infosysdommy from "../../assets/Images/infosysdommy.png";
// import edu_logo from "../../assets/Images/edu_logo.jpeg";
import { useLocation } from "react-router-dom";
import "../../../fonts/Inter-Bold.ttf";
import "../../../fonts/Inter-Regular.ttf";
const CoachesPreview = (props) => {
    const [openCoachesPreview, setOpenCoachesPreview] = useState(false);
    const navigate = useNavigate("");
  return (
    <>

<Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          
          Coaches Preview
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
     
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
                  <p>DOB:</p>

                  <h5> Domain & Industry</h5>
                  <p>Tech (IT Sector)</p>
                  <h5>Professional Skills</h5>
                  <p>Interpersonal Skills</p>
                  <p>Communication Skills</p>
                  <p>Leadership</p>
                 
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
                    {/* <div className="resume_educationimg">
                      <img src={infosysdommy} alt="" />
                    </div> */}

                    <div className="resume_companyhistory">
                      <p>Marketing Manager (IT Company)</p>
                      <p>2018-2022</p>
                    </div>
                  </div>
                  <hr />
                  {/* <h5>Education Detail</h5>
                  <div className="resume_company">                  
                    <div className="resume_companyhistory">
                      <h6>KYUNG HEE UNIVERSITY</h6>
                      <p>Marketing Manager (IT Company)</p>
                      <p>2018-2022</p>
                    </div>
                  </div>
                  <hr /> */}
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

                  {/* <p>
                    In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the
                  </p> */}

                  <hr />
                  <h5>Availability</h5>
                  <h6 className="resume_goal">
                  9.30 AM - 12.30 PM
                  </h6>
                  <p>Mon-Fri</p>
                  <h6 className="resume_goal">
                 Paid
                  </h6>
                  
                  <p> Price</p>
                  <p></p>
                  <hr />
                  {/* <div className="row">
                  <div className="col-lg-5 col-md-6 col-12"> 
                    <button className="resume_submitbutton"> cancel </button>
                  </div>
                  <div className="col-lg-5 col-md-6 col-12"> 
                    <button className="resume_submitbutton"> Submit </button>
                  </div>
                  </div> */}
                  <button className="resume_submitbutton" onClick={() => navigate("/")}>
                    Go To Homepage
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
   
      </Modal.Body>
      
    </Modal>










      
    </>
  )
}

export default CoachesPreview
