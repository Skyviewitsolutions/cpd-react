// Here we are creating calendar custom;

import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import moment from "moment";
import format from "date-fns/format";
import "./Calendar.css";
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

  const {showCalendar , setShowCalendar , eventsToBeShown} = props ;

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

 const  events=[
    {
      end: new Date('2023-01-17T10:00:00.000Z'),
      start: new Date('2023-01-17T04:00:00.000Z'),
      title: 'Event 1'
    },
    {
      end: new Date('2023-01-18T01:30:00'), 
      start: new Date('2023-01-18T11:30:00'),
      title: 'Event 2'
    },
    {
      end: new Date('2023-01-17T06:00:00.000Z'),
      start: new Date('2023-01-17T04:00:00.000Z'),
      title: 'Event 3'
    },
    {
      end: new Date('2023-01-17T05:00:00.000Z'),
      start: new Date('2023-01-17T04:00:00.000Z'),
      title: 'Event 4'
    },
    {
      end: new Date('2023-01-17T05:30:00.000Z'),
      start: new Date('2023-01-17T04:30:00.000Z'),
      title: 'Event 5'
    },
    {
      end: new Date('2023-01-17T05:30:00.000Z'),
      start: new Date('2023-01-17T04:30:00.000Z'),
      title: 'Event 6'
    },
    {
      end: new Date('2023-01-17T05:00:00.000Z'),
      start: new Date('2023-01-17T04:00:00.000Z'),
      title: 'Event 7'
    },
    {
      end: new Date('2023-01-17T05:00:00.000Z'),
      start: new Date('2023-01-17T04:00:00.000Z'),
      title: 'Event 8'
    },
    {
      end: new Date('2023-01-17T05:00:00.000Z'),
      start: new Date('2023-01-17T04:00:00.000Z'),
      title: 'Event 9'
    },
    {
      end: new Date('2023-01-17T07:00:00.000Z'),
      start: new Date('2023-01-17T05:00:00.000Z'),
      title: 'Event 10'
    },
    {
      end: new Date('2023-01-17T07:30:00.000Z'),
      start: new Date('2023-01-17T06:30:00.000Z'),
      title: 'Event 11'
    },
    {
      end: new Date('2023-01-17T07:30:00.000Z'),
      start: new Date('2023-01-17T06:30:00.000Z'),
      title: 'Event 12'
    },
    {
      end: new Date('2023-01-17T07:30:00.000Z'),
      start: new Date('2023-01-17T06:30:00.000Z'),
      title: 'Event 13'
    },
    {
      end: new Date('2023-01-17T07:30:00.000Z'),
      start: new Date('2023-01-17T06:30:00.000Z'),
      title: 'Event 14'
    },
    {
      end: new Date('2023-01-17T02:30:00.000Z'),
      start: new Date('2023-01-17T01:00:00.000Z'),
      title: 'Event 15'
    },
    {
      end: new Date('2023-01-17T12:00:00.000Z'),
      start: new Date('2023-01-17T10:30:00.000Z'),
      title: 'Event 16'
    }
  ]

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

  const formats = {
    weekdayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture),
  }

  console.log(eventsToBeShown  ,"events To be Shown here");

  return (
    <Modal show={showCalendar} size="lg">
      <h1 className="calendarTitle">Calendar</h1>
      <div className="calendarCont">
        {/* <div className="calendarTop">
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
        </div> */}
        <Calendar
          localizer={localizer}
          events={eventsToBeShown}
          startAccessor="start"
          endAccessor="end"
          formats={formats}
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

// import React, { useState, useEffect } from "react";
// import FullCalendar from "@fullcalendar/react";
// import daygridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { Modal } from "react-bootstrap/";
// import { IoCloseSharp } from "react-icons/io5";
// import "./Calendar.css";

// const CustomCalendar = (props) => {
//   const [events, setEvents] = useState([]);
//   const { showCalendar, setShowCalendar } = props;

//   const handleSelect = (info) => {
//     const { start, end } = info;
//     const eventNamePrompt = prompt("Enter, event name");
//     if (eventNamePrompt) {
//       setEvents([
//         ...events,
//         {
//           start,
//           end,
//           title: eventNamePrompt,
//           id: 1,
//         },
//       ]);
//     }
//   };

//   const eventss = [
//     {
//       title: "Big Meeting",
//       allDay: true,
//       start: new Date(2022, 12, 10),
//       end: new Date(2022, 12, 15),
//     },
//     {
//       title: "Vacation",
//       start: new Date(2022, 12, 7),
//       end: new Date(2022, 12, 10),
//     },
//     {
//       title: "Conference",
//       start: new Date(2022, 12, 20),
//       end: new Date(2022, 12, 23),
//     },
//   ];

//   return (
//     <Modal show={showCalendar} size="lg">
//       <h2 className="calendarTitle text-align-center">Calendar</h2>
//       <div className="calendarCont p-4">
//         <FullCalendar
//           editable
//           selectable
//           events={eventss}
//           // select={handleSelect}
//           headerToolbar={{
//             start: "today prev next",
//             end: "dayGridMonth dayGridWeek dayGridDay",
//           }}
//           plugins={[daygridPlugin, interactionPlugin]}
//           views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
//         />
//         <div className="cutOption" onClick={() => setShowCalendar(false)}>
//           <IoCloseSharp />
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CustomCalendar;
