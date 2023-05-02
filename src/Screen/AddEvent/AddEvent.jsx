import React from "react";
import { useState, useEffect } from "react";
import Homepage_header from "../../Component/Header/Homepage_header";
import "./addEvent.css";
import { TagsInput } from "react-tag-input-component";
import { GrUpload } from "react-icons/gr";
import VedioIcons from "../../assets/Icons/vedioIcon.svg";
import { endpoints } from "../../Component/services/endpoints";
import axios from "axios";
import CreateSlots from "../../Component/Slots/CreateSlots";
import { ToastContainer , toast } from "react-toastify";
import Button from "../../Component/button/Button/Button";
import { useNavigate , useLocation } from "react-router-dom";
import showToast from "../../Component/CustomToast/CustomToast";


const AddEvent = () => {
  

  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionDesc, setSessionDes] = useState("");
  const [sessionTags, setSessionTags] = useState([]);
  const [update, setUpdate] = useState(false);
  const [eventImg, setEventImg] = useState("");
  const [eventImgFile, setEventImgFile] = useState(null);
  const [eventVideo, setEventVideo] = useState(null);
  const [eventVideoImg, setEventVideoImg] = useState("");
  const [eventDocs, setEventDocs] = useState(null);
  const [sessionType, setSessionType] = useState("");
  const [duration, setDuration] = useState("");
  const [maxStudents, setMaxStudents] = useState("");
  const [paid, setPaid] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [price, setPrice] = useState(false);
  const [communityOption, setCommunityOption] = useState([]);
  const [loading , setLoading] = useState(false);
  const [selectedEventId , setSelectedEventId] = useState("");
  const [priceType , setPriceType] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // creating useState for slotsCreations ;

  const [selectedDays, setSelectedDays] = useState([]);
  const [daysFormat, setDaysFormat] = useState("weekly");
  const [isRepeated, setIsRepeated] = useState(false);
  const [dateSlot, setDateSlot] = useState([]);
  const [daysSlot, setDaysSlot] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [eventsToBeShown, setEventsToBeShown] = useState([]);

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

  const handleCommunity = (e) => {
    var val = e.target.value;
    setCommunityName(val);
    var selectedCommunity = communityOption.filter((itm, ind) => {
      return itm.display_name == val;
    });
    selectedCommunity = selectedCommunity[0];
    setCommunityId(selectedCommunity._id);
  };

  useEffect(() => {
    const getCommunity = endpoints.community.getAllCommunity;
    axios
      .get(getCommunity)
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


  // write code for updating and submitting the events;

  const submit = () => {
    if (!sessionTitle) {
      showToast("session title is required",  "warning" );
    } else if (!sessionDesc) {
      showToast("session descrition is required",  "warning" );
    } else if (!sessionTags) {
      showToast("session tags is required",  "warning" );
    } else if (!sessionType) {
      showToast("session type is required",  "warning" );
    } else if (!duration) {
      showToast("session duration is required",  "warning" );
    } else if (!maxStudents) {
      showToast("max number of student is required",  "warning" );
    } else if (!eventImgFile) {
      showToast("Please upload image",  "warning" );
    } else if (!eventVideo) {
      showToast("please upload video",  "warning" );
    } else if (!communityId) {
      showToast("Community id is required",  "warning" );
    } else {
      const token = localStorage.getItem("token");

      var availability_type = daysFormat == "weekly" ? 1 : 2;
      var is_paid = paid == true ? 1 : 0;
      var is_repeated = isRepeated ? 1 : 0;
      var payment_type 
      if(sessionType === "online"){
        payment_type = 1
      }
      else if(sessionType === "offline"){
        payment_type = 2
      }
      else if(sessionType == "hybrid"){
        payment_type = 3
      }
      var price_type = priceType == "hourly" ? 1 : 2;

      var slots = {
        isRepeated: isRepeated,
        selectedDays: selectedDays,
        daysFormat: daysFormat,
        selectedDates: selectedDates,
        daysSlot: daysSlot,
        dateSlot: dateSlot,
        title: sessionTitle,
      };


      var data = new FormData();
      data.append("event_title", sessionTitle);
      data.append("event_description", sessionDesc);
      data.append("tags", sessionTags);
      data.append("session_type", sessionType);
      data.append("event_duration", duration);
      data.append("max_members", maxStudents);
      data.append("formFilePic", eventImgFile);
      data.append("formFileVid", eventVideo);
      data.append("formFileAttach", eventDocs);
      data.append("availability", availability_type);
      data.append("days", selectedDays);
      data.append("paid", is_paid);
      data.append("duration_payment", payment_type);
      data.append("price", price);
      data.append("timeslots", JSON.stringify(slots));
      data.append("price_type", price_type);
      data.append("availability_type", availability_type);
      data.append("community_id", communityId);
      data.append("is_repeated" , is_repeated);
      data.append("availibilityDate" ,selectedDays);
      data.append("sheduleDate" ,availability_type );
      data.append("sheduleTime" ,JSON.stringify(slots));
      data.append("availibilityDateTiming" ,duration);


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
            showToast("Event created sucessfully",  "success" );
            navigate("/myEvents")
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
    } else if (!duration) {
      showToast("session duration is required",  "warning" );
    } else if (!maxStudents) {
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
      var availability_type = daysFormat == "weekly" ? 1 : 2;
      var is_paid = paid == true ? 1 : 0;
      var is_repeated = isRepeated ? 1 : 0;
      var payment_type 
      if(sessionType === "online"){
        payment_type = 1
      }
      else if(sessionType === "offline"){
        payment_type = 2
      }
      else if(sessionType == "hybrid"){
        payment_type = 3
      }
      var price_type = priceType == "hourly" ? 1 : 2;

      var slots = {
        isRepeated: isRepeated,
        selectedDays: selectedDays,
        daysFormat: daysFormat,
        selectedDates: selectedDates,
        daysSlot: daysSlot,
        dateSlot: dateSlot,
        title: sessionTitle,
      };
     
      var data = new FormData();
      data.append("event_title", sessionTitle);
      data.append("event_description", sessionDesc);
      data.append("tags", sessionTags);
      data.append("session_type", sessionType);
      data.append("event_duration", duration);
      data.append("max_members", maxStudents);
      data.append("formFilePic", eventImgFile);
      data.append("formFileVid", eventVideo);
      data.append("formFileAttach", eventDocs);
      data.append("availability", availability_type);
      data.append("days", selectedDays);
      data.append("paid", is_paid);
      data.append("duration_payment", payment_type);
      data.append("price", price);
      data.append("timeslots", JSON.stringify(slots));
      data.append("price_type", price_type);
      data.append("availability_type", availability_type);
      data.append("community_id", communityId);
      data.append("is_repeated" , is_repeated);
      data.append("availibilityDate" ,selectedDays);
      data.append("sheduleDate" ,availability_type );
      data.append("sheduleTime" ,JSON.stringify(slots));
      data.append("availibilityDateTiming" ,duration);

      
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
            showToast("Event updated successfully",  "success" );
            navigate("/myEvents");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error here");
        });
    }
  };


  // This is the code for updating the events if we have selected the any events;

  const selectedEvents = location.state;

  const updateSelectedEvents = () => {
    setUpdate(true);
    setSessionTitle(selectedEvents?.event_title);
    setSessionDes(selectedEvents?.event_description);
  
    setSessionTags(selectedEvents?.tags);
    setSessionType(selectedEvents?.session_type);

    setDuration(selectedEvents?.event_duration);
    setMaxStudents(selectedEvents?.max_members);
    setSelectedEventId(selectedEvents?._id);

    var paid = selectedEvents?.paid;
    if (paid == 1) {
      setPaid(true);
    } else {
      setPaid(false);
    }

    setPrice(selectedEvents?.price);
    var priceType = selectedEvents?.price_type == 1 ? "hourly" : "sessional"
    setPriceType(priceType);

    var event_pic_url =
      selectedEvents?.image_path + selectedEvents?.event_photo;
    setEventImg(event_pic_url);
    const fileName = "eventPic.jpg";

    fetch(event_pic_url ).then(async (response) => {
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

    var isRepeated = selectedEvents?.is_repeated == 1 ? true : false
    setIsRepeated(isRepeated);

    var communityId = selectedEvents?.community_id;

    if (communityOption.length != 0) {
      setCommunityId(communityId);
      var selectedCommunity = communityOption.filter((itm, ind) => {
        return itm._id == communityId;
      });

      selectedCommunity = selectedCommunity[0];
      setCommunityName(selectedCommunity?.display_name);
    }

    var slots = JSON.parse(selectedEvents?.timeslots);

    setSelectedDays(slots?.selectedDays);
    setSelectedDates(slots?.selectedDates);
    setDaysSlot(slots?.daysSlot);
    setDateSlot(slots?.dateSlot);
    setDaysFormat(slots?.daysFormat);

  };

  useEffect(() => {
    if (selectedEvents) {
      updateSelectedEvents();
    }
  }, [communityOption]);


  return (
    <div className="addEventCont">
      <Homepage_header />
      <div className="row mb-2">
        <h5 className="addEvntTitle">Add Event</h5>
        <div className="eventForm d-flex">
          <div className="col-lg-6 col-md-12 col-12">
            <div className="inputBox">
              <label htmlFor="title">Session Title <span>Max (20 char)</span></label>
              <input
                type="text"
                placeholder="Enter title"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
                maxlength={21}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="title">
                Short Description With Domain and Industry Detail
                <span>Max (80 char)</span>
              </label>
              <textarea
                type="text"
                placeholder="Enter description"
                value={sessionDesc}
                onChange={(e) => setSessionDes(e.target.value)}
                maxlength={80}
              />
            </div>
            <div className="inputBox2">
              <label htmlFor="">Session Tags</label>
              <TagsInput
                classNames="tagsInput"
                value={sessionTags}
                onChange={setSessionTags}
                placeHolder="Enter tags"
              />
            </div>

            <div className="col-12 col-md-12 col-lg-12 eventSession">
              <h5> Session Type</h5>
              <div className=" col-12 col-md-12 col-lg-12 EventForm_Checkbox">
                <div class="form-check">
                  <input
                    class="form-check-input eventFormSessionType_checkbox "
                    type="radio"
                    value=""
                    name="sessionMode"
                    id="Online"
                    checked={sessionType === "online"}
                    onChange={(e) => setSessionType("online")}
                  />
                  <label
                    class="form-check-label eventFormSessionType_label"
                    htmlFor="Online"
                  >
                    Online
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input eventFormSessionType_checkbox"
                    type="radio"
                    value=""
                    name="sessionMode"
                    id="Offline"
                    checked={sessionType === "offline"}
                    onChange={(e) => setSessionType("offline")}
                  />
                  <label
                    class="form-check-label eventFormSessionType_label"
                    htmlFor="Offline"
                  >
                    Offline
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input eventFormSessionType_checkbox"
                    type="radio"
                    value=""
                    name="sessionMode"
                    id="Hybrid"
                    checked={sessionType === "hybrid"}
                    onChange={(e) => setSessionType("hybrid")}
                  />
                  <label
                    class="form-check-label eventFormSessionType_label"
                    htmlFor="Hybrid"
                  >
                    Both
                  </label>
                </div>
              </div>
            </div>
            <div className="inputBox">
              <label htmlFor="">Total Session Duration (in hours)</label>
              <input
                classNames=""
                value={duration}
                type="number"
                min={0}
                onChange={(e) => setDuration(e.target.value)}
                placeHolder="Enter duration"
              />
            </div>
            <div className="inputBox">
              <label htmlFor="">Maximum number of members</label>
              <input
                classNames=""
                value={maxStudents}
                onChange={(e) => setMaxStudents(e.target.value)}
                placeHolder="Enter number of students"
              />
            </div>

            <div className="eventForm_price mb-3">
              <div className="d-flex align-items-center">
                <div class="eventForm_paids">
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
                      !paid ? "btnPrimary" : "btnDefault"
                    } `}
                  >
                    Free
                  </label>
                </div>
                <div className="eventForm_paids ">
                  <input
                    type="radio"
                    id="a50"
                    name="check-substitution-2"
                    onClick={() => setPaid(true)}
                  />
                  <label
                    for="a50"
                    className={`btnfree ${
                      paid ? "btnPrimary" : "btnDefault"
                    } `}
                  >
                    Paid
                  </label>
                </div>
              </div>
              {paid && (
                <div className="d-flex align-items-center sessionType">
                  <div
                    class="form-check d-flex align-items-center"
                    style={{ marginLeft: "25px" }}
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      name="sessionType"
                      id="flexRadioDefault2"
                      checked={priceType == "hourly"}
                      onChange={() => setPriceType("hourly")}
                    />
                    <label
                      class="form-check-label  textsession"
                      for="flexRadioDefault2"
                      style={{ marginBottom: "0px" }}
                    >
                      Pay by Hours
                    </label>
                  </div>

                  <div
                    class="form-check d-flex align-items-center ml-3"
                    style={{ marginLeft: "25px" }}
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      name="sessionType"
                      id="flexRadioDefault3"
                      checked={priceType == "sessional"}
                      onChange={() => setPriceType("sessional")}
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
              <div class="inputBox">
                <label for="exampleInputPassword1">Price in (HKD)</label>
                <input
                  type="number"
                  class=""
                  placeholder="Enter here"
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="col-lg-6 col-md-12 col-12">
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
                        accept="image/x-png ,image/jpeg , image/jpg"
                      />
                      {(update || eventImg) && <img src={eventImg} alt="" />}
                    </div>
                  </div>
                  <div className="ImgUploadView">
                    <span>
                      <GrUpload className="upload_icon_Image" />
                    </span>
                    <span className="session_photo">
                      {update ? "Update Session Photo" : "Upload Session Photo"}
                    </span>
                  </div>
                </label>
                <label
                  className="col-12 col-md-12 col-lg-6"
                  htmlFor="uploadVideo"
                >
                  <div class="eventForm_dropzone">
                    <div className="studentEvent_files">
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
                      {update ? "Update Session Video" : "Upload Session Video"}
                    </span>
                  </div>
                </label>
              </div>
            </div>
            <div className="eventSlots" style={{ width: "150%" }}>
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
                title={sessionTitle}
                setEventsToBeShown={setEventsToBeShown}
              />
            </div>

            <div className="inputBox">
              <label htmlFor="">Select Community</label>
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
            <Button title={update ? "Update & Preview" : "Submit & Preview"} loading={loading} onClick={update ? UpdateEvent : submit}/>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEvent;
