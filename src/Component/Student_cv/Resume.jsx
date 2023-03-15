import React from "react";
import "./Resume.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Form from "react-bootstrap/Form";
import edu_logo from "../../assets/Images/edu_logo.jpeg";
// import company_logo from '../../assets/Images/company_logo.jpeg';
import { FiEdit } from "react-icons/fi";
//import { Navigate } from 'react-router-dom';
import { useNavigate,useLocation } from "react-router-dom";
import "../../fonts/Inter-SemiBold.ttf";
import { useState,useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

import { endpoints } from "../services/endpoints";
import Spinner from "react-bootstrap/Spinner";
import showToast from "../CustomToast/CustomToast";

const Resume = () => {
  const navigate = useNavigate("");
  const location = useLocation();
  const studentDetails = location.state;

  const [allDomain, setAlldomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [loading , setLoading] = useState(false)
  const [name, setName] = useState("");
  const [lName, setLname] = useState("");
  const [contact, setContact] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [uploadCv, setUploadCv] = useState(null);
  const [school, setSchool] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [program, setProgram] = useState("");
  const [fieldStudy, setFieldStudy] = useState("");
  const [domain, setDomain] = useState("");
  const [industry, setIndustry] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [avtarFile, setAvtarFile] = useState(null);
  const [cvFIle, setCvFile] = useState("");
  const [allNational, setAllNational] = useState([]);

  const cvUrl = "https://admin.cpdedu.com/api/v1/upload-cv";
  const token = localStorage.getItem("token");
  var userDetails = localStorage.getItem("users");

  const submit = () => {
    if (name === "") {
      showToast("Please enter first name",  "warning" );
    } else if (lName === "") {
      showToast("Please enter last name",  "warning" );
    } else if (contact === "") {
      showToast("Please enter contact",  "warning" );
    } else if (contact.length !== 10) {
      showToast("Please Enter 10 digit",  "warning" );
    } else if (nationality === "") {
      showToast("Please enter nationality",  "warning" );
    } else if (dob === "") {
      showToast("Please enter DOB",  "warning" );
    } else if (gender === "") {
      showToast("Please enter gender",  "warning" );
    } else if (uploadCv === "") {
      showToast("Please upload CV",  "warning" );
    } else if (school === "") {
      showToast("Please enter School/College/University", { type: "warning" });
    } else if (!startYear) {
      showToast("Please enter start year",  "warning" );
    } else if (endYear === "") {
      showToast("Please enter end year",  "warning" );
    } else if (program === "") {
      showToast("Please enter program",  "warning" );
    } else if (fieldStudy === "") {
      showToast("Please enter field study",  "warning" );
    } else if (domain === "") {
      showToast("Please enter domain",  "warning" );
    } else if (industry === "") {
      showToast("Please enter industry",  "warning" );
    } else {
      const formData = new FormData();
      formData.append("first_name", name);
      formData.append("last_name", lName);
      formData.append("contact_number", contact);
      formData.append("nationality", nationality);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("university_name", school);
      formData.append("start_year", startYear);
      formData.append("end_year", endYear);
      formData.append("program", program);
      formData.append("field_of_study", fieldStudy);
      formData.append("domain", domain);
      formData.append("description", "domain");
      formData.append("industry", industry);
      formData.append("cv_file", uploadCv);
      formData.append("avtar_file", avtarFile);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      setLoading(true)

      axios
        .post(cvUrl, formData, { headers: headers })
        .then((res) => {
          setLoading(false)
          if (res.data.result===true) {
            showToast("Profile created successfully",  "success" );
            navigate("/")
          }
        })
        .catch((err) => {
          console.log(err, "error");
          setLoading(false)
        });
    }
  };

  const handleChange = (e) => {
    var cvFiles = e.target.files[0];
    // setUploadCv(cvFiles);
  };
  const handleImage = (e) => {
    var imgFiles = e.target.files[0];
    setAvtarFile(imgFiles);
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
          showToast(res.data.message,  "error" );
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
          showToast(res.data.message,  "error" );
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
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    getDomain();
    getIndustry();
    getNationality();
  }, []);


  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-1 "></div>
          <div className="col-lg-10 col-md-12 col-12 flex-center">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12 text-center mt-3">
                <h3 id="create_resume">
                  Please fill some details to create your resume
                </h3>
              </div>
            </div>
            <div className="form_outline">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                  <h5 className="personal_details_heading">Personal Details</h5>

                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">First Name</label>
                        <input
                          type="text"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Last Name</label>
                        <input
                          pattern="[0-9]{10}"
                          type="text"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                          value={lName}
                          onChange={(e) => setLname(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Contact</label>
                        <input
                          type="number"
                          class="form-control "
                          placeholder="Enter here"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-4 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Nationality</label>
                        <select
                          class="form-select  "
                          aria-label="Default select example"
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                        >
                          <option value="">Hong </option>
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
                    <div className="col-12 col-md-12 col-lg-4 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Date of Birth</label>
                        <input
                          type="date"
                          class="form-control "
                          placeholder="Due date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-4 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Gender</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Male</option>
                          <option value="1">Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-4 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Upload CV</label>
                        <input
                          type="file"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                        />
                      </div>
                    </div>
                  </div>

                  <h5 className="heading_second">Education Details</h5>

                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-12 mt-2">
                      <label for="exampleInputPassword1">
                        School/College/University*
                      </label>
                      <select
                        class="form-select  "
                        aria-label="Default select example"
                        placeholder="Technology"
                      >
                        <option selected>University</option>
                        <option value="1">University</option>
                        <option value="2">University</option>
                        <option value="3">University</option>
                      </select>
                    </div>

                    <div className="col-lg-3 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Start year*</label>
                        <select
                          class="form-select  "
                          aria-label="Default select example"
                        >
                          <option selected>1998</option>
                          <option value="1">1999</option>
                          <option value="2">2000</option>
                          <option value="3">2001</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">End year*</label>
                        <select
                          class="form-select  "
                          aria-label="Default select example"
                        >
                          <option selected>1998</option>
                          <option value="1">1999</option>
                          <option value="2">2000</option>
                          <option value="3">2001</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Program</label>
                        <input
                          type="text"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Field Study</label>
                        <input
                          type="text"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                      <h5 className="heading_second">Add Details</h5>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12"></div>

                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Domain</label>
                        <select
                          class="form-select  "
                          aria-label="Default select example"
                          placeholder="Technology"
                        >
                          <option selected>Technology</option>
                          <option value="1">Technology</option>
                          <option value="2">Technology</option>
                          <option value="3">Technology</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Industry</label>
                        <select
                          class="form-select  "
                          aria-label="Default select example"
                          placeholder="IT Sector"
                        >
                          <option selected>IT Sector</option>
                          <option value="1">IT Sector</option>
                          <option value="2">IT Sector</option>
                          <option value="3">IT Sector</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <h5 className="heading_second">Description</h5>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <textarea
                          type="text"
                          class="form-control"
                          id="cvForm_description_text"
                          placeholder="Enter here"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 col-2 mt-4 text-center">
                    <buttton
                      type="submit"
                      className="btn  submit_resumeCreationButton"
                      onClick={() => navigate("/")}
                    >
                      {" "}
                      Submit and Preview Resume
                    </buttton>
                  </div>

                  <div className="col-lg-2"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Resume;
