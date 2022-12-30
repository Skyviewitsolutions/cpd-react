// import React from "react";
// import "./CoachesForm.css";

// //import edu_logo from "../../assets/Images/educationLogo.jpeg";



// import edu_logo from "../../assets/Images/edu_logo.jpeg";

// // import company_logo from '../../assets/Images/company_logo.jpeg';
// import { FiEdit } from "react-icons/fi";
// //import { Navigate } from 'react-router-dom';
// import { useNavigate,useLocation } from "react-router-dom";
// import "../../fonts/Inter-SemiBold.ttf";
// import { useState,useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import Form from "react-bootstrap/Form";

// import Spinner from "react-bootstrap/Spinner";
// import Homepage_header from "../../Component/Header/Homepage_header";

// import { BsFillPlusCircleFill } from "react-icons/bs";
// import $ from "jquery";
// import Footer from "../../Component/Footer/Footer";
// import { endpoints } from "../../Component/services/endpoints";


// const CoachesForm = () => {
//   const navigate = useNavigate("");
//   const location = useLocation("");

//   const [allDomain, setAlldomain] = useState([]);
//   const [allIndustry, setAllIndustry] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [name, setName] = useState("");
//   const [lName, setLname] = useState("");
//   const [contact, setContact] = useState("");
//   const [nationality, setNationality] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [uploadCv, setUploadCv] = useState(null);
//   const [school, setSchool] = useState([]);
//   const [startYear, setStartYear] = useState([]);
//   const [endYear, setEndYear] = useState([]);
//   const [program, setProgram] = useState([]);
//   const [fieldStudy, setFieldStudy] = useState([]);
//   const [domain, setDomain] = useState("");
//   const [industry, setIndustry] = useState("");
//   const [skills, setSkills] = useState("");
//   const [description, setDescription] = useState("");
//   const [avtarFile, setAvtarFile] = useState(null);
//   const [cvFIle, setCvFile] = useState("");
//   const [allNational, setAllNational] = useState([]);
//   const [update, setUpdate] = useState(false);

//   const cvUrl = "https://admin.cpdedu.com/api/v1/upload-cv";

//   const token = localStorage.getItem("token");
//   var userDetails = localStorage.getItem("users");
//   console.log(userDetails, "user details..");

//   const submit = () => {
//     if (name === "") {
//       toast("Please enter first name", { type: "warning" });
//     } else if (lName === "") {
//       toast("Please enter last name", { type: "warning" });
//     } else if (contact === "") {
//       toast("Please enter contact", { type: "warning" });
//     }  else if (nationality === "") {
//       toast("Please enter nationality", { type: "error" });
//     } else if (dob === "") {
//       toast("Please enter DOB", { type: "warning" });
//     } else if (gender === "") {
//       toast("Please enter gender", { type: "warning" });
//     } else if (uploadCv === "") {
//       toast("Please upload CV", { type: "warning" });
//     } else if (school === "") {
//       toast("Please enter School/College/University", { type: "warning" });
//     } else if (!startYear) {
//       toast("Please enter start year", { type: "warning" });
//     } else if (endYear === "") {
//       toast("Please enter end year", { type: "warning" });
//     } else if (program === "") {
//       toast("Please enter program", { type: "warning" });
//     } else if (fieldStudy === "") {
//       toast("Please enter field study", { type: "warning" });
//     } else if (domain === "") {
//       toast("Please enter domain", { type: "warning" });
//     } else if (industry === "") {
//       toast("Please enter industry", { type: "warning" });
//     } else {

//       // -----Country Code Selection
// // $("#mobile_code").intlTelInput({
// // 	initialCountry: "in",
// // 	separateDialCode: true,
// // 	 utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
// // });

//       $(".student_records :input").each(function () {
//         if (this.value == "") {
//           toast($(this).attr("error"), { type: "warning" });
//           $(this).focus();
//           return false;
//         }
//         if ($(this).hasClass("school")) {
//           school.push(this.value);
//         }
//         if ($(this).hasClass("start-year")) {
//           startYear.push(this.value);
//         }
//         if ($(this).hasClass("end-year")) {
//           endYear.push(this.value);
//         }
//         if ($(this).hasClass("program")) {
//           program.push(this.value);
//         }
//         if ($(this).hasClass("field")) {
//           fieldStudy.push(this.value);
//         }
//       });
//       $(".customer_records_dynamic .row").each(function () {
//         $(":input", this).each(function () {
//           if (this.value == "") {
//             toast($(this).attr("error"), { type: "warning" });
//             $(this).focus();
//             return false;
//           }
//           if ($(this).hasClass("school")) {
//             school.push(this.value);
//           }
//           if ($(this).hasClass("start-year")) {
//             startYear.push(this.value);
//           }
//           if ($(this).hasClass("end-year")) {
//             endYear.push(this.value);
//           }
//           if ($(this).hasClass("program")) {
//             program.push(this.value);
//           }
//           if ($(this).hasClass("field")) {
//             fieldStudy.push(this.value);
//           }
//         });
//       });
//       const formData = new FormData();
//       formData.append("first_name", name);
//       formData.append("last_name", lName);
//       formData.append("contact_number", contact);
//       formData.append("nationality", nationality);
//       formData.append("dob", dob);
//       formData.append("gender", gender);
//       formData.append("university_name", school);
//       formData.append("start_year", startYear);
//       formData.append("end_year", endYear);
//       formData.append("program", program);
//       formData.append("field_of_study", fieldStudy);
//       formData.append("domain", domain);
//       formData.append("description", description);
//       formData.append("industry", industry);
//       formData.append("cv_file", uploadCv);
//       formData.append("avtar_file", avtarFile);

//       const headers = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       };

//       setLoading(true);

//       axios
//         .post(cvUrl, formData, { headers: headers })
//         .then((res) => {
//           setLoading(false);
//           if (res.data.result === true) {
//             toast("Profile created successfully", { type: "success" });
//             navigate("/");
//           }
//         })
//         .catch((err) => {
//           console.log(err, "error");
//           setLoading(false);
//         });
//     }
//   };

//   const handleChange = (e) => {
//     var cvFiles = e.target.files[0];
//     // setUploadCv(cvFiles);
//   };
//   const handleImage = (e) => {
//     var imgFiles = e.target.files[0];
//     setAvtarFile(imgFiles);
//   };

//   const domainUrl = "https://admin.cpdedu.com/api/v1/list-domain";

//   const getDomain = () => {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };

//     axios
//       .get(domainUrl, { headers: headers })
//       .then((res) => {
//         if (res.data.result === true) {
//           setAlldomain(res.data.data);
//         } else if (res.data.result === false) {
//           toast(res.data.message, { type: "error" });
//         }
//       })
//       .catch((err) => {
//         console.log(err, "error");
//       });
//   };

//   const getIndustry = () => {
//     const industryUrl = "https://admin.cpdedu.com/api/v1/list-industry";
//     const headers = {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };

//     axios
//       .get(industryUrl, { headers: headers })
//       .then((res) => {
//         if (res.data.result === true) {
//           setAllIndustry(res.data.data);
//         } else if (res.data.result === false) {
//           toast(res.data.message, { type: "error" });
//         }
//       })
//       .catch((err) => {
//         console.log(err, "error");
//       });
//   };

//   const getNationality = () => {
//     const headers = {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };

//     const url = endpoints.events.getNationalityUrl;

//     axios
//       .get(url, { headers: headers })
//       .then((res) => {
//         if (res.status === 200) {
//           const val = res.data;

//           setAllNational(val);
//         }
//       })
//       .catch((err) => {
//         console.log(err, "this is the error");
//       });
//   };

//   useEffect(() => {
//     getDomain();
//     getIndustry();
//     getNationality();
//   }, []);

//   // here we are going to work on the updation part;

//   const usersData = location?.state?.usersData;
//   console.log(usersData, "all location data here...");
//   //   console.log(usersData , "users data");

//   useEffect(() => {
//     if (usersData) {
//       setUpdate(true);
//       setName(usersData.first_name);
//       setLname(usersData.last_name);
//       setContact(usersData.contact_number);
//       setNationality(usersData.nationality);
//       var dobs = usersData.dob.replaceAll("/", "-");
//       setDob(dobs);
//       setGender(usersData.gender);
//       setSchool(usersData.university_name);
//       setStartYear(usersData.start_year);
//       setEndYear(usersData.end_year);
//       setProgram(usersData.program);
//       setFieldStudy(usersData.field_of_study);
//       setDomain(usersData.domain);
//       setIndustry(usersData.industry);
//       setDescription(usersData.description);

//       var imgUrl = location.state.imageUrl;
//       const fileName = "myFile.jpg";

//       fetch(imgUrl).then(async (response) => {
//         const contentType = response.headers.get("content-type");
//         const blob = await response.blob();
//         const file = new File([blob], fileName, { contentType });
//         setAvtarFile(file);
//       });
//     }
//   }, [usersData]);

//   const generateMultipleDiv = () => {
//     $(".customer_records_dynamic").append($(".student_records").html());
//     $(".customer_records_dynamic .row .removeDiv").html(
//       '<a href="#" class="remove-field btn-remove-customer">Remove</a>'
//     );
//   };

//   useEffect(() => {
//     $(document).on("click", ".remove-field", function (e) {
//       $(this).closest(".row").remove();
//       e.preventDefault();
//     });
//   }, []);

//   const updateProfile = () => {
//     const url = endpoints.authentication.updateProfile;
//     console.log(url, "all url...");
//     if (name === "") {
//       toast("Please enter first name", { type: "warning" });
//     } else if (lName === "") {
//       toast("Please enter last name", { type: "warning" });
//     } else if (contact === "") {
//       toast("Please enter contact", { type: "warning" });
//     } else if (contact.length !== 10) {
//       toast("Please Enter 10 digit", { type: "warning" });
//     } else if (nationality === "") {
//       toast("Please enter nationality", { type: "error" });
//     } else if (dob === "") {
//       toast("Please enter DOB", { type: "warning" });
//     } else if (gender === "") {
//       toast("Please enter gender", { type: "warning" });
//     } else if (uploadCv === "") {
//       toast("Please upload CV", { type: "warning" });
//     } else if (school === "") {
//       toast("Please enter School/College/University", { type: "warning" });
//     } else if (!startYear) {
//       toast("Please enter start year", { type: "warning" });
//     } else if (endYear === "") {
//       toast("Please enter end year", { type: "warning" });
//     } else if (program === "") {
//       toast("Please enter program", { type: "warning" });
//     } else if (fieldStudy === "") {
//       toast("Please enter field study", { type: "warning" });
//     } else if (domain === "") {
//       toast("Please enter domain", { type: "warning" });
//     } else if (industry === "") {
//       toast("Please enter industry", { type: "warning" });
//     } else {
//       const formData = new FormData();
//       formData.append("first_name", name);
//       formData.append("last_name", lName);
//       formData.append("contact_number", contact);
//       formData.append("nationality", nationality);
//       formData.append("dob", dob);
//       formData.append("gender", gender);
//       formData.append("university_name", school);
//       formData.append("start_year", startYear);
//       formData.append("end_year", endYear);
//       formData.append("program", program);
//       formData.append("field_of_study", fieldStudy);
//       formData.append("domain", domain);
//       formData.append("description", description);
//       formData.append("industry", industry);
//       formData.append("cv_file", uploadCv);
//       formData.append("avtar_file", avtarFile);

//       const headers = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       };

//       setLoading(true);

//       axios
//         .post(url, formData, { headers: headers })
//         .then((res) => {
//           setLoading(false);
//           if (res.data.result === true) {
//             toast("Profile updated successfully", { type: "success" });
//             navigate("/");
//           }
//         })
//         .catch((err) => {
//           console.log(err, "error");
//           setLoading(false);
//         });
//     }
//   };

//   const getAcedemicYears = () => {
//     let currentYear = new Date().getFullYear();
//     let options = [];
//     for (let i = currentYear; i >= 1950; i--) {
//       options.push(<option value={i}>{i}</option>);
//     }
//     return options;
//   };




//   return (
//     <>
//       <Homepage_header />
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-1 col-md-1"></div>
//           <div className="col-lg-10 col-md-10 col-12 flex-center">
//             <div className="row">
//               <div className="col-lg-12 col-md-12 col-12 text-center mt-3">
//                 <h3 id="create_resume">
//                   Please fill some details to create your resume
//                 </h3>
//               </div>
//             </div>
//             <div className="form_outline">
//               <div className="row">
//                 {/* <button className="btn btn-success cvedit ">Edit</button> */}
//                 <div className="col-lg-12 col-md-12 col-12">
//                   <div className="row">
//                     <div className="col-lg-4 col-md-12 col-12 mt-2">
//                       <div class="form-group">
//                         <label for="exampleInputPassword1">First Name</label>
//                         <input
//                           type="text"
//                           class="form-control "
//                           id="exampleInputPassword1"
//                           placeholder="Enter here"
//                           value={name}
//                           onChange={(e) => setName(e.target.value)}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-4 col-md-12 col-12 mt-2">
//                       <div class="form-group">
//                         <label for="exampleInputPassword1">Last Name</label>
//                         <input
//                           pattern="[0-9]{10}"
//                           type="text"
//                           class="form-control "
//                           id="exampleInputPassword1"
//                           placeholder="Enter here"
//                           value={lName}
//                           onChange={(e) => setLname(e.target.value)}
//                         />
//                       </div>
//                     </div>

//                     <div className="col-lg-4 col-md-12 col-12 mt-2">
//                       <div class="form-group">
//                         <label for="mobile_code">Contact</label>
//                         {/* <input
//                           type="number"
//                           class="form-control "
//                           id="exampleInputPassword1"
//                           placeholder="Enter here"
//                           value={contact}
//                           onChange={(e) => setContact(e.target.value)}
//                         /> */}
                          
//                  <input type="text" id="mobile_code" class="form-control" placeholder="Phone Number" name="name"
//                    value={contact}
//                    onChange={(e) => setContact(e.target.value)}
//                  />
                           



//                       </div>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-12 col-md-12 col-lg-4">
//                       <div class="form-group">
//                         <label for="exampleInputPassword1">Nationality</label>
//                         <Form.Select
//                           aria-label="Default select example"
//                           value={nationality}
//                           onChange={(e) => setNationality(e.target.value)}
//                         >
//                           <option></option>
//                           {allNational.map((itm, ind) => {
//                             return (
//                               <>
//                                 <option value={itm.en_short_name}>
//                                   {itm.en_short_name}
//                                 </option>
//                               </>
//                             );
//                           })}
//                         </Form.Select>
//                       </div>
//                     </div>
//                     <div className="col-12 col-md-12 col-lg-4">
//                       <Form.Label className="label_first">
//                         Date Of Birth
//                       </Form.Label>
//                       <Form.Control
//                         type="date"
//                         // name="duedate"
//                         placeholder="Due date"
//                         value={dob}
//                         onChange={(e) => setDob(e.target.value)}
//                       />
//                     </div>
//                     <div className="col-12 col-md-12 col-lg-4">
//                       <Form.Label className="label_first">Gender</Form.Label>
//                       <Form.Select
//                         aria-label="Default select example"
//                         value={gender}
//                         onChange={(e) => setGender(e.target.value)}
//                       >
//                         <option></option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                       </Form.Select>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-6 col-md-6 col-lg-6">
//                       <div class="form-group">
//                         <label for="exampleInputPassword1" htmlFor="takePhoto">
//                           Upload Img
//                         </label>
//                         <input
//                           type="file"
//                           class="form-control"
//                           id="exampleInputPassword1"
//                           placeholder="Enter here"
//                           accept="image/png, image/gif, image/jpeg"
//                           onChange={(e) => handleImage(e)}
//                         />
//                       </div>
//                     </div>
//                     {/* <div className="col-6 col-md-6 col-lg-6">
//                       <div class="form-group">
//                         <label for="exampleInputPassword1"  htmlFor="takePhoto">Upload Image</label>
//                         <input
//                           type="file"
//                           class="form-control "
//                           placeholder="Enter here"
//                           id="takePhoto"
//                           onChange={(e) => handleImage(e)} 
//                         />
//                       </div>
//                     </div> */}
//                   </div>
//                   {/* {
//                   userDetails.user_type==1
//                   ? */}
//                     {/* <> */}
//                       <h5
//                     className="heading_second"
//                     style={{
//                       display: "flex",
//                       flexDriection: "row",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     Education Details
//                     <a
//                       class="extra-fields-customer"
//                       style={{ cursor: "pointer" }}
//                       onClick={() => {
//                         generateMultipleDiv();
//                       }}
//                     >
//                       <BsFillPlusCircleFill fontSize={20} />
//                     </a>
//                   </h5>
//                   <div className="student_records">
//                     <div className="row">
//                       <div className="col-lg-6 col-md-12 col-12 mt-2">
//                         <label for="exampleInputPassword1">
//                           School/College/University*
//                         </label>
//                         <input
//                           type="text"
//                           class="form-control school"
//                           id=""
//                           placeholder="Enter here"
//                           error="Please enter School/College/University"
//                         />
//                       </div>

//                       <div className="col-lg-3 col-md-12 col-12 mt-2">
//                         <div class="form-group">
//                           <label for="exampleInputPassword1">Start year*</label>
//                           <select
//                             class="form-select start-year "
//                             aria-label="Default select example"
//                             error="Please enter start year"
//                           >
//                             <option>Choose Start Year</option>
//                             {getAcedemicYears()}
//                           </select>
//                         </div>
//                       </div>

//                       <div className="col-lg-3 col-md-12 col-12 mt-2">
//                         <div class="form-group">
//                           <label for="exampleInputPassword1">End year*</label>
//                           <select
//                             class="form-select end-year "
//                             aria-label="Default select example"
//                             error="Please enter end year"
//                           >
//                             <option>Choose End Year</option>
//                             {getAcedemicYears()}
//                           </select>
//                         </div>
//                       </div>
//                       <div className="col-lg-4 col-md-12 col-12 mt-2">
//                         <div class="form-group">
//                           <label for="exampleInputPassword1">Program</label>
//                           <input
//                             type="text"
//                             class="form-control program"
//                             id="exampleInputPassword1"
//                             placeholder="Enter here"
//                             error="Please enter program"
//                           />
//                         </div>
//                       </div>
//                       <div className="col-lg-4 col-md-12 col-12 mt-2">
//                         <div class="form-group">
//                           <label for="exampleInputPassword1">Field Study</label>
//                           <input
//                             type="text"
//                             class="form-control field"
//                             id="exampleInputPassword1"
//                             placeholder="Enter here"
//                             error="Please enter field study"
//                           />
//                         </div>
//                       </div>
//                       <div
//                         className="col-lg-4 col-md-12 col-12 mt-2 removeDiv"
//                         style={{ display: "flex", alignItems: "center" }}
//                       ></div>
//                     </div>
//                   </div>
//                   <div class="customer_records_dynamic"></div>
//                     {/* </> */}
//                   {/* // : null */}
                 
                  
//                   {/* // } */}
                
               
//                   <h5 className="heading_second">Add Details</h5>

//                   <div className="row">
//                     <div className="col-lg-5 col-md-12 col-12 mt-2">
//                       <div class="form-group">
//                         <label for="exampleInputPassword1">Domain</label>
//                         <select
//                           class="form-select  "
//                           aria-label="Default select example"
//                           placeholder="Technology"
//                           value={domain}
//                           onChange={(e) => setDomain(e.target.value)}
//                         >
//                           {allDomain.map((item, index) => {
//                             return (
//                               <>
//                                 <option value={item.title}>{item.title}</option>
//                               </>
//                             );
//                           })}
//                         </select>
//                       </div>
//                     </div>

//                     <div className="col-lg-5 col-md-12 col-12 mt-2">
//                       <div class="form-group">
//                         <label for="exampleInputPassword1">Industry</label>
//                         <select
//                           class="form-select  "
//                           aria-label="Default select example"
//                           placeholder="IT Sector"
//                           value={industry}
//                           onChange={(e) => setIndustry(e.target.value)}
//                         >
//                           <option value="">Choose Industry</option>
//                           {allIndustry.map((item, index) => {
//                             return (
//                               <>
//                                 <option value={item.title}>{item.title}</option>
//                               </>
//                             );
//                           })}
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* <div className="row">
//                     <div className="col-lg-12 col-md-12 col-12 mt-2">
//                       <div class="form-group">
//                         <label for="exampleInputPassword1">Skills</label>
//                         <div>
//                           <div className="show_search">
//                             <tag>
//                               skills <span className="skills_clear">x</span>
//                             </tag>

//                             <tag>
//                               skills <span className="skills_clear">x</span>
//                             </tag>
//                           </div>
//                           <input
//                             type="search skills here"
//                             class="form-control "
//                             id="exampleInputPassword1"
//                             placeholder="search"
//                             value={skills}
//                             onChange={(e) => setSkills(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div> */}
//                   <div className="col-lg-12 col-md-12 col-12 mt-2">
//                     <div class="form-group">
//                       <label for="exampleInputPassword1">Description</label>
//                       <textarea
//                         type="text"
//                         class="form-control"
//                         id="exampleInputPassword1"
//                         placeholder="Enter here"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-lg-12 col-md-12 col-12 mt-4 ">
//                     <button
//                       type="submit"
//                       className="btn  submit_resumeCreationButton"
//                       onClick={update === true ? updateProfile : submit}
//                     >
//                       {" "}
//                       {loading ? (
//                         <Spinner
//                           animation="border"
//                           variant="light"
//                           style={{ width: "20px", height: "20px" }}
//                         />
//                       ) : (
//                         "submit and preview resume"
//                       )}
//                     </button>
//                     <Spinner />
//                   </div>

//                   <div className="col-lg-2"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-1 col-md-1"></div>
//         </div>
//         <ToastContainer />
//       </div>
//       <Footer/>
//     </>
//   );
// };


// export default CoachesForm;
