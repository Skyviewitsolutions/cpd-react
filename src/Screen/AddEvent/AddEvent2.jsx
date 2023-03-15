import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import zoom_logo from "../../assets/Images/zoom_logo.png";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrUpload } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import VedioIcons from "../../assets/Icons/vedioIcon.svg";
import filesIcons from "../../assets/Icons/Artboard80.svg";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import OwlCarousel from "react-owl-carousel";
import Spinner from "react-bootstrap/Spinner";
import { FiSearch } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineAttachFile } from "react-icons/md";
import $ from "jquery";
import Week_days from "../../Component/DaySelection/Week_days";
import Month_days from "../../Component/DaySelection/Month_days";
import "./addEvent.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { toast, ToastContainer } from "react-toastify";
import Homepage_header from "../../Component/Header/Homepage_header";
import axios from "axios";
import { endpoints } from "../../Component/services/endpoints";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import CreateSlots from "../../Component/Slots/CreateSlots";

const AddEvent = () => {
  const navigate = useNavigate("");
  const location = useLocation();

  // from here we writing code for adding the events part ;

  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionDesc, setSessionDesc] = useState("");
  const [sessionTags, setSessionTags] = useState([]);
  const [sessionType, setSessionType] = useState([]);
  const [sessionDuration, setSessionDuration] = useState("");
  const [maxStudent, setMaxStudent] = useState("");
  const [eventImg, setEventImg] = useState("");
  const [eventImgFile, setEventImgFile] = useState(null);
  const [eventVideo, setEventVideo] = useState(null);
  const [eventVideoImg, setEventVideoImg] = useState("");
  const [eventDocs, setEventDocs] = useState(null);
  const [dayType, setDayType] = useState("days");
  const [days, setDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [communityId, setCommunityId] = useState("");
  const [communityName, setCommunityName] = useState("");
  const [eventCommunityId, setEventCommunityId] = useState(null);
  const [communityOption, setCommunityOption] = useState([]);
  const [price, setPrice] = useState(0);
  const [paid, setPaid] = useState(false);
  const [updateWeekDays, setUpdateWeekDays] = useState(false);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");

  // This is the code for updating the events if we have selected the any events;

  const selectedEvents = location.state;

  const updateSelectedEvents = () => {
    setUpdate(true);
    setSessionTitle(selectedEvents?.event_title);
    setSessionDesc(selectedEvents?.event_description);
    var tags = selectedEvents?.tags;
    tags = tags.replaceAll('"', "");
    tags = tags.split(",");
    console.log(tags);
    setSessionTags(tags);

    setSessionDuration(selectedEvents?.duration_payment);
    setMaxStudent(selectedEvents?.max_members);
    setSessionType(selectedEvents?.event_type);
    setSelectedEventId(selectedEvents?._id);

    var paid = selectedEvents?.paid;
    if (paid == "true") {
      setPaid(true);
    } else if (paid == "false") {
      setPaid(false);
    }

    setPrice(selectedEvents?.price);

    var event_pic_url =
      selectedEvents?.image_path + selectedEvents?.event_photo;
    setEventImg(event_pic_url);
    const fileName = "eventPic.jpg";

    fetch(event_pic_url).then(async (response) => {
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      const file = new File([blob], fileName, { contentType });
      setEventImgFile(file);
    });

    var event_video_pic_url =
      selectedEvents?.video_path + selectedEvents?.event_video;

    setEventVideoImg(event_video_pic_url);

    const eventVideoFile = "eventVideo.jpg";

    fetch(event_video_pic_url).then(async (response) => {
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      const file = new File([blob], eventVideoFile, { contentType });
      setEventVideo(file);
    });

    var days = selectedEvents?.days;
    days = days.split(",");
    setDays(days);

    var communityId = selectedEvents?.community_id;

    if (communityOption.length != 0) {
      setCommunityId(communityId);
      var selectedCommunity = communityOption.filter((itm, ind) => {
        return itm._id == communityId;
      });

      selectedCommunity = selectedCommunity[0];
      setCommunityName(selectedCommunity?.display_name);
    }
  };

  useEffect(() => {
    if (selectedEvents) {
      updateSelectedEvents();
    }
  }, [communityOption]);

  const handleImgUpload = (e) => {
    const imgfiles = e.target.files[0];
    setEventImgFile(imgfiles);
    setEventImg(URL.createObjectURL(imgfiles));
  };

  const handleDocumentUpload = (e) => {
    const docfiles = e.target.files[0];
    setEventDocs(docfiles);
  };

  const handleVideoUpload = (e) => {
    const files = e.target.files[0];
    setEventVideo(files);
    setEventVideoImg(URL.createObjectURL(files));
  };

  const submit = () => {
    if (!sessionTitle) {
      showToast("session title is required",  "warning" );
    } else if (!sessionDesc) {
      showToast("session descrition is required",  "warning" );
    } else if (!sessionTags) {
      showToast("session tags is required",  "warning" );
    } else if (!sessionType) {
      showToast("session type is required",  "warning" );
    } else if (!sessionDuration) {
      showToast("session duration is required",  "warning" );
    } else if (!maxStudent) {
      showToast("max number of student is required",  "warning" );
    } else if (!eventImgFile) {
      showToast("Please upload image",  "warning" );
    } else if (!eventVideo) {
      showToast("please upload video",  "warning" );
    } else if (!communityId) {
      showToast("Community id is required",  "warning" );
    } else {
      const token = localStorage.getItem("token");
      var data = new FormData();
      data.append("event_title", sessionTitle);
      data.append("event_description", sessionDesc);
      data.append("tags", sessionTags);
      data.append("session_type", sessionType);
      data.append("event_duration", sessionDuration);
      data.append("max_members", maxStudent);
      data.append("event_photo", eventImgFile);
      data.append("event_video", eventVideo);
      data.append("attachment", eventDocs);
      data.append("availability", dayType);
      data.append("days", days);
      data.append("paid", paid);
      data.append("duration_payment", sessionDuration);
      data.append("price", price);
      data.append("timeslots", "12-1");
      data.append("price_type", sessionType);
      data.append("availability_type", 1);
      data.append("community_id", communityId);

      console.log("hello world");
      setLoading(true);

      var config = {
        method: "post",
        url: endpoints.events.addEvent,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };

      axios(config)
        .then(function (res) {
          setLoading(false);
          if (res.data.result) {
            showToast("Event created sucessfully", "success" );
            setTimeout(() => {
              navigate("/myEvents");
            }, 1000);
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const UpdateEvent = () => {
    const updateEventUrl = `${endpoints.events.updateEvent}${selectedEventId}`;

    if (!sessionTitle) {
      showToast("session title is required",  "warning" );
    } else if (!sessionDesc) {
      showToast("session descrition is required",  "warning" );
    } else if (!sessionTags) {
      showToast("session tags is required",  "warning" );
    } else if (!sessionType) {
      showToast("session type is required",  "warning" );
    } else if (!sessionDuration) {
      showToast("session duration is required",  "warning" );
    } else if (!maxStudent) {
      showToast("max number of student is required",  "warning" );
    } else if (!eventImgFile) {
      showToast("Please upload image",  "warning" );
    } else if (!eventVideo) {
      showToast("please upload video",  "warning" );
      // } else if (!eventDocs) {
      //   toast("event docs is required", { type: "warning" });
    } else if (!communityId) {
      showToast("Community id is required",  "warning" );
    } else {
      const token = localStorage.getItem("token");
      var data = new FormData();
      data.append("event_title", sessionTitle);
      data.append("event_description", sessionDesc);
      data.append("tags", sessionTags);
      data.append("event_type", sessionType);
      data.append("event_duration", sessionDuration);
      data.append("max_members", maxStudent);
      data.append("event_photo", eventImgFile);
      data.append("event_video", eventVideo);
      data.append("attachment", eventDocs);
      data.append("availability", dayType);
      data.append("days", days);
      data.append("paid", paid);
      data.append("duration_payment", sessionDuration);
      data.append("price", price);
      data.append("timeslots", "12-1");
      data.append("community_id", communityId);

      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      };

      axios
        .post(updateEventUrl, data, { headers: headers })
        .then((res) => {
          console.log(res);
          setLoading(false);
          if (res.data.result) {
            showToast("Events updated successfully",  "success" );
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error here");
        });
    }
  };

  useEffect(() => {
    const getCommunityIDurl = endpoints.community.getAllCommunity;
    axios
      .get(getCommunityIDurl)
      .then((res) => {
        if (res.data.result === true) {
          const val = res.data.data;
          setCommunityOption(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  }, []);

  const handelFree = (e) => {
    setPaid(false);
    setPrice(0);
  };

  const handleCommunity = (e) => {
    var val = e.target.value;
    setCommunityName(val);
    var selectedCommunity = communityOption.filter((itm, ind) => {
      return itm.display_name == val;
    });
    selectedCommunity = selectedCommunity[0];
    setCommunityId(selectedCommunity._id);
  };

  const [selectedDays, setSelectedDays] = useState([]);
  const [daysFormat, setDaysFormat] = useState("weekly");
  const [isRepeated, setIsRepeated] = useState(false);
  const [dateSlot, setDateSlot] = useState([]);
  const [daysSlot, setDaysSlot] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [eventsToBeShown, setEventsToBeShown] = useState([]);

  return (
    <>
      <Homepage_header />
      <div className="container">
        <h5 className="SpekerHedingEvent">
          Add Event <span></span>
        </h5>
        <Form className="eventform_outline">
          <div className="row p-1">
            <div className="col-12 col-md-12 col-lg-6 p-2">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <label
                    for="exampleInputEmail1"
                    className="eventForm_speakerLabel form-label"
                  >
                    Session Title
                  </label>
                  <input
                    type="text"
                    className="form-control addEvent_formInput"
                    aria-describedby="emailHelp"
                    value={sessionTitle}
                    onChange={(e) => setSessionTitle(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-12 col-lg-12 mt-3">
                  <label for="" className="eventForm_speakerLabel form-label">
                    Session Description With Domain and Industry Detail
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={sessionDesc}
                    onChange={(e) => setSessionDesc(e.target.value)}
                  ></textarea>
                </div>

                <div className="col-12 col-md-12 col-lg-12 mt-3 eventForm_speakerLabel">
                  <label
                    for="exampleInputEmail1"
                    className="Create_Event_label form-label"
                  >
                    Session Tags
                  </label>
                  <div class="form-group">
                    <TagsInput
                      value={sessionTags}
                      onChange={setSessionTags}
                      name="tags"
                      placeHolder="Enter Tags"
                    />
                    {/* <input
                      type="text"
                      className="form-control eventSession"
                      placeholder="Search"
                      value={sessionTags}
                      onChange={(e) => setSessionTags(e.target.value)}
                    /> */}
                  </div>
                  {/* 
                  <div className="col-12 col-md-12 col-lg-12 speaker_tags">
                    <span className="Event_Speaker_tags">
                      Communication <span className="tags_span">x</span>
                    </span>
                    <span className="Event_Speaker_tags">
                      Accounting <span className="tags_span">x</span>
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-6 p-4">
              <div className="col-12 col-md-12 col-lg-12">
                <div className="row">
                  <label
                    className="col-12 col-md-12 col-lg-6"
                    htmlFor="updatePhoto"
                  >
                    <div class="eventForm_dropzone">
                      <div className="studentEvent_files">
                        <br />
                        <input
                          type="file"
                          id="updatePhoto"
                          name="myFile"
                          placeholder="upload session photo"
                          class="eventForm_dropzone__input"
                          onChange={(e) => handleImgUpload(e)}
                        />
                        {(update || eventImg) && <img src={eventImg} alt="" />}
                      </div>
                    </div>
                    <div className="ImgUploadView">
                      <span>
                        <GrUpload className="upload_icon_Image" />
                      </span>
                      <span className="session_photo">
                        {update
                          ? "Update Session Photo"
                          : "Upload Session Photo"}
                      </span>
                    </div>
                  </label>
                  <label
                    className="col-12 col-md-12 col-lg-6"
                    htmlFor="uploadVideo"
                  >
                    <div class="eventForm_dropzone">
                      <div className="studentEvent_files">
                        {/* <h6> Session Promo Video</h6>   */}

                        <input
                          type="file"
                          id="uploadVideo"
                          name="myFile"
                          class="eventForm_dropzone__input"
                          // accept="video/mp4,video/x-m4v,video/*"
                          onChange={(e) => handleVideoUpload(e)}
                        />

                        {(update || eventVideoImg) && (
                          <img src={eventVideoImg} alt="eventVideoImg" />
                        )}
                      </div>
                    </div>

                    <div className="videoUploadView">
                      <span>
                        <img src={VedioIcons} className="vedioIcons" />
                      </span>
                      <span className="session_photo">
                        {update
                          ? "Update Session Video"
                          : "Upload Session Video"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12 eventForm_attachFile">
                  <div className="upload-btn-wrapper">
                    <button>
                      {" "}
                      <img src={filesIcons} className="filesIcons" /> Attach
                      File & Document
                    </button>
                    <input
                      type="file"
                      className="form-control"
                      name="myfile"
                      onChange={(e) => handleDocumentUpload(e)}
                    />
                  </div>
                </div>
                <span className="eventDocumentName">{eventDocs?.name}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 col-md-12 col-lg-6">
              <div className="col-12 col-md-12 col-lg-12">
                <h5> Session Type</h5>
                <div className=" col-12 col-md-12 col-lg-12 EventForm_Checkbox">
                  <div class="form-check">
                    <input
                      class="form-check-input eventFormSessionType_checkbox "
                      type="radio"
                      value=""
                      id="Online"
                      name="sessionMode"
                      checked={sessionType === "online"}
                      onChange={(e) => setSessionType("online")}
                    />
                    <label
                      class="form-check-label eventFormSessionType_label"
                      for="Online"
                    >
                      Online
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input eventFormSessionType_checkbox"
                      type="radio"
                      value=""
                      id="Offline"
                      name="sessionMode"
                      checked={sessionType === "offline"}
                      onChange={(e) => setSessionType("offline")}
                    />
                    <label
                      class="form-check-label eventFormSessionType_label"
                      for="Offline"
                    >
                      Offline
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input eventFormSessionType_checkbox"
                      type="radio"
                      value=""
                      id="Hybrid"
                      name="sessionMode"
                      checked={sessionType === "hybrid"}
                      onChange={(e) => setSessionType("hybrid")}
                    />
                    <label
                      class="form-check-label eventFormSessionType_label"
                      for="Hybrid"
                    >
                      Hybrid
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-12 col-lg-12 mt-3">
                <h5>Session Duration</h5>
                <input
                  type="text"
                  className="eventForm_timingInput text-center"
                  id="eventForm_session"
                  placeholder=" 1.00 Hr:Mm"
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-12 col-lg-12 mt-3">
                <h5>Maximum Number of Students</h5>
                <div className="eventForm_studentNumber">
                  <input
                    type="number"
                    className=" Event_formInput text-center"
                    id="eventFormMaxNumber"
                    placeholder="25"
                    value={maxStudent}
                    onChange={(e) => setMaxStudent(e.target.value)}
                  />
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      If Any
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-12 col-lg-6">
              {/* <div className=" col-12 col-md-12 col-lg-12 eventForm_availableDays">
                <h5 style={{ paddingRight: "10px" }}> Available Days</h5>
                <div class="form-check eventForm_daysDate">
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
                  <label class="form-check-label" for="flexRadioDefault4">
                    Days
                  </label>
                </div>
                <div class="form-check eventForm_daysDate">
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
                  <label class="form-check-label" for="flexRadioDefault5">
                    Date
                  </label>
                </div>
              </div>
              <div className="col-8 col-md-8 col-lg-6 week_outbox">
                <div className="eventForm_weekBox">
                  <h5>Week</h5> <FaCalendarAlt id="calender_icon" />
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="flexRadiDefault7"
                    id="flexRadioDefault7"
                  />
                  <label class="form-check-label" for="flexRadioDefault7">
                    Repeated
                  </label>
                </div>
              </div>

              <div className="eventForm_weekDays col-lg-9 col-md-10 col-11">
                {dayType === "days" ? (
                  updateWeekDays ? (
                    <Week_days timeSlots={days} addTimeSlot={addDaySlot} />
                  ) : (
                    <Week_days timeSlots={days} addTimeSlot={addDaySlot} />
                  )
                ) : (
                  <Month_days timeSlots={timeSlots} addTimeSlot={addTimeSlot} />
                )}
              </div> */}

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
                title={communityName}
                setEventsToBeShown={setEventsToBeShown}
              />

              <div class="form-group CommunityId">
                <label for="exampleInputPassword1">Choose Community</label>
                <select
                  class="form-select "
                  aria-label="Default select example"
                  value={communityName}
                  onChange={(e) => handleCommunity(e)}
                >
                  <option value="">Choose Community</option>
                  {communityOption.map((item, index) => {
                    return (
                      <>
                        <option value={item.display_name}>
                          {item.display_name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 col-md-10 col-lg-7">
              <h5>Price of Workshop</h5>
              <div className="eventForm_price">
                <div class="eventForm_paid">
                  <input
                    type="radio"
                    id="a25"
                    name="check-substitution-2"
                    onClick={(e) => handelFree(e)}
                  />
                  <label
                    for="a25"
                    className={`btnfree   ${
                      paid == true ? "btn-default" : "btn-primary"
                    }`}
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
                    class={`btnfree ${
                      paid == true ? "btn-primary" : "btn-default"
                    }`}
                  >
                    Paid
                  </label>
                </div>

                <div class="form-check" style={{ marginLeft: "25px" }}>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
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
                  />
                  <label
                    class="form-check-label textsession"
                    for="flexRadioDefault3"
                  >
                    By Session
                  </label>
                </div>

                <div class="quantity-field">
                  <div
                    onClick={() => setPrice(parseInt(price) - 1)}
                    title="Azalt"
                    className="incBtn"
                  >
                    -
                  </div>
                  {/* <div class="number">0</div> */}
                  <input
                    class="form-text-input"
                    type="number"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    className="priceInput"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <div
                    onClick={() => setPrice(parseInt(price) + 1)}
                    title="Arrtır"
                    className="incBtn"
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12 mt-4 text-center">
              <buttton
                className="btn  submit_eventFormButton"
                onClick={update ? UpdateEvent : submit}
              >
                {loading ? (
                  <Spinner
                    animation="border"
                    variant="light"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : update ? (
                  "Update & Preview"
                ) : (
                  "Submit & Preview"
                )}
              </buttton>
              <Spinner />
            </div>
          </div>
        </Form>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddEvent;
