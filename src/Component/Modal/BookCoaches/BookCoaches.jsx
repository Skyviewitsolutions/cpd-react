import React, { useState } from "react";
import "./BookCoaches.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaCalendarAlt } from "react-icons/fa";
import dommy_person from "../../../assets/Images/dommy_person.jfif";
import Week_days from "../../../Component/DaySelection/Week_days";
// import Week_days from "../../Component/DaySelection/Week_days";
import Month_days from "../../../Component/DaySelection/Month_days";
// import dommy_person from "../../assets/Images/dommy_person.jfif";
import "../../../fonts/Inter-Bold.ttf";
import "../../../fonts/Inter-Regular.ttf";
import BookSlot from "../BookSlot/BookSlot";
import { BsPlusCircleFill } from "react-icons/bs";


const BookCoaches = (props) => {
  
  // const [modalShow, setModalShow] = React.useState(false);
  const { BookCoachesShow, setBookCoachesShow } = props;
  const [BookSlotShow, setBookSlotShow] = useState(false);
  const [dayType, setDayType] = useState("days");
  const [days, setDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [updateWeekDays, setUpdateWeekDays] = useState(false);

  const addTimeSlot = (val) => {
    let check = timeSlots.includes(val);
    if (check) {
      var checkIndex = timeSlots.indexOf(val);
      timeSlots.splice(checkIndex, 1);
      setTimeSlots(timeSlots);
    } else {
      timeSlots.push(val);
      setTimeSlots(timeSlots);
    }
    setUpdateWeekDays(!updateWeekDays);
  };

  const addDaySlot = (val) => {
    let check = days.includes(val);
    if (check) {
      var checkIndex = days.indexOf(val);
      days.splice(checkIndex, 1);
      setDays(days);
    } else {
      days.push(val);
      setDays(days);
    }
  };

  return (
    <>
      <div className="bookCoachesModal">
        <Modal
          show={BookCoachesShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
          </Modal.Header>
          <div className="BookModalBody">
            <Modal.Body>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="BookModalHeading">
                      <h4>Book Your Slot</h4>
                      <h6>See When Coaches Are Available And Book Slot Then</h6>
                    </div>
                  </div>

                  <div className="coachmodalleft">
                    <div className="col-lg-4 col-md-4 col-12 ">
                      <div class="bookCoachimg">
                        <img
                          src={dommy_person}
                          alt="#"
                          className="card__body-cover-image"
                        />
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-12 ">
                      <div className="bookCoachnameBox">
                        <h5>Professor Joy</h5>
                        <h6> Expertise</h6>
                        <p className="coachmodalp">
                          Executive Coach | Career Coach
                        </p>
                        <h6 className="details">Details</h6>
                        <p>
                          Certified professional teacher or coach assign they
                          develop your estimations of goals
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-12">
                  <div className=" col-12 col-md-12 col-lg-12 coachesmodal_availableDays">
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

                  <div className="eventForm_weekDays col-lg-12 col-md-12 col-12">
                    {dayType === "days" ? (
                      updateWeekDays ? (
                        <Week_days timeSlots={days} addTimeSlot={addDaySlot} />
                      ) : (
                        <Week_days timeSlots={days} addTimeSlot={addDaySlot} />
                      )
                    ) : (
                      <Month_days
                        timeSlots={timeSlots}
                        addTimeSlot={addTimeSlot}
                      />
                    )}
                  </div>

                  <Modal.Footer>
                    <Button
                      className="coachesmodalcloseButton"
                      onClick={props.onHide}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="coachesmodalBookButton"
                      onClick={() => {
                        setBookSlotShow(true);
                      }}
                    >
                      Book Slot
                    </Button>
                  </Modal.Footer>
                </div>

                <BookSlot
                  show={BookSlotShow}
                  onHide={() => setBookSlotShow(false)}
                />
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default BookCoaches;
