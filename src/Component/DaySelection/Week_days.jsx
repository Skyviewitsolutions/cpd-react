import "./Week_days.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import OwlCarousel from "react-owl-carousel";
import $ from "jquery";
import { useState, useEffect } from "react";
import {AiFillCloseCircle} from "react-icons/ai"


const Week_days = ({ timeSlots, addTimeSlot , removeDay , clickedDay}) => {

  useEffect(() => {
    // sync the state to the input
    $(".image-checkbox").on("click", function (e) {
      $(this).toggleClass("image-checkbox-checked");
      var $checkbox = $(this).find('input[type="checkbox"]');
      $checkbox.prop("checked", !$checkbox.prop("checked"));

      e.preventDefault();
    });
  }, []);

  const [toggleDays, setToggleDays ] = useState(false);

  /* week days*/
  const options = {
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
        items: 7,
      },
      700: {
        items: 7,
      },
      1000: {
        items: 7,
      },
    },
  };

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

  useEffect(() =>{
    setToggleDays(!toggleDays)
  },[timeSlots , clickedDay])


  return (
    <>
      {toggleDays ? (
        <OwlCarousel
          className="owl-theme category eventForm_weekDays_carousel "
          id="category"
          items={1}
          margin={1}
          dots={false}
          {...options}
          nav
        >
          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              style={(timeSlots.includes("monday") || clickedDay=="monday") ? activeBar : inActiveBar}
              onClick={() => addTimeSlot("monday")}
            >
              Mon
              <input type="checkbox" value="" />
            </label>
            {timeSlots.includes("monday") &&  <AiFillCloseCircle className="cutOptions" size={18} color="red"  onClick={() => removeDay("monday")}/>}
          </div>
          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              style={(timeSlots.includes("tuesday") || clickedDay=="tuesday")  ? activeBar : inActiveBar}
              onClick={() => addTimeSlot("tuesday")}
            >
              Tues
              <input type="checkbox" value="" />
            </label>
            {timeSlots.includes("tuesday") &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDay("tuesday")}/>}
          </div>
          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              style={(timeSlots.includes("wednesday") || clickedDay=="wednesday") ? activeBar : inActiveBar}
              onClick={() => addTimeSlot("wednesday")}
            >
              Wed
              <input type="checkbox" value="" />
            </label>
            {timeSlots.includes("wednesday") &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDay("wednesday")}/>}
          </div>
          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              style={(timeSlots.includes("thursday") || clickedDay=="thursday") ? activeBar : inActiveBar}
              onClick={() => addTimeSlot("thursday")}
            >
              Thur
              <input type="checkbox" value="" />
            </label>
            {timeSlots.includes("thursday") &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDay("thursday")}/>}
          </div>
          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              onClick={() => addTimeSlot("friday")}
              style={(timeSlots.includes("friday") || clickedDay=="friday") ? activeBar : inActiveBar}
            >
              Fri
              <input type="checkbox" value="" />
            </label>
            {timeSlots.includes("friday") &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDay("friday")}/>}
          </div>

          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              style={(timeSlots.includes("saturday") || clickedDay=="saturday") ? activeBar : inActiveBar}
              onClick={() => addTimeSlot("saturday")}
            >
              Sat <input type="checkbox" value="" />
            </label>
          {timeSlots.includes("saturday") &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDay("saturday")}/>}
          </div>
          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              style={(timeSlots.includes("sunday") || clickedDay=="sunday") ? activeBar : inActiveBar}
              onClick={() => addTimeSlot("sunday")}
            >
              Sun
              <input type="checkbox" value="" />
            </label>
            {timeSlots.includes("sunday") &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDay("sunday")}/>}
          </div>
        </OwlCarousel>
      ) : (
        <OwlCarousel
          className="owl-theme category eventForm_weekDays_carousel "
          id="category"
          items={1}
          margin={1}
          dots={false}
          {...options}
          nav
        >
          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              style={(timeSlots.includes("monday") || clickedDay=="monday") ? activeBar : inActiveBar}
              onClick={() => addTimeSlot("monday")}
            >
              Mon
              <input type="checkbox" value="" />
            </label>
            {timeSlots.includes("monday") &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDay("monday")}/>}
          </div>
          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              style={(timeSlots.includes("tuesday") || clickedDay=="tuesday") ? activeBar : inActiveBar}
              onClick={() => addTimeSlot("tuesday")}
            >
              Tues
              <input type="checkbox" value="" />
            </label>
            {timeSlots.includes("tuesday") &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDay("tuesday")}/>}
          </div>
          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              style={(timeSlots.includes("wednesday") || clickedDay=="wednesday") ? activeBar : inActiveBar}
              onClick={() => addTimeSlot("wednesday")}
            >
              Wed
              <input type="checkbox" value="" />
            </label>
            {timeSlots.includes("wednesday") &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDay("wednesday")}/>}
          </div>
          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              style={(timeSlots.includes("thursday") || clickedDay=="thursday") ? activeBar : inActiveBar}
              onClick={() => addTimeSlot("thursday")}
            >
              Thur
              <input type="checkbox" value="" />
            </label>
            {timeSlots.includes("thursday") &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDay("thursday")}/>}
          </div>
          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              onClick={() => addTimeSlot("friday")}
              style={(timeSlots.includes("friday") || clickedDay=="friday") ? activeBar : inActiveBar}
            >
              Fri
              <input type="checkbox" value="" />
            </label>
            {timeSlots.includes("friday") &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDay("friday")}/>}
          </div>

          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              style={(timeSlots.includes("saturday") || clickedDay=="saturday") ? activeBar : inActiveBar}
              onClick={() => addTimeSlot("saturday")}
            >
              Sat <input type="checkbox" value="" />
            </label>
            {timeSlots.includes("saturday")  &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDay("saturday")}/>}
          </div>
          <div class=" nopad text-center">
            <label
              class={`image-checkbox `}
              style={(timeSlots.includes("sunday") || clickedDay=="sunday") ? activeBar : inActiveBar}
              onClick={() => addTimeSlot("sunday")}
            >
              Sun
              <input type="checkbox" value="" />
            </label>
            {timeSlots.includes("sunday")  &&  <AiFillCloseCircle className="cutOptions" size={18} color="red" onClick={() => removeDay("sunday")}/>}
          </div>
        </OwlCarousel>
      )}
    </>
  );
};

export default Week_days;
