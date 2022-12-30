import React from 'react'
import "./Homepage_cards.css";
import uts_image from "../../assets/Images/uts_image.svg";
import utslogo from "../../assets/Images/utslogo.svg";
import browser from "../../assets/Images/browser.svg";
import time from "../../assets/Images/time.svg";

import three_dots from "../../assets/Images/three_dots.svg";
import like from "../../assets/Images/like.svg";
import comment from "../../assets/Images/comment.svg";
import share from "../../assets/Images/share.svg";
import send from "../../assets/Images/send.svg";
import Homepage_button from '../button/Homepage_button';

const Homepage_cards = () => {
  return (
    <>
    <div className="card_outline">
      <div className="row">
      <div className='col-9 col-md-9 col-lg-10 '>
      <div className="university_block">
            <img src={utslogo} alt="" className="utslogo"></img>
            <div className="university_name">
              <h4>UTS University.</h4>
              <h5>11558 Students</h5>
              <h6>
                10min
                 <span className="browser_homecard">
                  <img src={browser} alt=""></img>
                </span>
              </h6>
            </div>
          </div>

      </div>
      <div className='col-3 col-md-3 col-lg-2 three_dots'>
      <img src={three_dots}  alt=""></img>

</div>

      </div>
      <div className="row ps-3 pe-3">
      <div className='col-12 col-md-12 col-lg-9'>
      <div className="title_inner">
            <h6>
              <img src={time} alt="" className="time"></img> Mon, Aug 29
              3.00pm-5.30pm IST
            </h6>
            <p>
              {" "}
              In publishing and graphic design, Lorem ispum is a placeholder
              text community graphic and design.
            </p>
          </div>
      </div>
      <div className='col-3 col-md-3 col-lg-3'>
      {/* <Homepage_button
              text="Enroll Now"
              brColor="#2c6959"
              fontColor="#2c6959"
            />
       */}
</div>

      </div>
      <div className="row ps-3 pe-3">

      <div className='col-12 col-md-12 col-lg-12 mt-3 uts_image'>
      <img src={uts_image} alt=""></img>

      </div>   
      </div>

      <div className="row ps-3 pe-3">
      <div className='col-12 col-md-12 col-lg-12 mt-2 card_footer '>
      
      <div className="footer_icon">
            <img src={like} alt=""></img>
            <span className="d-lg-block d-none">Like</span>
          </div>
          <div className="footer_icon">
            <img src={comment} alt=""></img>
            <span className="d-lg-block d-none">Comment</span>
          </div>
          <div className="footer_icon">
            <img src={share} alt=""></img>
            <span className="d-lg-block d-none">Share</span>
          </div>
          <div className="footer_icon">
            <img src={send} alt=""></img>
            <span className="d-lg-block d-none">Send</span>
          </div>

      
      
      </div>
            </div>

      </div>
    </>
  )
}

export default Homepage_cards
