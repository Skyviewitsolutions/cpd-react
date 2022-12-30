import React from "react";
// import "./AddEvent_Form_second.css";
import Form from "react-bootstrap/Form";
import {FaCalendarAlt} from 'react-icons/fa';
import {MdOutlineCancel} from 'react-icons/md';
import zoom_logo from "../../assets/Images/zoom_logo.png";
import { FiUpload } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import Btn from "../button/Btn";
import { MdAttachFile } from "react-icons/md";
import {GrUpload} from "react-icons/gr";


//import Sidenavbar from "../Component/navbar/Sidenavbar";
//import Domain_cards from "../Component/Cards/Domain_cards"

const AddEvent_Form_second = () => {
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
            <Form className="eventform_outline">
              <div className="row p-1">
                <div className="col-12 col-md-12 col-lg-6 p-2">
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-12 ">
                      <label
                        for="exampleInputEmail1"
                        className="Create_Event_label form-label"
                      >
                        <h6>Title of Speaker/Workshop</h6>
                      </label>
                      <input
                        type="email"
                        className="form-control Event_formInput"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Student-Led Wharton MBA overview Webinar"
                      />
                    </div>
                    <div className="col-12 col-md-12 col-lg-12 mt-2 cef_mainHeading">
                      <h5>Student-Led Wharton MBA overview Webinar</h5>
                    </div>
                    <div className="row mt-2">
                      <div className="col-12 col-md-12 col-lg-6  Create_Event_label">
                        <h6>
                          Created By : <span id="created_name">James Adam</span>
                        </h6>
                      </div>
                      <div className="col-12 col-md-12 col-lg-6 Create_Event_label">
                        <h6>
                          Workshop : <span>2Hours</span>
                        </h6>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-12 col-md-12 col-lg-2">
                        <h6>Tags</h6>
                      </div>
                      <div className="col-12 col-md-12 col-lg-5">
                        <button className="cef_tags_button">
                          {" "}
                          communication
                        </button>
                      </div>
                      <div className="col-12 col-md-12 col-lg-5">
                        <button className="cef_tags_button">Accounting</button>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-12 col-md-12 col-lg-12 Create_Event_label">
                        <label for="exampleInputEmail1" class="form-label">
                          <h6>Available Mode of Delivery</h6>
                        </label>
                      </div>
                      <div className="row">
                        <div class="form-check col-12 col-md-12  col-lg-6">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            Online
                          </label>
                        </div>

                        <div class="form-check col-12 col-md-12  col-lg-6">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Offline
                          </label>
                        </div>
                      </div>
                     
                      <div className="col-12 col-md-12 col-lg-12">
                        <label for="exampleInputEmail1" class="form-label">
                          Paste Zoom Invite Link Here
                        </label>
                        <div className="zoom_link">
                          <img
                            src={zoom_logo}
                            alt="gdgg"
                            className="zoom_link_img"
                          />
                          <input
                            type="text"
                            className="form-control modal_shadow zoomInputbox"
                            id="exampleInputEmail1 zoom_linkInput"
                            aria-describedby="emailHelp"
                            placeholder="Student-Led Wharton MBA overview Webinar"
                          />
                          <button>click Link</button>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-6 p-4">
                  <div className="col-12 col-md-12 col-lg-12">
                    <div className="row">
                       <div className="col-12 col-md-12 col-lg-6">
                         <div class="event_drop-zone">
<div className="studentEvent_files">
<GrUpload className="upload_icon_EventForm"/>
<h6>Upload Session Photo</h6>
<br/>
    <span class="event_drop-zone__prompt">Drag and drop to Browser to choose files</span>
    <input type="file" name="myFile" class="event_drop-zone__input"/>
</div>
  </div>
                      </div> 
                      <div className="col-12 col-md-12 col-lg-6">
                      <div class="event_drop-zone">
<div className="studentEvent_files">
<GrUpload className="upload_icon_EventForm"/>
<h6>Upload Session Photo</h6>
<br/>
    <span class="event_drop-zone__prompt">Drag and drop to Browser to choose files</span>
    <input type="file" name="myFile" class="event_drop-zone__input"/>
</div>
  </div>

  
                        
                      
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-12 mt-4 Create_Event_label">
                      <h6>Attached Files From Speakers</h6>
                    </div>
                    <div className="col-12 col-md-12 col-lg-12 session_uploadedEventForm">
                      <h6>
                        session.ppt<span>(2mb)</span>
                      </h6>
                      <h6>
                        session.ppt <span>(2mb)</span>
                      </h6>
                      <h6>
                        session.ppt <span>(2mb)</span>
                      </h6>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-12 col-md-12 col-lg-5 Create_Event_label ">
                      <h6>
                        Duration :<span id="created_name"> 1.00 Hour</span>
                      </h6>
                    </div>
                    <div className="col-12 col-md-12 col-lg-7 Create_Event_label">
                      <h6>
                        Maximum No of Students : <span>25</span>
                      </h6>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-12 col-lg-12">
                      <h5>
                        Subscription :{" "}
                        <span id="EventForm_subscriptionStatus"> Paid</span>
                      </h5>
                    </div>
                  </div>

                  <div className="col-12 col-md-12 col-lg-12">
                    <label
                      for="exampleInputEmail1"
                      className="Create_Event_label form-label"
                    >
                      <h6>Add Email Id's</h6>
                    </label>
                    <input
                      type="email"
                      className="form-control modal_shadow"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Email Here"
                    />
                  </div>
                </div>
              </div>
            </Form>
    </>
  );
};

export default AddEvent_Form_second;
