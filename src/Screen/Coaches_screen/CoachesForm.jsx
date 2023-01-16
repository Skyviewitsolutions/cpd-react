import React from "react";
import "./CoachesForm.css";
// import Header from "../Header/Homepage_header";
// import Footer from "../Footer/Footer";
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
// import { endpoints } from "../services/endpoints";
import Spinner from "react-bootstrap/Spinner";
// import Homepage_header from "../Header/Homepage_header";
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
import TimeKeeper from "react-timekeeper";
import { BsPlusCircleFill } from "react-icons/bs";
import Week_days from "../../Component/DaySelection/Week_days";
import Month_days from "../../Component/DaySelection/Month_days";
import $, { fn, uniqueSort } from "jquery";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import CoachesPreview from "../../Component/Modal/CoachesPreview/CoachesPreview";
// import PreviewResumeModal from "../Modal/PreviewResumeModal/PreviewResumeModal";
const CoachesForm = () => {
  const [coachesPreview, setCoachesPreview] = useState(false);
  const [opencoachesPreview, setOpenCoachesPreview] = useState(false);

  const [startTime, setStartTime] = useState("12:34pm");
  const [showStartTime, setShowStartTime] = useState(false);
  const [endTime, setEndTime] = useState("12:34pm");
  const [showEndTime, setShowEndTime] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentTimeM, setCurrentTimeM] = useState("");
  useEffect(() => {
    // const myInterval = setInterval(() => {
    //   setCurrentTime(new Date().toLocaleTimeString());
    // }, 1000);
    // return () => {
    //   clearInterval(myInterval);
    // }
    // const slotTime= Date().getHours();
    const h = new Date();

    setCurrentTime(h.getHours());
    const i = new Date();

    // setCurrentTime(h.getHours());
    setCurrentTimeM(i.getMinutes());
    // setCurrentTime(new Date().getHours());
  });
  const [dayType, setDayType] = useState("days");
  const [days, setDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [updateWeekDays, setUpdateWeekDays] = useState(false);

  const addTimeSlot = (val) => {
    let check = timeSlots.includes(val);
    if (check) {
      var checkIndex = timeSlots.indexOf(val);
      timeSlots.splice(checkIndex, 1);
      setTimeSlots(timeSlots);
    } else {
      timeSlots.push(val);
      setTimeSlots(timeSlots);
    }
    setUpdateWeekDays(!updateWeekDays);
  };

  const addDaySlot = (val) => {
    let check = days.includes(val);
    if (check) {
      var checkIndex = days.indexOf(val);
      days.splice(checkIndex, 1);
      setDays(days);
    } else {
      days.push(val);
      setDays(days);
    }
  };

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
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="mobile_code">Contact*</label>
                <PhoneInput country="hk" />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="">Nationality*</label>
                <select class="form-select  " aria-label="select example">
                  <option>Choose Nationality</option>
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
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="">Gender*</label>
                <select
                  className="form-select "
                  aria-label="Default select example"
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
                {/* <h5  class="form-control" htmlFor="takePhone">{uploadImg.name}</h5> */}
                <input
                  type="file"
                  class="form-control"
                  placeholder="Enter here"
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
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Job Title</label>
                <input
                  type="text"
                  class="form-control field"
                  id=""
                  placeholder="Enter here"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Employment Type</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
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
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Start Year</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                  <option>select years</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">End Year</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                >
                  <option>select</option>
                  <option>2002</option>
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
                  placeholder="Enter "
                />
              </div>
              <div class="form-group ">
                <label for="exampleInputPassword1">Type</label>
                <input
                  type="text"
                  class="form-control "
                  placeholder="choose Domain"
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
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12  ">
              <div class="form-group">
                <label for="exampleInputPassword1">Recommendation Email</label>
                <input
                  type="email"
                  class="form-control "
                  placeholder="Enter here"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="formoutline_studentcv">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <h5 className="heading_second">Slot Availability</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <span className="d-flex coachesFormStart">
                    <h6 className=""> Start Time</h6>

                    <h6 className="coachshowCurrent">{startTime}</h6>
                    {!showStartTime && (
                      <BsPlusCircleFill
                        id="coachFormstimebutton"
                        onClick={() => setShowStartTime(true)}
                      />
                    )}
                  </span>
                  {showStartTime && (
                    <TimeKeeper
                      time={startTime}
                      onChange={(newTime) => setStartTime(newTime.formatted12)}
                      onDoneClick={() => setShowStartTime(false)}
                      switchToMinuteOnHourSelect
                    />
                  )}
                </div>

                <div className="col-lg-6 col-md-12 col-12">
                  <span className="d-flex align-item:center coachesFormStart">
                    <h6 className=""> End Time</h6>
                    <h6 className="coachshowCurrent">{endTime}</h6>
                    {!showEndTime && (
                      <BsPlusCircleFill
                        id="coachFormstimebutton"
                        onClick={() => setShowEndTime(true)}
                      />
                    )}
                  </span>
                  {showEndTime && (
                    <TimeKeeper
                      time={endTime}
                      onChange={(newTime) => setEndTime(newTime.formatted12)}
                      onDoneClick={() => setShowEndTime(false)}
                      switchToMinuteOnHourSelect
                    />
                  )}
                </div>
              </div>
              <div className="row">
                {/* <div className="col-lg-12 col-md-12 col-12">
                  <h5>Price of Workshop</h5>
                  </div> */}
                  <div classname="col-lg-6 col-md-6 col-12">
                    <div className="eventForm_price">
                      <div class="coachesFormpriceBox ">
                        <input type="radio" name="check-substitution-2" />
                        <label className="coachesFormPaid">Free</label>
                      </div>
                      <div className="coachesFormpriceBox  freepaid">
                        <input type="radio" name="check-substitution-2" />
                        <label className="coachesFormPaid">Paid</label>
                      </div>
                    </div>
                  </div>
                  <div classname="col-lg-6 col-md-6 col-12 d-flex">
                  
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                />
                <label
                  className="form-check-label textsession CoachesFormDays"
                  for="flexRadioDefault2"
                >
                  By Hours
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault3"
                />
                <label
                  class="form-check-label textsession CoachesFormDays"
                  for="flexRadioDefault3"
                >
                  By Session
                </label>
              </div>
                     </div>

                     <div className="col-lg-12 col-md-6 col-12">
              <div class="coachesFormQuantityField">
                <div
                  // onClick={() => setPrice(parseInt(price) - 1)}
                  title="Azalt"
                  className="incBtn quatityButton"
                >
                  -
                </div>
                {/* <div class="number">0</div> */}
                <input
                  class="form-text-input "
                  type="number"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  className=" quatityButton"
                />
                <div title="Arrtır" className="incBtn">
                  +
                </div>
              
            </div>
                  
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className=" col-12 col-md-12 col-lg-10 coachesmodal_availableDays">
                <h5 style={{ paddingRight: "10px" }}> Available Days</h5>
                <div class="form-check ">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault4"
                    id="flexRadioDefault4"
                    checked={dayType === "days" ? true : false}
                    onChange={(e) => {
                      setDayType("days");
                      setTimeSlots([]);
                      setDays([]);
                    }}
                  />
                  <label
                    class="form-check-label"
                    for="flexRadioDefault4"
                    className="CoachesFormDays"
                  >
                    Days
                  </label>
                </div>
                <div class="form-check ">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault4"
                    id="flexRadioDefault5"
                    checked={dayType === "date" ? true : false}
                    onChange={(e) => {
                      setDayType("date");
                      setTimeSlots([]);
                      setDays([]);
                    }}
                  />
                  <label
                    class="form-check-label"
                    for="flexRadioDefault5"
                    className="CoachesFormDays"
                  >
                    Date
                  </label>
                </div>
              </div>
              <div className="col-8 col-md-8 col-lg-6 week_outbox">
                <div className="coachForm_weekdays">
                  <h5>Week</h5> <FaCalendarAlt id="calender_icon" />
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="flexRadiDefault7"
                    id="flexRadioDefault7"
                  />
                  <label
                    class="form-check-label"
                    for="flexRadioDefault7"
                    className="CoachesFormDays"
                  >
                    Repeated
                  </label>
                </div>
              </div>

              <div className="eventForm_weekDays col-lg-10 col-md-12 col-12">
                {dayType === "days" ? (
                  updateWeekDays ? (
                    <Week_days timeSlots={days} addTimeSlot={addDaySlot} />
                  ) : (
                    <Week_days timeSlots={days} addTimeSlot={addDaySlot} />
                  )
                ) : (
                  <Month_days timeSlots={timeSlots} addTimeSlot={addTimeSlot} />
                )}
              </div>
            </div>
          </div>

         
        </div>
        <div className="row">
          <div className="col-lg-6"></div>
          <div className="col-lg-3 col-md-3 col-12">
            <button className="coachesFormSubmit">Submit</button>
          </div>
          <div className="col-lg-3 col-md-3 col-12">
            <button
              className="coachesFormSubmit"
              onClick={() => setCoachesPreview(true)}
            >
              Preview
            </button>
          </div>

          {/* <div className="row">
          <h1>{currentTime}</h1>
          <h1>{currentTimeM}</h1>
        </div> */}
        </div>
      </div>
      <CoachesPreview
        show={coachesPreview}
        onHide={() => setCoachesPreview(false)}/>
      
      <Footer />
    </>
  );
};

export default CoachesForm;
