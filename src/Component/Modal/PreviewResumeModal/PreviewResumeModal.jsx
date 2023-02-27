import React from "react";
import { Modal } from "react-bootstrap";
import "./PreviewResumeModal.css";
import Spinner from "react-bootstrap/Spinner";
import FinalResume from "../../Student_cv/FinalResume";
import Header from "../../Header/Header";
import infosysdommy from "../../../assets/Images/infosysdommy.png";
import edu_logo from "../../../assets/Images/edu_logo.jpeg";
import "../../../fonts/Inter-Bold.ttf";
import "../../../fonts/Inter-Regular.ttf";
import dommyuserperson from "../../../assets/Images/dommyuserperson.jfif";
import CollegeImage from "../../../assets/Images/college.png";
import CompanyImg from "../../../assets/Images/company.png";


const PreviewResumeModal = (props) => {

  const {
    openPreviewModal,
    setOpenPreviewModal,
    firstName,
    lastName,
    contact,
    nationality,
    dob,
    gender,
    uploadImg,
    university,
    university_start_year,
    university_end_year,
    program,
    fieldStudy,
    targetDomain  ,
    skills,
    description,
    jobTitle,
    employmentType,
    company,
    jobDomain,
    jobIndustry,
    currentJob,
    role,
    domain,
    hobbies,
    allExperience,
    updateProfile,
    submit,
    profileImg ,
    update,
    loading,
    allUniversity,
    targetGoal,
    targetIndustry,
    targetLocation,
    targetYearOfArchieve,
  } = props;

  const day = new Date();
  const year = day.getFullYear();

  
  return (

    <Modal show={openPreviewModal} size="lg">
      <div className="rsumModal">
        <div className="cutOption" onClick={() => setOpenPreviewModal(false)}>
          <h6>x</h6>
        </div>
        <Header />
        <div className="resume-wrapper">
          <div className="container">
            <section className="resumeimg_row">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12">
                  <div className="resume_img">
                    {profileImg ? <img src={profileImg}/> : <img src={dommyuserperson}/>}
                    
                  </div>
                </div>

                <div className="col-lg-9 col-md-9 col-12 resume_nameBox">
                  <h1>
                    {firstName} {lastName}
                  </h1>
                  <h5>{role}</h5>
                  <h6> {domain}</h6>
                  <h5>Phone No. {contact}</h5>
                </div>
              </div>
            </section>
            <section className="resumedetails_row">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-12 ">
                  <div className="resumedetails_left">
                    <h5></h5>
                    <h5>Details</h5>
                    <p>{gender}</p>
                    <p>Nationality : {nationality}</p>
                    <p></p>
                    <h5> Domain & Industry</h5>
                    <p>{domain}</p>
                    <h5>Professional Skills</h5>

                    {skills.map((itm, index) => {
                      return (
                        <>
                          <p key={index}>{itm}</p>
                        </>
                      );
                    })}

                    {/* <h5>Languages</h5>
                    <p>English, Cantonese</p> */}
                    <h5>Hobbies</h5>
                    {hobbies.map((itm, index) => {
                      return (
                        <>
                          <p>{itm}</p>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="col-lg-9 col-md-9 col-12 ">
                  <div className="resumedetails_right">
                    <h5>About Summary</h5>
                    <p>{description}</p>
                    <hr />
                    <h5>Employment History</h5>

                    {allExperience &&
                      allExperience.map((itm, ind) => {
                        return (
                          <>
                            <div className="resume_company">
                              <div className="resume_educationimg">
                                <img src={CompanyImg} alt="" />
                              </div>

                              <div className="resume_companyhistory">
                                <p>{itm.jobTitle}</p>
                                <p>
                                  {itm.startYear}-{itm.endYear}
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}

                    <hr />
                    <h5>Education Detail</h5>
                    {allUniversity &&
                      allUniversity.map((itm, ind) => {
                        return (
                          <>
                            <div className="resume_company">
                              <div className="resume_educationimg">
                                <img src={CollegeImage} alt="" />
                              </div>
                              <div className="resume_companyhistory">
                                <h6>{itm.collegeName}</h6>
                                <p>{itm.progam}</p>
                                <p>
                                  {itm.startYear}-{itm.endYear}
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}

                    <hr />
                    <h5>Domain & Industry</h5>
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-12">
                        <p>
                          <span className="resume_domainspan">Domain:</span>{" "}
                          {allExperience[0]?.domain}
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6 col-12">
                        <p>
                          <span className="resume_domainspan">Industry:</span>{" "}
                          {allExperience[0]?.industry}
                        </p>
                      </div>
                    </div>
                  
                    <hr />
                    <h5>Goal</h5>
                    <h6 className="resume_goal">{targetGoal}</h6>
                    <p>Industry : {targetIndustry}</p>
                    <p>{parseInt(year) + parseInt(targetYearOfArchieve)}</p>
                    <hr />
                    <button
                      type="submit"
                      className="submit_resumeCreationButton"
                      onClick={update === true ? updateProfile : submit}
                    >
                      {loading ? (
                        <Spinner
                          animation="border"
                          variant="light"
                          style={{ width: "20px", height: "20px" }}
                        />
                      ) : update ? (
                        "Update"
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewResumeModal;
