import React, { useEffect } from "react";
import "./AddEvent_Form_first.css";
import Form from "react-bootstrap/Form";
import zoom_logo from "../../assets/Images/zoom_logo.png";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrUpload } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import OwlCarousel from "react-owl-carousel";

//import '../../../node_modules/owl.carousel/dist/assests/owl.carousel.css';
//import '../../../../node_modules/owl.carousel/dist/assets/owl.carousel.css';
import { FiSearch } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineAttachFile } from "react-icons/md";

import $ from "jquery";
import Week_days from "../carousel/Week_days";
import Month_days from "../carousel/Month_days";

const AddEvent_Form_first = () => {
  /* file upload drag and drop */

  document
    .querySelectorAll(".eventForm_dropzone__input")
    .forEach((inputElement) => {
      const dropZoneElement = inputElement.closest(".eventForm_dropzone");

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
        dropZoneElement.classList.add("eventForm_dropzone--over");
      });

      ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
          dropZoneElement.classList.remove("eventForm_dropzone--over");
        });
      });

      dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
          inputElement.files = e.dataTransfer.files;
          updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("eventForm_dropzone--over");
      });
    });

  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(
      ".eventForm_dropzone__thumb"
    );

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".eventForm_dropzone__prompt")) {
      dropZoneElement.querySelector(".eventForm_dropzone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("eventForm_dropzone__thumb");
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

  /*  quantity increase and decrease*/
  function increaseValue(button, limit) {
    const numberInput = button.parentElement.querySelector(".number");
    var value = parseInt(numberInput.innerHTML, 10);
    if (isNaN(value)) value = 0;
    if (limit && value >= limit) return;
    numberInput.innerHTML = value + 1;
  }
  function decreaseValue(button) {
    const numberInput = button.parentElement.querySelector(".number");
    var value = parseInt(numberInput.innerHTML, 10);
    if (isNaN(value)) value = 0;
    if (value < 1) return;
    numberInput.innerHTML = value - 1;
  }

  return (
    <>
      <div className="container">
        <h5>
          Organised Form <span>Speaker</span>
        </h5>
        <Form className="eventform_outline">
          <div className="row p-1">
            <div className="col-12 col-md-12 col-lg-6 p-2">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12 ">
                  <label
                    for="exampleInputEmail1"
                    className="eventForm_speakerLabel form-label"
                  >
                    Session Title
                  </label>
                  <input
                    type="text"
                    className="form-control Event_formInput"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                  <label for="" className="eventForm_speakerLabel form-label">
                    Session Description With Domain and Industry Detail
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>

                <div className="col-12 col-md-12 col-lg-12 eventForm_speakerLabel">
                  <label
                    for="exampleInputEmail1"
                    className="Create_Event_label form-label"
                  >
                    Session Tags
                  </label>

                  <div class="form-group has-search">
                    <AiOutlineSearch className="form-control-feedback" />

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>

                  <div className="col-12 col-md-12 col-lg-12 speaker_tags">
                    <span className="Event_Speaker_tags">
                      Communication <span className="tags_span">x</span>
                    </span>
                    <span className="Event_Speaker_tags">
                      Accounting <span className="tags_span">x</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-6 p-4">
              <div className="col-12 col-md-12 col-lg-12">
                <div className="row">
                  <div className="col-12 col-md-12 col-lg-6">
                    <div class="eventForm_dropzone">
                      <div className="studentEvent_files">
                        <span class="eventForm_dropzone__prompt">
                          Drag and drop to Browser to choose files
                        </span>
                        {/* <GrUpload className="upload_icon_EventForm" />
                        <h6>Upload Session Photo</h6>
                        <br />  */}

                        <input
                          type="file"
                          name="myFile"
                          class="eventForm_dropzone__input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-6">
                    <div class="eventForm_dropzone">
                      <div className="studentEvent_files">
                        <span class="eventForm_dropzone__prompt">
                          Drag and drop to Browser to choose files
                        </span>

                        <input
                          type="file"
                          name="myFile"
                          class="eventForm_dropzone__input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12 eventForm_attachFile">
                <div className="upload-btn-wrapper">
                  <button>Upload a file</button>
                  <input type="file" className="form-control" name="myfile" />
                </div>
                </div>
                <div className="col-11 col-md-11 col-lg-12 session_uploadedEventForm">
                  <h6>
                    session.ppt<span>(2mb)</span>
                    <RiDeleteBinLine className="eventForm_delete_icon" />
                  </h6>
                  <h6>
                    session.ppt<span>(2mb)</span>
                    <RiDeleteBinLine className="eventForm_delete_icon" />
                  </h6>
                  <h6>
                    session.ppt<span>(2mb)</span>
                    <RiDeleteBinLine className="eventForm_delete_icon" />
                  </h6>
                </div>
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
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check-label eventFormSessionType_label"
                      for="flexCheckDefault"
                    >
                      Online
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input eventFormSessionType_checkbox"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check-label eventFormSessionType_label"
                      for="flexCheckDefault"
                    >
                      Offline
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input eventFormSessionType_checkbox"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check-label eventFormSessionType_label"
                      for="flexCheckDefault"
                    >
                      Hybrid
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-12 col-lg-12">
                <h5>Session Duration</h5>
                <input
                  type="text"
                  className="eventForm_timingInput text-center"
                  id="eventForm_session"
                  placeholder=" 1.00 Hr:Mm"
                />
              </div>
              <div className="col-12 col-md-12 col-lg-12">
                <h5>Maximum Number of Students</h5>
                <div className="eventForm_studentNumber">
                  <input
                    type="number"
                    className=" Event_formInput text-center"
                    id="eventFormMaxNumber"
                    placeholder="25"
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
              <div className=" col-12 col-md-12 col-lg-12 eventForm_availableDays">
                <h5 style={{ paddingRight: "10px" }}> Available Days</h5>
                <div class="form-check eventForm_daysDate">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Days
                  </label>
                </div>
                <div class="form-check eventForm_daysDate">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
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
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Repeated
                  </label>
                </div>
              </div>

              <div className="eventForm_weekDays col-lg-9 col-md-10 col-11">
                <Week_days />
                {/* <Month_days/> */}
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 col-md-10 col-lg-7">
              <h5>Price of Workshop</h5>
              <div className="eventForm_price">
                <div class="eventForm_paid ">
                  <input type="radio" id="a25" name="check-substitution-2" />
                  <label class="btn btn-default ">Free</label>
                </div>
                <div class="eventForm_paid">
                  <input type="radio" id="a50" name="check-substitution-2" />
                  <label class="btn btn-default">Paid</label>
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    By Hours
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    By Session
                  </label>
                </div>

                <div class="quantity-field">
                  <button
                    class="value-button decrease-button"
                    onclick="decreaseValue(this)"
                    title="Azalt"
                  >
                    -
                  </button>
                  <div class="number">0</div>
                  <button
                    class="value-button increase-button"
                    onclick="increaseValue(this, 5)"
                    title="Arrtır"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12 mt-4 text-center">
            
                  <buttton type="submit" className="btn  submit_eventFormButton"> Submit and Preview Resume</buttton>

                  

            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddEvent_Form_first;
