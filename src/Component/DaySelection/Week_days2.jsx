// import React from 'react'
// import './.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css'
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import OwlCarousel from 'react-owl-carousel';

// import $ from "jquery";
// import { useState,useEffect } from "react";
// const 2 = ({timeSlots, addTimeSlot}) => {
//     useEffect(()=>{
//         // sync the state to the input
//         $(".image-checkbox").on("click", function (e) {
//           $(this).toggleClass('image-checkbox-checked');
//           var $checkbox = $(this).find('input[type="checkbox"]');
//           $checkbox.prop("checked",!$checkbox.prop("checked"))
        
//           e.preventDefault();
//         });
    
        
        
//       },[])
    
//       /* week days*/
//     const options = {
//         margin: 3,
//         responsiveClass: true,
//         nav: true,
//         dots: false,
//         autoplay: false,
//         // navText: ["Prev", "Next"],
//         smartSpeed: 1000,
//         responsive: {
//           0: {
//             items: 3,
//             margin: 10,
//           },
//           400: {
//             items: 4,
//             margin: 10,
//           },
//           600: {
//             items: 5,
//           },
//           700: {
//             items: 5,
//           },
//           1000: {
//             items: 5,
    
//           }
//         },
//       };
    
//   return (
//     <>
//       <OwlCarousel className='owl-theme category bookCoaches_weekDays_carousel ' id='category' items={1} margin={1} dots={false} {...options} nav>
//     <div class=" nopad text-center">
//     <label class={`image-checkbox ${timeSlots.includes('monday') ? 'image-checkbox-checked' : ''}`} onClick={() => addTimeSlot('monday')}>
//     Mon
//       <input type="checkbox"  value="" />
      
//     </label>
//   </div>
//   <div class=" nopad text-center">
//     <label class={`image-checkbox ${timeSlots.includes('tuesday') ? 'image-checkbox-checked' : ''}`} onClick={() => addTimeSlot('tuesday')}>
//     Tues
//       <input type="checkbox"  value="" />
      
//     </label>
//   </div>
//   <div class=" nopad text-center">
//     <label class={`image-checkbox ${timeSlots.includes('wednesday') ? 'image-checkbox-checked' : ''}`} onClick={() => addTimeSlot('wednesday')}>
//     Wed
//       <input type="checkbox"  value="" />
      
//     </label>
//   </div>
//   <div class=" nopad text-center">
//     <label class={`image-checkbox ${timeSlots.includes('thursday') ? 'image-checkbox-checked' : ''}`} onClick={() => addTimeSlot('thursday')}>
//     Thur
//       <input type="checkbox"  value="" />

//     </label>
//   </div>
//   <div class=" nopad text-center">
//     <label class={`image-checkbox ${timeSlots.includes('friday') ? 'image-checkbox-checked' : ''}`} onClick={() => addTimeSlot('friday')}>
//     Fri
//       <input type="checkbox"  value="" />
      
//     </label>
//   </div>

//   <div class=" nopad text-center">
//     <label class={`image-checkbox ${timeSlots.includes('saturday') ? 'image-checkbox-checked' : ''}`} onClick={() => addTimeSlot('saturday')}>
    
// Sat      <input type="checkbox"  value="" />
      
//     </label>
//   </div>
//   <div class=" nopad text-center">
//     <label class={`image-checkbox ${timeSlots.includes('sunday') ? 'image-checkbox-checked' : ''}`} onClick={() => addTimeSlot('sunday')}>
//     Sun
//       <input type="checkbox"  value="" />
      
//     </label>
//   </div>



// </OwlCarousel>
//     </>
//   )
// }
// export default 2