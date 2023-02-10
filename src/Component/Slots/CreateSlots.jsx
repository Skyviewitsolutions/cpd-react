import React from "react";
import { useState } from "react";
import Week_days from "../DaySelection/Week_days";
import Month_days from "../DaySelection/Month_days";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "./createSlot.css";
import { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const CreateSlots = () => {

  const [daysFormat, setDaysFormat] = useState("weekly");
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
  const [isRepeated, setIsRepeated] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [daysSlot, setDaysSlot] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [clickedDay, setClickedDay] = useState("");
  const [clickedDate, setClickedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState([]);
  const [dateSlot, setDateSlot] = useState([]);
  const [selectedDay2, setSelectedDays2] = useState([]);

  var allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const time2 = [
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

  const time = [
    "01:00 AM",
    "02:00 AM",
    "03:00 AM",
    "04:00 AM",
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 PM",
  ];

  var allDates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const handleUpdateTime = () => {
    if (daysFormat == "weekly") {
      if (startTime == "") {
        toast("please select start time", { type: "warning" });
      } else if (endTime == "") {
        toast("please select end time", { type: "warning" });
      } else {
        if (!selectedDays.includes(clickedDay)) {
          setSelectedDays((itm) => {
            return [...itm, clickedDay];
          });
        }

        var index = daysSlot.findIndex((item) => item.day == clickedDay);

        if (index != -1) {
          var selectedData = daysSlot[index];

          var dta = {
            day: clickedDay,
            slots: [
              ...selectedData?.slots,
              { startTime: startTime, endTime: endTime },
            ],
          };

          daysSlot[index] = dta;

          setSelectedTimeSlot([
            ...selectedData?.slots,
            { startTime: startTime, endTime: endTime },
          ]);
        } else {
          var dta = {
            day: clickedDay,
            slots: [{ startTime: startTime, endTime: endTime }],
          };
          setDaysSlot((item) => {
            return [...item, dta];
          });
          setSelectedTimeSlot([{ startTime: startTime, endTime: endTime }]);
        }
      }
    } else if (daysFormat === "monthly") {
      if (startTime == "") {
        toast("please select start time", { type: "warning" });
      } else if (endTime == "") {
        toast("please select end time", { type: "warning" });
      } else {
        if (!selectedDates.includes(clickedDate)) {
          setSelectedDates((itm) => {
            return [...itm, clickedDate];
          });
        }
        var index = dateSlot.findIndex((item) => item.date == clickedDate);

        if (index != -1) {
          var selectedData = dateSlot[index];

          var dta = {
            date: clickedDate,
            slots: [
              ...selectedData?.slots,
              { startTime: startTime, endTime: endTime },
            ],
          };

          dateSlot[index] = dta;

          setSelectedTimeSlot([
            ...selectedData?.slots,
            { startTime: startTime, endTime: endTime },
          ]);
        } else {
          var dta = {
            date: clickedDate,
            slots: [{ startTime: startTime, endTime: endTime }],
          };
          setDateSlot((item) => {
            return [...item, dta];
          });
          setSelectedTimeSlot([{ startTime: startTime, endTime: endTime }]);
        }
      }
    }
  };

  const addDays = (day) => {
    setClickedDay(day);
    setShowTimePicker(true);
    setSelectedTimeSlot([]);
  };

  const addDate = (date) => {
    setClickedDate(date);
    setShowTimePicker(true);
    setSelectedTimeSlot([]);
  };

  useEffect(() => {
    var clickedDays = daysSlot.find((itm) => {
      return itm.day == clickedDay;
    });
    if (clickedDays) {
      var slots = clickedDays.slots;
      setSelectedTimeSlot(slots);
    }
  }, [clickedDay]);

  useEffect(() => {
    var clickedDates = dateSlot.find((itm) => {
      return itm.date == clickedDate;
    });
    if (clickedDates) {
      var slots = clickedDates.slots;
      setSelectedTimeSlot(slots);
    }
  }, [clickedDate]);

  useEffect(() => {
    var data = daysSlot.filter((itm, index) => {
      return itm.day;
    });
    setSelectedDays2(data);
  }, [selectedDays]);

  const removeDay = (day) => {
    var filteredData = daysSlot.filter((itm, index) => {
      return itm.day != day;
    });
    setDaysSlot(filteredData);
    var filterSelectedDay = selectedDays.filter((itm, index) => {
      return itm != day;
    });
    setSelectedDays(filterSelectedDay);
    setSelectedTimeSlot([]);
  };

  const removeDate = (date) => {
    var filteredData = dateSlot.filter((itm, index) => {
      return itm.day != date;
    });
    setDateSlot(filteredData);
    var filterSelectedDay = selectedDates.filter((itm, index) => {
      return itm != date;
    });
    setSelectedDates(filterSelectedDay);
    setSelectedTimeSlot([]);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-2 col-md-3 col-6 d-flex align-items-center">
          <input
            type="radio"
            id="weekly"
            checked={daysFormat == "weekly"}
            onChange={() => setDaysFormat("weekly")}
          />
          <label htmlFor="weekly" style={{marginBottom : "0px"}}>Weekly</label>
        </div>
        <div className="col-lg-2 col-md-3 col-6 d-flex align-items-center">
          <input
            type="radio"
            id="monthly"
            checked={daysFormat == "monthly"}
            onChange={() => setDaysFormat("monthly")}
          />
          <label htmlFor="monthly" style={{marginBottom : "0px"}}>Monthly</label>
        </div>
        <div className="col-lg-2 col-md-3 col-6 d-flex align-items-center repeadtd">
          <input
            type="checkbox"
            name=""
            id="repeat"
            onChange={() => setIsRepeated(!isRepeated)}
            checked={isRepeated}
          />
          <label htmlFor="repead" style={{marginBottom : "0px"}}>Repeated</label>
        </div>
      </div>

      <div className="col-lg-5 col-md-8 col-12 mt-3">
        <div className="eventForm_weekDays col-lg-12 col-md-12 col-12">
          {daysFormat === "weekly" ? (
            <Week_days
              timeSlots={selectedDays}
              addTimeSlot={addDays}
              removeDay={removeDay}
              clickedDay={clickedDay}
            />
          ) : (
            <Month_days
              timeSlots={selectedDates}
              addTimeSlot={addDate}
              removeDate={removeDate}
              clickedDate={clickedDate}
            />
          )}
        </div>
      </div>

      <div className="row mb-3 mt-3">
        {selectedTimeSlot.length != 0 &&
          selectedTimeSlot.map((time, index) => {
            return (
              <>
                <div className="col-lg-2 col-md-3 col-6" key={index}>
                  <div className="bookSlotTime">
                    {time.startTime} - {time.endTime}
                  </div>
                </div>
              </>
            );
          })}
      </div>

      {showTimePicker && (
        <div className="time_slots d-flex align-items-center">
          <div className="col-lg-2 col-md-3 col-6 ">
            <h6>Start Time</h6>
            <select
              name=""
              id=""
              onChange={(e) => setStartTime(e.target.value)}
            >
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
          <div className="mt-3" onClick={handleUpdateTime}>
            <BsFillPlusCircleFill color="#2c6959" size={28} />
          </div>
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
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default CreateSlots;
