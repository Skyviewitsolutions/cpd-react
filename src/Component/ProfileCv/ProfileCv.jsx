import React, { useState, useEffect } from "react";
import "./ProfileCv.css";
import Homepage_header from "../Header/Homepage_header";
import Footer from "../Footer/Footer";
import Form from "react-bootstrap/Form";
// import edu_logo from '../../assets/Images/edu_logo.jpeg';
// import company_logo from '../../assets/Images/company_logo.jpeg';
import { FiEdit } from "react-icons/fi";
//import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "../../fonts/Inter-SemiBold.ttf";
import Header from "../Header/Header";
import axios from "axios";
import { data } from "jquery";
import { toast, ToastContainer } from "react-toastify";
import $ from "jquery"
import showToast from "../CustomToast/CustomToast";
const ProfileCv = () => {
 
  const token = localStorage.getItem("token");
  const [allDomain, setAlldomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const [errorMsg, setErrorMsg] = useState({});

  const profileCvUrl = "https://admin.cpdedu.com/api/v1/your-cv";
  const navigate = useNavigate("");
  const submitProfileCv = () => {
    if (name === "") {
     
      showToast("Please enter your first name","warning")
    } else if (lName === "") {
    
      showToast("Please enter your last name","warning")
    } else if (contact === "") {
     
      showToast("Please enter your contact number","warning")
    } else if (contact.length !== 10) {
      showToast("Please Enter 10 digit mobile number","warning")
     
    } else if (nationality === "") {
      showToast("Please select your nationality","warning")
      
    } else if (dob === "") {
      showToast("Please enter  your date of birth","warning")
      
    } else if (gender === "") {
      showToast("Please select your gender","warning")
      
    } else if (uploadCv === "") {
      
      showToast("Upload your profile pic","warning")
    } else if (school === "") {
      showToast("Please select your collage name","warning")
      
    } else if (startYear === "") {
      showToast("Please select your start year","warning")
     
    } else if (endYear === "") {
      showToast("Please select your end year","warning")
    } else if (program === "") {
      showToast("Please enter your program","warning")
     
    } else if (fieldStudy === "") {
     
      showToast("Please enter your field study","warning")

    } else if (domain === "") {
     
      showToast("Please select your domain","warning")
    } else if (industry === "") {
      showToast("Please select your industry","warning")
     
    } else if (description === "") {
      showToast("Please write  description","warning")
  
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
      formData.append("skills", skills);
      formData.append("cv_file", uploadCv, uploadCv.name);
      formData.append("avtar_file", avtarFile);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      axios
        .post(profileCvUrl, formData, { headers: headers })

        .then((res) => {
          if (res.data.result===true) {
            showToast("Profile create successfully",  "success");
            navigate("/");
            setLoading(false);
          } else if (res.data.result===false) {
            showToast(res.data.message,  "error");
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  };

  // List Domain Api
  const domainUrl = "https://admin.cpdedu.com/api/v1/list-domain";

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(domainUrl, { headers: headers })
      .then((res) => {
        console.log(res, "response");
        if (res.data.result === true) {
          setAlldomain(res.data.data);
          // toast(res.data.message, { type: "success" });
        } else if (res.data.result === false) {
          showToast(res.data.message, "error" );
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  const handleImage = (e) => {
    var imgFiles = e.target.files[0];
    setAvtarFile(imgFiles);
  };

  const industryUrl = "https://admin.cpdedu.com/api/v1/list-industry";

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(industryUrl, { headers: headers })
      .then((res) => {
        console.log(res, "response");
        if (res.data.result === true) {
          setAllIndustry(res.data.data);
        } else if (res.data.result === false) {
          showToast(res.data.message,  "error");
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

// useEffect(()=>{
//   $("#exampleInputPassword1").onkeyup(function(){ $('#msg').html('')});
// },[])
// useEffect(() => {
//   alert($("#input").val())
// })



  return (
    <>
      {/* <Header /> */}
      <Homepage_header />
      <div className="container">
        <div className="row">
          <div className="col-lg-1 "></div>
          <div className="col-lg-10 col-md-12 col-12 flex-center">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12 text-center mt-3">
                <h3 id="create_resume">
                  Please fill some details to create your Profile
                </h3>
              </div>
            </div>
            <Form className="form_outline">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                  <h5 className="personal_details_heading">Personal Details</h5>

                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1 " >First Name</label>
                        <input
                          type="text"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errorMsg.name}
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Last Name</label>
                        <input
                          type="text"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                          value={lName}
                          onChange={(e) => setLname(e.target.value)}
                        />
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errorMsg.lName}
                        </span>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Contact</label>
                        <input
                          type="number"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errorMsg.contact}
                        </span>
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
                          <option
                            selected
                            placeholder="Select Nationality"
                          ></option>
                          <option value="1">Hong Kong</option>
                          <option value="2">Hong Kong</option>
                          <option value="3">Hong Kong</option>
                        </select>
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errorMsg.nationality}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-4 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Date of Birth</label>
                        <input
                          type="date"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                        />
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errorMsg.dob}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-4 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Gender</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option selected></option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                        </select>
                        
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-4 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Upload Pic</label>
                        <input
                          type="file"
                          class="form-control "
                          id="exampleInputPassword1"
                          placeholder="Enter here"
                          value={uploadCv}
                          onChange={(e) => handleImage(e)}
                        />
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errorMsg.uploadCv}
                        </span>
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
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                      >
                        <option selected>Select University</option>
                        <option value="1">University</option>
                        <option value="2">University</option>
                        <option value="3">University</option>
                      </select>
                      <span style={{ color: "red", fontSize: "14px" }}>
                        {errorMsg.school}
                      </span>
                    </div>

                    <div className="col-lg-3 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Start year*</label>
                        <select
                          class="form-select  "
                          aria-label="Default select example"
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                        >
                          <option selected>Select year</option>
                          <option value="1">1999</option>
                          <option value="2">2000</option>
                          <option value="3">2001</option>
                        </select>
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errorMsg.startYear}
                        </span>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">End year*</label>
                        <select
                          class="form-select  "
                          aria-label="Default select example"
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                        >
                          <option selected>Select year</option>
                          <option value="1">1999</option>
                          <option value="2">2000</option>
                          <option value="3">2001</option>
                        </select>
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errorMsg.endYear}
                        </span>
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
                          value={program}
                          onChange={(e) => setProgram(e.target.value)}
                        />
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errorMsg.program}
                        </span>
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
                          value={fieldStudy}
                          onChange={(e) => setFieldStudy(e.target.value)}
                        />
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errorMsg.fieldStudy}
                        </span>
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
                          value={domain}
                          onChange={(e) => setDomain(e.target.value)}
                        >
                          <option selected></option>
                          {allDomain.map((item, index) => {
                            return (
                              <>
                                <option value={item.title}>{item.title}</option>
                              </>
                            );
                          })}
                        </select>
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errorMsg.domain}
                        </span>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12 col-12 mt-2">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Industry</label>
                        <select
                          class="form-select  "
                          aria-label="Default select example"
                          placeholder="IT Sector"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                        >
                          <option selected></option>
                          {allIndustry.map((item, index) => {
                            return (
                              <>
                                <option value={item.title}>{item.title}</option>
                              </>
                            );
                          })}
                        </select>
                        <span style={{ color: "red", fontSize: "14px" }}>
                          {errorMsg.industry}
                        </span>
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
                          // value={description}
                          // onChange={(e) => setDescription(e.target.value)}
                        />
                        
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 col-2 mt-4 text-center">
                    <buttton
                      type="submit"
                      className="btn  submit_resumeCreationButton"
                      onClick={submitProfileCv}
                      loading={loading}
                    >
                      {" "}
                      Submit and Preview Resume
                    </buttton>
                  </div>

                  <div className="col-lg-2"></div>
                </div>
              </div>
            </Form>
          </div>
          <div className="col-lg-1"></div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default ProfileCv;
