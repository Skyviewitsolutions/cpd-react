import React, { useEffect, useState } from "react";
import "./createWorkshopForm.css";
import CreateSlots from "../../Slots/CreateSlots";
import Button from "../../button/Button/Button";
import { toast, ToastContainer } from "react-toastify";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";


const CreateWorkshopForm = (props) => {
  const {
    setShowWorkshopForm,
    showWorkshopForm,
    showCalendar,
    setShowCalendar,
    eventsToBeShown,
    setEventsToBeShown,
  } = props;

  const [selectedDays, setSelectedDays] = useState([]);
  const [daysFormat, setDaysFormat] = useState("weekly");
  const [isRepeated, setIsRepeated] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState(
    new Date()
      .toLocaleDateString()
      .replaceAll("/", "-")
      .split("-")
      .reverse()
      .join("-")
  );
  const [endDate, setEndDate] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [workshopImg, setWorshopImg] = useState(null);
  const [maxNumber, setMaxNumber] = useState(0);
  const [workShopDuration, setWorkShopDuration] = useState(0);
  const [title, setTitle] = useState("");
  const [paid, setPaid] = useState(false);
  const [price, setPrice] = useState(0);
  const [sessionType, setSessionType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [allDomain, setAllDomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [loading, setLoading] = useState(false);

  var token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  var allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleworkshopImg = () => {};
  const handleConfirmSlots = () => {};

  return (
    <Modal
      show={showWorkshopForm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="formoutline_studentcv coachFormSt ">
        <div style={{ width: "150%" , paddingBottom : "20px" }}>
          <div className="row d-flex">
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Title</label>
                <input
                  type="text"
                  class="form-control field py-4 mb-3"
                  id=""
                  placeholder="Enter workshop title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Duration</label>
                <input
                  type="number"
                  class="form-control field py-4 mb-3"
                  id=""
                  value={workShopDuration}
                  onChange={(e) => setWorkShopDuration(e.target.value)}
                  placeholder="Enter workshop Duration in (hours)"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label htmlFor="takePhoto">Upload Img</label> <br />
                <input
                  type="file"
                  class="form-control  py-4 mb-3 "
                  placeholder="Enter here"
                  required
                  onChange={(e) => handleworkshopImg(e)}
                  className="imgInput"
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label>Max number of students</label>
                <input
                  type="number"
                  class="form-control field py-4 mb-3"
                  id=""
                  value={maxNumber}
                  onChange={(e) => setMaxNumber(e.target.value)}
                  placeholder="Enter max number of students"
                />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Domain</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  value={domain}
                  required
                  onChange={(e) => setDomain(e.target.value)}
                >
                  <option value="">Choose</option>
                  {allDomain.map((domain, ind) => {
                    return (
                      <>
                        <option value={domain._id} key={ind}>
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
                  value={industry}
                  required
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option>Choose</option>
                  {allIndustry.map((industry, index) => {
                    return (
                      <>
                        <option value={industry._id} key={index}>
                          {industry.title}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <CreateSlots />
          <div className="caledarIcons  clnderIcons" onClick={() => setShowCalendar(true)}>
            <BsFillCalendarDateFill color="#2c6959" size={32} />
          </div>
          {/* here adding the fees structure */}
          <div className="eventForm_price mt-3">
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
                  id="flexRadioDefault5"
                  checked={sessionType == "hourly"}
                  onChange={() => setSessionType("hourly")}
                />
                <label
                  class="form-check-label  textsession"
                  for="flexRadioDefault5"
                >
                  By Hours
                </label>
              </div>

              <div class="form-check" style={{ marginLeft: "25px" }}>
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault6"
                  checked={sessionType == "sessional"}
                  onChange={() => setSessionType("sessional")}
                />
                <label
                  class="form-check-label textsession"
                  for="flexRadioDefault6"
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="confirmBtn">
            <Button
              title="Create Workshop"
              onClick={handleConfirmSlots}
              loading={loading}
            />
          </div>
        </div>
        <div
          className="coachingCutOptions"
          onClick={() => setShowWorkshopForm(false)}
        >
          <IoIosCloseCircleOutline size={26} color="red" />
        </div>
      </div>
    </Modal>
  );
};

export default CreateWorkshopForm;
