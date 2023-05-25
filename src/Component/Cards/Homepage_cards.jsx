import React from "react";
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
import Homepage_button from "../button/Homepage_button";
import { imgPath } from "../services/endpoints";
import { RiShareFill } from "react-icons/ri";
import { generatePath } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DefaultImg from "../../assets/Images/default.png"
import ShareModel from "../Modal/ShareModel/ShareModel"

const Homepage_cards = (props) => {

  const { feeds , handleShare } = props;
  const type = feeds?.type;
  const workshopImgPath = imgPath.workshop;
  const coachingImgPath = imgPath.coaching;
  const eventsImgPath = imgPath.event;
  const communityImgPath = imgPath.communtiy;
  const navigate = useNavigate();

  const showWorkshopDetails = (id) =>{
    const path  = generatePath("/workshopDetails/:workshopId" , {workshopId : id})
    navigate(path)
  }

  const showCoachingDetails = (id) =>{
    const path = generatePath("/coachingDetails/:coachingId" , {coachingId : id});
    navigate(path)
  }

  const showEventDetails = (id) =>{
    const path = generatePath("/event-full-details/:eventId" , {eventId : id});
    navigate(path)
  }

  const showCommunityDetails = (dta) =>{
    const id = dta._id
    const path = generatePath("/community-details/:communityId" , {communityId : id});
    navigate(path , {state: { communityDetails: dta }})
  }

  if (type === "workshops") {
    return (
      <>
        <div className="card_outline" >
          <div className="row d-flex justify-between align-center">
            <div className="col-9 col-md-9 col-lg-10 feedsDtls">
              <h4>{feeds?.title}</h4>
              <h5>
                Enrolled ({feeds?.workshop_members_count}/{feeds?.max_members})
              </h5>
            </div>
            <div className="col-3 col-md-3 col-lg-2 three_dots">
              <img src={three_dots} alt=""></img>
            </div>
          </div>
          <div className="row ps-3 pe-3">
            <div
              className="col-10 col-md-10 col-lg-10 "
              style={{ width: "80%" }}
            >
              <div className="title_inner">
                <h6>Explore this workshop</h6>
                <p>
                  In publishing and graphic design, Lorem ispum is a placeholder
                  text community graphic and design.
                </p>
              </div>
            </div>
            <div
              className="col-2 col-md-2 col-lg-2 d-flex justify-center align-center"
              style={{ marginTop: "5%" }}
            >
              <button className="view">Enroll</button>
            </div>
          </div>
          <div className="row ps-3 pe-3">
            <div className="col-12 col-md-12 col-lg-12 mt-3 uts_image" onClick={() => showWorkshopDetails(feeds._id)}>
              <img
                src={feeds?.image ?  workshopImgPath + feeds?.image : DefaultImg}
                alt=""
                className="utslogo"
              />
            </div>
          </div>

          <div className="crsIncldBx">
            <button
              className="addtoCrt"
              style={{ width: "95%", margin: "17px auto" }}
              onClick={() => handleShare(feeds)}
            >
              {" "}
              <RiShareFill
                size={18}
                color="white"
                style={{ marginRight: "10px" }}
              />{" "}
              Share
            </button>
          </div>
        </div>
      </>
    );
  } else if (type === "coachings") {
    return (
      <>
        <div className="card_outline" >
          <div className="row d-flex justify-between align-center">
            <div className="col-9 col-md-9 col-lg-10 feedsDtls">
              <h4>{feeds?.title}</h4>
              <h5>
                Enrolled Members ({feeds?.coaching_members_count})
              </h5>
            </div>
            <div className="col-3 col-md-3 col-lg-2 three_dots">
              <img src={three_dots} alt=""></img>
            </div>
          </div>
          <div className="row ps-3 pe-3">
            <div
              className="col-10 col-md-10 col-lg-10 "
              style={{ width: "80%" }}
            >
              <div className="title_inner">
                <h6>Explore this coaching</h6>
                <p>
                  In publishing and graphic design, Lorem ispum is a placeholder
                  text community graphic and design.
                </p>
              </div>
            </div>
            <div
              className="col-2 col-md-2 col-lg-2 d-flex justify-center align-center"
              style={{ marginTop: "5%" }}
            >
              <button className="view">Enroll</button>
            </div>
          </div>
          <div className="row ps-3 pe-3">
            <div className="col-12 col-md-12 col-lg-12 mt-3 uts_image" onClick={() => showCoachingDetails(feeds._id)}>
              <img
                src={feeds?.image ?  coachingImgPath + feeds?.image : DefaultImg}
                alt=""
                className="utslogo"
              />
            </div>
          </div>

          <div className="crsIncldBx">
            <button
              className="addtoCrt"
              style={{ width: "95%", margin: "17px auto" }}
              onClick={() => handleShare(feeds)}
            >
              {" "}
              <RiShareFill
                size={18}
                color="white"
                style={{ marginRight: "10px" }}
              />{" "}
              Share
            </button>
          </div>
        </div>
      </>
    );
  }
  else if(type === "events"){
    return(<>
      <div className="card_outline">
          <div className="row d-flex justify-between align-center">
            <div className="col-9 col-md-9 col-lg-10 feedsDtls">
              <h4>{feeds?.event_title}</h4>
              <h5>
                Enrolled({feeds?.coaching_members_count}/{feeds?.max_members})
              </h5>
            </div>
            <div className="col-3 col-md-3 col-lg-2 three_dots">
              <img src={three_dots} alt=""></img>
            </div>
          </div>
          <div className="row ps-3 pe-3">
            <div
              className="col-10 col-md-10 col-lg-10 "
              style={{ width: "80%" }}
            >
              <div className="title_inner">
                <h6>Explore this events</h6>
                <p>
                  In publishing and graphic design, Lorem ispum is a placeholder
                  text community graphic and design.
                </p>
              </div>
            </div>
            <div
              className="col-2 col-md-2 col-lg-2 d-flex justify-center align-center"
              style={{ marginTop: "5%" }}
            >
              <button className="view">Enroll</button>
            </div>
          </div>
          <div className="row ps-3 pe-3">
            <div className="col-12 col-md-12 col-lg-12 mt-3 uts_image"  onClick={() => showEventDetails(feeds._id)}>
              <img
                src={feeds?.event_photo ?  eventsImgPath + feeds?.event_photo : DefaultImg}

                alt=""
                className="utslogo"
              />
            </div>
          </div>

          <div className="crsIncldBx">
            <button
              className="addtoCrt"
              style={{ width: "95%", margin: "17px auto" }}
              onClick={() => handleShare(feeds)}
            >
              {" "}
              <RiShareFill
                size={18}
                color="white"
                style={{ marginRight: "10px" }}
              />{" "}
              Share
            </button>
          </div>
        </div>
    </>)
  }
  else if(type === "communities"){
    return(<>
      <div className="card_outline" >
          <div className="row d-flex justify-between align-center">
            <div className="col-9 col-md-9 col-lg-10 feedsDtls">
              <h4>{feeds?.display_name}</h4>
              <h5>
                Enrolled Members({feeds?.members_count})
              </h5>
            </div>
            <div className="col-3 col-md-3 col-lg-2 three_dots">
              <img src={three_dots} alt=""></img>
            </div>
          </div>
          <div className="row ps-3 pe-3">
            <div
              className="col-10 col-md-10 col-lg-10 "
              style={{ width: "80%" }}
            >
              <div className="title_inner">
                <h6>Explore this community</h6>
                <p>
                  In publishing and graphic design, Lorem ispum is a placeholder
                  text community graphic and design.
                </p>
              </div>
            </div>
            <div
              className="col-2 col-md-2 col-lg-2 d-flex justify-center align-center"
              style={{ marginTop: "5%" }}
            >
              <button className="view">Enroll</button>
            </div>
          </div>
          <div className="row ps-3 pe-3">
            <div className="col-12 col-md-12 col-lg-12 mt-3 uts_image" onClick={() => showCommunityDetails(feeds)}>
              <img
                src={feeds?.event_photo ?  communityImgPath + feeds?.image : DefaultImg}

                alt=""
                className="utslogo"
              />
            </div>
          </div>

          <div className="crsIncldBx">
            <button
              className="addtoCrt"
              style={{ width: "95%", margin: "17px auto" }}
              onClick={() => handleShare(feeds)}
            >
              {" "}
              <RiShareFill
                size={18}
                color="white"
                style={{ marginRight: "10px" }}
              />{" "}
              Share
            </button>
          </div>

          {/* share model */}

         
        </div>
    </>)
  }
};

export default Homepage_cards;
