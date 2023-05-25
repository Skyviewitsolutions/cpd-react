import React from "react";
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
import dummyUserPerson from "../../assets/Images/dommyuserperson.jfif";
import "../../../src/fonts/Inter-Regular.ttf";
import company_logo from "../../assets/Images/company_logo.png";
import { TagsInput } from "react-tag-input-component";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import CoachesPreview from "../../Component/Modal/CoachesPreview/CoachesPreview";
import CustomCalendar from "../../Component/Calendar/CustomCalendar";
import Button from "../../Component/button/Button/Button";
import { endpoints } from "../../Component/services/endpoints";
import { getAcedemicYears } from "../../utils/getAcademicYear";
import SlotAsCoach from "../../Component/Coaches/SlotAsCoach/SlotAsCoach";
import SlotAsWorkShop from "../../Component/Coaches/SlotAsWorkShop/SlotAsWorkShop";
import { toast, ToastContainer } from "react-toastify";
import CompanyImg from "../../assets/Images/company.png";
import { getDomainList, getIndustryList } from "../../utils/api";
import showToast from "../../Component/CustomToast/CustomToast";
import DefaultImg from "../../assets/Images/default.png";
import "./employerForm.css";
import Loader from "../../Component/Loader/Loader";
import EmployerPreview from "../../Component/Modal/EmployerPreview/EmployerPreview";


function EmployerForm() {

  const token = localStorage.getItem("token");
  const [allIndustry, setAllIndustry] = useState([]);
  const [allDomain, setAllDomain] = useState([]);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [showEmployeerPreview, setShowEmployeerPreview] = useState(false);
  const [employeerImg, setEmployeerImg] = useState(null);
  const [allNational, setAllNational] = useState([]);

  const navigate = useNavigate();

  const [employer, setEmployer] = useState({
    first_name: "",
    last_name: "",
    contact: "",
    nationality: "",
    companyName: "",
    email: "",
    dob: "",
    gender: "",
    address: "",
    logo: null,
    description: "",
    skills: [],
    domain: "",
    industry: "",
    industryId: "",
    domainId: "",
    subIndustry: "",
  });

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

    getNationality();
  }, []);

  const handleUploadImg = (e) => {
    const files = e.target.files[0];
    setEmployeerImg(files);
  };

  const handleForm = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setEmployer((itm) => {
      return { ...itm, [name]: val };
    });
  };

  const handleDomainSelection = (e) => {
    const val = e.target.value;
    var domanId = allDomain.find((itm, index) => {
      return itm.title === val;
    });
    domanId = domanId._id;
    setEmployer((itm) => {
      return { ...itm, domain: val, domainId: domanId };
    });
  };

  const handleIndustrySelection = (e) => {
    const val = e.target.value;
    var indstryId = allIndustry.find((itm, index) => {
      return itm.title === val;
    });
    indstryId = indstryId._id;
    setEmployer((itm) => {
      return { ...itm, industry: val, industryId: indstryId };
    });
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const submit = () => {
    if (!employer.first_name) {
      showToast("First name is required", "warning");
    } else if (!employer.last_name) {
      showToast("Last name is required", "warning");
    } else if (!employer.contact) {
      showToast("Contact is required", "warning");
    } else if (!employer.nationality) {
      showToast("Nationality is required", "warning");
    } else if (!employer.companyName) {
      showToast("Company name is required", "warning");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(employer.email)
    ) {
      showToast("Valid email is required", "warning");
    } else if (!employer.dob) {
      showToast("Date of birth is required", "warning");
    } else if (!employer.gender) {
      showToast("Please select gender", "warning");
    } else if (!employer.address) {
      showToast("Address is required", "warning");
    } else if (!employeerImg) {
      showToast("company logo is required", "warning");
    } else if (!employer.description) {
      showToast("Please give description", "warning");
    } else if (employer.length === 0) {
      showToast("Please give skills", "warning");
    } else if (!employer.domain) {
      showToast("Please select domain", "warning");
    } else if (!employer.industry) {
      showToast("Please select industry", "warning");
    } else if (!employer.subIndustry) {
      showToast("Sub industry is required", "warning");
    } else {
      var formdata = new FormData();
      formdata.append("first_name", employer.first_name);
      formdata.append("last_name", employer.last_name);
      formdata.append("contact_number", employer.contact);
      formdata.append("nationality", employer.nationality);
      formdata.append("company_name", employer.companyName);
      formdata.append("email", employer.email);
      formdata.append("dob", employer.dob);
      formdata.append("gender", employer.gender);
      formdata.append("company_address", employer.address);
      formdata.append("domain", employer.domain);
      formdata.append("industry", employer.industry);
      formdata.append("subindustry", employer.subIndustry);
      formdata.append("skills", employer.skills);
      formdata.append("type", "");
      formdata.append("description", employer.description);
      formdata.append("company_logo", employeerImg);

      const url = endpoints.employer.createEmployer;

      setLoading(true);

      axios
        .post(url, formdata, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            showToast("Profile created successfully", "success");
            localStorage.setItem("isCvUploaded", true);
            navigate("/");
          } else if (res.data.result === false) {
            showToast(res?.data?.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error");
        });
    }
  };

  const getEmployerData = () => {
    const url = endpoints.authentication.userProfile;
    setLoading(true);
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false);
        if (res.data.result) {
          const val = res.data?.data;

          var domain = val?.domain?.[0];
          var industry = val?.industry?.[0];

          var domainId = allDomain.find((item) => {
            return item.title === domain;
          })?._id;
          var industryId = allIndustry.find((item) => {
            return item.title === industry;
          })?._id;

          setEmployer({
            first_name: val?.first_name,
            last_name: val?.last_name,
            contact: val?.contact_number,
            nationality: val?.nationality,
            companyName: val?.company_name,
            email: val?.email,
            dob: val?.dob,
            gender: val?.gender,
            address: val?.company_address,
            logo: val?.company_logo,
            description: val?.description,
            skills: val?.skills,
            domain: domain,
            industry: industry,
            industryId: industryId,
            domainId: domainId,
            subIndustry: val?.subindustry,
          });

          const image = val?.company_logo;
          console.log(image , "image")
          const fileName = "myFile.jpg";

          fetch(image).then(async (response) => {
            const contentType = response.headers.get("content-type");
            const blob = await response.blob();
            const file = new File([blob], fileName, { contentType });
            setEmployeerImg(file);
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "this is the error");
      });
  };

  const updateProfile = () => {
    const url = endpoints.employer.updateEmployer;
    if (!employer.first_name) {
      showToast("First name is required", "warning");
    } else if (!employer.last_name) {
      showToast("Last name is required", "warning");
    } else if (!employer.contact) {
      showToast("Contact is required", "warning");
    } else if (!employer.nationality) {
      showToast("Nationality is required", "warning");
    } else if (!employer.companyName) {
      showToast("Company name is required", "warning");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(employer.email)
    ) {
      showToast("Valid email is required", "warning");
    } else if (!employer.dob) {
      showToast("Date of birth is required", "warning");
    } else if (!employer.gender) {
      showToast("Please select gender", "warning");
    } else if (!employer.address) {
      showToast("Address is required", "warning");
    } else if (!employeerImg) {
      showToast("company logo is required", "warning");
    } else if (!employer.description) {
      showToast("Please give description", "warning");
    } else if (employer.length === 0) {
      showToast("Please give skills", "warning");
    } else if (!employer.domain) {
      showToast("Please select domain", "warning");
    } else if (!employer.industry) {
      showToast("Please select industry", "warning");
    } else if (!employer.subIndustry) {
      showToast("Sub industry is required", "warning");
    } else {
      var formdata = new FormData();
      formdata.append("first_name", employer.first_name);
      formdata.append("last_name", employer.last_name);
      formdata.append("contact_number", employer.contact);
      formdata.append("nationality", employer.nationality);
      formdata.append("company_name", employer.companyName);
      formdata.append("email", employer.email);
      formdata.append("dob", employer.dob);
      formdata.append("gender", employer.gender);
      formdata.append("company_address", employer.address);
      formdata.append("domain", employer.domain);
      formdata.append("industry", employer.industry);
      formdata.append("subindustry", employer.subIndustry);
      formdata.append("skills", employer.skills);
      formdata.append("type", "");
      formdata.append("description", employer.description);
      formdata.append("company_logo", employeerImg);

      setLoading(true);

      axios
        .post(url, formdata, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            showToast("Profile updated successfully", "success");
            localStorage.setItem("isCvUploaded", true);
            navigate("/");
          } else if (res.data.result === false) {
            showToast(res?.data?.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error");
        });
    }
  };


  useEffect(() => {
    const isCvAvailable = localStorage.getItem("isCvUploaded");
    if (isCvAvailable == "true") {
      getEmployerData();
      setUpdate(true);
    }
  }, []);

  return (
    <>
      <Homepage_header />
      <div className="container  employeeFormCont">
        <h3 id="create_resume">Employer Form</h3>
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
                  value={employer.first_name}
                  onChange={handleForm}
                  name="first_name"
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
                  required
                  value={employer.last_name}
                  onChange={handleForm}
                  name="last_name"
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="mobile_code">Contact*</label>
                <PhoneInput
                  country="hk"
                  value={employer.contact}
                  name="contact"
                  onChange={(val) =>
                    setEmployer((itm) => {
                      return { ...itm, contact: val };
                    })
                  }
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="">Nationality*</label>
                <select
                  class="form-select  "
                  aria-label="select example"
                  required
                  value={employer.nationality}
                  name="nationality"
                  onChange={handleForm}
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
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Company Name</label>
                <input
                  type="text"
                  class="form-control "
                  id="exampleInputPassword1"
                  placeholder="Enter Company Name"
                  required
                  value={employer.companyName}
                  name="companyName"
                  onChange={handleForm}
                />
              </div>
            </div>{" "}
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Email</label>
                <input
                  type="text"
                  class="form-control "
                  id="exampleInputPassword1"
                  placeholder="Enter Email"
                  required
                  value={employer.email}
                  name="email"
                  onChange={handleForm}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="">Date of Birth*</label>
                <input
                  type="date"
                  class="form-control "
                  placeholder="Due date"
                  value={employer.dob}
                  name="dob"
                  onChange={handleForm}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="">Gender*</label>
                <select
                  className="form-select "
                  aria-label="Default select example"
                  value={employer.gender}
                  name="gender"
                  onChange={handleForm}
                >
                  <option>Choose Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="">Company address</label>
                <input
                  type="text"
                  class="form-control "
                  id="exampleInputPassword1"
                  placeholder="Enter address"
                  required
                  value={employer.address}
                  name="address"
                  onChange={handleForm}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                {employeerImg ? (
                  <>
                    <label htmlFor="takePhoto">Company Logo</label>
                    <h5 class="form-control imglable" htmlFor="takePhoto">
                      <label htmlFor="takePhoto"> {employeerImg.name} </label>
                    </h5>
                    <input
                      type="file"
                      class="form-control"
                      placeholder="Enter here"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) => handleUploadImg(e)}
                      id="takePhoto"
                      style={{ display: "none" }}
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor="takePhoto">Company Logo</label>
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
                  value={employer.description}
                  name="description"
                  onChange={handleForm}
                />
              </div>
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
                  value={employer.skills}
                  name="description"
                  onChange={(val) =>
                    setEmployer((itm) => {
                      return { ...itm, skills: val };
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Domain</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  onChange={handleDomainSelection}
                  value={employer.domain}
                >
                  <option value="">Choose</option>
                  {allDomain.map((domain, ind) => {
                    return (
                      <>
                        <option value={domain.title} key={ind}>
                          {domain.title}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Industry</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  onChange={handleIndustrySelection}
                  value={employer.industry}
                >
                  <option value="">Choose</option>
                  {allIndustry.map((itm, index) => {
                    return (
                      <>
                        <option value={itm.title} key={index}>
                          {itm.title}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Sub Industry</label>

                <input
                  type="text"
                  class="form-control field"
                  id=""
                  placeholder="Enter here"
                  value={employer.subIndustry}
                  name="subIndustry"
                  onChange={handleForm}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-lg-6"></div>
              <div className="col-lg-3 col-md-3 col-12">
                <Button
                  title={update === true ? "Update" : "Submit"}
                  loading={loading}
                  onClick={update === true ? updateProfile : submit}
                />
              </div>
              <div className="col-lg-3 col-md-3 col-12">
                <Button
                  title="Preview Profile"
                  onClick={() => setShowEmployeerPreview(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
      {loading && <Loader />}
      <EmployerPreview showEmployeerPreview={showEmployeerPreview} setShowEmployeerPreview={setShowEmployeerPreview} 
        submit={submit}
        firstName={employer.first_name}
        lastName={employer.last_name}
        contactNumber={employer.contact}
        gender={employer.gender}
        nationality={employer.nationality}
        description={employer.description}
        skills={employer.skills}
        update={update}
        domain={employer.domain}
        industry={employer.industry}
        updateProfile={updateProfile}
        dob={employer.dob}
        employeerImg={employeerImg}
        loading={loading}/>

      <Footer />
    </>
  );
}

export default EmployerForm;
