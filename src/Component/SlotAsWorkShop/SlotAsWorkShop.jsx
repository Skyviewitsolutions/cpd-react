import React, { useState } from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";


const SlotAsWorkShop = () => {

  const [selectedDays, setSelectedDays] = useState([]);
  const [daysFormat, setDaysFormat] = useState("weekly");
  const [isRepeated, setIsRepeated] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [eventsToBeShown, setEventsToBeShown] = useState([]);


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
    // if (allDays.length != 0 && daysFormat === "weekly") {
    //   toast("Please select start day", { type: "warning" });
    // } else if (startDate == "" && daysFormat === "monthly") {
    //   toast("Please select start date", { type: "warning" });
    // } else if (endDate == "" && daysFormat === "monthly") {
    //   toast("Please select end date", { type: "warning" });
    // } else if (startTime == "") {
    //   toast("please select start time", { type: "warning" });
    // } else if (endTime == "") {
    //   toast("Please select end time", { type: "warning" });
    // } else {
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

        var dates = await getDates(startDate, endDate);

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
        var allDates = await getDates(startDate, endDate);

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
        <h5 className="heading_second">Slot Availability As Workshop</h5>
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
          <h5
            onClick={() => handleSelectdDays("Sunday")}
            style={{
              background:
                selectedDays.indexOf("Sunday") != -1 ? "#2c6959" : "white",
              color: selectedDays.indexOf("Sunday") != -1 ? "white" : "grey",
            }}
          >
            S
          </h5>
          <h5
            onClick={() => handleSelectdDays("Monday")}
            style={{
              background:
                selectedDays.indexOf("Monday") != -1 ? "#2c6959" : "white",
              color: selectedDays.indexOf("Monday") != -1 ? "white" : "grey",
            }}
          >
            M
          </h5>
          <h5
            onClick={() => handleSelectdDays("Tuesday")}
            style={{
              background:
                selectedDays.indexOf("Tuesday") != -1 ? "#2c6959" : "white",
              color: selectedDays.indexOf("Tuesday") != -1 ? "white" : "grey",
            }}
          >
            T
          </h5>
          <h5
            onClick={() => handleSelectdDays("Wednesday")}
            style={{
              background:
                selectedDays.indexOf("Wednesday") != -1 ? "#2c6959" : "white",
              color: selectedDays.indexOf("Wednesday") != -1 ? "white" : "grey",
            }}
          >
            W
          </h5>
          <h5
            onClick={() => handleSelectdDays("Thursday")}
            style={{
              background:
                selectedDays.indexOf("Thursday") != -1 ? "#2c6959" : "white",
              color: selectedDays.indexOf("Thursday") != -1 ? "white" : "grey",
            }}
          >
            T
          </h5>
          <h5
            onClick={() => handleSelectdDays("Friday")}
            style={{
              background:
                selectedDays.indexOf("Friday") != -1 ? "#2c6959" : "white",
              color: selectedDays.indexOf("Friday") != -1 ? "white" : "grey",
            }}
          >
            F
          </h5>
          <h5
            onClick={() => handleSelectdDays("Saturday")}
            style={{
              background:
                selectedDays.indexOf("Saturday") != -1 ? "#2c6959" : "white",
              color: selectedDays.indexOf("Saturday") != -1 ? "white" : "grey",
            }}
          >
            S
          </h5>
        </div>
      )}

      {daysFormat === "monthly" && (
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
                  <option value={itm}>{itm}</option>
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

export default SlotAsWorkShop;
