import React from "react";
import "./Community_RetailSelected.css";
import Footer from "../Component/Footer/Footer";
import Homepage_header from "../Component/Header/Homepage_header";
import Sidenav_communityFinance from "../Component/navbar/Sidenav_communityFinance";
import Checkbox_sidenav from "../Component/Inputbox/Checkbox_sidenav";
import Selectedbox_onMap from "../Component/Selectedbox_onMap";
import Plus_button from "../Component/button/Plus_button";
import Event_button from "../Component/button/Event_button";
import All_members_selected from "../Component/Cards/All_members_selected";
import Community_header from "../Component/Header/Community_header";
//import Selectedbox_onMap from "../Component/Selectedbox_onMap";
import Community_retailNav from "../Component/navbar/Community_retailNav";
import Networking_headers from "../Component/Header/Networking_headers";

const Community_RetailSelected = () => {
  return (
    <>
      <Homepage_header />
      <Networking_headers />

      <div className="container">
        <Community_header />
        <div className="row">
          <div className="col-lg-3 col-md-12 col- mt-5 ps-5 pe-5">
            <Sidenav_communityFinance />
          </div>
          <div className="col-lg-9 col-md-12 col-11 mt-4">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12 mb-3">
                <Community_retailNav />
              </div>
            </div>

            <All_members_selected />
            <All_members_selected />
            <All_members_selected />
            <All_members_selected />
            <All_members_selected />
            <All_members_selected />

            <div className="row">
              <div className="col-12 col-md-12 col-lg-6">
                {/* <Events Selected_button text="4 Membe Countinue" /> */}
              </div>
              <div className="col-12 col-md-12 col-lg-6 Retail_selected">
                {/* <Selectedbox_onMap/> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Community_RetailSelected;
