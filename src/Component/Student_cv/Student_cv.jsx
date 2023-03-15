import React, { useRef } from "react";
import "./Student_cv.css";
import Header from "../Header/Homepage_header";
import Footer from "../Footer/Footer";
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
import { endpoints } from "../services/endpoints";
import Spinner from "react-bootstrap/Spinner";
import Homepage_header from "../Header/Homepage_header";
import { BsFillPlusCircleFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FiEdit } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";
import { AiFillMinusCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import "../../../src/fonts/Inter-Bold.ttf";
import "../../../src/fonts/Inter-Regular.ttf";
// import { TagsInput } from "react-tag-input-component";
import { CgAttachment } from "react-icons/cg";
import { BiCurrentLocation } from "react-icons/bi";
import educationLogo from "../../assets/Images/educationLogo.png";
import company_logo from "../../assets/Images/company_logo.png";
import { TagsInput } from "react-tag-input-component";
import $, { fn, uniqueSort } from "jquery";
import PreviewResumeModal from "../Modal/PreviewResumeModal/PreviewResumeModal";
import CollegeImage from "../../assets/Images/college.png";
import CompanyImg from "../../assets/Images/company.png";
import showToast from "../CustomToast/CustomToast";

const Student_cv = () => {
  const navigate = useNavigate("");
  const location = useLocation("");

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [lName, setLname] = useState("");
  const [contact, setContact] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [uploadImg, setUploadImg] = useState(null);
  const [school, setSchool] = useState([]);
  const [startYear, setStartYear] = useState([]);
  const [endYear, setEndYear] = useState([]);
  const [program, setProgram] = useState([]);
  const [fieldStudy, setFieldStudy] = useState([]);
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState("");
  const [avtarFile, setAvtarFile] = useState(null);
  const [allNational, setAllNational] = useState([]);
  const [allDomain, setAlldomain] = useState([]);
  const [uploadCv, setUploadCv] = useState(null);
  const [allIndustry, setAllIndustry] = useState([]);
  const [update, setUpdate] = useState(false);
  const [allCollege, setAllCollege] = useState([]);
  const [updateCollege, setUpdateCollege] = useState(false);
  const [selectedCollegeIndex, setSelectedCollegeIndex] = useState(0);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  // here creating useState for keeping only one data of eductional details ;

  const [sltdSchool, setSltdSchool] = useState("");
  const [sltdStartYear, setSltdStartYear] = useState("");
  const [sltdEndYear, setSltdEndYear] = useState("");
  const [sltdProgram, setSltdProgram] = useState("");
  const [sltdField, setSltdField] = useState("");

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

  // carrier goal useState ;

  const [targetGoal, setTargetGoal] = useState("");
  const [targetIndustry, setTargetIndustry] = useState("");
  const [targetDomain, setTargetDomain] = useState("");
  const [targetLocation, setTargetLocation] = useState("");
  const [targetYear, setTargetYear] = useState("");

  const cvUrl = "https://admin.cpdedu.com/api/v1/upload-cv";

  const token = localStorage.getItem("token");

  const fNameRef = useRef();
  const LNameRef = useRef();
  const contRef = useRef();
  const nationalRef = useRef();
  const dobRef = useRef();
  const genderRef = useRef();

  const submit = () => {
    if (name === "") {
      showToast("Please enter first name", "warning");
      fNameRef.current.focus();
    } else if (lName === "") {
      showToast("Please enter last name", "warning");
      LNameRef.current.focus();
    } else if (contact === "") {
      showToast("Please enter contact", "warning");
      contRef.current.focus();
    } else {
      const formData = new FormData();
      formData.append("first_name", name);
      formData.append("last_name", lName);
      formData.append("contact_number", contact);
      formData.append("nationality", nationality);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("university_name", school);
      formData.append("start_year_educational", startYear);
      formData.append("end_year_educational", endYear);
      formData.append("program", program);
      formData.append("field_of_study", fieldStudy);
      formData.append("job_title", jobTitle);
      formData.append("employment_type", employmentType);
      formData.append("company", company);
      formData.append("start_year_employment", jobStartYear);
      formData.append("end_year_employment", jobEndYear);
      formData.append("domain", jobDomain);
      formData.append("industry", jobIndustry);
      formData.append("isCurrent", currentJob);
      formData.append("skills", skills);
      formData.append("role", xtraRole);
      formData.append("type", xtraDomain);
      formData.append("hobbies", hobbies);
      formData.append("description", description);
      formData.append("recommendation", recommendation);
      formData.append("mentor", mentorName);
      formData.append("coach", coachName);
      formData.append("i_want", targetGoal);
      formData.append("recommendation_email", recommEmail);
      formData.append("career_domain", targetDomain);
      formData.append("career_industry", targetIndustry);
      formData.append("location", targetLocation);
      formData.append("years_achieve", targetYear);
      formData.append("avtar_file", uploadImg);

      const headers = {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "multipart/form-data",
      };

      setLoading(true);

      axios
        .post(cvUrl, formData, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result === true) {
            showToast("Profile created successfully", "success");
            setOpenPreviewModal(false);
            localStorage.setItem("isCvUploaded", true);
            getUserCvData();
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err, "error");
          setLoading(false);
        });
    }
  };

  const handleCvUpload = (e) => {
    var cvFiles = e.target.files[0];
    setUploadCv(cvFiles);
  };

  const handleImage = (e) => {
    var imgFiles = e.target.files[0];
    console.log(imgFiles, "this is the event here");
    setUploadImg(imgFiles);
    setProfileImg(URL.createObjectURL(imgFiles));
  };

  const domainUrl = "https://admin.cpdedu.com/api/v1/list-domain";

  const getDomain = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(domainUrl, { headers: headers })
      .then((res) => {
        if (res.data.result === true) {
          setAlldomain(res.data.data);
        } else if (res.data.result === false) {
          showToast(res.data.message, "error");
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const getIndustry = () => {
    const industryUrl = "https://admin.cpdedu.com/api/v1/list-industry";
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(industryUrl, { headers: headers })
      .then((res) => {
        if (res.data.result === true) {
          setAllIndustry(res.data.data);
        } else if (res.data.result === false) {
          showToast(res.data.message, "error");
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
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

  useEffect(() => {
    getDomain();
    getIndustry();
    getNationality();
  }, []);

  // here we are writing code for getting the userscv details if it has some data ;

  const getUserCvData = () => {
    const url = endpoints.authentication.userProfile;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(url, { headers: headers })
      .then((res) => {
        console.log(res, "response");
        if (res.data.result === true) {
          const usersData = res.data.data;

          if (usersData) {
            setAllCollege([]);
            setAllExperience([]);

            if (Object.keys(usersData).length) {
              console.log(usersData, "usersdata here");
              setUpdate(true);
              setName(usersData.first_name);
              setLname(usersData.last_name);
              setContact(usersData.contact_number);
              setNationality(usersData.nationality);
              var dobs = usersData.dob.replaceAll("/", "-");
              setDob(dobs);
              setGender(usersData.gender);
              setSchool(usersData.university_name);
              setProgram(usersData.program);
              setStartYear(usersData.start_year_educational);
              setEndYear(usersData.end_year_educational);
              setFieldStudy(usersData.field_of_study);
              setJobIndustry(usersData.industry);
              setCompany(usersData.company);
              setJobTitle(usersData.job_title);
              setEmploymentType(usersData.employment_type);
              setJobStartYear(usersData.start_year_employment);
              setJobEndYear(usersData.end_year_employment);
              setJobDomain(usersData.domain);
              setSkills(usersData.skills);
              setXtraRole(usersData.role);
              setXtraDomain(usersData.type);
              setHobbies(usersData.hobbies);
              setRecommendation(usersData.recommendation);
              setRecommEmail(usersData.recommendation_email);
              setMentorName(usersData.mentor);
              setCoachName(usersData.coach);
              setTargetGoal(usersData.i_want);
              setTargetDomain(usersData.career_domain);
              setTargetIndustry(usersData.career_industry);
              setDescription(usersData.description);
              setTargetLocation(usersData.location);
              setTargetYear(usersData.years_achieve);

              const collegeName = usersData.university_name;
              const allProgram = usersData.program;
              const startYearr = usersData.start_year_educational;
              const endYearr = usersData.end_year_educational;
              const fieldStudy = usersData.field_of_study;

              // writing code for all college ;

              for (var i = 0; i < collegeName.length; i++) {
                const collegeDta = {
                  id: i,
                  collegeName: collegeName[i],
                  startYear: startYearr[i],
                  endYear: endYearr[i],
                  program: allProgram[i],
                  fieldStudy: fieldStudy[i],
                };

                setAllCollege((itm) => {
                  return [...itm, collegeDta];
                });
              }

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

              var imgUrl = res.data.avtarPath + usersData.avtar;
              setProfileImg(imgUrl);

              const fileName = "myFile.jpg";

              fetch(imgUrl).then(async (response) => {
                const contentType = response.headers.get("content-type");
                const blob = await response.blob();
                const file = new File([blob], fileName);
                setUploadImg(file);
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

  useEffect(() => {
    $(document).on("click", ".remove-field", function (e) {
      $(this).closest(".row").remove();
      e.preventDefault();
    });
  }, []);

  const updateProfile = () => {
    const url = endpoints.authentication.updateProfile;

    if (name === "") {
      showToast("Please enter first name", "warning");
      fNameRef.current.focus();
    } else if (lName === "") {
      showToast("Please enter last name", "warning");
      LNameRef.current.focus();
    } else if (contact === "") {
      showToast("Please enter contact", "warning");
      contRef.current.focus();
    } else {
      const formData = new FormData();
      formData.append("first_name", name);
      formData.append("last_name", lName);
      formData.append("contact_number", contact);
      formData.append("nationality", nationality);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("university_name", school);
      formData.append("start_year_educational", startYear);
      formData.append("end_year_educational", endYear);
      formData.append("program", program);
      formData.append("field_of_study", fieldStudy);
      formData.append("job_title", jobTitle);
      formData.append("employment_type", employmentType);
      formData.append("company", company);
      formData.append("start_year_employment", jobStartYear);
      formData.append("end_year_employment", jobEndYear);
      formData.append("domain", jobDomain);
      formData.append("industry", jobIndustry);
      formData.append("isCurrent", currentJob);
      formData.append("skills", skills);
      formData.append("role", xtraRole);
      formData.append("type", xtraDomain);
      formData.append("hobbies", hobbies);
      formData.append("description", description);
      formData.append("recommendation", recommendation);
      formData.append("mentor", mentorName);
      formData.append("coach", coachName);
      formData.append("i_want", targetGoal);
      formData.append("recommendation_email", recommEmail);
      formData.append("career_domain", targetDomain);
      formData.append("career_industry", targetIndustry);
      formData.append("location", targetLocation);
      formData.append("years_achieve", targetYear);
      formData.append("avtar_file", uploadImg);

      const headers = {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "multipart/form-data",
      };

      setLoading(true);

      axios
        .post(url, formData, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result === true) {
            showToast("Profile updated successfully", "success");
            setOpenPreviewModal(false);
            getUserCvData();
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err, "error");
          setLoading(false);
        });
    }
  };

  const getAcedemicYears = () => {
    let currentYear = new Date().getFullYear();
    let options = [];
    for (let i = currentYear; i >= 1950; i--) {
      options.push(<option value={i}>{i}</option>);
    }
    return options;
  };

  // here writing function for adding college;

  const addCollege = () => {
    if (
      sltdSchool == "" ||
      sltdStartYear == "" ||
      sltdEndYear == "" ||
      sltdProgram == "" ||
      sltdField == ""
    ) {
      showToast("please fill the eductional details", "warning");
    } else {
      const collegeDta = {
        id: allCollege.length + 1,
        collegeName: sltdSchool,
        startYear: sltdStartYear,
        endYear: sltdEndYear,
        program: sltdProgram,
        fieldStudy: sltdField,
      };

      setAllCollege((itm) => {
        return [...itm, collegeDta];
      });

      setSltdEndYear("");
      setSltdSchool("");
      setSltdStartYear("");
      setSltdProgram("");
      setSltdField("");

      setSchool((itm) => {
        return [...itm, sltdSchool];
      });
      setProgram((itm) => {
        return [...itm, sltdProgram];
      });
      setStartYear((itm) => {
        return [...itm, sltdStartYear];
      });
      setEndYear((itm) => {
        return [...itm, sltdEndYear];
      });
      setFieldStudy((itm) => {
        return [...itm, sltdField];
      });
    }
  };

  // writing function for college edit ;

  const handleCollegeEdit = (data, ind) => {
    setSltdSchool(school[ind]);
    setSltdEndYear(endYear[ind]);
    setSltdStartYear(startYear[ind]);
    setSltdProgram(program[ind]);
    setSltdField(fieldStudy[ind]);
    setUpdateCollege(true);
    setSelectedCollegeIndex(ind);
  };

  const updateSelectedCollege = () => {
    if (setSltdSchool == "") {
      showToast("Please fill the college details", "warning");
    } else if (sltdStartYear == "") {
      showToast("Start year is required", "warning");
    } else if (sltdEndYear == "") {
      showToast("End year is required", "warning");
    } else if (sltdProgram == "") {
      showToast("Program is required", "warning");
    } else if (sltdField == "") {
      showToast("Field study is required", "warning");
    } else {
      var schol = school;
      var endYr = endYear;
      var strtYr = startYear;
      var prgm = program;
      var filed = fieldStudy;

      schol[selectedCollegeIndex] = sltdSchool;
      endYr[selectedCollegeIndex] = sltdEndYear;
      strtYr[selectedCollegeIndex] = sltdStartYear;
      prgm[selectedCollegeIndex] = sltdProgram;
      filed[selectedCollegeIndex] = sltdField;

      setSchool(schol);
      setProgram(prgm);
      setFieldStudy(filed);
      setEndYear(endYr);
      setStartYear(strtYr);

      setSltdEndYear("");
      setSltdSchool("");
      setSltdStartYear("");
      setSltdProgram("");
      setSltdField("");

      const collegeDta = {
        id: selectedCollegeIndex,
        collegeName: sltdSchool,
        startYear: sltdStartYear,
        endYear: sltdEndYear,
        program: sltdProgram,
        fieldStudy: sltdField,
      };

      var allCollge = allCollege;
      allCollge[selectedCollegeIndex] = collegeDta;

      setUpdateCollege(false);
    }
  };

  // writing code for adding and edition experience here ;

  // adding experience here ;

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
      showToast("Please fill the experience details", "warning");
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
      showToast("Job title is required", "warning");
    } else if (sltdEmploymentType == "") {
      showToast("Employee Type is required", "warning");
    } else if (sltdJobStartYear == "") {
      showToast("Start year is required", "warning");
    } else if (sltdDomain == "") {
      showToast("Domain is required", "warning");
    } else if (sltdIndustry == "") {
      showToast("Industry is required", "warning");
    } else if (sltdCompany == "") {
      showToast("company is required", "warning");
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

  // writing function for removing college ;

  const removeCollge = (index) => {
    var filteredCollege = allCollege.filter((itm, ind) => {
      return ind != index;
    });

    setAllCollege(filteredCollege);

    var filteredSchool = school.filter((itm, ind) => {
      return ind != index;
    });

    setSchool(filteredSchool);

    var filteredStartYear = startYear.filter((itm, ind) => {
      return ind != index;
    });

    setStartYear(filteredStartYear);

    var filteredEndYear = endYear.filter((itm, ind) => {
      return ind != index;
    });

    setEndYear(filteredEndYear);

    var filteredProgram = program.filter((itm, ind) => {
      return ind != index;
    });

    setProgram(filteredProgram);

    var filteredFieldStudy = fieldStudy.filter((itm, ind) => {
      return ind != index;
    });

    setFieldStudy(filteredFieldStudy);
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

  // Writing calculating for getting current date ;

  var day = new Date();
  var date = day.getDate();
  var month = day.getMonth();
  var year = day.getFullYear();

  const currentDate = year + "-" + month + "-" + date;

  // here we are writing functions for redirecting to the final resume functions ;

  const goToReviewResume = () => {
    if (name === "") {
      showToast("Please enter first name", "warning");
      fNameRef.current.focus();
    } else if (lName === "") {
      showToast("Please enter last name", "warning");
      LNameRef.current.focus();
    } else if (contact === "") {
      showToast("Please enter contact", "warning");
      contRef.current.focus();
    } else {
      var data = {
        firstName: name,
        lastName: lName,
        contact: contact,
        nationality: nationality,
        dob: dob,
        gender: gender,
        university: school,
        university_start_year: startYear,
        university_end_year: endYear,
        program: program,
        fieldStudy: fieldStudy,
        jobTitle: jobTitle,
        employmentType: employmentType,
        company: company,
        employment_start_year: jobStartYear,
        employment_end_year: jobEndYear,
        jobDomain: jobDomain,
        jobIndustry: jobIndustry,
        skills: skills,
        role: xtraRole,
        type: xtraDomain,
        hobbies: hobbies,
        description: description,
        recommendation: recommendation,
        mentorName: mentorName,
        coachName: coachName,
        goal: targetGoal,
        recommEmail: recommEmail,
        targetDomain: targetDomain,
        targetIndustry: targetIndustry,
        location: targetLocation,
        years_achieve: targetYear,
      };

      var data = JSON.stringify(data);
      navigate("/finalresume", { state: data });
    }
  };

  const handlePreviewResume = () => {
    if (name === "") {
      showToast("Please enter first name", "warning");
      fNameRef.current.focus();
    } else if (lName === "") {
      showToast("Please enter last name", "warning");
      LNameRef.current.focus();
    } else if (contact === "") {
      showToast("Please enter contact", "warning");
      contRef.current.focus();
    } else {
      setOpenPreviewModal(true);
    }
  };

  const handleSelectRole = () => {
    setSltdIsCurrentJob(!sltdIsCurrentJob);
    if (sltdIsCurrentJob === false) {
      const day = new Date();
      const year = day.getFullYear();
      console.log(year, "yearss here");
      setSltdJobEndYear(year);
    }
  };

  return (
    <>
      <Homepage_header />
      <div className="container ">
        <h3 id="create_resume">
          Please fill some details to create your resume
        </h3>
        <div className="studentCvCntrl">
          <div className="formoutline_studentcv studentCvCntrol">
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
                    ref={fNameRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={lName}
                    ref={LNameRef}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12 ">
                <div class="form-group">
                  <label for="mobile_code">Contact*</label>
                  <PhoneInput
                    country="hk"
                    value={contact}
                    ref={contRef}
                    onChange={(phone) => setContact(phone)}
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
                    ref={nationalRef}
                    onChange={(e) => setNationality(e.target.value)}
                  >
                    <option>Choose Nationality</option>
                    {allNational.map((itm, ind) => {
                      return (
                        <>
                          <option value={itm.en_short_name}>
                            {itm.en_short_name}
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
                    onKeyDown={() => {
                      return false;
                    }}
                    value={dob}
                    ref={dobRef}
                    max={currentDate}
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
                    ref={genderRef}
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
                  {uploadImg ? (
                    <>
                      <label htmlFor="takePhoto">Upload Img</label>
                      <h5 class="form-control" htmlFor="takePhoto">
                        {uploadImg.name}
                      </h5>
                      <input
                        type="file"
                        class="form-control"
                        placeholder="Enter here"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => handleImage(e)}
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
                        onChange={(e) => handleImage(e)}
                        id="takePhoto"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <h5
                  className="heading_seconds"
                  style={{
                    display: "flex",
                    flexDriection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  Education Details
                </h5>
              </div>
            </div>

            {allCollege.map((itm, index) => {
              return (
                <>
                  <div className="studentcv_experiencelogoBox" key={index}>
                    <div className="studentCV_logobox">
                      <img src={CollegeImage} alt="" />
                      <div className="studentCV_universityDetail ">
                        <h5>{itm.collegeName}</h5>

                        <h6>{itm.program}</h6>
                        <h6>
                          {itm.startYear}-{itm.endYear}
                        </h6>
                      </div>
                    </div>
                    <div className="studentCV_rightIcon">
                      <FiEdit
                        style={{ color: "gray", cursor: "pointer" }}
                        onClick={() => handleCollegeEdit(itm, index)}
                      />
                      <AiFillMinusCircle
                        onClick={() => {
                          removeCollge(index);
                        }}
                      />
                    </div>
                  </div>
                </>
              );
            })}

            <div className="student_records">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="form-group">
                    <label for="">School/College/University</label>
                    <input
                      type="text"
                      class="form-control school"
                      id=""
                      placeholder="Enter here"
                      // error="Please enter School/College/University"
                      value={sltdSchool}
                      onChange={(e) => {
                        setSltdSchool(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <div class="form-group">
                    <label for="">Start year</label>
                    <select
                      class="form-select start-year "
                      aria-label="Default select example"
                      // error="Please enter start year"
                      value={sltdStartYear}
                      onChange={(e) => {
                        var val = e.target.value;
                        if (sltdEndYear !== "" && val > sltdEndYear) {
                          showToast(
                            "start year cannot be greater then end year",
                            "warning"
                          );
                        } else {
                          setSltdStartYear(e.target.value);
                        }
                      }}
                    >
                      <option>Choose Start Year</option>
                      {getAcedemicYears()}
                    </select>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12 ">
                  <div class="form-group">
                    <label for="exampleInputPassword1">End year</label>
                    <select
                      class="form-select end-year "
                      aria-label="Default select example"
                      error="Please enter end year"
                      value={sltdEndYear}
                      onChange={(e) => {
                        var val = e.target.value;
                        if (val < sltdStartYear) {
                          showToast(
                            "End year cannot be less then start year",
                            "warning"
                          );
                        } else {
                          setSltdEndYear(e.target.value);
                        }
                      }}
                    >
                      <option>Choose End Year</option>
                      {getAcedemicYears()}
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12 ">
                  <div class="form-group">
                    <label for="exampleInputPassword1">Program</label>
                    <input
                      type="text"
                      class="form-control field"
                      id=""
                      placeholder="Enter here"
                      // error="Please enter field study"
                      value={sltdProgram}
                      onChange={(e) => {
                        setSltdProgram(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <div class="form-group">
                    <label for="">Field Study</label>
                    <input
                      type="text"
                      class="form-control field"
                      id=""
                      placeholder="Enter here"
                      // error="Please enter field study"
                      value={sltdField}
                      onChange={(e) => {
                        setSltdField(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-12 ">
                  {updateCollege === true ? (
                    <button
                      className="addExperiencebutton"
                      onClick={updateSelectedCollege}
                    >
                      Update College
                    </button>
                  ) : (
                    <button
                      className="addExperiencebutton"
                      onClick={addCollege}
                    >
                      Add College
                    </button>
                  )}
                </div>

                <div
                  className="col-lg-4 col-md-12 col-12  removeDiv"
                  style={{ display: "flex", alignItems: "center" }}
                ></div>
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
                      <img src={CompanyImg} alt="" />
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
                        showToast("start year cannot be greater then end year",  "warning",
                        );
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
                        showToast("end year cannot be less than start year",  "warning",
                        );
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
                  <button
                    className="addExperiencebutton"
                    onClick={addExperience}
                  >
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
                    value={skills}
                    onChange={setSkills}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <h5 className="heading_second">Extra Experience</h5>
              </div>
            </div>

            <div className="row ">
              <div className="col-12 col-md-12 col-lg-5 ">
                <div class="form-group">
                  <label for="exampleInputPassword1">Role</label>
                  <input
                    type="text"
                    class="form-control "
                    id="exampleInputPassword1"
                    placeholder="Enter First Name"
                    value={xtraRole}
                    onChange={(e) => setXtraRole(e.target.value)}
                  />
                </div>
                <div class="form-group ">
                  <label for="exampleInputPassword1">Type</label>
                  <input
                    type="text"
                    class="form-control "
                    placeholder="choose Domain"
                    value={xtraDomain}
                    onChange={(e) => setXtraDomain(e.target.value)}
                  />
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
              <div className="col-lg-4 col-md-6 col-12  ">
                <div class="form-group">
                  <label for="exampleInputPassword1">Recommendation</label>
                  <input
                    type="text"
                    class="form-control "
                    placeholder="Enter here"
                    value={recommendation}
                    onChange={(e) => setRecommendation(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12  ">
                <div class="form-group">
                  <label for="exampleInputPassword1">Mentor Name</label>
                  <input
                    type="text"
                    class="form-control "
                    placeholder="Enter here"
                    value={mentorName}
                    onChange={(e) => setMentorName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12  ">
                {/* <div class="form-group">
                  <label for="exampleInputPassword1">Coach Name</label>
                  <select
                    class="form-select end-year "
                    aria-label="Default select example"
                    value={coachName}
                    onChange={(e) => setCoachName(e.target.value)}
                  >
                    <option>select</option>
                    <option value="Rahul dubey">Rahul dubey</option>
                    <option value="William">William</option>
                    <option value="Rahul dubey">Rahul dubey</option>
                    <option value="William">William</option>
                  </select>
                </div> */}
                <div class="form-group">
                  <label for="exampleInputPassword1">Coach Name</label>
                  <input
                    type="text"
                    class="form-control "
                    placeholder="Enter here"
                    value={coachName}
                    onChange={(e) => setCoachName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12  ">
                <div class="form-group">
                  <label for="exampleInputPassword1">
                    Recommendation Email
                  </label>
                  <input
                    type="email"
                    class="form-control "
                    placeholder="Enter here"
                    value={recommEmail}
                    onChange={(e) => setRecommEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="formoutline_studentcv">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <h5 className="personal_details_heading">
                  Career Objective/Goal
                </h5>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12 ">
                <div class="form-group student_cv_search ">
                  <label for="exampleInputPassword1">I want</label>

                  <input
                    type="text"
                    class="form-control "
                    placeholder="Enter here"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div class="form-group student_cv_search">
                  <label for="exampleInputPassword1">Domain</label>

                  <input
                    type="text"
                    class="form-control "
                    placeholder="Enter here"
                    value={targetDomain}
                    onChange={(e) => setTargetDomain(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12">
                <div class="form-group student_cv_search">
                  <label for="exampleInputPassword1">Industry</label>

                  <input
                    type="text"
                    class="form-control "
                    placeholder="Enter here"
                    value={targetIndustry}
                    onChange={(e) => setTargetIndustry(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div class="form-group student_cv_search">
                  <label for="exampleInputPassword1">Location</label>

                  <input
                    type="text"
                    class="form-control "
                    placeholder="Enter here"
                    value={targetLocation}
                    onChange={(e) => setTargetLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div class="form-group  student_cv_search">
                  <label for="exampleInputPassword1">Years of Achieve</label>
                  {/* <span class="search_icon">
                  <FiSearch />
                </span> */}

                  <input
                    type="number"
                    class="form-control "
                    placeholder="Enter here"
                    min="1"
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-12 col-lg-6 ">
              <div className="StudentCv_attachFile flex-row"></div>
            </div>
          </div>
        </div>
        <div className="studentCvBtn">
          <div className="col-lg-3 col-md-6 col-12 text-center">
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
            <Spinner />
          </div>
          <div className="col-lg-3 col-md-6 col-12  text-center">
            <button
              type="submit"
              className=" submit_resumeCreationButton"
              onClick={() => handlePreviewResume()}
            >
              {" "}
              Preview Resume
            </button>
          </div>
        </div>

        <PreviewResumeModal
          openPreviewModal={openPreviewModal}
          setOpenPreviewModal={setOpenPreviewModal}
          firstName={name}
          lastName={lName}
          contact={contact}
          nationality={nationality}
          dob={dob}
          gender={gender}
          uploadImg={uploadImg}
          university={school}
          university_start_year={startYear}
          university_end_year={endYear}
          program={program}
          fieldStudy={fieldStudy}
          skills={skills}
          description={description}
          jobTitle={jobTitle}
          employmentType={employmentType}
          company={company}
          jobStartYear={jobStartYear}
          jobEndYear={jobEndYear}
          jobDomain={jobDomain}
          jobIndustry={jobIndustry}
          currentJob={currentJob}
          hobbies={hobbies}
          allUniversity={allCollege}
          allExperience={allExperience}
          targetGoal={targetGoal}
          profileImg={profileImg}
          targetIndustry={targetIndustry}
          targetDomain={targetDomain}
          targetLocation={targetLocation}
          targetYearOfArchieve={targetYear}
          updateProfile={updateProfile}
          submit={submit}
          update={update}
          loading={loading}
          role={xtraRole}
          domain={xtraDomain}
        />
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default Student_cv;
