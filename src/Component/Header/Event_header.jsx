import { useState } from "react";
import Plus_button from "../button/Plus_button";
import Event_button from "../button/Event_button";
import { FaRegUser } from "react-icons/fa";
import "./Event_header.css";
import { useNavigate } from "react-router-dom";
import AddEvent_Modal from "../Modal/AddEvent_Modal";
import { endpoints } from "../services/endpoints";
import { toast, ToastContainer } from "react-toastify";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import user from "../../assets/Icons/Artboard58.svg";
import { BiPlusCircle } from "react-icons/bi";
import Button from "../button/Button/Button";

const Event_header = (props) => {
  const { eventDetails } = props;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <>
      <div
        className="Communityheader"
        style={{ paddingTop: "0px !important", marginTop: "2px" }}
      >
        <div className="row">
          <div className="col-lg-7 col-md-12 col-sm-12 community_left">
            <div className="community_details">
              <div className="cmTitle d-flex align-items-center">
                <h5>Event </h5> <span style={{ marginBottom: "8px" }}>:</span>
                <h6>{eventDetails?.event_title}</h6>
              </div>

              <div className="cmDetails d-flex ">
                <h5>Descriptions </h5>{" "}
                <span style={{ marginBottom: "8px" }}>:</span>
                <h6>{eventDetails?.event_description}</h6>
              </div>

              <div className="cmDetails d-flex ">
                <h5>Criteria </h5>{" "}
                <span style={{ marginBottom: "8px" }}>:</span>
                <h6>{eventDetails?.event_type}</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12 d-flex align-items-center">
            <div className="userDetails">
              <div className="eventMem d-flex flex-column align-items-center">
                <FaUsers size={42} color="var(--primary)" />
                <h6>
                  {" "}
                  Members (
                  {eventDetails?.members_count ? eventDetails.members_count : 0}
                  )
                </h6>
              </div>
              <div className="eventBtn">
                <Button
                  title="Back To Event"
                  onClick={() => navigate("/networking")}
                />
              </div>
              {token && (
                <div
                  className="createEvnet"
                  onClick={() => navigate("/add-event")}
                >
                  <h6>Create Event</h6>
                  <BiPlusCircle color="white" size={20} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event_header;
