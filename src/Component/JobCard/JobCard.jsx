// here we are creating the card for the job portal;

import React from "react";
import Button from "../button/Button/Button";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import dommy_person from "../../assets/Images/dommy_person.jfif";
import DefaultImg from "../../assets/Images/default.png";
import { generatePath, useNavigate } from "react-router-dom";

const JobCard = (props) => {

  const {
    data,
    showBookBtn,
    jobImgPath,
    applyJob,
    showEdit,
    handleEdit,
    deleteJobs,
    selectedCoaching,
    loading,
    key,
  } = props;

  const navigate = useNavigate();

  const showJobDetails = () => {};

  const employeerInfo = data?.user_profile;

  const jobDomain = "";
  const jobIndustry = "";

  const handleJobDetails = (dta) => {
    console.log(dta, "dta here");
    const path = generatePath("/job-board-details/:jobId", { jobId: dta?._id });
    navigate(path);
  };

  return (
    <div className="col-lg-6 col-md-12 col-sm-12 position-relative" key={key}>
      <div className="coachingCrd bg-white border-2  ">
        <div
          onClick={() => handleJobDetails(data)}
          className="d-flex justify-content-between"
        >
          <div className="col-lg-3 col-md-2 col-sm-12 ">
            <img
              src={
                employeerInfo?.company_logo
                  ? employeerInfo?.company_logo
                  : DefaultImg
              }
              alt="#"
              className="coachImg"
            />
          </div>
          <div className="col-lg-4 col-md-5 col-sm-12">
            <div className="d-flex  pr-4 ">
              <h5 className="coachName">
                {/* {data?.employeerInfo?.first_name} {data?.employeerInfo?.last_name} */}
                {data?.job_title}
              </h5>
            </div>
            <div className="coachContr">
              <h6>Location</h6>
              <span>{data?.job_location}</span>
            </div>
            <div className="coachContr">
              <h6>Company</h6>
              <span>{data?.company_name}</span>
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12 d-flex  flex-column">
            <div className="d-flex coachCont2 justify-content-between">
              <h6>Openings</h6>:<span>{data?.total_openings}</span>
            </div>
            {data.price != 0 ? (
              <div className="d-flex coachCont2 justify-content-between align-items-center">
                <h6>Salary</h6>:
                <span>
                  {data?.min_salary} - {data?.max_salary} HKD /{" "}
                  {data?.duration === "monthly" ? "Month" : "Year"}
                </span>
              </div>
            ) : (
              <div className="d-flex coachCont2 justify-content-between align-items-center">
                <h6>Free</h6>
              </div>
            )}
            <div className="d-flex coachCont2 justify-content-between">
              <h6>Call</h6>:<span>9542147536</span>
            </div>
          </div>
        </div>
        {showBookBtn && (
          <div className="mt-3 position-absolute w-1 bookbtnBold">
            {data?.is_applied ? (
              <Button title="Applied" style={{background : "#79da83" }}/>
            ) : (
              <Button onClick={() => applyJob(data)} title="Apply" />
            )}
          </div>
        )}
        {showEdit && (
          <div className="d-flex justify-content-end mr-4 ">
            <div className="coachingEdit mt-3 editBtnBold">
              <FiEdit color="#2c6959" onClick={() => handleEdit(data)} />
              <AiOutlineDelete
                color="#2c6959"
                onClick={() => deleteJobs(data._id)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;



