import React from "react";
import "./Homepage_chats.css";
import main_chatroom from "../../assets/Icons/Artboard11.svg";
import Rotman from "../../assets/Icons/Artboard12.svg";
import Master_marketing from "../../assets/Icons/Artboard19.svg";
import side_threepoints from "../../assets/Images/side_threepoints.svg";
import search_icon from "../../assets/Images/search_icon.svg";


const Homepage_chats = () => {

  return (
    <>
      <div className="chats_box">
        <div className="chats_header">
          <h5>
            Chats <span id="online">(online)</span>
          </h5>
          <div className="hide">
            <h6>Hide chats</h6>
            <img
              src={side_threepoints}
              alt=""
              className="side_threepoints"
            ></img>
          </div>
        </div>
        <div className="chats">
          <div className="search_box">
            <img src={search_icon} alt="" />
            <input
              type="search"
              id="search_chats"
              placeholder="Search By Group Title"
              className="form-control"
            ></input>
          </div>
          <div className="chats_details">
            <div className="chatroom_imgbox">
              <img src={main_chatroom} alt=""></img>
              <div className="chats_name">
                <h5>Main Chatsroom</h5>
                <h6>Derick217: Question</h6>
              </div>
            </div>
            <h6 id="chat_time">10:28 AM</h6>
          </div>

          <div className="chats_details">
            <div className="chatroom_imgbox">
              <img src={Rotman} alt=""></img>
              <div className="chats_name">
                <h5>Rotman</h5>
                <h6>Derick217: Question</h6>
              </div>
            </div>
            <h6 id="chat_time">10:20 AM</h6>
          </div>

          <div className="chats_details">
            <div className="chatroom_imgbox">
              <img src={Master_marketing} alt=""></img>
              <div className="chats_name">
                <h5>Master in Marketing fr..</h5>
                <h6>rishi2008:Hey,has a ..</h6>
              </div>
            </div>
            <h6 id="chat_time">10:10 AM</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage_chats;
