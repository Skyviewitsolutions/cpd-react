import React from "react";
import { useState } from "react";
import Week_days from "../DaySelection/Week_days";
import Month_days from "../DaySelection/Month_days";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "./createSlot.css";
import { useEffect } from "react";
import { getCalendarData } from "../../utils/calendar";
import { AiFillCloseCircle } from "react-icons/ai";
import showToast from "../CustomToast/CustomToast";


const CreateSlots = (props) => {

  const {
    selectedDays,
    setSelectedDays,
    daysFormat,
    setDaysFormat,
    isRepeated,
    setIsRepeated,
    dateSlot,
    setDateSlot,
    daysSlot,
    setDaysSlot,
    selectedDates,
    setSelectedDates,
    title,
    setEventsToBeShown,
  } = props;

  const [startDate, setStartDate] = useState(
    new Date()
      .toLocaleDateString()
      .replaceAll("/", "-")
      .split("-")
      .reverse()
      .join("-")
  );

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [clickedDay, setClickedDay] = useState("");
  const [clickedDate, setClickedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState([]);
  const [updateCalendar, setUpdateCalendar] = useState(false);

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

  const handleUpdateTime = () => {

    if (daysFormat == "weekly") {
      if (startTime == "") {
        showToast("please select start time", "warning");
      } else if (endTime == "") {
        showToast("please select end time", "warning");
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
        showToast("please select start time", "warning");
      } else if (endTime == "") {
        showToast("please select end time", "warning");
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

    setUpdateCalendar(!updateCalendar);
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

  const handleDaysFormat = (format) => {
    setDaysFormat(format);
    if (format === "weekly") {
      setSelectedDates([]);
      setDateSlot([]);
    } else if (format === "monthly") {
      setSelectedDays([]);
      setDaysSlot([]);
    }
  };

  const getCalendarDatas = async () => {
    // here we getting the data for the calendar;
    var dta = {
      isRepeated: isRepeated,
      selectedDays: selectedDays,
      daysFormat: daysFormat,
      selectedDates: selectedDates,
      daysSlot: daysSlot,
      dateSlot: dateSlot,
      title: title,
    };
    const calendarData = await getCalendarData(dta);
    setEventsToBeShown(calendarData);
  };

  useEffect(() => {
    getCalendarDatas();
  }, [updateCalendar, title, isRepeated]);

  // writing code for removing timeslot ;

  const removeTimeSlot = (index) => {
    const filterSlots = selectedTimeSlot.filter((item, ind) => {
      return ind !== index;
    });
    setSelectedTimeSlot(filterSlots);
    if (daysFormat === "weekly") {
      var index = daysSlot.findIndex((item) => item.day == clickedDay);
      var selectedData = daysSlot[index];

      var dta = {
        day: clickedDay,
        slots: filterSlots,
      };
      
      daysSlot[index] = dta;
    } else if (daysFormat === "monthly") {
      var index = dateSlot.findIndex((item) => item.date == clickedDate);
      var dta = {
        date: clickedDate,
        slots: filterSlots,
      };

      dateSlot[index] = dta;
    }
  };

  

  return (
    <>
      <div className="row">
        <div
          className="col-lg-2 col-md-3 col-6 d-flex align-items-center"
          style={{ width: "10%" }}
        >
          <input
            type="radio"
            id="weekly"
            checked={daysFormat == "weekly"}
            onChange={() => handleDaysFormat("weekly")}
          />
          <label htmlFor="weekly" style={{ marginBottom: "0px" }}>
            Weekly
          </label>
        </div>
        <div
          className="col-lg-2 col-md-3 col-6 d-flex align-items-center"
          style={{ width: "18%" }}
        >
          <input
            type="radio"
            id="monthly"
            checked={daysFormat == "monthly"}
            onChange={() => handleDaysFormat("monthly")}
          />
          <label htmlFor="monthly" style={{ marginBottom: "0px" }}>
            Monthly
          </label>
        </div>
        <div className="col-lg-2 col-md-3 col-6 d-flex align-items-center repeadtd">
          <input
            type="checkbox"
            name=""
            id="repeat"
            onChange={() => setIsRepeated(!isRepeated)}
            checked={isRepeated}
          />
          <label htmlFor="repead" style={{ marginBottom: "0px" }}>
            Repeated
          </label>
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

      <div className="row mb-3 mt-3 bookSlotCont">
        <div className="row">
          {selectedTimeSlot.length != 0 &&
            selectedTimeSlot.map((time, index) => {
              return (
                <>
                  <div
                    className="col-lg-3 col-md-4 col-6 position-relative"
                    key={index}
                  >
                    <div className="bookSlotTime">
                      {time.startTime} - {time.endTime}
                    </div>
                    <AiFillCloseCircle
                      className="cutOptions "
                      style={{ top: "-4px", right: "6px" }}
                      size={18}
                      color="red"
                      onClick={() => removeTimeSlot(index)}
                    />
                  </div>
                </>
              );
            })}
        </div>
      </div>

      {showTimePicker && (
        <div className="time_slots d-flex align-items-center timeSection">
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

      {/* {daysFormat === "monthly" && (
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
      )} */}
    </>
  );
};

export default CreateSlots;
