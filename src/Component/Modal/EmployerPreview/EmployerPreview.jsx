// This is the employeer preview page;

import React from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import infosysdommy from "../../../assets/Images/infosysdommy.png";
import dommyuserperson from "../../../assets/Images/dommyuserperson.jfif";

import { useLocation } from "react-router-dom";
import "../../../fonts/Inter-Bold.ttf";
import Spinner from "react-bootstrap/Spinner";
import "../../../fonts/Inter-Regular.ttf";
import Button from "../../button/Button/Button";
import dummyUserPerson from "../../../assets/Images/dummyImages.webp";
import DefaultImg from "../../../assets/Images/default.png"


const EmployerPreview = (props) => {

  const {
    firstName,
    lastName,
    contactNumber,
    nationality,
    dob,
    gender,
    loading,
    employeerImg,
    skills,
    setShowEmployeerPreview,
    domain,
    industry,
    updateProfile,
  
    showEmployeerPreview,
    update,
    description,
    submit,
  } = props;

  const navigate = useNavigate("");

  const handleSubmit = () => {
    if (update) {
      updateProfile();
    } else {
      submit();
    }
  };


  return (
    <Modal
      show={showEmployeerPreview}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="previewCont">
        <Modal.Header closeButton={false}>
          <Modal.Title id="contained-modal-title-vcenter">
            Employer Preview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="resume-wrapper">
            <div className="container">
              <section className="resumeimg_row">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-12">
                    <div className="resume_img">
                      <img
                        src={
                            employeerImg
                            ? URL.createObjectURL(employeerImg) 
                            :  DefaultImg
                        }
                      />
                    </div>
                  </div>

                  <div className="col-lg-9 col-md-9 col-12 resume_nameBox">
                    <h1>
                      {firstName} {lastName}
                    </h1>
                    <h5>Coach</h5>
                    <h5> Tel. {contactNumber}</h5>
                  </div>
                </div>
              </section>
              <section className="resumedetails_row">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-12 ">
                    <div className="resumedetails_left">
                      <h5>Details</h5>
                      <p>{gender}</p>
                      <p>Nationality : {nationality}</p>
                      <p>DOB : {dob}</p>
                      <h5> Domain & Industry</h5>
                      <p>Tech (IT Sector)</p>
                      <h5>Professional Skills</h5>
                      {skills?.length != 0 &&
                        skills.map((skill, index) => {
                          return (
                              <p key={index}>{skill}</p>
                          );
                        })}
                      
                     
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-9 col-12 ">
                    <div className="resumedetails_right">
                      <h5>About Summary</h5>
                      <p>{description}</p>
                      <hr />
                   
                      <h5>Domain & Industry</h5>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                          <p>
                            <span className="resume_domainspan">Domain :</span>{" "}
                            {domain}
                          </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                          <p>
                            <span className="resume_domainspan">
                              Industry :
                            </span>{" "}
                            {industry}
                          </p>
                        </div>
                      </div>
                      <hr />

                      <div className="d-flex justify-content-end">
                        <Button
                          title="Cancel"
                          onClick={() => setShowEmployeerPreview(false)}
                        />
                        <Button
                          title={update ? "Update" : "Submit"}
                          loading={loading}
                          onClick={() => handleSubmit()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default EmployerPreview;


