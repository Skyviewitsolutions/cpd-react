// This is the jobs form ;

import React, { useState, useEffect } from "react";
import "./createJobsForm.css";
import { Modal } from "react-bootstrap";
import Button from "../../button/Button/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TagsInput } from "react-tag-input-component";
import showToast from "../../CustomToast/CustomToast";
import { endpoints } from "../../services/endpoints";
import axios from "axios";
import { getDomainList, getIndustryList } from "../../../utils/api";

const CreateJobsForm = (props) => {

  const { showJobForm, setShowJobForm, update, setUpdate , getJobList , getMyJobList ,setShowAllJobs , selectedJob , setSelectedJob ,setUpdateJob , updateJob } = props;

  const [jobTitle, setJobTitle] = useState("");
  const [coachingImg, setCoachingImg] = useState(null);
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [domainId, setDomainId] = useState("");
  const [allDomain, setAllDomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalOpenings, setTotalOpenings] = useState();
  const [jobLocation, setJobLocation] = useState("");
  const [minsalary, setMinSalary] = useState("");
  const [maxsalary, setMaxSalary] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [salaryType, setSalaryType] = useState("");

  const [jobsImg, setJobsImg] = useState(null);

  const [showDomainInputBox, setShowDomainInputBox] = useState(false);
  const [showIndustryInputBox, setShowIndustryBox] = useState(false);
  const [domainManualInput, setDomainManualInput] = useState("");
  const [industryManualInput, setIndustryManualInput] = useState("");
  const [skills, setSkills] = useState([]);
  const token = localStorage.getItem("token");

  var userDetails = localStorage.getItem("users");
  var userData = userDetails && JSON.parse(userDetails);
  var userId = userData && userData._id;

  const handleDomainSelection = (val) => {
    if (val === "Others") {
      setShowDomainInputBox(true);
      setDomain(val);
    } else {
      setShowDomainInputBox(false);
      setDomain(val);
      var domanId = allDomain.find((itm, index) => {
        return itm.title === val;
      });

      domanId = domanId._id;
      setDomainId(domanId);
    }
  };

  const handleIndustrySelection = (val) => {
    if (val === "Others") {
      setShowIndustryBox(true);
      setIndustry(val);
    } else {
      setIndustry(val);
      setShowIndustryBox(false);
      var indstryId = allIndustry.find((itm, index) => {
        return itm.title === val;
      });
      indstryId = indstryId._id;
      setIndustryId(indstryId);
    }
  };

  const refreshAllInputField = () => {
    setJobTitle("");
      setCompanyName("");
      setTotalOpenings("");
      setJobLocation("");
      setMinSalary("");
      setMaxSalary("")
      setDescription("");
      setDomainId("")
      setIndustryId("")
      setDomain("")
      setIndustry("")
      setSalaryType("")
      setJobType("");
      setSkills([])
  };


  const handleJobImg = (e) => {
    const files = e.target.files[0];
    setJobsImg(files);
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const submitJobs = () => {
    if (!jobTitle) {
      showToast("Job title is required", "warning");
    } else if (!jobsImg) {
      showToast("Image is required", "warning");
    } else if (!totalOpenings) {
      showToast("Opening is required", "warning");
    } else if (!jobLocation) {
      showToast("Job location is required", "warning");
    } else if (!minsalary) {
      showToast("Minimum salary is required", "warning");
    } else if (!maxsalary) {
      showToast("Maximum salary is required", "warning");
    } else if (!companyName) {
      showToast("Company name is required", "warning");
    } else if (!domainId) {
      showToast("Please select domain", "warning");
    } else if (!industryId) {
      showToast("Please select industry", "warning");
    } else if (!jobType) {
      showToast("Job Type is required", "warning");
    } else if (skills.length == 0) {
      showToast("Please enter skills", "warning");
    }
    const url = endpoints.jobs.createJob;

    var formdata = new FormData();
    formdata.append("job_title", jobTitle);
    formdata.append("job_image", jobsImg);
    formdata.append("total_openings", totalOpenings);
    formdata.append("job_location", jobLocation);
    formdata.append("min_salary", minsalary);
    formdata.append("max_salary", maxsalary);
    formdata.append("duration", salaryType);
    formdata.append("company_name", companyName);
    formdata.append("domain", domainId);
    formdata.append("industry", industryId);
    formdata.append("job_type", jobType);
    formdata.append("skills", skills);
    formdata.append("others", description);
    formdata.append("created_by" , userId)
    setLoading(true);
    axios
      .post(url, formdata, { headers: headers })
      .then((res) => {
        setLoading(false);
        if (res.data.result == true) {
          showToast("Job created successfully", "success");
          setShowAllJobs(false);
          getMyJobList()
          setShowJobForm(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error");
      });
  };


  // writing function for updating the jobs;

  const updateJobs = () => {
    if (!jobTitle) {
      showToast("Job title is required", "warning");
    } else if (!jobsImg) {
      showToast("Image is required", "warning");
    } else if (!totalOpenings) {
      showToast("Opening is required", "warning");
    } else if (!jobLocation) {
      showToast("Job location is required", "warning");
    } else if (!minsalary) {
      showToast("Minimum salary is required", "warning");
    } else if (!maxsalary) {
      showToast("Maximum salary is required", "warning");
    } else if (!companyName) {
      showToast("Company name is required", "warning");
    } else if (!domainId) {
      showToast("Please select domain", "warning");
    } else if (!industryId) {
      showToast("Please select industry", "warning");
    } else if (!jobType) {
      showToast("Job Type is required", "warning");
    } else if (skills.length == 0) {
      showToast("Please enter skills", "warning");
    }
    const url = endpoints.jobs.updateJob;

    var formdata = new FormData();
    formdata.append("job_title", jobTitle);
    formdata.append("job_image", jobsImg);
    formdata.append("total_openings", totalOpenings);
    formdata.append("job_location", jobLocation);
    formdata.append("min_salary", minsalary);
    formdata.append("max_salary", maxsalary);
    formdata.append("duration", salaryType);
    formdata.append("company_name", companyName);
    formdata.append("domain", domainId);
    formdata.append("industry", industryId);
    formdata.append("job_type", jobType);
    formdata.append("skills", skills);
    formdata.append("others", description);
    formdata.append("job_id" , selectedJob?._id)
    formdata.append("created_by" , userId)
    
    setLoading(true);
    axios
      .post(url, formdata, { headers: headers })
      .then((res) => {
        setLoading(false);
        if (res.data.result == true) {
          showToast("Job updated successfully", "success");
          setShowAllJobs(false);
          getMyJobList()
          setShowJobForm(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "error");
      });
  };

  useEffect(() => {
    getIndustryList()
      .then((res) => {
        if (res.data.data) {
          var data = res.data.data;
          setAllIndustry(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getDomainList()
      .then((res) => {
        if (res.data.data) {
          var data = res.data.data;
          setAllDomain(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  // writing code for updating the fields;



  useEffect(() =>{
    if(updateJob){
      setJobTitle(selectedJob?.job_title);
      setCompanyName(selectedJob?.company_name);
      setTotalOpenings(selectedJob?.total_openings);
      setJobLocation(selectedJob?.job_location);
      setMinSalary(selectedJob?.max_salary);
      setMaxSalary(selectedJob?.max_salary)
      setDescription(selectedJob?.others);
      setDomainId(selectedJob?.domain?.id)
      setIndustryId(selectedJob?.industry?.id)
      setDomain(selectedJob?.domain?.title)
      setIndustry(selectedJob?.industry?.title)
      setSalaryType(selectedJob?.duration)
      setJobType(selectedJob?.job_type);
      setSkills(selectedJob?.skills)

      var imgUrl = selectedJob?.job_image;
      var fileName = "jobimg.jpg"
      
      fetch(imgUrl).then(async (response) => {
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        const file = new File([blob], fileName, { contentType });
       setJobsImg(file)
      });

    }
  },[updateJob]);


  return (
    <Modal
      show={showJobForm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="formoutline_studentcv coachFormSt jobportalfomt">
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Job Title</label>
                <input
                  type="text"
                  class="form-control field py-4 mb-3"
                  id=""
                  placeholder="Enter Job title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 ">
              <div class="form-group">
                {jobsImg ? (
                  <>
                    <label htmlFor="takePhoto">Upload Img</label>
                    <h5 class="form-control" htmlFor="takePhone">
                    {jobsImg.name}
                    </h5>
                    <input
                      type="file"
                      className="form-control imgUploader"
                      placeholder="Enter here"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) => handleJobImg(e)}
                      id="takePhoto"
                      style={{ display: "none" }}
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor="takePhoto">Upload Img</label>
                    <input
                      type="file"
                      className="form-control imgUploader"
                      placeholder="Enter here"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={(e) => handleJobImg(e)}
                      id="takePhoto"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Total Openings</label>
                <input
                  type="number"
                  class="form-control field py-4"
                  id=""
                  placeholder="Enter total openings"
                  value={totalOpenings}
                  onChange={(e) => setTotalOpenings(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Job Location</label>
                <input
                  type="text"
                  class="form-control field py-4"
                  id=""
                  placeholder="Enter job location"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Min Salary (in HKD)</label>
                <input
                  type="number"
                  class="form-control field py-4"
                  id=""
                  placeholder="Enter salary"
                  value={minsalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  min={0}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Max Salary (in HKD)</label>
                <input
                  type="number"
                  class="form-control field py-4"
                  id=""
                  placeholder="Enter salary"
                  value={maxsalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  min={0}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Company Name</label>
                <input
                  type="text"
                  class="form-control field py-4"
                  id=""
                  placeholder="Enter company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Domain</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  value={domain}
                  required
                  onChange={(e) => handleDomainSelection(e.target.value)}
                >
                  <option value="">Choose</option>
                  {allDomain.map((domain, index) => {
                    return (
                      <option value={domain.title} key={index}>
                        {domain.title}
                      </option>
                    );
                  })}
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            {showDomainInputBox && (
              <div className="col-12 col-md-6 col-lg-6 mb-3">
                <div class="form-group">
                  <label for="exampleInputPassword1">Others</label>
                  <input
                    type="text"
                    class="form-control field py-4 "
                    id=""
                    placeholder="Enter your domain "
                    value={domainManualInput}
                    onChange={(e) => setDomainManualInput(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <div class="form-group">
                <label for="exampleInputPassword1">Industry</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  value={industry}
                  required
                  onChange={(e) => handleIndustrySelection(e.target.value)}
                >
                  <option>Choose</option>
                  {allIndustry.map((industry, index) => {
                    return (
                      <>
                        <option value={industry.title} key={index}>
                          {industry.title}
                        </option>
                      </>
                    );
                  })}
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            {showIndustryInputBox && (
              <div className="col-12 col-md-6 col-lg-6 mb-3">
                <div class="form-group">
                  <label for="exampleInputPassword1">Others</label>
                  <input
                    type="text"
                    class="form-control field py-4"
                    id=""
                    placeholder="Enter your industry"
                    value={industryManualInput}
                    onChange={(e) => setIndustryManualInput(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="col-12 col-md-6 col-lg-6 mb-3">
              <h6>Salary Type</h6>
              <div className="d-flex">
                <div
                  class="form-check"
                  style={{
                    marginRight: "25px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked={salaryType == "monthly"}
                    onChange={() => setSalaryType("monthly")}
                  />
                  <label
                    class="form-check-label  textsession"
                    for="flexRadioDefault2"
                    style={{ marginBottom: "0px" }}
                  >
                    Monthly
                  </label>
                </div>

                <div
                  class="form-check"
                  style={{
                    marginRight: "25px",
                    display: "flex",

                    alignItems: "center",
                  }}
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                    checked={salaryType == "yearly"}
                    onChange={() => setSalaryType("yearly")}
                  />
                  <label
                    class="form-check-label textsession"
                    for="flexRadioDefault3"
                    style={{ marginBottom: "0px" }}
                  >
                    Yearly
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-6 mb-3">
            <div class="form-group">
              <label for="exampleInputPassword1">Job Type</label>
              <select
                class="form-select end-year "
                aria-label="Default select example"
                value={jobType}
                required
                onChange={(e) => setJobType(e.target.value)}
              >
                <option>Choose</option>
                <option value="remote">Remote</option>
                <option value="onSite">On Site</option>
                <option value="hybrid">hybrid</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-12 col-lg-12 mb-3">
            <div class="form-group skillssss">
              <label for="exampleInputPassword1">Skills</label>
              <TagsInput value={skills} onChange={setSkills} />
            </div>
          </div>

          <div className="col-12 col-md-12 col-lg-12 mb-3">
            <div class="form-group">
              <label for="exampleInputPassword1">Others</label>
              <textarea
                type="text"
                class="form-control field py-4"
                id=""
                placeholder="Enter your industry"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          {/* here we aare adding payment div */}

          <div className="confirmBtn">
            <Button
              title={updateJob ? "Update Job" : "Create Job"}
              onClick={updateJob ? updateJobs : submitJobs}
              loading={loading}
            />
          </div>
        </div>
        <div
          className="coachingCutOptions"
          onClick={() => {
            setShowJobForm(false);
            refreshAllInputField();
            setUpdateJob(false);
          }}
        >
          <IoIosCloseCircleOutline size={26} color="red" />
        </div>
      </div>
    </Modal>
  );
};

export default CreateJobsForm;
