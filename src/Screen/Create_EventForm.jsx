import React from "react";
import "./Create_EventForm.css";
import Form from "react-bootstrap/Form";
import cpd_logo from "../assets/Images/cpd_logo.png";
import Footer from "../Component/Footer/Footer";
import Homepage_header from "../Component/Header/Homepage_header";
import { FiUpload } from "react-icons/fi";
import zoom_logo from "../assets/Images/zoom_logo.png";
import Sidenavbar from "../Component/navbar/Sidenavbar";
import Domain_cards from "../Component/Cards/DomainCard/DomainCard";
import Add_committee from "../Component/Cards/Add_committee";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { endpoints } from "../Component/services/endpoints";
import axios from "axios";
import { useLocation } from "react-router-dom";
import StudentEvents from "../Component/StudentEvents/StudentEvents";
import AddCommunitySidebar from "../Component/AddCommunitySidebar/AddCommunitySidebar";

const Create_EventForm = (props) => {

  const [inviteCommunity, setInviteCommunity] = useState([]);
  const allCommunity = endpoints.community.getAllCommunity;
  const [imagePath, setImagePath] = useState("");
  const [myCommunity, setMyCommunity] = useState([]);

  const inviteAllCommunity = () => {
    axios
      .get(allCommunity)
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data;

          const imgPath = res.data.image_path;

          setImagePath(imgPath);
          setInviteCommunity(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  // Invite comunity

  const getMyCommunity = () => {
    const token = localStorage.getItem("token");
    const getMycommunityUrl = endpoints.community.myCommunity;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    axios
      .get(getMycommunityUrl, { headers: headers })
      .then((res) => {
        if (res.data.result) {
          const val = res.data.data;
          setMyCommunity(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    inviteAllCommunity(inviteCommunity);
    getMyCommunity();
  }, []);

  return (
    <>
      <Homepage_header />

      <StudentEvents />
      <div className="container-fluid">
        <div className="AddCommunityContainer">
          <div className="row mb-5">
            <div className="col-12 col-md-12 col-lg-3 pe-5 ps-3">
              <AddCommunitySidebar />
              {/* <div className="EventForm_nav">
              <Sidenavbar />
             
            </div> */}
            </div>
            <div className="col-12 col-md-12 col-lg-9">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12 pe-2 addMember_create_EventForm">
                  <h5 className="AddCmntyMemberHeading">
                    Add Organise Committee Or Member
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12 mt-3 pe-2 Domain_EventForm">
                  <h5 className="DomainEventH">Domain</h5>
                  <div class="searchCmnty">
                    <span class="fasearch"><BiSearch/></span>
                    <input placeholder="Search Here" />
                  </div>
                </div>
              </div>

              <div className="row">
                
                <div className="addinvitecumntyContainer">
                  <div className="row">
                  {inviteCommunity.length != 0 &&
                    inviteCommunity.map((itm, index) => {
                      const id = itm._id;
                      var isInviteCommunity = inviteCommunity.some(
                        (element) => {
                          if (element._id === id) {
                            return true;
                          }
                          return false;
                        }
                      );

                      return (
                        <>
                          <div className="col-sm-12 col-md-6 col-lg-4 ">
                          
                            <Add_committee
                              data={itm}
                              key={index}
                              imagePath={imagePath}
                              getMyCommunity={getMyCommunity}
                              isInviteCommunity={isInviteCommunity}
                              inviteAllCommunity={inviteAllCommunity}
                              // getMyCommunity={getMyCommunity}
                              // getAllCommunity={getAllCommunity}
                            />
                          </div>
                        </>
                      );
                    })}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Create_EventForm;
