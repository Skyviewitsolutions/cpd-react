import React from "react";
import "./StudentEvents.css";
import Search from "../../assets/Icons/Artboard40.svg";
import Team from "../../assets/Icons/Team.svg";
import VedioIcons from "../../assets/Icons/vedioIcon.svg";
import filesIcons from "../../assets/Icons/Artboard80.svg";
import zoom from "../../assets/Icons/zoom.svg";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import Logininput from "../Inputbox/Logininput";
import { HiOutlineMail } from "react-icons/hi";


const StudentEvents = ({eventDta}) => {

  document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });

    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }

      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }

  return (
    <>
      <div className="container-fluid">
        <h3 className="eventHeading">
          Organised Event <span className="stdntSpan">Student</span>
        </h3>
        <div className="studentEvents">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="studentEventDetails">
                <label className="StdntTitle">Title of Speaker/Workshop</label>
                <div class="StudentSeesion">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <button type="submit" class="searchEvent ">
                        <img src={Search} className="searchSession" />
                      </button>
                    </div>
                    <input
                      type="search"
                      placeholder="Student-Led Wharton MBA Overview Webinar"
                      aria-describedby="button-addon2"
                      class="form-control border-0"
                      readOnly={true}
                      // value={eventDta?.sessionTitle}
                    />
                  </div>
                </div>

                <h3 className="studnHeding">
                  Student-Led Wharton MBA Overview Webinar
                </h3>
                <div className="row mt-3">
                  <div className="col-12 col-md-12 col-lg-6">
                    <h5 className="created_name">
                      Created By :{" "}
                      <span style={{ color: " #2c6959" }}>James Adam</span>
                    </h5>
                  </div>
                  <div className="col-12 col-md-12 col-lg-6">
                    <h5 className="created_name">
                      Workshop :{" "}
                      <span>
                        {/* {eventDta?.sessionDuration
                          ? eventDta?.sessionDuration
                          : 0} */}
                       0 Hours
                      </span>
                    </h5>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 col-md-12 col-lg-1">
                    <h6 className="studentTags">Tags</h6>
                  </div>

                  <div className="col-12 col-md-12 col-lg-11 ">
                    <div className="Student_tag">
                      {eventDta && eventDta.sessionTags.map((itm, index) => {
                        return (
                          <>
                            <span className="eventFormStudent_tag">
                              {itm} <span className="tags_span"></span>
                            </span>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className=" col-12 col-md-12 col-lg-12 Create_Event_label">
                    <label for="exampleInputEmail1" class="form-label">
                      <h6 className="avilabilityMode">
                        Available Mode of Delivery
                      </h6>
                    </label>
                    <div className="CheckAvailibility">
                      <div className="form-check">
                        <input
                          className="form-check-input "
                          type="radio"
                          name="flexRadioDefault"
                        />
                        <label
                          className="form-check-label OnOff"
                          for="flexRadioDefault1"
                        >
                          Online
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input offline"
                          type="radio"
                          name="flexRadioDefault"
                        />
                        <label
                          className="form-check-label OffOn"
                          for="flexRadioDefault1"
                        >
                          {" "}
                          Offline
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="meadiaIntigration">
                    <div class="TeamMeadia">
                      <img src={Team} className="teamIcon" />

                      <input
                        class="form-check-input teamRadio"
                        type="radio"
                        name="option1"
                        value="something"
                      />
                    </div>
                    <div class="TeamMeadia2">
                      <img src={zoom} className="ZoomIcon" />

                      <input
                        class="form-check-input ZoomRadio"
                        type="radio"
                        name="option1"
                        value="something"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12 col-md-12 col-lg-12">
                    <label for="exampleInputEmail1" class="form-label PasteZoomLink">
                      Paste Zoom Invite Link Here
                    </label>
                    <div className="zoom_link_box">
                      <img src={zoom} alt="gdgg" className="zoom_link_icon" />
                      <input
                        type="text"
                        className="form-control modal_shadow zoomInputbox"
                        id="exampleInputEmail1 zoom_linkInput"
                        aria-describedby="emailHelp"
                        placeholder="Student-Led Wharton MBA overview Webinar"
                      />
                      <button className="clickLink">Copy Link</button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="fileDropsZone">
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div class="drop-zone picDrop">
                      <span class="drop-zone__prompt">
                        Upload session photo
                      </span>
                      <input
                        type="file"
                        name="myFile"
                        class="drop-zone__input"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div class="drop-zone vediodrop">
                      <span class="drop-zone__prompt">
                        Upload session vedio
                      </span>
                      <input
                        type="file"
                        name="myFile"
                        class="drop-zone__input"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="studentDocument">
                  <h6 className="StudentAtachfile">
                    Attached Files From Speakers
                  </h6>
                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12 mt-2 Create_Event_Atacth">
                      <h6>
                        session.ppt<span>(2mb)</span>
                        <RiDeleteBinLine className="eventForm_delete_icon" />
                      </h6>
                    </div>

                    <div className="col-lg-4 col-md-12 col-sm-12 mt-2 Create_Event_Atacth">
                      <h6 className="studentDocs">
                        session.docs <span>(2mb)</span>
                        <RiDeleteBinLine className="eventForm_delete_icon" />
                      </h6>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 mt-2 Create_Event_Atacth">
                      <h6 className="studentPDF">
                        session.pdf <span>(2mb)</span>
                        <RiDeleteBinLine className="eventForm_delete_icon" />
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="SessionTimesDetails">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <h6 className="studentDuration">
                        Duration :
                        <span
                          style={{
                            fontSize: "16px",
                            marginLeft: "10px",
                            fontWeight: "400",
                          }}
                        >
                          1 : 00 Hour
                        </span>
                      </h6>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <h6 className="MaxNoStdnt">
                        Max No Of Students :
                        <span
                          style={{
                            fontSize: "16px",
                            marginLeft: "10px",
                            fontWeight: "400",
                          }}
                        >
                          25
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="SusbScribe">
                <h6 className="sbscribeSession">Subscriptions :</h6>{" "}
                <h6
                  style={{
                    color: "#2c6959",
                    fontSize: "22px",
                    fontWeight: "700",
                    marginLeft: "5px",
                  }}
                >
                  {" "}
                  Paid
                </h6>
              </div>
              <div className="StudentMail">
                <h6 className="addMailsdnt">Add Email Id's</h6>
                <div class="inputWithIcon">
                  <input type="text" placeholder="Email" className="addmailtext"/>
                  <i class="StdnMailbox">
                    <HiOutlineMail />
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentEvents;
