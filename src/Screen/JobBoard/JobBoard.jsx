// This is job portal ;

import React, { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";
import CreateBtn from "../../Component/button/CreateBtn/CreateBtn";
import NoDataImg from "../../assets/Images/noDataFound.png";
import Loader from "../../Component/Loader/Loader";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiInfoCircle } from "react-icons/bi";
import showToast from "../../Component/CustomToast/CustomToast";
import dommy_person from "../../assets/Images/dommy_person.jfif";
import "../../fonts/Inter-Bold.ttf";
import "../../fonts/Inter-Regular.ttf";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import { HiSearch } from "react-icons/hi";
import Sidenavbar from "../../Component/navbar/Sidenavbar";
import { GrPowerForceShutdown } from "react-icons/gr";
import BookCoaches from "../../Component/Modal/BookCoaches/BookCoaches";
import { endpoints } from "../../Component/services/endpoints";
import axios from "axios";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import BookBtn from "../../Component/button/BookBtn/BookBtn";
import { generatePath, useNavigate } from "react-router-dom";
import CreateCoachingForm from "../../Component/Modal/CreateCoachingForm/CreateCoachingForm";
import CustomFilter from "../../Component/CustomFilter/CustomFilter";
import JobCard from "../../Component/JobCard/JobCard";
import CreateJobForm from "../../Component/Modal/createJobsFom/CreateJobsForm";



const JobBoard = () => {

  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [allAppliedJobs, setAllAppliedJobs] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(true);
  const [myJobs, setMyJobs] = useState([]);
  const [jobsListToBeShown, setJobsListToBeShown] = useState([]);
  const [jobsListToBeShown2, setJobsListToBeShown2] = useState([]);
  const [inputData, setInputData] = useState("");
  const [showJobForm, setShowJobForm] = useState(false);
  const [employeerImgPath, setEmployeerImgPath] = useState("");
  const logedIn = localStorage.getItem("logedIn");
  const [selectedJob, setSelectedJob] = useState({});
  const [imagePath, setImagePath] = useState("");
  const [updateJob, setUpdateJob] = useState(false);
  const [selectedJobForUpdate, setSelectedJobForUpdate] = useState([]);
  
  const navigate = useNavigate();


  var userDetails = localStorage.getItem("users");
  var userData = userDetails && JSON.parse(userDetails);
  var userId = userData ? userData._id : 0

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // filter UseState here;
  const [filterByDomain, setFilterByDomain] = useState([]);
  const [filterByIndustry, setFilterByIndustry] = useState([]);

  var userDetails = localStorage.getItem("users");
  var userType = JSON.parse(userDetails);
  userType = userType?.user_type;


  const showJobsOnCalendar = () => {};

  const deleteJobs = (id) => {
    const url = endpoints.jobs.deleteJobs + "job_id=" + id + "&created_by=" + userId;
    setLoading(true)
    axios.get(url , {headers : headers})
    .then((res) =>{
      if(res.data.result){
        showToast("Jobs deleted " , {type : "success"})
        getMyJobList()
      }
      setLoading(false)
    })
    .catch((err) =>{
      console.log(err , "err")
      setLoading(false)
    })
  };

  const applyJob = (dta) => {
    setLoading(true)
    const url = endpoints.jobs.applyJob + "job_id=" + dta?._id + "&user_id=" + userId + "&status=0";
    axios.get(url , {headers : headers}) 
    .then((res) =>{
      if(res.data.result){
        showToast("Job applied successfully" , "success")
      }
      setLoading(false)
    })
    .catch((err) =>{
      console.log(err , "this is the error")
      setLoading(false)
    })
  };

  const getJobList = () => {
    const url = endpoints.jobs.allJobs + "?user_id=" + userId;
    setLoading(true)
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false)
        if (res.data.result) {
          console.log(res , "response here");
          const val = res.data.message?.data;
          const allJobs = val.filter((itm) => {return itm?.created_by !== userId})
          setJobsListToBeShown(allJobs);
          setJobsListToBeShown2(allJobs);
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err, "trhis is error");
      });
  };

  const getMyJobList = () =>{
    const url = endpoints.jobs.allJobs + "?created_by=" + userId;
    setLoading(true)
    axios
    .get(url, { headers: headers })
    .then((res) => {
      setLoading(false)
      if (res.data.result) {
        const val = res.data.message?.data;
        setJobsListToBeShown(val);
        setJobsListToBeShown2(val);
        setMyJobs(val)
      }
    })
    .catch((err) => {
      setLoading(false)
      console.log(err, "trhis is error");
    });
  }

  const handleShowMyJobs = () => {
    setShowAllJobs(false);
    getMyJobList();
  };

  const handleShowAllJobs = () => {
    setShowAllJobs(true);
    getJobList();
  };

  const handleEdit = (data) => {
    setShowJobForm(true)
    setSelectedJob(data)
    setUpdateJob(true)
  };

  useEffect(() => {
    getJobList();
  }, []);


  const handleFilterJobs = (val) => {
    var value = val.toLowerCase();
    setInputData(val);
    if (showAllJobs) {
      var filteredData = jobsListToBeShown.filter((item, index) => {
        return item.job_title.toLowerCase().includes(value);
      });
      setJobsListToBeShown2(filteredData);
    } else {
      var filteredData = myJobs.filter((item, index) => {
        return item.job_title.toLowerCase().includes(value);
      });
      setJobsListToBeShown2(filteredData);
    }

    if(value === ""){
      setJobsListToBeShown2(jobsListToBeShown)
    }
  };


   // here we are filtering the coaching according to the domain and industry;

   useEffect(() => {

    var filterJobByIndustry = jobsListToBeShown.filter(
      (itm, index) => {
        var industry = itm.industry;
        var industryTitle = industry && industry?.title?.toLowerCase();
        return filterByIndustry.includes(industryTitle);
      }
    );

    var filterJobByDomain = filterJobByIndustry.filter((itm, index) => {
      var domain = itm.domain;
      var domainTitle = domain && domain?.title?.toLowerCase();
      return filterByDomain.includes(domainTitle);
    });
    setJobsListToBeShown2(filterJobByDomain);
  }, [filterByDomain]);

  useEffect(() => {

    var filterJopByDomain = jobsListToBeShown.filter((itm, index) => {
      var domain = itm.domain;
      var domainTitle = domain && domain?.title?.toLowerCase();
      return filterByDomain.includes(domainTitle);
    });

    var filterCoachingByIndustry = filterJopByDomain.filter(
      (itm, index) => {
        var industry = itm.industry;
        var industryTitle = industry && industry?.title?.toLowerCase();
        return filterByIndustry.includes(industryTitle);
      }
    );
    setJobsListToBeShown2(filterCoachingByIndustry);
  }, [filterByIndustry]);


  return (
    <MainLayout>
      <section className="coachScreen">
        <div className="container-fluid">
          <div className="row d-flex justify-content-between">
            <div className="col-lg-2 d-lg-block d-none coachScreen_left">
              <h5 className="ml-3" style={{ marginLeft: "9px" }}>
                Job Board
              </h5>
              <CustomFilter
                filterByDomain={filterByDomain}
                setFilterByDomain={setFilterByDomain}
                filterByIndustry={filterByIndustry}
                setFilterByIndustry={setFilterByIndustry}
              />
            </div>
            <div className="col-lg-10 col-md-12 col-12 coachScreen_right">
              <div className="row">
                <div className="col-lg-7 col-md-12 col-12">
                  <div className="coach_searchBar ">
                    <div className="form-group ">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search Here"
                        value={inputData}
                        onChange={(e) => handleFilterJobs(e.target.value)}
                      />
                      <HiSearch id="coach_search" />
                    </div>
                  </div>
                </div>

                {logedIn && userType == 3 && (
                  <>
                    <div className="coachBtnCont col-5">
                      <button
                        className="coachingBtn"
                        style={{
                          // background: showAllCoaching ? "#2c6959" : "white",
                          // color: showAllCoaching ? "white" : "#2c6959",
                          border: showAllJobs
                            ? "2px solid #2c6959"
                            : "2px solid #d4d9d6",
                        }}
                        onClick={handleShowAllJobs}
                      >
                        All
                      </button>

                      <button
                        className="coachingBtn"
                        style={{
                          // background: !showAllCoaching ? "#2c6959" : "white",
                          // color: !showAllCoaching ? "white" : "#2c6959",
                          border: !showAllJobs
                            ? "2px solid #2c6959"
                            : "2px solid #d4d9d6",
                        }}
                        onClick={handleShowMyJobs}
                      >
                        My Jobs
                      </button>
                      <CreateBtn onClick={() => setShowJobForm(true)} />
                    </div>
                  </>
                )}
              </div>

              <div className="row ">
                {jobsListToBeShown2.length != 0 &&
                  jobsListToBeShown2.map((data, index) => {
                    var id = data._id;
                    var timing = data?.availability_timing;
                    timing = timing ? timing?.split(",") : null;
                    var bookingStatus = 3;
                    var enrolled = allAppliedJobs.filter((itm, ind) => {
                      return itm.coaching_id == id;
                    });
                    if (enrolled.length != 0) {
                      var datas = enrolled[0];
                      var status = datas.status;
                      bookingStatus = status;
                    }
                    return (
                      <JobCard
                        data={data}
                        timing={timing}
                        showBookBtn={showAllJobs}
                        key={index}
                        jobImgPath={imagePath}
                        applyJob={applyJob}
                        selectedJob={selectedJob}
                        showJobsOnCalendar={showJobsOnCalendar}
                        showEdit={!showAllJobs}
                        deleteJobs={deleteJobs}
                        handleEdit={handleEdit}
                        showAllJobs={showAllJobs}
                      />
                    );
                  })}
              </div>

              {jobsListToBeShown2.length == 0 && (
                <div className="noDataCont">
                  <img src={NoDataImg} alt="" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CreateJobForm
        showJobForm={showJobForm}
        setShowJobForm={setShowJobForm}
        getJobList={getJobList}
        setShowAllJobs={setShowAllJobs}
        getMyJobList={getMyJobList}
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
        setUpdateJob={setUpdateJob}
        updateJob={updateJob}
      />

      {loading && <Loader />}
    </MainLayout>
  );
};

export default JobBoard;

