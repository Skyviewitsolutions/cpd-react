import React, { useState } from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";

const SlotAsCoach = (props) => {
  const { showCalendar, setShowCalendar, eventsToBeShown, setEventsToBeShown } =
    props;

  const [selectedDays, setSelectedDays] = useState([]);
  const [daysFormat, setDaysFormat] = useState("weekly");
  const [isRepeated, setIsRepeated] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState(
    new Date()
      .toLocaleDateString()
      .replaceAll("/", "-")
      .split("-")
      .reverse()
      .join("-")
  );
  const [endDate, setEndDate] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  var allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const time = [
    "01:00:00",
    "02:00:00",
    "03:00:00",
    "04:00:00",
    "05:00:00",
    "06:00:00",
    "07:00:00",
    "08:00:00",
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "12:00:00",
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
    "18:00:00",
    "19:00:00",
    "20:00:00",
    "21:00:00",
    "22:00:00",
    "23:00:00",
    "24:00:00",
  ];

  var allDates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const handleSelectdDays = (day) => {
    if (selectedDays.indexOf(day) == -1) {
      setSelectedDays((itm) => {
        return [...itm, day];
      });
    } else {
      var filterDays = selectedDays.filter((itm, ind) => {
        return itm != day;
      });
      setSelectedDays(filterDays);
    }
  };

  const handleSelectdDates = (date) => {
    if (selectedDates.indexOf(date) == -1) {
      setSelectedDates((itm) => {
        return [...itm, date];
      });
    } else {
      var filterDates = selectedDates.filter((itm, ind) => {
        return itm != date;
      });
      setSelectedDates(filterDates);
    }
  };

  var getDates = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  // get all days of the month ;

  const getDaysOfMonth = async (day) => {
    var d = new Date();
    var getTot = daysInMonth(d.getMonth(), d.getFullYear()); //Get total
    var date = [];
    for (var i = 1; i <= getTot; i++) {
      //looping through days in month
      var newDate = new Date(d.getFullYear(), d.getMonth(), i);
      if (newDate.getDay() == day) {
        date.push(newDate);
      }
    }

    function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }
    return date;
  };

  // get selected dates of thee year ;

  const buildDates = async (startDate, months) => {
    return Array.from(
      {
        length: months,
      },
      function (_, i) {
        var date = new Date(startDate.getTime());
        var mnth = date.getMonth();
        date.setMonth(mnth + i);
        if (date.getMonth() !== (mnth + i) % 12) {
          date.setDate(0);
        }
        return date;
      }
    );
  };

  const handleConfirmSlots = async () => {
    setIsConfirm(true);
    var events = [];

    if (daysFormat === "weekly") {
      var dateArray = [];
      if (isRepeated) {
        for (var i = 0; i < selectedDays.length; i++) {
          var daysNum = allDays.indexOf(selectedDays[i]);
          var dates = await getDaysOfMonth(daysNum);
          dateArray.push(...dates);
        }
      } else {
        for (var i = 0; i < selectedDays.length; i++) {
          var daysNum = allDays.indexOf(selectedDays[i]);
          var dates = await getDaysOfMonth(daysNum);
          dates = dates[0];
          dateArray.push(dates);
        }
      }

      if (endDate) {
        var filteredDate = dateArray.filter((date, index) => {
          console.log(new Date(endDate).getTime(), "enddd");
          return date.getTime() < new Date(endDate).getTime();
        });
        dateArray = filteredDate;
      }

      dateArray.map((itm) => {
        var date = itm.getDate() < 10 ? `0${itm.getDate()}` : itm.getDate();
        var month =
          itm.getMonth() + 1 < 10
            ? `0${itm.getMonth() + 1}`
            : itm.getDate() + 1;
        var year = itm.getFullYear();

        var startDte = `${year}-${month}-${date}T${startTime}`;
        var endDte = `${year}-${month}-${date}T${endTime}`;

        var evnt = {
          start: new Date(startDte),
          end: new Date(endDte),
          title: "Event 1",
        };

        events.push(evnt);
      });
      setEventsToBeShown(events);
    } else if (daysFormat === "monthly") {
      var dateArray = [];

      if (isRepeated) {
        var allDates = [];
        var startMonth = new Date(startDate).getMonth();

        // var dates = await getDates(startDate, endDate);

        var currentDate = new Date();
        var mm = currentDate.getMonth() + 1;
        var yyyy = currentDate.getFullYear();

        var dates = selectedDates.map((num, index) => {
          var numm = num.length < 2 ? `0${num}` : num;
          var createdDate = `${mm}/${numm}/${yyyy}`;
          var date = new Date(createdDate);
          return date;
        });

        for (var j = 0; j < dates.length; j++) {
          var count = 11 - startMonth;
          var date = await buildDates(dates[j], count);
          allDates.push(...date);
        }

        allDates.map((itm) => {
          var date = itm.getDate() < 10 ? `0${itm.getDate()}` : itm.getDate();
          var month =
            itm.getMonth() + 1 < 10
              ? `0${itm.getMonth() + 1}`
              : itm.getDate() + 1;
          var year = itm.getFullYear();
          var startDte = `${year}-${month}-${date}T${startTime}`;
          var endDte = `${year}-${month}-${date}T${endTime}`;

          var evnt = {
            start: new Date(startDte),
            end: new Date(endDte),
            title: "Event 1",
          };

          events.push(evnt);
        });
        setEventsToBeShown(events);
      } else {
        var currentDate = new Date();
        var mm = currentDate.getMonth() + 1;
        var yyyy = currentDate.getFullYear();

        var allDates = selectedDates.map((num, index) => {
          var numm = num.length < 2 ? `0${num}` : num;
          var createdDate = `${mm}/${numm}/${yyyy}`;
          var date = new Date(createdDate);
          return date;
        });

        allDates.map((itm) => {
          var date = itm.getDate() < 10 ? `0${itm.getDate()}` : itm.getDate();
          var month =
            itm.getMonth() + 1 < 10
              ? `0${itm.getMonth() + 1}`
              : itm.getDate() + 1;
          var year = itm.getFullYear();
          var startDte = `${year}-${month}-${date}T${startTime}`;
          var endDte = `${year}-${month}-${date}T${endTime}`;

          var evnt = {
            start: new Date(startDte),
            end: new Date(endDte),
            title: "Event 1",
          };

          events.push(evnt);
        });
        setEventsToBeShown(events);
      }
    }
  };

  return (
    <div className="formoutline_studentcv coachFormSt">
      <div className="col-lg-12 col-md-12 col-12">
        <h5 className="heading_second">Slot Availability as Coaching</h5>
      </div>
      <div className="col-lg-4 col-md-6 col-12 ">
        <div class="form-group">
          <label for="exampleInputPassword1">Title</label>
          <input
            type="text"
            class="form-control field py-4 mb-3"
            id=""
            placeholder="Enter here"
            // error="Please enter text"
           
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 col-md-3 col-6 d-flex align-items-center">
          <input
            type="radio"
            id="weekly"
            checked={daysFormat == "weekly"}
            onChange={() => setDaysFormat("weekly")}
          />
          <label htmlFor="weekly">Weekly</label>
        </div>
        <div className="col-lg-2 col-md-3 col-6 d-flex align-items-center">
          <input
            type="radio"
            id="monthly"
            checked={daysFormat == "monthly"}
            onChange={() => setDaysFormat("monthly")}
          />
          <label htmlFor="monthly">Monthly</label>
        </div>
        <div className="col-lg-2 col-md-3 col-6 d-flex align-items-center repeadtd">
          <input
            type="checkbox"
            name=""
            id="repeat"
            onChange={() => setIsRepeated(!isRepeated)}
            checked={isRepeated}
          />
          <label htmlFor="repead">Repeated</label>
        </div>
      </div>

      {daysFormat === "weekly" && (
        <div className="row week_days">
          {allDays.map((day, index) => {
            return (
              <>
                <h5
                  onClick={() => handleSelectdDays(day)}
                  key={index}
                  style={{
                    background:
                      selectedDays.indexOf(day) != -1 ? "#2c6959" : "white",
                    color: selectedDays.indexOf(day) != -1 ? "white" : "grey",
                  }}
                >
                  {day[0]}
                </h5>
              </>
            );
          })}
        </div>
      )}

      {daysFormat === "monthly" && (
        <div className="row week_days">
          {allDates.map((date, index) => {
            return (
              <>
                <h5
                  onClick={() => handleSelectdDates(date)}
                  style={{
                    background:
                      selectedDates.indexOf(date) != -1 ? "#2c6959" : "white",
                    color: selectedDates.indexOf(date) != -1 ? "white" : "grey",
                    marginBottom: "7px",
                  }}
                >
                  {date}
                </h5>
              </>
            );
          })}
        </div>
      )}

      {daysFormat === "weekly" && (
        <div className="month_calendar d-flex ">
          <div className="col-lg-2 col-md-3 col-6 ">
            <h6>Start Date</h6>
            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
            />
          </div>
          <div className="col-lg-2 col-md-3 col-6 ">
            <h6>End Date</h6>
            <input
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
            />
          </div>
        </div>
      )}

      <div className="time_slots d-flex ">
        <div className="col-lg-2 col-md-3 col-6 ">
          <h6>Start Time</h6>
          <select name="" id="" onChange={(e) => setStartTime(e.target.value)}>
            {time.map((itm, ind) => {
              return (
                <>
                  <option value={itm}>{itm}</option>
                </>
              );
            })}
          </select>
        </div>
        <div className="col-lg-2 col-md-3 col-6 ">
          <h6>End Time</h6>
          <select name="" id="" onChange={(e) => setEndTime(e.target.value)}>
            {time.map((itm, ind) => {
              return (
                <>
                  <option value={itm}>{itm}</option> nbm,.
                </>
              );
            })}
          </select>
        </div>
      </div>
      <div className="caledarIcons" onClick={() => setShowCalendar(true)}>
        <BsFillCalendarDateFill color="#2c6959" size={32} />
      </div>

      <div className="confirmBtn">
        <button
          className={isConfirm ? "activeCnfBtn" : "inActiveCnfBtn"}
          onClick={handleConfirmSlots}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SlotAsCoach;
