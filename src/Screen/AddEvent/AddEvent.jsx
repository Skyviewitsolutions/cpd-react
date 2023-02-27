import React from "react";
import { useState , useEffect } from "react";
import Homepage_header from "../../Component/Header/Homepage_header";
import "./addEvent.css";
import { TagsInput } from "react-tag-input-component";
import { GrUpload } from "react-icons/gr";
import VedioIcons from "../../assets/Icons/vedioIcon.svg";
import { endpoints } from "../../Component/services/endpoints";
import axios from "axios";
import CreateSlots from "../../Component/Slots/CreateSlots";

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
  const [communityName , setCommunityName] = useState("")
  const [communityId , setCommunityId] = useState("");
  const [price, setPrice] = useState(false);
  const [communityOption , setCommunityOption] = useState([])

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

  return (
    <div className="addEventCont">
      <Homepage_header />
      <div className="row mb-2">
        <h5 className="addEvntTitle">Add Event</h5>
        <div className="eventForm d-flex">
          <div className="col-lg-6 col-md-12 col-12">
            <div className="inputBox">
              <label htmlFor="title">Session Title</label>
              <input
                type="text"
                placeholder="Enter title"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="title">
                Session Description With Domain and Industry Detail
              </label>
              <textarea
                type="text"
                placeholder="Enter description"
                value={sessionDesc}
                onChange={(e) => setSessionDes(e.target.value)}
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
            <div className="inputBox">
              <label htmlFor="">Session Duration (in hours)</label>
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
              <label htmlFor="">Maximum number of students</label>
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
                      !paid ? "btn-primary" : "btn-default"
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
                      paid ? "btn-primary" : "btn-default"
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

                  <div
                    class="form-check d-flex align-items-center ml-3"
                    style={{ marginLeft: "25px" }}
                  >
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
              <div class="inputBox">
                <label for="exampleInputPassword1">Price in ($)</label>
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
            <div className="eventSlots" style={{width : "150%"}}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
