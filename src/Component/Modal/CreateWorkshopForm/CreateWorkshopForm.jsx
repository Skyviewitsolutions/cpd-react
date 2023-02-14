import React, { useEffect, useState } from "react";
import "./createWorkshopForm.css";
import CreateSlots from "../../Slots/CreateSlots";
import Button from "../../button/Button/Button";
import { toast, ToastContainer } from "react-toastify";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getDomainList, getIndustryList } from "../../../utils/api";
import CustomCalendar from "../../Calendar/CustomCalendar";
import axios from "axios";
import { endpoints } from "../../services/endpoints";


const CreateWorkshopForm = (props) => {

  const { setShowWorkshopForm, showWorkshopForm,getAllWorkshop ,getMyWorkshop , setShowAllWorkshop} = props;

  const [workshopImg, setWorshopImg] = useState(null);
  const [maxNumber, setMaxNumber] = useState(0);
  const [workShopDuration, setWorkShopDuration] = useState(0);
  const [title, setTitle] = useState("");
  const [paid, setPaid] = useState(false);
  const [price, setPrice] = useState(0);
  const [sessionType, setSessionType] = useState("");
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [allDomain, setAllDomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCalendar , setShowCalendar] = useState(false)
  const [eventsToBeShown , setEventsToBeShown] = useState([]);

  var token = localStorage.getItem("token");

// creating useState for slotsCreations ;

const [selectedDays, setSelectedDays] = useState([]);
const [daysFormat, setDaysFormat] = useState("weekly");
const [isRepeated, setIsRepeated] = useState(false);
const [dateSlot, setDateSlot] = useState([]);
const [daysSlot, setDaysSlot] = useState([]);
const [selectedDates, setSelectedDates] = useState([]);

  
  const handleworkshopImg = (e) => {
    const files = e.target.files[0]
    setWorshopImg(files);
  };

  useEffect(() =>{
    getIndustryList().then((res)=> {if(res.data.data) {var data = res.data.data; setAllIndustry(data)}}).catch((err) => {console.log(err)});
    getDomainList().then((res) => {if(res.data.data) {var data = res.data.data; setAllDomain(data)}}).catch((err) => {console.log(err)})
   },[])

   const handleConfirmSlots = async () => {

    if (!title) {
      toast("please fill the workshop title", { type: "warning" });
    } else if (!workShopDuration) {
      toast("workshop duration is required", { type: "warning" });
    } else if (!workshopImg) {
      toast("workshop image is required", { type: "warning" });
    } else if (!domain) {
      toast("please select workshop domain", { type: "warning" });
    } else if (!industry) {
      toast("please select workshop industry", { type: "warning" });
    } else if (!maxNumber) {
      toast("Max number of student is required", { type: "warning" });
    } else if (!sessionType) {
      toast("please select session type", { type: "warning" });
    } else {
      const url = endpoints.workshop.createWorkshop;

      var availability_type = daysFormat == "weekly" ? 1 : 2;
      var payment_type = sessionType == "hourly" ? 1 : 2;
      var is_paid = paid == true ? 1 : 0;
      var availability_timing = ['12:00:00' , '01:00:00'];

      var slots = {
        isRepeated: isRepeated,
        selectedDays: selectedDays,
        daysFormat: daysFormat,
        selectedDates: selectedDates,
        daysSlot: daysSlot,
        dateSlot: dateSlot,
        title: title,
      };

      const formData = new FormData();
      formData.append("title", title);
      formData.append("availability_type", availability_type);
      formData.append("payment_type", payment_type);
      formData.append("price", price);
      formData.append("is_paid", is_paid);
      formData.append("availability_slot", JSON.stringify(slots));
      formData.append("availability_timing", availability_timing);
      formData.append("is_repeated", 1);
      formData.append("max_members", maxNumber);
      formData.append("image", workshopImg);
      formData.append("domain", domain);
      formData.append("industry", industry);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      setLoading(true);
      axios
        .post(url, formData, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            getAllWorkshop()
            getMyWorkshop()
            setShowAllWorkshop(true)
            toast("workshop created successfully", { type: "success" });
          } else if (res.data.result == false) {
            toast(res.data.message, { type: "warning" });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error here");
        });
    }
  };


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

          <CreateSlots selectedDays={selectedDays} setSelectedDays={setSelectedDays} daysFormat={daysFormat} setDaysForma={setDaysFormat} isRepeated={isRepeated} setIsRepeated={setIsRepeated} dateSlot={dateSlot} setDateSlot={setDateSlot} daysSlot={daysSlot} setDaysSlot={setDaysSlot} selectedDates={selectedDates} setSelectedDates={setSelectedDates} title={title} setEventsToBeShown={setEventsToBeShown} />

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
      <CustomCalendar showCalendar={showCalendar} setShowCalendar={setShowCalendar} eventsToBeShown={eventsToBeShown}/>
    </Modal>
  );
};

export default CreateWorkshopForm;
