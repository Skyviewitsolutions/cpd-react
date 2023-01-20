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

const CoachesForm = () => {
  const [coachesPreview, setCoachesPreview] = useState(false);
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
  const [category, setCategory] = useState("");
  const [sessionType, setSessionType] = useState("");

  const [eventsToBeShown, setEventsToBeShown] = useState([]);

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

  // var allDays = [ "sun",
  // "mon",
  // "tue",
  // "wed",
  // "thr",
  // "fri",
  // "sat",]

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
    
    if (allDays.length != 0 && daysFormat === "weekly") {
      toast("Please select start day", { type: "warning" });
    } else if (startDate == "" && daysFormat === "monthly") {
      toast("Please select start date", { type: "warning" });
    } else if (endDate == "" && daysFormat === "monthly") {
      toast("Please select end date", { type: "warning" });
    } else if (startTime == "") {
      toast("please select start time", { type: "warning" });
    } else if (endTime == "") {
      toast("Please select end time", { type: "warning" });
    } else {
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
            {/* <div className="col-lg-4 col-md-6 col-12  ">
              <div class="form-group">
                <label for="exampleInputPassword1">Recommendation</label>
                <input
                  type="text"
                  class="form-control "
                  placeholder="Enter here"
                />
              </div>
            </div> */}
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Category</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Civil">Civil</option>
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
          <div className="col-lg-12 col-md-12 col-12">
            <h5 className="heading_second">Slot Availability</h5>
          </div>

          <div className="row">
            <div className="col-lg-2 col-md-3 col-6 d-flex align-items-center">
              <input
                type="radio"
                id="weekly"
                checked={daysFormat == "weekly"}
                onChange={() => setDaysFormat("weekly")}
              />
              <label htmlFor="weekly">Weekly</label>
            </div>
            <div className="col-lg-2 col-md-3 col-6 d-flex align-items-center">
              <input
                type="radio"
                id="monthly"
                checked={daysFormat == "monthly"}
                onChange={() => setDaysFormat("monthly")}
              />
              <label htmlFor="monthly">Monthly</label>
            </div>
            <div className="col-lg-2 col-md-3 col-6 d-flex align-items-center repeadtd">
              <input
                type="checkbox"
                name=""
                id="repeat"
                onChange={() => setIsRepeated(!isRepeated)}
                checked={isRepeated}
              />
              <label htmlFor="repead">Repeated</label>
            </div>
          </div>

          {daysFormat === "weekly" && (
            <div className="row week_days">
              <h5
                onClick={() => handleSelectdDays("Sunday")}
                style={{
                  background:
                    selectedDays.indexOf("Sunday") != -1 ? "#2c6959" : "white",
                  color:
                    selectedDays.indexOf("Sunday") != -1 ? "white" : "grey",
                }}
              >
                S
              </h5>
              <h5
                onClick={() => handleSelectdDays("Monday")}
                style={{
                  background:
                    selectedDays.indexOf("Monday") != -1 ? "#2c6959" : "white",
                  color:
                    selectedDays.indexOf("Monday") != -1 ? "white" : "grey",
                }}
              >
                M
              </h5>
              <h5
                onClick={() => handleSelectdDays("Tuesday")}
                style={{
                  background:
                    selectedDays.indexOf("Tuesday") != -1 ? "#2c6959" : "white",
                  color:
                    selectedDays.indexOf("Tuesday") != -1 ? "white" : "grey",
                }}
              >
                T
              </h5>
              <h5
                onClick={() => handleSelectdDays("Wednesday")}
                style={{
                  background:
                    selectedDays.indexOf("Wednesday") != -1
                      ? "#2c6959"
                      : "white",
                  color:
                    selectedDays.indexOf("Wednesday") != -1 ? "white" : "grey",
                }}
              >
                W
              </h5>
              <h5
                onClick={() => handleSelectdDays("Thursday")}
                style={{
                  background:
                    selectedDays.indexOf("Thursday") != -1
                      ? "#2c6959"
                      : "white",
                  color:
                    selectedDays.indexOf("Thursday") != -1 ? "white" : "grey",
                }}
              >
                T
              </h5>
              <h5
                onClick={() => handleSelectdDays("Friday")}
                style={{
                  background:
                    selectedDays.indexOf("Friday") != -1 ? "#2c6959" : "white",
                  color:
                    selectedDays.indexOf("Friday") != -1 ? "white" : "grey",
                }}
              >
                F
              </h5>
              <h5
                onClick={() => handleSelectdDays("Saturday")}
                style={{
                  background:
                    selectedDays.indexOf("Saturday") != -1
                      ? "#2c6959"
                      : "white",
                  color:
                    selectedDays.indexOf("Saturday") != -1 ? "white" : "grey",
                }}
              >
                S
              </h5>
            </div>
          )}

          {daysFormat === "monthly" && (
            <div className="month_calendar d-flex ">
              <div className="col-lg-2 col-md-3 col-6 ">
                <h6>Start Date</h6>
                <input
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                  value={startDate}
                />
              </div>
              <div className="col-lg-2 col-md-3 col-6 ">
                <h6>End Date</h6>
                <input
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                  value={endDate}
                />
              </div>
            </div>
          )}
          <div className="time_slots d-flex ">
            <div className="col-lg-2 col-md-3 col-6 ">
              <h6>Start Time</h6>
              <select
                name=""
                id=""
                onChange={(e) => setStartTime(e.target.value)}
              >
                {time.map((itm, ind) => {
                  return (
                    <>
                      <option value={itm}>{itm}</option>
                    </>
                  );
                })}
              </select>
            </div>
            <div className="col-lg-2 col-md-3 col-6 ">
              <h6>End Time</h6>
              <select
                name=""
                id=""
                onChange={(e) => setEndTime(e.target.value)}
              >
                {time.map((itm, ind) => {
                  return (
                    <>
                      <option value={itm}>{itm}</option>
                    </>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="caledarIcons" onClick={() => setShowCalendar(true)}>
            <BsFillCalendarDateFill color="#2c6959" size={32} />
          </div>

          <div className="confirmBtn">
            <button
              className={isConfirm ? "activeCnfBtn" : "inActiveCnfBtn"}
              onClick={handleConfirmSlots}
            >
              Confirm
            </button>
          </div>

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
