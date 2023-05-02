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
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getDomainList, getIndustryList } from "../../../utils/api";
import CustomCalendar from "../../Calendar/CustomCalendar";
import Loader from "../../Loader/Loader";
import showToast from "../../CustomToast/CustomToast";


const CreateCoachingForm = (props) => {
  
  const {
    showCoachingsForm,
    setShowCoachingsForm,
    getCoachingList,
    getMyCoachingsList,
    setShowAllCoaching,
    imagePath,
    setSelectedCoachingForUpdate,
    selectedCoachingForUpdate,
    setUpdateCoaching,
    updateCoaching,
  } = props;

  const token = localStorage.getItem("token");
  const [coachTitle, setCoachTitle] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [price, setPrice] = useState(0);
  const [paid, setPaid] = useState(false);
  const [coachingImg, setCoachingImg] = useState(null);
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [domainId, setDomainId] = useState("");
  const [allDomain, setAllDomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventsToBeShown, setEventsToBeShown] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedCoachingId, setSelectedCoachingId] = useState("");

  const [showDomainInputBox, setShowDomainInputBox] = useState(false);
  const [showIndustryInputBox, setShowIndustryBox] = useState(false);
  const [domainManualInput, setDomainManualInput] = useState("");
  const [industryManualInput, setIndustryManualInput] = useState("");

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

  const refreshAllInputField = () => {
    setPaid(false);
    setPrice(0);
    setCoachingImg(null);
    setIndustry("");
    setDomain("");
    setIndustryId("");
    setDomainId("");
    setEventsToBeShown([]);
    setDateSlot([]);
    setDaysSlot([]);
    setSelectedCoachingId("");
    setSelectedCoachingForUpdate({});
    setCoachTitle("");
    setDaysFormat("weekly");
    setSelectedDates([]);
    setSelectedDays([]);
    setDomainManualInput("");
    setIndustryManualInput("");
    setShowDomainInputBox(false);
    setShowIndustryBox(false);
    setSessionType("");
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
  }, []);

  const submitCoaching = () => {
    if (coachTitle == "") {
      showToast("Please fill the coaching title",  "warning" );
    } else if (!coachingImg) {
      showToast("coaching image is required",  "warning" );
    } else if (!domain) {
      showToast("please select coaching domain",  "warning" );
    } else if (!industry) {
      showToast("please select coaching industry",  "warning" );
    } else if (paid == true && !sessionType) {
      showToast("please select session type",  "warning" );
    } else {
      // here we are writing the code for updating the data from here ;

      const url = endpoints.coaches.createCoaching;

      var availability_type = daysFormat == "weekly" ? 1 : 2;
      var payment_type = sessionType == "hourly" ? 1 : 2;
      var is_paid = paid == true ? 1 : 0;
      var is_repeated = isRepeated ? 1 : 0;
      var availability_timing = ["12:00:00", "01:00:00"];

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
      formData.append("availability_timing", availability_timing);
      formData.append("is_repeated", is_repeated);
      formData.append("image", coachingImg);
      formData.append(
        "domain",
        showDomainInputBox ? domainManualInput : domainId
      );
      formData.append(
        "industry",
        showIndustryInputBox ? industryManualInput : industryId
      );

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      setLoading(true);

      axios
        .post(url, formData, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            // getCoachingList();
            getMyCoachingsList();
            setShowAllCoaching(false);
            setShowCoachingsForm(false);
            refreshAllInputField();
            setShowAllCoaching(false);
            showToast("Coaching created successfully", "success" );
          } else if (res.data.result == false) {
            showToast(res?.data?.message, "warning" );
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error here");
        });
    }
  };

  const updateCoachings = () => {
    if (coachTitle == "") {
      showToast("Please fill the coaching title", "warning" );
    } else if (!coachingImg) {
      showToast("coaching image is required", "warning" );
    } else if (!domain) {
      showToast("please select coaching domain", "warning" );
    } else if (!industry) {
      showToast("please select coaching industry", "warning" );
    } else if (paid == true && !sessionType) {
      showToast("please select session type", "warning" );
    } else {
      // here we are writing the code for updating the data from here ;

      const url = endpoints.coaches.updateCoaching;

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
      formData.append("availability_timing", ["12:00:00", "01:00:00"]);
      formData.append("is_repeated", is_repeated);
      formData.append("image", coachingImg);
      formData.append(
        "domain",
        showDomainInputBox ? domainManualInput : domainId
      );
      formData.append(
        "industry",
        showIndustryInputBox ? industryManualInput : industryId
      );
      formData.append("id", selectedCoachingId);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      setLoading(true);

      axios
        .post(url, formData, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            // getCoachingList();
            getMyCoachingsList();
            setShowAllCoaching(false);
            setShowCoachingsForm(false);
            refreshAllInputField();
            setShowAllCoaching(false);
            setUpdateCoaching(false);
            showToast("Coaching updated successfully",  "success" );
          } else if (res.data.result == false) {
            showToast(res?.data?.message,  "warning" );
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error here");
        });
    }
  };

  useEffect(() => {
    if (updateCoaching === true) {
      var dta = selectedCoachingForUpdate;
      var domainId = dta.domain?._id;

      var domainName = dta.domain?.title;

      setDomain(domainName);

      var industryId = dta.industry?._id;
      var industryName = dta.industry?.title;

      setIndustry(industryName);

      setDomainId(domainId);
      setIndustryId(industryId);
      setCoachTitle(dta.title);

      var repeated = dta.is_repeated == 0 ? false : true;
      var paid = dta.is_paid == 0 ? false : true;
      var sessionTyp = dta.payment_type == 1 ? "hourly" : "sessional";
      setSessionType(sessionTyp);
      setIsRepeated(repeated);
      setPrice(dta.price);
      setPaid(paid);
      setSelectedCoachingId(dta._id);

      var slots = JSON.parse(dta?.availability_slot);
      setSelectedDays(slots?.selectedDays);
      setSelectedDates(slots?.selectedDates);
      setDaysSlot(slots?.daysSlot);
      setDateSlot(slots?.dateSlot);
      setDaysFormat(slots?.daysFormat);

      var imageUrl = imagePath + "/" + dta.image;

      const fileName = "workshop.jpg";

      fetch(imageUrl).then(async (response) => {
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        const file = new File([blob], fileName, { contentType });
        setCoachingImg(file);
      });
    }
  }, [updateCoaching]);

  const handleDomainSelection = (val) => {
    if (val === "Others") {
      setShowDomainInputBox(true);
      setDomain(val);
    } else {
      setShowDomainInputBox(false);
      setDomain(val);
      var domanId = allDomain.find((itm, index) => {
        return itm.title === val;
      });

      domanId = domanId._id;
      setDomainId(domanId);
    }
  };

  const handleIndustrySelection = (val) => {
    if (val === "Others") {
      setShowIndustryBox(true);
      setIndustry(val);
    } else {
      setIndustry(val);
      setShowIndustryBox(false);
      var indstryId = allIndustry.find((itm, index) => {
        return itm.title === val;
      });
      indstryId = indstryId._id;
      setIndustryId(indstryId);
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
                  {coachingImg ? (
                    <>
                      <label htmlFor="takePhoto">Upload Img</label>
                      <h5 class="form-control" htmlFor="takePhone">
                        {coachingImg.name}
                      </h5>
                      <input
                        type="file"
                        class="form-control"
                        placeholder="Enter here"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => handleCoachingImg(e)}
                        id="takePhoto"
                        style={{ display: "none" }}
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor="takePhoto">Upload Img</label>
                      <input
                        type="file"
                        class="form-control"
                        placeholder="Enter here"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => handleCoachingImg(e)}
                        id="takePhoto"
                      />
                    </>
                  )}
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
                    onChange={(e) => handleDomainSelection(e.target.value)}
                  >
                    <option value="">Choose</option>
                    {allDomain.map((domain, index) => {
                      return (
                        <>
                          <option value={domain.title} key={index}>
                            {domain.title}
                          </option>
                        </>
                      );
                    })}
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              {showDomainInputBox && (
                <div className="col-12 col-md-6 col-lg-4 ">
                  <div class="form-group">
                    <label for="exampleInputPassword1">Others</label>
                    <input
                      type="text"
                      class="form-control field py-4 "
                      id=""
                      placeholder="Enter your domain "
                      value={domainManualInput}
                      onChange={(e) => setDomainManualInput(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="row mb-3">
              <div className="col-12 col-md-6 col-lg-4 ">
                <div class="form-group">
                  <label for="exampleInputPassword1">Industry</label>
                  <select
                    class="form-select end-year "
                    aria-label="Default select example"
                    value={industry}
                    required
                    onChange={(e) => handleIndustrySelection(e.target.value)}
                  >
                    <option>Choose</option>
                    {allIndustry.map((industry, index) => {
                      return (
                        <>
                          <option value={industry.title} key={index}>
                            {industry.title}
                          </option>
                        </>
                      );
                    })}
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              {showIndustryInputBox && (
                <div className="col-12 col-md-6 col-lg-4 ">
                  <div class="form-group">
                    <label for="exampleInputPassword1">Others</label>
                    <input
                      type="text"
                      class="form-control field py-4"
                      id=""
                      placeholder="Enter your industry"
                      value={industryManualInput}
                      onChange={(e) => setIndustryManualInput(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <CreateSlots
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
              daysFormat={daysFormat}
              setDaysFormat={setDaysFormat}
              isRepeated={isRepeated}
              setIsRepeated={setIsRepeated}
              dateSlot={dateSlot}
              setDateSlot={setDateSlot}
              daysSlot={daysSlot}
              setDaysSlot={setDaysSlot}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              title={coachTitle}
              setEventsToBeShown={setEventsToBeShown}
            />

            {/* <div
              className="caledarIcons clenderIcons2"
              onClick={() => setShowCalendar(true)}
            >
              <BsFillCalendarDateFill color="#2c6959" size={32} />
            </div> */}

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
              {paid && (
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
                      style={{ marginBottom: "0px" }}
                    >
                      Pay by Hours
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
                      style={{ marginBottom: "0px" }}
                    >
                      Pay by Session
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* here we aare adding payment div */}
            {paid && (
              <div className="col-lg-4 col-md-6 col-12 my-3 ">
                <div class="form-group">
                  <label for="exampleInputPassword1">Price in (HKD)</label>
                  <input
                    type="number"
                    class="form-control py-4"
                    placeholder="Enter here"
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="confirmBtn">
              <Button
                title={updateCoaching ? "Update Coaching" : "Create Coaching"}
                onClick={updateCoaching ? updateCoachings : submitCoaching}
                loading={loading}
              />
            </div>
          </div>
          <div
            className="coachingCutOptions"
            onClick={() => {
              setShowCoachingsForm(false);
              refreshAllInputField();
              setUpdateCoaching(false);
            }}
          >
            <IoIosCloseCircleOutline size={26} color="red" />
          </div>
        </div>
        <CustomCalendar
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          eventsToBeShown={eventsToBeShown}
        />
      </Modal>
    </>
  );
};

export default CreateCoachingForm;
