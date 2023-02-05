import "./Week_days.css";
import "../../../node_modules/owl.carousel/dist/assets/owl.theme.default.css";
import "../../../node_modules/owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import OwlCarousel from "react-owl-carousel";
import $ from "jquery";
import { useState, useEffect } from "react";

const Week_days = () => {
  
  useEffect(() => {
    $(".image-checkbox").each(function () {
      if ($(this).find('input[type="checkbox"]').first().attr("checked")) {
        $(this).addClass("image-checkbox-checked");
      } else {
        $(this).removeClass("image-checkbox-checked");
      }
    });

    // sync the state to the input
    $(".image-checkbox").on("click", function (e) {
      $(this).toggleClass("image-checkbox-checked");
      var $checkbox = $(this).find('input[type="checkbox"]');
      $checkbox.prop("checked", !$checkbox.prop("checked"));

      e.preventDefault();
    });
  }, []);

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
        items: 5,
      },
      700: {
        items: 5,
      },
      1000: {
        items: 5,
      },
    },
  };

  return (
    <>
      <OwlCarousel
        className="owl-theme weekdaysForm category eventForm_weekDays_carousel "
        id="category"
        items={1}
        margin={1}
        dots={false}
        {...options}
        nav
      >
        <div className=" nopad text-center">
          <label className="image-checkbox image-checkbox-checked" for="1">
            Mon{" "}
            <input
              type="checkbox"
              className="form-check-input"
              value=""
              id="1"
            />
          </label>
        </div>
        <div className=" nopad text-center">
          <label className="image-checkbox" id="">
            Tues
            <input type="checkbox" value="" id="" />
          </label>
        </div>
        <div className=" nopad text-center">
          <label className="image-checkbox" id="">
            Wed
            <input type="checkbox" value="" id="" />
          </label>
        </div>
        <div className=" nopad text-center">
          <label className="image-checkbox" id="">
            Thus
            <input type="checkbox" value="" />
          </label>
        </div>
        <div className=" nopad text-center">
          <label className="image-checkbox" id="">
            Fri
            <input type="checkbox" value="" id="" />
          </label>
        </div>

        <div className=" nopad text-center">
          <label className="image-checkbox" id="">
            Sat <input type="checkbox" value="" id="" />
          </label>
        </div>
        <div className=" nopad text-center">
          <label className="image-checkbox" id="">
            Sun
            <input type="checkbox" value="" id="" />
          </label>
        </div>
      </OwlCarousel>
    </>
  );
};

export default Week_days;
