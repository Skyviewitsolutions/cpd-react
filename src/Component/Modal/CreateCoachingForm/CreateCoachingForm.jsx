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
import { getDomainList, getIndustryList } from "../../../utils/api";
import CustomCalendar from "../../Calendar/CustomCalendar";


const CreateCoachingForm = (props) => {

  const {showCoachingsForm , setShowCoachingsForm ,getCoachingList ,getMyCoachingsList ,  setShowAllCoaching} = props;
  
  const token = localStorage.getItem("token");
  const [coachTitle, setCoachTitle] = useState("");
  const [sessionType, setSessionType] = useState("");
 
  const [price, setPrice] = useState(0);
  const [paid, setPaid] = useState(false);
  const [coachingImg, setCoachingImg] = useState(null);
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [allDomain, setAllDomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventsToBeShown , setEventsToBeShown] = useState([])
  const [showCalendar , setShowCalendar] = useState(false)

  // creating useState for slotsCreations ;

   const [selectedDays, setSelectedDays] = useState([]);
   const [daysFormat, setDaysFormat] = useState("weekly");
   const [isRepeated, setIsRepeated] = useState(false);
   const [dateSlot, setDateSlot] = useState([]);
   const [daysSlot, setDaysSlot] = useState([]);
   const [selectedDates, setSelectedDates] = useState([]);


  const handleCoachingImg = (e) => {
    const files = e.target.files[0];
    setCoachingImg(files);
  };

  useEffect(() =>{
   getIndustryList().then((res)=> {if(res.data.data) {var data = res.data.data; setAllIndustry(data)}}).catch((err) => {console.log(err)});
   getDomainList().then((res) => {if(res.data.data) {var data = res.data.data; setAllDomain(data)}}).catch((err) => {console.log(err)})
  },[])

  const handleConfirmSlots =  () => {
    if (coachTitle == "") {
      toast("Please fill the coaching title", { type: "warning" });
    } else if (!coachingImg) {
      toast("coaching image is required", { type: "warning" });
    } else if (!domain) {
      toast("please select coaching domain", { type: "warning" });
    } else if (!industry) {
      toast("please select coaching industry", { type: "warning" });
    } else if (!sessionType) {
      toast("please select session type", { type: "warning" });
    } else {
      // here we are writing the code for updating the data from here ;

      const url = endpoints.coaches.createCoaching;

      var availability_type = daysFormat == "weekly" ? 1 : 2;
      var payment_type = sessionType == "hourly" ? 1 : 2;
      var is_paid = paid == true ? 1 : 0;
      var is_repeated = isRepeated ? 1 : 0;

      var slots = {
        isRepeated: isRepeated,
        selectedDays: selectedDays,
        daysFormat: daysFormat,
        selectedDates: selectedDates,
        daysSlot: daysSlot,
        dateSlot: dateSlot,
        title: coachTitle,
      };

      const formData = new FormData();
      formData.append("title", coachTitle);
      formData.append("availability_type", availability_type);
      formData.append("payment_type", payment_type);
      formData.append("price", price);
      formData.append("is_paid", is_paid);
      formData.append("availability_slot", JSON.stringify(slots));
      formData.append("availability_timing",['12:00:00' , '01:00:00']);
      formData.append("is_repeated", is_repeated);
      formData.append("image", coachingImg);
      formData.append("domain", domain);
      formData.append("industry", industry);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      };

      setLoading(true);

      axios
        .post(url, formData, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            getCoachingList()
            getMyCoachingsList()
            setShowAllCoaching(true)
            toast("Coaching created successfully", { type: "success" });
          } else if (res.data.result == false) {
            toast(res?.data?.message, { type: "warning" });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error here");
        });
    }
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

            <CreateSlots selectedDays={selectedDays} setSelectedDays={setSelectedDays} daysFormat={daysFormat} setDaysForma={setDaysFormat} isRepeated={isRepeated} setIsRepeated={setIsRepeated} dateSlot={dateSlot} setDateSlot={setDateSlot} daysSlot={daysSlot} setDaysSlot={setDaysSlot} selectedDates={selectedDates} setSelectedDates={setSelectedDates} title={coachTitle} setEventsToBeShown={setEventsToBeShown} />

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
        <CustomCalendar showCalendar={showCalendar} setShowCalendar={setShowCalendar} eventsToBeShown={eventsToBeShown}/>
      </Modal>
    </>
  );
};

export default CreateCoachingForm;
