import React from "react";
import "./CoachesForm.css";
import {
  json,
  useLocation,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FiEdit } from "react-icons/fi";
import { AiFillMinusCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import "../../../src/fonts/Inter-Bold.ttf";
import "../../../src/fonts/Inter-Regular.ttf";
import company_logo from "../../assets/Images/company_logo.png";
import { TagsInput } from "react-tag-input-component";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import CoachesPreview from "../../Component/Modal/CoachesPreview/CoachesPreview";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";
import Button from "../../Component/button/Button/Button"
import { endpoints } from "../../Component/services/endpoints";
import { getAcedemicYears } from "../../utils/getAcademicYear";
import SlotAsCoach from "../../Component/Coaches/SlotAsCoach/SlotAsCoach";
import SlotAsWorkShop from "../../Component/Coaches/SlotAsWorkShop/SlotAsWorkShop";
import { toast, ToastContainer } from "react-toastify";


const CoachesForm = () => {

  const [daysFormat, setDaysFormat] = useState("weekly");
  const [isRepeated, setIsRepeated] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [paid, setPaid] = useState(false);
  const [sessionType, setSessionType] = useState("");
  const token = localStorage.getItem("token");
  const [eventsToBeShown, setEventsToBeShown] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [coachesPreview, setCoachesPreview] = useState(false);
  const [coachesTitle, setCoachesTitle] = useState("");
  const [workShopTitle, setWorkShopTitle] = useState("");
  

  var allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [selectedDays, setSelectedDays] = useState([]);
  const [loading, setLoading] = useState(false);

  // creating useState for holding the form date ;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [coachImg, setCoachImg] = useState(null);
  const [skills, setSkills] = useState([]);
  const [allNational, setAllNational] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");

  // creating state for the experience part ;

  const [jobTitle, setJobTitle] = useState([]);
  const [sltdJobTitle, setStldJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState([]);
  const [sltdEmploymentType, setSltdEmploymentType] = useState("");
  const [company, setCompany] = useState([]);
  const [sltdCompany, setSltdCompany] = useState("");
  const [jobStartYear, setJobStartYear] = useState([]);
  const [sltdJobStartYear, setSltdJobStartYear] = useState("");
  const [jobEndYear, setJobEndYear] = useState([]);
  const [sltdJobEndYear, setSltdJobEndYear] = useState("");
  const [jobDomain, setJobDomain] = useState([]);
  const [jobIndustry, setJobIndustry] = useState([]);
  const [sltdDomain, setSltdDomain] = useState("");
  const [sltdIndustry, setSltdIndustry] = useState("");
  const [allExperience, setAllExperience] = useState([]);
  const [updateExperience, setUpdateExperience] = useState(false);
  const [crntJobRole, setCrntJobRole] = useState(false);
  const [sltdExperienceIndex, setStldExperienceIndex] = useState(0);
  const [sltdIsCurrentJob, setSltdIsCurrentJob] = useState(false);
  const [currentJob, setCurrentJob] = useState([]);
  const [update, setUpdate] = useState(false);

  // creating extra experience useState ;
  const [hobbies, setHobbies] = useState([]);

  // creating recomendation useState here ;

  // useState as coach form ;
  const [coachPaid, setCoachPaid] = useState(false);
  const [coachSessionType, setCoachSessionType] = useState("");
  // useState as Workshop form;

  const [workshopPaid, setWorkshopPaid] = useState(false);
  const [workshopSessionType, setWorkshopSessionType] = useState("");

  const getAllSubCategory = (categoryId) => {
    const url = `${endpoints.coaches.getCoachSubCategory}?category_id=${categoryId}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios
      .get(url, { headers: headers })
      .then((res) => {
        console.log(res, "response here");
        if (res.data.result) {
          const val = res.data.data;
          setAllSubCategory(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error here");
      });
  };

  const handleCategorySelection = (categoryName) => {
    var categoryId = allCategory.filter((category, ind) => {
      return category.title == categoryName;
    });
    categoryId = categoryId[0]?._id;
    setCategory(categoryName);
    getAllSubCategory(categoryId);
  };

  useEffect(() => {
    if (category) {
      handleCategorySelection(category);
    }
  }, [category]);

  // writing code for form submission ;

  const addExperience = (e) => {
    e.preventDefault();
    if (
      sltdJobTitle == "" ||
      sltdEmploymentType == "" ||
      sltdJobStartYear == "" ||
      sltdJobEndYear == "" ||
      sltdDomain == "" ||
      sltdIndustry == "" ||
      sltdCompany == ""
    ) {
      toast("Please fill the experience details", { type: "warning" });
    } else {
      const jobDta = {
        id: allExperience.length + 1,
        jobTitle: sltdJobTitle,
        employmentType: sltdEmploymentType,
        startYear: sltdJobStartYear,
        endYear: sltdJobEndYear,
        domain: sltdDomain,
        industry: sltdIndustry,
        company: sltdCompany,
        crntRole: crntJobRole,
      };

      setAllExperience((itm) => {
        return [...itm, jobDta];
      });

      setJobIndustry((itm) => {
        return [...itm, sltdIndustry];
      });
      setCompany((itm) => {
        return [...itm, sltdCompany];
      });
      setJobTitle((itm) => {
        return [...itm, sltdJobTitle];
      });
      setEmploymentType((itm) => {
        return [...itm, sltdEmploymentType];
      });
      setJobStartYear((itm) => {
        return [...itm, sltdJobStartYear];
      });
      setJobEndYear((itm) => {
        return [...itm, sltdJobEndYear];
      });
      setJobDomain((itm) => {
        return [...itm, sltdDomain];
      });
      setCurrentJob((itm) => {
        return [...itm, sltdIsCurrentJob];
      });

      setSltdCompany("");
      setSltdDomain("");
      setSltdIndustry("");
      setStldJobTitle("");
      setSltdJobStartYear("");
      setSltdJobEndYear("");
      setSltdEmploymentType("");
      setSltdIsCurrentJob(false);
      setCrntJobRole(false);
    }
  };

  const handleExperienceEdit = (data, ind) => {
    setSltdCompany(company[ind]);
    setSltdDomain(jobDomain[ind]);
    setSltdIndustry(jobIndustry[ind]);
    setStldJobTitle(jobTitle[ind]);
    setSltdJobStartYear(jobStartYear[ind]);
    setSltdJobEndYear(jobEndYear[ind]);
    setSltdEmploymentType(employmentType[ind]);
    setCrntJobRole(crntJobRole[ind]);
    setUpdateExperience(true);
    setStldExperienceIndex(ind);
  };

  const updateSelectedExperience = () => {
    if (sltdJobTitle == "") {
      toast("Job title is required", { type: "warning" });
    } else if (sltdEmploymentType == "") {
      toast("Employee Type is required", { type: "warning" });
    } else if (sltdJobStartYear == "") {
      toast("Start year is required", { type: "warning" });
    } else if (sltdDomain == "") {
      toast("Domain is required", { type: "warning" });
    } else if (sltdIndustry == "") {
      toast("Industry is required", { type: "warning" });
    } else if (sltdCompany == "") {
      toast("company is required", { type: "warning" });
    } else {
      var cmpny = company;
      var dmain = jobDomain;
      var indstry = jobIndustry;
      var jobTitl = jobTitle;
      var jobStrtYr = jobStartYear;
      var jobEndYr = jobEndYear;
      var employmntTyp = employmentType;
      var isCrntJob = currentJob;

      cmpny[sltdExperienceIndex] = sltdCompany;
      dmain[sltdExperienceIndex] = sltdDomain;
      indstry[sltdExperienceIndex] = sltdIndustry;
      jobTitl[sltdExperienceIndex] = sltdJobTitle;
      jobStrtYr[sltdExperienceIndex] = sltdJobStartYear;
      jobEndYr[sltdExperienceIndex] = sltdJobEndYear;
      employmntTyp[sltdExperienceIndex] = sltdEmploymentType;
      // isCrntJob[sltdExperienceIndex] = sltdIsCurrentJob;

      setJobDomain(dmain);
      setJobIndustry(indstry);
      setCompany(cmpny);
      setJobTitle(jobTitl);
      setEmploymentType(employmntTyp);
      setJobStartYear(jobStrtYr);
      setJobEndYear(jobEndYr);
      setJobDomain(dmain);
      setCurrentJob(isCrntJob);

      setSltdCompany("");
      setSltdDomain("");
      setSltdIndustry("");
      setStldJobTitle("");
      setSltdJobStartYear("");
      setSltdJobEndYear("");
      setSltdEmploymentType("");
      setCrntJobRole(false);
      setSltdIsCurrentJob(false);

      const jobDta = {
        id: sltdExperienceIndex,
        jobTitle: sltdJobTitle,
        employmentType: sltdEmploymentType,
        startYear: sltdJobStartYear,
        endYear: sltdJobEndYear,
        domain: sltdDomain,
        industry: sltdIndustry,
        company: sltdCompany,
        crntRole: sltdIsCurrentJob,
      };

      var experienceDta = allExperience;
      experienceDta[sltdExperienceIndex] = jobDta;

      setUpdateExperience(false);
    }
  };

  // writing function for removing job experience ;

  const removeJobExperience = (index) => {
    var filteredAllExperience = allExperience.filter((itm, ind) => {
      return ind != index;
    });

    setAllExperience(filteredAllExperience);

    var filteredDomain = jobDomain.filter((itm, ind) => {
      return ind != index;
    });

    setJobDomain(filteredDomain);

    var filteredJobIndustry = jobIndustry.filter((itm, ind) => {
      return ind != index;
    });

    setJobIndustry(filteredJobIndustry);

    var filteredCompany = company.filter((itm, ind) => {
      return ind != index;
    });

    setCompany(filteredCompany);

    var fitleredJobTitle = company.filter((itm, ind) => {
      return ind != index;
    });

    setJobTitle(fitleredJobTitle);

    var filteredEmploymentType = employmentType.filter((itm, ind) => {
      return ind != index;
    });

    setEmploymentType(filteredEmploymentType);

    var filteredJobStartYear = jobStartYear.filter((itm, ind) => {
      return ind != index;
    });

    setJobStartYear(filteredJobStartYear);

    var filteredJobEndYear = jobEndYear.filter((itm, ind) => {
      return ind != index;
    });

    setJobEndYear(filteredJobEndYear);

    var filteredCurentJob = currentJob.filter((itm, ind) => {
      return ind != index;
    });

    setCurrentJob(filteredCurentJob);
  };

  const handleSelectRole = () => {
    setSltdIsCurrentJob(!sltdIsCurrentJob);
    if (sltdIsCurrentJob === false) {
      const day = new Date();
      const year = day.getFullYear();
      setSltdJobEndYear(year);
    }
  };

  const getNationality = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const url = endpoints.events.getNationalityUrl;

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.status === 200) {
          const val = res.data;
          setAllNational(val);
        }
      })
      .catch((err) => {
        console.log(err, "nationality error");
      });
  };

  const getCoachCategoies = () => {
    const url = endpoints.coaches.getCoachCategory;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data;
          setAllCategory(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    getNationality();
    getCoachCategoies();
  }, []);

  // writing function for submitting the form ;

  const submit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (firstName == "") {
      toast("First name is required", { type: "warning" });
    } else if (lastName == "") {
      toast("Last name is required", { type: "warning" });
    } else if (contactNumber == "") {
      toast("Please enter phone no.", { type: "warning" });
    } else if (nationality == "") {
      toast("Please select nationality", { type: "warning" });
    } else if (dob == "") {
      toast("Please select date of birth", { type: "warning" });
    } else {
      // here hitting the api for saving the coaches data;
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("contact_number", contactNumber);
      formData.append("nationality", nationality);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("job_title", jobTitle);
      formData.append("employment_type", employmentType);
      formData.append("company", company);
      formData.append("start_year_employment", jobStartYear);
      formData.append("end_year_employment", jobEndYear);
      formData.append("domain", jobDomain);
      formData.append("industry", jobIndustry);
      formData.append("isCurrent", currentJob);
      formData.append("skills", skills);
      formData.append("hobbies", hobbies);
      formData.append("avtar_file", coachImg);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("description", description);

      const url = endpoints.coaches.createCoachProfile;
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      };

      axios
        .post(url, formData, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            getUserCvData();
            toast("Profile created successfully", { type: "success" });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error");
        });
    }
  };

  const handleUploadImg = (e) => {
    const files = e.target.files[0];
    setCoachImg(files);
  };

  const getUserCvData = () => {

    const url = endpoints.authentication.userProfile;
   
    const headers = {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
    };

    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result === true) {
          const usersData = res.data.data;

          if (usersData) {
            setAllExperience([]);
            if (Object.keys(usersData).length) {
              setUpdate(true);
              setFirstName(usersData.first_name);
              setLastName(usersData.last_name);
              setContactNumber(usersData.contact_number);
              setNationality(usersData.nationality);
              var dobs = usersData.dob.replaceAll("/", "-");
              setDob(dobs);
              setGender(usersData.gender);
              setCategory(usersData.category);
              setSubCategory(usersData?.subCategory);
              setSkills(usersData?.skills);
              setHobbies(usersData?.hobbies);
              setDescription(usersData?.description);

              // writing code for all eductional part ;

              const jbTitle = usersData.job_title;
              const employmentTpe = usersData.employment_type;
              const compny = usersData.company;
              const JbStrtYear = usersData.start_year_employment;
              const jbEndYear = usersData.end_year_employment;
              const jbDomain = usersData.domain;
              const jbIndustry = usersData.industry;
              const crntRole = usersData.isCurrent;

              for (var i = 0; i < jbTitle.length; i++) {
                var endYear = jbEndYear[i];
                var currentRole =
                  endYear == new Date().getFullYear() ? "true" : "false";

                const jobDta = {
                  id: i,
                  jobTitle: jbTitle[i],
                  employmentType: employmentTpe[i],
                  startYear: JbStrtYear[i],
                  endYear: jbEndYear[i],
                  domain: jbDomain[i],
                  industry: jbIndustry[i],
                  company: compny[i],
                  crntRole: currentRole,
                };

                setAllExperience((itm) => {
                  return [...itm, jobDta];
                });
              }

              setJobTitle(jbTitle);
              setEmploymentType(employmentTpe);
              setJobStartYear(JbStrtYear);
              setJobEndYear(jbEndYear);
              setJobIndustry(jbIndustry);
              setCurrentJob(crntRole);
              setCompany(compny);
              setJobDomain(jbDomain);

              var imgUrl = res.data.avtarPath + usersData.avtar;

              const fileName = "myFile.jpg";

              fetch(imgUrl).then(async (response) => {
                const contentType = response.headers.get("content-type");
                const blob = await response.blob();
                const file = new File([blob], fileName, { contentType });
                
                setCoachImg(file);
              });
            }
          }
        }
      })
      .catch((err) => {
        console.log(err, "user data error");
      });
  };


  useEffect(() => {
    const usersDetails = JSON.parse(localStorage.getItem("users"));
    const isCvAvailable = localStorage.getItem("isCvUploaded");
    if (isCvAvailable == "true") {
      getUserCvData();
    }
  }, []);

  // here we are writing code for updating the profile ;

  const updateProfile = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (firstName == "") {
      toast("First name is required", { type: "warning" });
    } else if (lastName == "") {
      toast("Last name is required", { type: "warning" });
    } else if (contactNumber == "") {
      toast("Please enter phone no.", { type: "warning" });
    } else if (nationality == "") {
      toast("Please select nationality", { type: "warning" });
    } else if (dob == "") {
      toast("Please select date of birth", { type: "warning" });
    } else {
      // here hitting the api for saving the coaches data;
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("contact_number", contactNumber);
      formData.append("nationality", nationality);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("job_title", jobTitle);
      formData.append("employment_type", employmentType);
      formData.append("company", company);
      formData.append("start_year_employment", jobStartYear);
      formData.append("end_year_employment", jobEndYear);
      formData.append("domain", jobDomain);
      formData.append("industry", jobIndustry);
      formData.append("isCurrent", currentJob);
      formData.append("skills", skills);
      formData.append("hobbies", hobbies);
      formData.append("avtar_file", coachImg);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("description", description);

      const url = endpoints.coaches.updateCoachProfile;
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      };

      axios
        .post(url, formData, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            toast("Profile updated successfully", { type: "success" });
            getUserCvData();
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error");
        });
    }
  }

  return (
    <>
      <Homepage_header />
      <div className="container ">
        <h3 id="create_resume">Coaches Form</h3>
        <div className="formoutline_studentcv">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <h5 className="personal_details_heading">Personal Details</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">First Name*</label>
                <input
                  type="text"
                  class="form-control "
                  id="exampleInputPassword1"
                  placeholder="Enter First Name"
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Last Name*</label>
                <input
                  type="text"
                  class="form-control "
                  id="exampleInputPassword1"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="mobile_code">Contact*</label>
                <PhoneInput
                  country="hk"
                  value={contactNumber}
                  onChange={(phone) => setContactNumber(phone)}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="">Nationality*</label>
                <select
                  class="form-select  "
                  aria-label="select example"
                  value={nationality}
                  required
                  onChange={(e) => setNationality(e.target.value)}
                >
                  <option value="">Choose Nationality</option>
                  {allNational.map((country, index) => {
                    return (
                      <>
                        <option value={country.en_short_name}>
                          {country.en_short_name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="">Date of Birth*</label>
                <input
                  type="date"
                  class="form-control "
                  placeholder="Due date"
                  value={dob}
                  required
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="">Gender*</label>
                <select
                  className="form-select "
                  aria-label="Default select example"
                  value={gender}
                  required
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Choose Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
            <div class="form-group">
                  {coachImg ? (
                    <>
                      <label htmlFor="takePhoto">Upload Img</label>
                      <h5 class="form-control" htmlFor="takePhone">
                        {coachImg.name}
                      </h5>
                      <input
                        type="file"
                        class="form-control"
                        placeholder="Enter here"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => handleUploadImg(e)}
                        id="takePhoto"
                        style={{ display: "none" }}
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor="takePhoto">Upload Img</label>
                      <input
                        type="file"
                        class="form-control"
                        placeholder="Enter here"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => handleUploadImg(e)}
                        id="takePhoto"
                      />
                    </>
                  )}
                </div>
            </div>
            <div className="col-12 col-md-12 col-lg-7  ">
            <label for="exampleInputPassword1">Description</label>
            <div class="form-group domain_textarea">
              <textarea
                type="text"
                class="form-control "
                placeholder="Enter some information related Domain and Industry"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          </div>
          
          <div class="customer_records_dynamic"></div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <h5 className="heading_seconds">Add Experience</h5>
            </div>
          </div>
          {allExperience.map((itm, index) => {
            return (
              <>
                <div className="studentcv_experiencelogoBox" key={index}>
                  <div className="studentCV_logobox">
                    <img src={company_logo} alt="" />
                    <div className="studentCV_universityDetail">
                      <h5>{itm.jobTitle}</h5>
                      <h6>{itm.company}</h6>
                      <h6>
                        {itm.startYear}-{itm.endYear}
                      </h6>
                    </div>
                  </div>
                  <div className="studentCV_rightIcon">
                    <FiEdit
                      style={{ color: "gray" }}
                      onClick={() => handleExperienceEdit(itm, index)}
                    />
                    <AiFillMinusCircle
                      onClick={() => removeJobExperience(index)}
                    />
                  </div>
                </div>
              </>
            );
          })}
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Job Title</label>
                <input
                  type="text"
                  class="form-control field"
                  id=""
                  placeholder="Enter here"
                  // error="Please enter text"
                  value={sltdJobTitle}
                  onChange={(e) => setStldJobTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Employment Type</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  value={sltdEmploymentType}
                  onChange={(e) => setSltdEmploymentType(e.target.value)}
                >
                  <option>Choose</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Seasonal">Seasonal</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Seasonal">Seasonal</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Select Company</label>
                <input
                  type="text"
                  class="form-control field"
                  id=""
                  placeholder="Enter here"
                  // error="Please enter text"
                  value={sltdCompany}
                  onChange={(e) => setSltdCompany(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Start Year</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  value={sltdJobStartYear}
                  onChange={(e) => {
                    var val = e.target.value;

                    if (sltdJobEndYear !== "" && val > sltdJobEndYear) {
                      toast("start year cannot be greater then end year", {
                        type: "warning",
                      });
                    } else {
                      setSltdJobStartYear(e.target.value);
                    }
                  }}
                >
                  <option>select</option>
                  {getAcedemicYears()}
                </select>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">End Year</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  value={sltdJobEndYear}
                  onChange={(e) => {
                    var val = e.target.value;
                    setSltdIsCurrentJob(false);
                    if (val < sltdJobStartYear) {
                      toast("end year cannot be less than start year", {
                        type: "warning",
                      });
                    } else {
                      setSltdJobEndYear(e.target.value);
                    }
                  }}
                >
                  <option>select</option>
                  {getAcedemicYears()}
                </select>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12 ">
              <div class="form-group studentCV_ExperienceCheckbox">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  checked={sltdIsCurrentJob}
                  onChange={handleSelectRole}
                />
                <label
                  class="form-check-label studentCV_checkLabel"
                  for="flexCheckDefault"
                >
                  I am currently working in this role
                </label>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Domain</label>
                <input
                  type="text"
                  class="form-control field"
                  id=""
                  placeholder="Enter here"
                  // error="Please enter text"
                  value={sltdDomain}
                  onChange={(e) => setSltdDomain(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Industry</label>

                <input
                  type="text"
                  class="form-control field"
                  id=""
                  placeholder="Enter here"
                  // error="Please enter text"
                  value={sltdIndustry}
                  onChange={(e) => setSltdIndustry(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 ">
              {updateExperience === true ? (
                <button
                  className="addExperiencebutton"
                  onClick={updateSelectedExperience}
                >
                  Update Experience
                </button>
              ) : (
                <button className="addExperiencebutton" onClick={addExperience}>
                  Add Experience
                </button>
              )}
            </div>
          </div>
          <div className="row">
            <div classname="col-12 col-md-6 col-lg-12  ">
              <div class="form-group ">
                <label for="exampleInputPassword1">Skills</label>
                <TagsInput
                  type="text"
                  class="form-control hobbies_tags"
                  placeHolder="Enter here"
                  value={skills}
                  onChange={setSkills}
                />
              </div>
            </div>
          </div>

          <hr className="studentcv_hr" />
          <div className="row">
            <div classname="col-12 col-md-6 col-lg-12  ">
              <div class="form-group ">
                <label for="exampleInputPassword1">Hobbies</label>
                <TagsInput
                  type="text"
                  class="form-control hobbies_tags "
                  placeHolder="Enter here"
                  value={hobbies}
                  onChange={setHobbies}
                />
              </div>
            </div>
          </div>
          
          <hr className="studentcv_hr" />
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Category</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  value={category}
                  required
                  onChange={(e) => handleCategorySelection(e.target.value)}
                >
                  <option value="">Choose</option>
                  {allCategory.map((category, ind) => {
                    return (
                      <>
                        <option value={category.title} key={ind}>
                          {category.title}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>

            {category != "" && (
              <div className="col-12 col-md-6 col-lg-4 ">
                <div class="form-group">
                  <label for="exampleInputPassword1">SubCategory</label>
                  <select
                    class="form-select end-year "
                    aria-label="Default select example"
                    value={subCategory}
                    required
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    <option value="">Choose</option>
                    {allSubCategory.map((itm, index) => {
                      return (
                        <>
                          <option value={itm.title}>{itm.title}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>
            )}

            <div className="row mt-4">
              <div className="col-lg-6"></div>
              <div className="col-lg-3 col-md-3 col-12">
                <Button title={update ?  "Update" : "Submit"} loading={loading} onClick={update === true ? updateProfile : submit}/>
              </div>
              <div className="col-lg-3 col-md-3 col-12">
                <Button title="Preview Profile" onClick={() => setCoachesPreview(true)}/>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="formoutline_studentcv coachFormSt">
          
          <SlotAsCoach
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            eventsToBeShown={eventsToBeShown}
            setEventsToBeShown={setEventsToBeShown}
            coachesTitle={coachesTitle}
            setCoachesTitle={setCoachesTitle}
            coachPaid={coachPaid}
            setCoachPaid={setCoachPaid}
            coachSessionType={coachSessionType}
            setCoachSessionType={setCoachSessionType}
          />

          <SlotAsWorkShop
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            eventsToBeShown={eventsToBeShown}
            setEventsToBeShown={setEventsToBeShown}
            workShopTitle={workShopTitle}
            setWorkShopTitle={setWorkShopTitle}
            workshopSessionType={workshopSessionType}
            setWorkshopSessionType={setWorkshopSessionType}
            workshopPaid={workshopPaid}
            setWorkshopPaid={setWorkshopPaid}
          />
        </div> */}
      </div>

      <ToastContainer />
      <CoachesPreview
        coachesPreview={coachesPreview}
        setCoachesPreview={setCoachesPreview}
        submit={submit}
        firstName={firstName}
        lastName={lastName}
        contactNumber={contactNumber}
        coachImg={coachImg}
        gender={gender}
        nationality={nationality}
        description={description}
        hobbies={hobbies}
        category={category}
        subCategory={subCategory}
        allExperience={allExperience}
        skills={skills}
        update={update}
        updateProfile={updateProfile}
        loading={loading}
      />
      <CustomCalendar
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        eventsToBeShown={eventsToBeShown}
      />
      <Footer />
    </>
  );
};

export default CoachesForm;
