import React from "react";
import "./CoachesForm.css";
import Form from "react-bootstrap/Form";
import {
  json,
  useLocation,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import { BsFillPlusCircleFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FiEdit } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";
import { AiFillMinusCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import "../../../src/fonts/Inter-Bold.ttf";
import "../../../src/fonts/Inter-Regular.ttf";
import { CgAttachment } from "react-icons/cg";
import { BiCurrentLocation } from "react-icons/bi";
import educationLogo from "../../assets/Images/educationLogo.png";
import company_logo from "../../assets/Images/company_logo.png";
import { TagsInput } from "react-tag-input-component";
import TimeKeeper from "react-timekeeper";
import { BsPlusCircleFill } from "react-icons/bs";
import Week_days from "../../Component/DaySelection/Week_days";
import Month_days from "../../Component/DaySelection/Month_days";
import $, { fn, timers, uniqueSort } from "jquery";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import CoachesPreview from "../../Component/Modal/CoachesPreview/CoachesPreview";
import { useTab } from "@mui/base";
import { sizeHeight } from "@mui/system";
import { BsFillCalendarDateFill } from "react-icons/bs";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";
import { NavItem } from "react-bootstrap";
import moment from "moment";
import { endpoints } from "../../Component/services/endpoints";
import { getAcedemicYears } from "../../utils/getAcademicYear";
import { allCountry } from "../../utils/allCountry";
import SlotAsWorkShop from "../../Component/SlotAsWorkShop/SlotAsWorkShop";
import SlotAsCoach from "../../Component/SlotAsCoach/SlotAsCoach"


const CoachesForm =  () => {
  
  const [opencoachesPreview, setOpenCoachesPreview] = useState(false);
  const [daysFormat, setDaysFormat] = useState("weekly");
  const [isRepeated, setIsRepeated] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [price, setPrice] = useState(0);
  const [paid, setPaid] = useState(false);
  const [sessionType, setSessionType] = useState("");
  const token = localStorage.getItem("token");
  const [eventsToBeShown, setEventsToBeShown] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [coachesPreview, setCoachesPreview] = useState(false);
  const [coachesTitle , setCoachesTitle] = useState("")
  const [workShopTitle , setWorkShopTitle] = useState("");

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

  // creating useState for holding the form date ;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [coachImg, setCoachImg] = useState(null);
  const [experience, setExperience] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [domain, setDomain] = useState("");
  const [industry, setIndustry] = useState("");
  const [skills, setSkills] = useState([]);
  const [allNational, setAllNational] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

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
  const [profileImg, setProfileImg] = useState("");

  // creating extra experience useState ;

  const [xtraRole, setXtraRole] = useState("");
  const [xtraDomain, setXtraDomain] = useState("");
  const [hobbies, setHobbies] = useState([]);

  // creating recomendation useState here ;

  const [recommendation, setRecommendation] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [recommEmail, setRecommEmail] = useState("");

  const time = [
    "01:00:00",
    "02:00:00",
    "03:00:00",
    "04:00:00",
    "05:00:00",
    "06:00:00",
    "07:00:00",
    "08:00:00",
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "12:00:00",
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
    "18:00:00",
    "19:00:00",
    "20:00:00",
    "21:00:00",
    "22:00:00",
    "23:00:00",
    "24:00:00",
  ];

  const handleSelectdDays = (day) => {
    if (selectedDays.indexOf(day) == -1) {
      setSelectedDays((itm) => {
        return [...itm, day];
      });
    } else {
      var filterDays = selectedDays.filter((itm, ind) => {
        return itm != day;
      });
      setSelectedDays(filterDays);
    }
  };

  var getDates = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  // get all days of the month ;

  const getDaysOfMonth = async (day) => {
    var d = new Date();
    var getTot = daysInMonth(d.getMonth(), d.getFullYear()); //Get total
    var date = [];
    for (var i = 1; i <= getTot; i++) {
      //looping through days in month
      var newDate = new Date(d.getFullYear(), d.getMonth(), i);
      if (newDate.getDay() == day) {
        date.push(newDate);
      }
    }

    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
    return date;
  };

  // get selected dates of thee year ;

  const buildDates = async (startDate, months) => {
    return Array.from(
      {
        length: months,
      },
      function (_, i) {
        var date = new Date(startDate.getTime());
        var mnth = date.getMonth();
        date.setMonth(mnth + i);
        if (date.getMonth() !== (mnth + i) % 12) {
          date.setDate(0);
        }
        return date;
      }
    );
  };

  const handleConfirmSlots = async () => {

    // if (allDays.length != 0 && daysFormat === "weekly") {
    //   toast("Please select start day", { type: "warning" });
    // } else if (startDate == "" && daysFormat === "monthly") {
    //   toast("Please select start date", { type: "warning" });
    // } else if (endDate == "" && daysFormat === "monthly") {
    //   toast("Please select end date", { type: "warning" });
    // } else if (startTime == "") {
    //   toast("please select start time", { type: "warning" });
    // } else if (endTime == "") {
    //   toast("Please select end time", { type: "warning" });
    // } else {
      setIsConfirm(true);
      var events = [];

      if (daysFormat === "weekly") {
        var dateArray = [];
        if (isRepeated) {
          for (var i = 0; i < selectedDays.length; i++) {
            var daysNum = allDays.indexOf(selectedDays[i]);
            var dates = await getDaysOfMonth(daysNum);
            dateArray.push(...dates);
          }
        } else {
          for (var i = 0; i < selectedDays.length; i++) {
            var daysNum = allDays.indexOf(selectedDays[i]);
            var dates = await getDaysOfMonth(daysNum);
            dates = dates[0];
            dateArray.push(dates);
          }
        }

        dateArray.map((itm) => {
          var date = itm.getDate() < 10 ? `0${itm.getDate()}` : itm.getDate();
          var month =
            itm.getMonth() + 1 < 10
              ? `0${itm.getMonth() + 1}`
              : itm.getDate() + 1;
          var year = itm.getFullYear();

          var startDte = `${year}-${month}-${date}T${startTime}`;
          var endDte = `${year}-${month}-${date}T${endTime}`;

          var evnt = {
            start: new Date(startDte),
            end: new Date(endDte),
            title: "Event 1",
          };

          events.push(evnt);
        });
        setEventsToBeShown(events);
      } else if (daysFormat === "monthly") {
        var dateArray = [];

        if (isRepeated) {
          var allDates = [];
          var startMonth = new Date(startDate).getMonth();

          var dates = await getDates(startDate, endDate);

          for (var j = 0; j < dates.length; j++) {
            var count = 11 - startMonth;
            var date = await buildDates(dates[j], count);
            allDates.push(...date);
          }

          allDates.map((itm) => {
            var date = itm.getDate() < 10 ? `0${itm.getDate()}` : itm.getDate();
            var month =
              itm.getMonth() + 1 < 10
                ? `0${itm.getMonth() + 1}`
                : itm.getDate() + 1;
            var year = itm.getFullYear();
            var startDte = `${year}-${month}-${date}T${startTime}`;
            var endDte = `${year}-${month}-${date}T${endTime}`;

            var evnt = {
              start: new Date(startDte),
              end: new Date(endDte),
              title: "Event 1",
            };

            events.push(evnt);
          });
          setEventsToBeShown(events);
        } else {
          var allDates = await getDates(startDate, endDate);

          allDates.map((itm) => {
            var date = itm.getDate() < 10 ? `0${itm.getDate()}` : itm.getDate();
            var month =
              itm.getMonth() + 1 < 10
                ? `0${itm.getMonth() + 1}`
                : itm.getDate() + 1;
            var year = itm.getFullYear();
            var startDte = `${year}-${month}-${date}T${startTime}`;
            var endDte = `${year}-${month}-${date}T${endTime}`;

            var evnt = {
              start: new Date(startDte),
              end: new Date(endDte),
              title: "Event 1",
            };

            events.push(evnt);
          });
          setEventsToBeShown(events);
        }
      }
    // }
  };

  const getAllSubCategory = (categoryId) =>{
    const url = `${endpoints.coaches.getCoachSubCategory}?category_id=${categoryId}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    console.log(url , "urr")

    axios.get(url , {headers : headers})
    .then((res) =>{
      if(res.data.result){
        const val = res.data.data;
        setAllSubCategory(val)
      }
    })
    .catch((err) => {
      console.log(err , "this is the error here")
    })
  }

  const handleCategorySelection = (categoryName) =>{
  
    var categoryId = allCategory.filter((category,ind) =>{
      return category.title == categoryName
    });
    categoryId = categoryId[0]._id;
    getAllSubCategory(categoryId)
  }
  

  // writing code for form submission ;

  const submitForm = () => {};

  const addExperience = () => {
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
      isCrntJob[sltdExperienceIndex] = sltdIsCurrentJob;

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
        console.log(err, "nationality erro");
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
        if(res.data.result){
          const val = res.data.data;
          setAllCategory(val)
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

  const submit = () =>{
    if(firstName == ""){
      toast("First name is required" , {type : "warning"})
    }
    else if(lastName == ""){
      toast("Last name is required" ,{type : "warning"})
    }
    else if(contactNumber == ""){
      toast("Please enter phone no." , {type : 'warning'})
    }
    else if(nationality == ""){
      toast("Please select nationality" , {type : "warning"})
    }
    else if(dob == ""){
      toast("Please select date of birth" , {type : "warning"})
    }
    else {

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
      formData.append("is_repeated" , isRepeated)
      formData.append("is_paid" , paid)
      formData.append("price" , price )
      formData.append("")
    }
  }

  return (
    <>
      <Homepage_header />
      <div className="container ">
        <h3 id="create_resume">Coaches Form</h3>
        <div className="formoutline_studentcv ">
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
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Last Name*</label>
                <input
                  pattern="[0-9]{10}"
                  type="text"
                  class="form-control "
                  id="exampleInputPassword1"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                  onchange={(e) => setDob(e.target.value)}
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
                  onchange={(e) => setGender(e.target.value)}
                >
                  <option>Choose Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label htmlFor="takePhoto">Upload Img</label>
                <input
                  type="file"
                  class="form-control"
                  placeholder="Enter here"
                  onchange={(e) => setCoachImg(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div class="customer_records_dynamic"></div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <h5 className="heading_second">Add Experience</h5>
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
                  {" "}
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
                  onchange={setHobbies}
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
                  onChange={(e) => handleCategorySelection(e.target.value)}
                >
                  <option value="">Choose</option>
                  {allCategory.map((category,ind) =>{
                    return(<>
                      <option value={category.title} key={ind}>{category.title}</option>
                    </>)
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
                    onchange={(e) => setSubCategory(e.target.value)}
                  >
                    <option>Choose</option>
                    <option value="software">software</option>
                    <option value="hardware">hardware</option>
                    <option value="cloud">cloud</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="formoutline_studentcv coachFormSt">
           <SlotAsCoach showCalendar={showCalendar} setShowCalendar={setShowCalendar} eventsToBeShown={eventsToBeShown} setEventsToBeShown={setEventsToBeShown} coachesTitle={coachesTitle} setCoachesTitle={setCoachesTitle} />
           <SlotAsWorkShop showCalendar={showCalendar} setShowCalendar={setShowCalendar} eventsToBeShown={eventsToBeShown} setEventsToBeShow={setEventsToBeShown} workShopTitle={workShopTitle} setWorkShopTitle={setWorkShopTitle}/>

          {/* here adding the fees structure */}

          <div className="eventForm_price">
            <div>
              <div class="eventForm_paid">
                <input
                  type="radio"
                  id="a25"
                  name="check-substitution-2"
                  onClick={() => setPaid(false)}
                />
                <label
                  for="a25"
                  className={`btnfree ${
                    !paid ? "btn-primary" : "btn-default"
                  } `}
                >
                  Free
                </label>
              </div>
              <div className="eventForm_paid freepaid">
                <input
                  type="radio"
                  id="a50"
                  name="check-substitution-2"
                  onClick={() => setPaid(true)}
                />
                <label
                  for="a50"
                  className={`btnfree ${paid ? "btn-primary" : "btn-default"} `}
                >
                  Paid
                </label>
              </div>
            </div>
            <div className="d-flex">
              <div class="form-check" style={{ marginLeft: "25px" }}>
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked={sessionType == "hourly"}
                  onChange={() => setSessionType("hourly")}
                />
                <label
                  class="form-check-label  textsession"
                  for="flexRadioDefault2"
                >
                  By Hours
                </label>
              </div>

              <div class="form-check" style={{ marginLeft: "25px" }}>
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault3"
                  checked={sessionType == "sessional"}
                  onChange={() => setSessionType("sessional")}
                />
                <label
                  class="form-check-label textsession"
                  for="flexRadioDefault3"
                >
                  By Session
                </label>
              </div>
            </div>
          </div>
          {/* here we aare adding payment div */}

          <div className="col-lg-4 col-md-6 col-12 my-3 ">
            <div class="form-group">
              <label for="exampleInputPassword1">Price in ($)</label>
              <input
                type="number"
                class="form-control py-4"
                placeholder="Enter here"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6"></div>
          <div className="col-lg-3 col-md-3 col-12">
            <button className="coachesFormSubmit" onClick={submitForm}>
              Submit
            </button>
          </div>
          <div className="col-lg-3 col-md-3 col-12">
            <button
              className="coachesFormSubmit"
              onClick={() => setCoachesPreview(true)}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
      <CoachesPreview
        show={coachesPreview}
        onHide={() => setCoachesPreview(false)}
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
