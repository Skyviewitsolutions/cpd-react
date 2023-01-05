// Here we are creating calendar custom;

import React, { useState, useEffect } from "react";
import "./Calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import moment from "moment";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { Modal } from "react-bootstrap/";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import enUS from "date-fns/locale/en-US";
import {IoCloseSharp} from "react-icons/io5"

require("react-big-calendar/lib/css/react-big-calendar.css");


const CustomCalendar = (props) => {

  const {showCalendar , setShowCalendar} = props ;

  const locales = {
    "en-US": enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events = [
    {
      title: "Big Meeting",
      allDay: true,
      start: new Date(2022, 12, 0),
      end: new Date(2022, 12, 0),
    },
    {
      title: "Vacation",
      start: new Date(2022, 12, 7),
      end: new Date(2022, 12, 10),
    },
    {
      title: "Conference",
      start: new Date(2022, 12, 20),
      end: new Date(2022, 12, 23),
    },
  ];

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        break;
      }
    }

    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <Modal show={showCalendar} size="lg">
      <h1 className="calendarTitle">Calendar</h1>
      <div className="calendarCont">
        <div className="calendarTop">
          <input
            type="text"
            placeholder="Add Title"
            style={{ marginRight: "10px" }}
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <DatePicker
            placeholderText="Start Date"
            style={{ marginRight: "10px" }}
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
          />
          <DatePicker
            placeholderText="End Date"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
          />
          <div className="cldrBtn" onClick={handleAddEvent}>
            Add Event
          </div>
        </div>
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" , zIndex : -1 }}
        />

        <div className="cutOption" onClick={() => setShowCalendar(false)}>
        <IoCloseSharp />
        </div>
      </div>
    </Modal>
  );
};

export default CustomCalendar;
