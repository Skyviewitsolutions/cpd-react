import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { endpoints } from "../../services/endpoints";
import MyCoachingList from "../MyCoachingList/MyCoachingList";
import Button from "../../button/Button/Button";

const SlotAsCoach = (props) => {

  const { setShowCalendar, setEventsToBeShown } = props;
  const token = localStorage.getItem("token");
  const [coachTitle, setCoachTitle] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [daysFormat, setDaysFormat] = useState("weekly");
  const [sessionType, setSessionType] = useState("");
  const [isRepeated, setIsRepeated] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState(0);
  const [paid, setPaid] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [coachingImg, setCoachingImg] = useState(null);
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [allDomain, setAllDomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const headers = {
    Authorization: `Bearer ${token}`,
  };

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

  const updateDataToCalendar = async () => {

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
          title: coachTitle,
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
            title: coachTitle,
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
            title: coachTitle,
          };

          events.push(evnt);
        });
        setEventsToBeShown(events);
      }
    }
  };

  const handleConfirmSlots = async () => {
    if (coachTitle == "") {
      toast("Please fill the coaching title", { type: "warning" });
    } else if (!coachingImg) {
      toast("coaching image is required", { type: "warning" });
    } else if (!domain) {
      toast("please select coaching domain", { type: "warning" });
    } else if (!industry) {
      toast("please select coaching industry", { type: "warning" });
    } else if (!sessionType) {
      toast("please select session type", { type: "warning" });
    } else {
      updateDataToCalendar();
      // here we are writing the code for updating the data from here ;

      const url = endpoints.coaches.createCoaching;

      var availability_type = daysFormat == "weekly" ? 1 : 2;
      var payment_type = sessionType == "hourly" ? 1 : 2;
      var is_paid = paid == true ? 1 : 0;
      var availability_timing = [startTime, endTime];
      var availability_slot = [startDate, endDate];
      var is_repeated = isRepeated ? 1 : 0;

      var slots = {
        days: selectedDays,
        dates: selectedDates,
        startDate: startDate,
        endDate: endDate,
        startTime,
        startTime,
        endTime: startTime,
      };

      const formData = new FormData();
      formData.append("title", coachTitle);
      formData.append("availability_type", availability_type);
      formData.append("payment_type", payment_type);
      formData.append("price", price);
      formData.append("is_paid", is_paid);
      formData.append("availability_slot", JSON.stringify(slots));
      formData.append("availability_timing", availability_timing);
      formData.append("is_repeated", is_repeated);
      formData.append("image", coachingImg);
      formData.append("domain", domain);
      formData.append("industry", industry);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      };

      setLoading(true);

      axios
        .post(url, formData, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            toast("Coaching created successfully", { type: "success" });
          } else if (res.data.result == false) {
            toast(res?.data?.message, { type: "warning" });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error here");
        });
    }
  };

  const handleCoachingImg = (e) => {
    const files = e.target.files[0];
    setCoachingImg(files);
  };

  const getAllIndustry = () => {
    const url = endpoints.master.allIndustry;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data;
          setAllIndustry(val);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllDomain = () => {
    const url = endpoints.master.allDomain;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data;
          setAllDomain(val);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllIndustry();
    getAllDomain();
  }, []);

  return (
    <div className="formoutline_studentcv coachFormSt">
      <div className="col-lg-12 col-md-12 col-12">
        <h5 className="heading_second d-flex justify-content-between">
          <h5>Slot Availability as Coaching</h5>{" "}
          <h2 onClick={() => setShowForm(!showForm)}>{showForm ? "-" : "+"}</h2>
        </h5>
      </div>

      {showForm && (
        <>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Title</label>
                <input
                  type="text"
                  class="form-control field py-4 mb-3"
                  id=""
                  placeholder="Enter coaching title"
                  // error="Please enter text"
                  value={coachTitle}
                  onChange={(e) => setCoachTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label htmlFor="takePhoto">Upload Img</label> <br />
                <input
                  type="file"
                  class="form-control  py-4 mb-3 "
                  placeholder="Enter here"
                  required
                  onChange={(e) => handleCoachingImg(e)}
                  className="imgInput"
                />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Domain</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  value={domain}
                  required
                  onChange={(e) => setDomain(e.target.value)}
                >
                  <option value="">Choose</option>
                  {allDomain.map((domain, index) => {
                    return (
                      <>
                        <option value={domain._id} key={index}>
                          {domain.title}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Industry</label>
                <select
                  class="form-select end-year "
                  aria-label="Default select example"
                  value={industry}
                  required
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option>Choose</option>
                  {allIndustry.map((industry, index) => {
                    return (
                      <>
                        <option value={industry._id} key={index}>
                          {industry.title}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
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
                        color:
                          selectedDays.indexOf(day) != -1 ? "white" : "grey",
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
                          selectedDates.indexOf(date) != -1
                            ? "#2c6959"
                            : "white",
                        color:
                          selectedDates.indexOf(date) != -1 ? "white" : "grey",
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
              <select
                name=""
                id=""
                onChange={(e) => setEndTime(e.target.value)}
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
          </div>
          <div className="caledarIcons" onClick={() => setShowCalendar(true)}>
            <BsFillCalendarDateFill color="#2c6959" size={32} />
          </div>

          <div className="eventForm_price">
            <div className="mt-3">
              <div class="eventForm_paid">
                <input
                  type="radio"
                  id="a25"
                  name="check-substitution-2"
                  onClick={() => {
                    setPaid(false);
                    setPrice(0);
                  }}
                />
                <label
                  for="a25"
                  className={`btnfree ${
                    !paid ? "btn-primary" : "btn-default"
                  } `}
                >
                  Free
                </label>
              </div>
              <div className="eventForm_paid freepaid">
                <input
                  type="radio"
                  id="a50"
                  name="check-substitution-2"
                  onClick={() => setPaid(true)}
                />
                <label
                  for="a50"
                  className={`btnfree ${paid ? "btn-primary" : "btn-default"} `}
                >
                  Paid
                </label>
              </div>
            </div>
            <div className="d-flex">
              <div class="form-check" style={{ marginLeft: "25px" }}>
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked={sessionType == "hourly"}
                  onChange={() => setSessionType("hourly")}
                />
                <label
                  class="form-check-label  textsession"
                  for="flexRadioDefault2"
                >
                  By Hours
                </label>
              </div>

              <div class="form-check" style={{ marginLeft: "25px" }}>
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault3"
                  checked={sessionType == "sessional"}
                  onChange={() => setSessionType("sessional")}
                />
                <label
                  class="form-check-label textsession"
                  for="flexRadioDefault3"
                >
                  By Session
                </label>
              </div>
            </div>
          </div>
          {/* here we aare adding payment div */}

          <div className="col-lg-4 col-md-6 col-12 my-3 ">
            <div class="form-group">
              <label for="exampleInputPassword1">Price in ($)</label>
              <input
                type="number"
                class="form-control py-4"
                placeholder="Enter here"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="confirmBtn">
            <Button title="Create Coaching" onClick={handleConfirmSlots} loading={loading}/>
          </div>
        </>
      )}
      <ToastContainer />
      <MyCoachingList />
    </div>
  );
};

export default SlotAsCoach;
