import React from "react";
import Footer from "../../Component/Footer/Footer";
import Homepage_header from "../../Component/Header/Homepage_header";
import "./CareerFareDetails.css";
import faredetails from "../../assets/Icons/faredetails.png";
import faredetailcalender from "../../assets/Icons/faredetailcalender.svg";
import faredetaillocation from "../../assets/Icons/faredetaillocation.svg";

import faredetailsfacebook from '../../assets/Icons/faredetailsfacebook.svg';
import faredetailsmessenger from '../../assets/Icons/faredetailsmessenger.svg';
import faredetailslinkdin from '../../assets/Icons/faredetailslinkdin.svg';
import faredetailstwitter from '../../assets/Icons/faredetailstwitter.svg';
import faredetailsemail from '../../assets/Icons/faredetailsemail.svg';

import "../../fonts/Inter-Bold.ttf";
import "../../fonts/Inter-Medium.ttf";
import "../../fonts/Inter-Regular.ttf";
import "../../fonts/Inter-SemiBold.ttf";

const CareerFareDetails = () => {
  return (
    <>
      <Homepage_header />
      <div className="FareDetailsWrapper">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="fareDetailsimg">
              {" "}
              <img src={faredetails} alt="" />
            </div>
            <img src="" alt="" />
          </div>
        </div>
        <section className="FareDetailsFirstSec">
          <div className="row">
            <div className="col-lg-9 col-md-8 col-12">
              <div className="faredetailsinformation">
                <h4>MBA STUDENTS FAIR -</h4>
                <h3>INFORMATION SESSION (ONLINE)</h3>
                <h6>
                  JOIN US TO FIND OUT MORE ABOUT OUR EXECUTIVE AND SENIOR
                  EXECUTIVE MBA PROGRAMS.
                </h6>
                <h5>By Melbourne Business School</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-12">
              <div className="faredetailsinformationright">
                <h6>FREE</h6>
                <button>Click To View On Website</button>
              </div>
            </div>
          </div>
          <div className="row">
          
            <div className="col-lg-7 col-md-7 col-12">
           
              <div className="col-lg-12 col-md-12 col-12">
                <h5 className="faredetailswhenwhere">When And Where</h5>
              </div>
              <div className="row">
              <div className="col-lg-6 col-md-6 col-6">
<div className="faredetailstimeOuter">
<img src={faredetailcalender} alt="" />
<div className="faredetailstimeInner">
    <h5>Date And Time</h5>
    <h6>Thu., 27 October 2022,</h6>
    <h6>6:00 Pm – 7:00 Pm AEDT</h6>
</div>
</div>
              </div>
              <div className="col-lg-6 col-md-6 col-6">
              <div className="faredetailslocationOuter">
<img src={faredetaillocation} alt="" />
<div className="faredetailslocationInner">
    <h5>Location</h5>
    <h6>Online</h6>
    
</div>
</div>
              </div>
            </div>
            </div>
           
            <div className="col-lg-5 col-md-5 col-12">
            <div className="faredetailsshare">
                <h5>Share With Friends</h5>
               
                <ul>
                    <li>
                        <img src={faredetailsfacebook} alt="" />
                    </li>
                    <li>
                    <img src={faredetailsmessenger} alt="" />
                    </li>
                    <li>
                    <img src={faredetailslinkdin} alt="" />
                    </li>
                    <li>
                    <img src={faredetailstwitter} alt="" />
                    </li>
                    <li>
                    <img src={faredetailsemail} alt="" />
                    </li>
                </ul>
                </div>
            </div>
          </div>
          <hr/>
        </section>
        <section className="FareDetailsSecondSec">
          <div className="row">
            <div className="col-lg-7 col-md-10 col-12">
              <h5>About This Event</h5>
              <p>
                This information session will provide an overview of our two
                Executive MBA Programs - the Senior Executive MBA (SEMBA), and
                the Executive MBA (EMBA). The evening will include a
                presentation by our Director.
              </p>
              <h6>Senior Executive MBA</h6>
              <p>
                The Senior Executive MBA program is an intensive,
                fully-residential program for senior experienced business
                executives. Students commit to attending class for 10 x 9-day
                modules over an 18-month period.
              </p>
              <h6>Executive MBA</h6>
              <p>
                The Executive MBA program is an 18 month, weekend mode MBA for
                experienced business executives. Students commit to attending
                class for one long weekend residential a month, from Thursday to
                Sunday, for 18 months. Applicants for this program must have a
                minimum of five years' management experience gained after
                graduating from an undergraduate degree. If you are interested
                in any of our other degrees, please contact us. We look forward
                to welcoming you to the evening.
              </p>
            </div>
            <div className="col-lg-10 col-md-9 col-12">
              <h5>Tags</h5>
              <div className="faredetailstagsbox">
                <button>Online Events</button>
                <button>Online Networking</button>
                <button>Online Business Networking</button>
                <button>Online Events</button>
                <button>Online Networking</button>
                <button>Online Business Networking</button>
                <button>Online Events</button>
                <button>Online Networking</button>
                <button>Online Business Networking</button>
                <button>Online Events</button>
                <button>Online Networking</button>
                <button>Online Business Networking</button>
                <button>Online Events</button>
                <button>Online Networking</button>
                <button>Online Business Networking</button>
                <button>Online Events</button>
                <button>Online Networking</button>
                <button>Online Business Networking</button>
                <button>Online Events</button>
                <button>Online Networking</button>
                <button>Online Business Networking</button>
                <button>Online Events</button>
                <button>Online Networking</button>
                <button>Online Business Networking</button>
                
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default CareerFareDetails;
