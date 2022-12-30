import React from 'react'
import './Month_days.css';
import '../../../node_modules/owl.carousel/dist/assets/owl.theme.default.css';
import '../../../node_modules/owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css'
import 'owl.carousel/dist/assets/owl.carousel.css';
import OwlCarousel from 'react-owl-carousel';

import $ from "jquery";
import { useState,useEffect } from "react";

const Month_days = () => {
    useEffect(()=>{
        $(".month_image-checkbox").each(function () {
          if ($(this).find('input[type="checkbox"]').first().attr("checked")) {
            $(this).addClass('month_image-checkbox-checked');
          }
          else {
            $(this).removeClass('month_image-checkbox-checked');
          }
        });
        
        // sync the state to the input
        $(".month_image-checkbox").on("click", function (e) {
          $(this).toggleClass('month_image-checkbox-checked');
          var $checkbox = $(this).find('input[type="checkbox"]');
          $checkbox.prop("checked",!$checkbox.prop("checked"))
        
          e.preventDefault();
        });
    
        
        
      },[])
    
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
            items: 5,
          },
          700: {
            items: 5,
          },
          1000: {
            items: 5,
    
          }
        },
      };

  return (
    <>
       <OwlCarousel className='owl-theme category eventForm_monthDays_carousel ' id='category' items={1} loop margin={1} dots={false} {...Monthoptions} nav>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    1
      <input type="checkbox" value="" />
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    2
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    3
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    4
      <input type="checkbox"  value="" />

    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    5
      <input type="checkbox"  value="" />
      
    </label>
  </div>

  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    
6     <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    7
      <input type="checkbox"  value="" />
      
    </label>
  </div>

  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    8
      <input type="checkbox"  value="" />
      
    </label>
  </div>

  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    9
      <input type="checkbox"  value="" />
      
    </label>
  </div>

  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    10
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    11
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    12
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
13      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    14
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    15
      <input type="checkbox"  value="" />
      
    </label>
  </div>

  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    16
      <input type="checkbox"  value="" />
      
    </label>
  </div>

  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    17
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    18
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    19
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    20
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    21
      <input type="checkbox"  value="" />
      
    </label>
  </div>

  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    22
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    23
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    24
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    25
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    26
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    27
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    28
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    29
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    30
      <input type="checkbox"  value="" />
      
    </label>
  </div>
  <div class=" nopad text-center">
    <label class="month_image-checkbox">
    31
      <input type="checkbox"  value="" />
      
    </label>
  </div>


</OwlCarousel>

    </>
  )
}

export default Month_days
