import React from "react";
import "./Month_days.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import OwlCarousel from "react-owl-carousel";
import $ from "jquery";
import { useState, useEffect } from "react";
import {AiFillCloseCircle} from "react-icons/ai";

const Month_days = ({ timeSlots, addTimeSlot , removeDate , clickedDate}) => {

  useEffect(() => {
    // sync the state to the input
    $(".month_image-checkbox").on("click", function (e) {
      $(this).toggleClass("month_image-checkbox-checked");
      var $checkbox = $(this).find('input[type="checkbox"]');
      $checkbox.prop("checked", !$checkbox.prop("checked"));

      e.preventDefault();
    });
  }, []);

  const [toggleDate, setToogleDate] = useState(false);

  const activeBar = {
    background: "#2c6959",
    color: "white",
    fontWeight: "700",
  };

  const inActiveBar = {
    background: "white",
    color: "#2c6959",
    fontWeight: "700",
  };

  const generateMonth = () => {
    
    let date = new Date();
    let from = new Date(date.getFullYear(), date.getMonth(), 1);
    let to = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let item = [];
    for (var day = from; day <= to; day.setDate(day.getDate() + 1)) {
      let dayName = day.getDate();
      item.push(
        <div class="nopad text-center">
          <label
            class={`month_image-checkbox `}
            style={(timeSlots.includes(dayName) || clickedDate == dayName) ? activeBar : inActiveBar}
            onClick={() => addTimeSlot(dayName)}
          >
            {day.getDate()}
            <input type="checkbox" value="" />
          </label>
          {timeSlots.includes(dayName) &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDate(dayName)}/>}
        </div>
      );
    }
    return item;
  };


  /* week days*/
  const Monthoptions = {
    margin: 3,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    // navText: ["Prev", "Next"],
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 3,
        margin: 10,
      },
      400: {
        items: 4,
        margin: 10,
      },
      600: {
        items: 6,
      },
      700: {
        items: 6,
      },
      1000: {
        items: 6,
      },
    },
  };

  useEffect(() =>{
    setToogleDate(!toggleDate)
  },[timeSlots , clickedDate]);


  

  return (
    <>
      <OwlCarousel
        className="owl-theme category eventForm_monthDays_carousel "
        id="category"
        items={1}
        loop
        margin={1}
        dots={false}
        {...Monthoptions}
        nav
      >
        {toggleDate ? generateMonth() : generateMonth()}
      </OwlCarousel>
    </>
  );
};

export default Month_days;
