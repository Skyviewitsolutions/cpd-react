export const getCalendarData = async (data) => {
  var {
    isRepeated,
    selectedDays,
    daysFormat,
    selectedDates,
    daysSlot,
    dateSlot,
    title,
  } = data;

  var endDate = "";

  var events = []; // here we are storing all the events;

  var allDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
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

  // get all days of the month ;

  const getDaysOfMonth = async (day) => {
    var d = new Date();
    var getTot = daysInMonth(d.getMonth(), d.getFullYear()); //Get total
    var date = [];
    for (var i = 1; i <= getTot; i++) {
      //looping through days in month ;
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

  if (daysFormat === "weekly") {

    if (isRepeated) {
        var dateArray = [];
      for (var i = 0; i < selectedDays.length; i++) {
        var daysNum = allDays.indexOf(selectedDays[i]);
        var dates = await getDaysOfMonth(daysNum);
        
        var slots = daysSlot[i];
        slots = slots.slots;
        slots.map((slot, index) => {
          dates.map((itm, ind) => {
            var date = itm.getDate() < 10 ? `0${itm.getDate()}` : itm.getDate();
            var month =
              itm.getMonth() + 1 < 10
                ? `0${itm.getMonth() + 1}`
                : itm.getDate() + 1;
            var year = itm.getFullYear();
            var startTime = time2[time.indexOf(slot.startTime)];
            var endTime = time2[time.indexOf(slot.endTime)];

            var startDte = `${year}-${month}-${date}T${startTime}`;
            var endDte = `${year}-${month}-${date}T${endTime}`;
            var evnt = {
              start: new Date(startDte),
              end: new Date(endDte),
              title: title,
            };
            events.push(evnt);
          });
        });
        dateArray.push(...dates);
      }
    } else {
      var dateArray = [];
      for (var i = 0; i < selectedDays.length; i++) {
        var daysNum = allDays.indexOf(selectedDays[i]);
        var dates = await getDaysOfMonth(daysNum);
        dates = dates[0];
        dateArray.push(dates);
      }

      dateArray.map((itm, i) => {
        var slots = daysSlot[i];
        slots = slots.slots;

        slots.map((slot, index) => {
          var date = itm.getDate() < 10 ? `0${itm.getDate()}` : itm.getDate();
          var month =
            itm.getMonth() + 1 < 10
              ? `0${itm.getMonth() + 1}`
              : itm.getDate() + 1;
          var year = itm.getFullYear();
          var startTime = time2[time.indexOf(slot.startTime)];
          var endTime = time2[time.indexOf(slot.endTime)];

          var startDte = `${year}-${month}-${date}T${startTime}`;
          var endDte = `${year}-${month}-${date}T${endTime}`;
          var evnt = {
            start: new Date(startDte),
            end: new Date(endDte),
            title: title,
          };
          events.push(evnt);
        });
      });
    }

    if (endDate) {
      var filteredDate = dateArray.filter((date, index) => {
        console.log(new Date(endDate).getTime(), "enddd");
        return date.getTime() < new Date(endDate).getTime();
      });
      dateArray = filteredDate;
    }
    
  } else if (daysFormat === "monthly") {
    var dateArray = [];

    if (isRepeated) {
      var allDates = [];
      var startMonth = new Date().getMonth();

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
        var count = 12 - startMonth;
        var date = await buildDates(dates[j], count);

        var slots = dateSlot[j];
        slots = slots.slots;
        console.log(slots , 'slots here')
        slots.map((slot, index) => {
          date.map((itm, ind) => {
            var date = itm.getDate() < 10 ? `0${itm.getDate()}` : itm.getDate();
            var month =
              itm.getMonth() + 1 < 10
                ? `0${itm.getMonth() + 1}`
                : itm.getMonth() + 1;
            var year = itm.getFullYear();
            var startTime = time2[time.indexOf(slot.startTime)];
            var endTime = time2[time.indexOf(slot.endTime)];

            var startDte = `${year}-${month}-${date}T${startTime}`;
            var endDte = `${year}-${month}-${date}T${endTime}`;
            var evnt = {
              start: new Date(startDte),
              end: new Date(endDte),
              title: title,
            };

            events.push(evnt);
          });
        });
      }
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
      
      for(var k = 0; k < allDates.length ; k++){
      var slots = dateSlot[k];
      slots = slots.slots;
      
      var itm = allDates[k]
      slots.map((slot, index) => {
        // allDates.map((itm, ind) => {
          var date = itm.getDate() < 10 ? `0${itm.getDate()}` : itm.getDate();
          var month =
            itm.getMonth() + 1 < 10
              ? `0${itm.getMonth() + 1}`
              : itm.getMonth() + 1;
          var year = itm.getFullYear();
          var startTime = time2[time.indexOf(slot.startTime)];
          var endTime = time2[time.indexOf(slot.endTime)];

          var startDte = `${year}-${month}-${date}T${startTime}`;
          var endDte = `${year}-${month}-${date}T${endTime}`;
          var evnt = {
            start: new Date(startDte),
            end: new Date(endDte),
            title: title,
          };

          events.push(evnt);
        // });
      });
    }
    }
  }
  return events;
};
