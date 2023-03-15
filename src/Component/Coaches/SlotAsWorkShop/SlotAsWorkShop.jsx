import axios from "axios";
import { duration } from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { setDefaultLocale } from "react-datepicker";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { RiNurseFill } from "react-icons/ri";
import { toast } from "react-toastify";
import "../../../Screen/Coaches_screen/CoachesForm.css";
import { endpoints } from "../../services/endpoints";
import Button from "../../button/Button/Button";
import CreateSlots from "../../Slots/CreateSlots";
import showToast from "../../CustomToast/CustomToast";

const SlotAsWorkShop = (props) => {

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
  const [workshopImg, setWorshopImg] = useState(null);
  const [maxNumber, setMaxNumber] = useState(0);
  const [workShopDuration, setWorkShopDuration] = useState(0);
  const [title, setTitle] = useState("");
  const [paid, setPaid] = useState(false);
  const [price, setPrice] = useState(0);
  const [sessionType, setSessionType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [allDomain, setAllDomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [loading, setLoading] = useState(false);

  var token = localStorage.getItem("token");

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

  const getDaysOfMonth = async (day, num) => {
    var d = new Date();
    var getTot = daysInMonth(d.getMonth() + num, d.getFullYear()); //Get total
    var date = [];
    for (var i = 1; i <= getTot; i++) {
      //looping through days in month
      var newDate = new Date(d.getFullYear(), d.getMonth() + num, i);
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
    var duration = workShopDuration;

    setIsConfirm(true);
    var events = [];

    var strtTime = startTime.slice(0, 2);
    var edTime = endTime.slice(0, 2);

    var hoursPerDay = edTime - strtTime;
    var totalDaysRequired = Math.ceil(duration / hoursPerDay);

    if (daysFormat === "weekly") {
      var dateArray = [];
      for (var i = 0; i < selectedDays.length; i++) {
        var daysNum = allDays.indexOf(selectedDays[i]);

        for (var j = 0; j < 3; j++) {
          var dates = await getDaysOfMonth(daysNum, j);
          dateArray.push(...dates);
        }
      }

      dateArray = dateArray.map((itm, index) => {
        var dta = itm.getTime();
        return dta;
      });
      dateArray.sort();
      dateArray = dateArray.map((itm, index) => {
        var dta = new Date(itm);
        return dta;
      });

      dateArray = dateArray.slice(0, totalDaysRequired);

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
          title: title,
        };

        events.push(evnt);
      });
      setEventsToBeShown(events);
    } else if (daysFormat === "monthly") {
      var dateArray = [];

      var allDates = [];
      var startMonth = new Date(startDate).getMonth();

      var dates = await getDates(startDate, endDate);

      for (var j = 0; j < dates.length; j++) {
        var count = 11 - startMonth;
        var date = await buildDates(dates[j], count);
        allDates.push(...date);
      }

      allDates = allDates.slice(0, totalDaysRequired);
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
          title: title,
        };

        events.push(evnt);
      });
      setEventsToBeShown(events);
    }
  };

  const handleConfirmSlots = async () => {
    updateDataToCalendar();

    if (!title) {
      showToast("please fill the workshop title",  "warning" );
    } else if (!workShopDuration) {
      showToast("workshop duration is required",  "warning" );
    } else if (!workshopImg) {
      showToast("workshop image is required",  "warning" );
    } else if (!domain) {
      showToast("please select workshop domain",  "warning" );
    } else if (!industry) {
      showToast("please select workshop industry",  "warning" );
    } else if (!maxNumber) {
      showToast("Max number of student is required",  "warning" );
    } else if (!sessionType) {
      showToast("please select session type",  "warning" );
    } else {
      const url = endpoints.workshop.createWorkshop;

      var availability_type = daysFormat == "weekly" ? 1 : 2;
      var payment_type = sessionType == "hourly" ? 1 : 2;
      var is_paid = paid == true ? 1 : 0;
      var availability_timing = [startTime, endTime];

      var slots = {
        days: selectedDays,
        dates: selectedDates,
        startDate: startDate,
        endDate: endDate,
        startTime,
        startTime,
        endTime: startTime,
        duration: duration,
      };

      const formData = new FormData();
      formData.append("title", title);
      formData.append("availability_type", availability_type);
      formData.append("payment_type", payment_type);
      formData.append("price", price);
      formData.append("is_paid", is_paid);
      formData.append("availability_slot", JSON.stringify(slots));
      formData.append("availability_timing", availability_timing);
      formData.append("is_repeated", 1);
      formData.append("max_members", maxNumber);
      formData.append("image", workshopImg);
      formData.append("domain", domain);
      formData.append("industry", industry);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      setLoading(true);
      axios
        .post(url, formData, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.result) {
            showToast("workshop created successfully",  "success" );
          } else if (res.data.result == false) {
            showToast(res.data.message,  "warning" );
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error here");
        });
    }
  };

  const handleworkshopImg = (e) => {
    var imgFiles = e.target.files[0];
    setWorshopImg(imgFiles);
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
          <h5> Slot Availability As Workshop</h5>
          <h2 onClick={() => setShowForm(!showForm)}>{showForm ? "-" : "+"}</h2>
        </h5>
      </div>

      {showForm && (
        <>
          <div className="row d-flex">
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Title</label>
                <input
                  type="text"
                  class="form-control field py-4 mb-3"
                  id=""
                  placeholder="Enter workshop title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label for="exampleInputPassword1">Duration</label>
                <input
                  type="number"
                  class="form-control field py-4 mb-3"
                  min={0}
                  id=""
                  value={workShopDuration}
                  onChange={(e) => setWorkShopDuration(e.target.value)}
                  placeholder="Enter workshop Duration in (hours)"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 ">
              <div class="form-group">
                <label htmlFor="takePhoto">Upload Img</label> <br />
                <input
                  type="file"
                  class="form-control  py-4 mb-3 "
                  placeholder="Enter here"
                  required
                  onChange={(e) => handleworkshopImg(e)}
                  className="imgInput"
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 ">
              <div class="form-group">
                <label>Max number of students</label>
                <input
                  type="number"
                  class="form-control field py-4 mb-3"
                  id=""
                  min={0}
                  value={maxNumber}
                  onChange={(e) => setMaxNumber(e.target.value)}
                  placeholder="Enter max number of students"
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
                  {allDomain.map((domain, ind) => {
                    return (
                      <>
                        <option value={domain._id} key={ind}>
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
          <CreateSlots />
          <div className="caledarIcons" onClick={() => setShowCalendar(true)}>
            <BsFillCalendarDateFill color="#2c6959" size={32} />
          </div>
          {/* here adding the fees structure */}
          <div className="eventForm_price mt-3">
            <div>
              <div class="eventForm_paid">
                <input
                  type="radio"
                  id="a25"
                  name="check-substitution-2"
                  onClick={() => setPaid(false)}
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
                  id="flexRadioDefault5"
                  checked={sessionType == "hourly"}
                  onChange={() => setSessionType("hourly")}
                />
                <label
                  class="form-check-label  textsession"
                  for="flexRadioDefault5"
                >
                  By Hours
                </label>
              </div>

              <div class="form-check" style={{ marginLeft: "25px" }}>
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault6"
                  checked={sessionType == "sessional"}
                  onChange={() => setSessionType("sessional")}
                />
                <label
                  class="form-check-label textsession"
                  for="flexRadioDefault6"
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
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="confirmBtn">
            <Button
              title="Create Workshop"
              onClick={handleConfirmSlots}
              loading={loading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SlotAsWorkShop;
