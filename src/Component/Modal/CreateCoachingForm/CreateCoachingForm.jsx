import React, { useState, useEffect } from "react";
import SlotAsCoach from "../../Coaches/SlotAsCoach/SlotAsCoach";
import { Modal } from "react-bootstrap";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { endpoints } from "../../services/endpoints";
import Button from "../../button/Button/Button";
import CreateSlots from "../../Slots/CreateSlots";
import axios from "axios";
import "./createCoachingForm.css";
import {IoIosCloseCircleOutline} from "react-icons/io";

const CreateCoachingForm = (props) => {

  const {showCoachingsForm , setShowCoachingsForm} = props

  const { setShowCalendar, setEventsToBeShown } = props;
  const token = localStorage.getItem("token");
  const [coachTitle, setCoachTitle] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [daysFormat, setDaysFormat] = useState("weekly");
  const [sessionType, setSessionType] = useState("");
  const [isRepeated, setIsRepeated] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState(0);
  const [paid, setPaid] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [coachingImg, setCoachingImg] = useState(null);
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [allDomain, setAllDomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleConfirmSlots = () => {};

  const handleCoachingImg = (e) => {
    const files = e.target.files[0];
    setCoachingImg(files);
  };

  return (
    <>
      <Modal
        show={showCoachingsForm}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="formoutline_studentcv coachFormSt">
          <div style={{ width: "150%" }}>
            <div className="col-12">
              <div className="col-lg-4 col-md-6 col-12 ">
                <div class="form-group">
                  <label for="exampleInputPassword1">Title</label>
                  <input
                    type="text"
                    class="form-control field py-4 mb-3"
                    id=""
                    placeholder="Enter coaching title"
                    value={coachTitle}
                    onChange={(e) => setCoachTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 ">
                <div class="form-group">
                  <label htmlFor="takePhoto">Upload Img</label> <br />
                  <input
                    type="file"
                    class="form-control  py-4 mb-3 "
                    placeholder="Enter here"
                    required
                    onChange={(e) => handleCoachingImg(e)}
                    className="imgInput"
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
                    {allDomain.map((domain, index) => {
                      return (
                        <>
                          <option value={domain._id} key={index}>
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

            <div className="caledarIcons clenderIcons2" onClick={() => setShowCalendar(true)}>
              <BsFillCalendarDateFill color="#2c6959" size={32} />
            </div>

            <div className="eventForm_price">
              <div className="mt-3">
                <div class="eventForm_paid">
                  <input
                    type="radio"
                    id="a25"
                    name="check-substitution-2"
                    onClick={() => {
                      setPaid(false);
                      setPrice(0);
                    }}
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
                    className={`btnfree ${
                      paid ? "btn-primary" : "btn-default"
                    } `}
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
                    style={{marginBottom : "0px"}}
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
                    style={{marginBottom : "0px"}}
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
                title="Create Coaching"
                onClick={handleConfirmSlots}
                loading={loading}
              />

            </div>
          </div>
          <div className="coachingCutOptions" onClick={() => setShowCoachingsForm(false)}>
            <IoIosCloseCircleOutline size={26} color="red"/>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateCoachingForm;
