import React from 'react'
import './Community_RetailLocation.css'
import Footer from '../Component/Footer/Footer';
import Homepage_header from '../Component/Header/Homepage_header';
import Sidenav_communityFinance from "../Component/navbar/Sidenav_communityFinance";
import Checkbox_sidenav from "../Component/Inputbox/Checkbox_sidenav";
import Plus_button from "../Component/button/Plus_button";
import Event_button from "../Component/button/Event_button";
import All_members from "../Component/Cards/All_members";
import map_images from '../assets/Images/map_images.jfif'
import {BiFilterAlt} from 'react-icons/bi';
import{BsGrid} from "react-icons/bs";
import {TfiMenuAlt} from 'react-icons/tfi';
import {HiOutlineGlobe} from 'react-icons/hi';
import Selected_Retail from '../Component/navbar/Selected_Retail';
import Community_header from '../Component/Header/Community_header';
import Selectedbox_onMap from '../Component/Selectedbox_onMap';
import Community_retailNav from '../Component/navbar/Community_retailNav';

const Community_RetailLocation = () => {
  return (
    <>
<Homepage_header/>



      <div className="container">
      <Community_header/>
        

        <div className="row">
          <div className="col-lg-4 col-md-12 col-12 pt-3 mt-5 mb-5 ps-5  selected_Retail_outline">
          <h4> Selected Members</h4>
            <Selected_Retail />
            <Selected_Retail />

            <Selected_Retail />

            <Selected_Retail />



          </div>
          <div className="col-lg-8 col-md-12 col-12 pt-3 mt-5">
          <Community_retailNav/>

<div className='row'>
  <div className='col-12 col-md-12 col-lg-12 mt-4 mb-5 map_box'>
  <img src={map_images} alt=""></img>
       
       <div className='col-12 col-md-12 col-lg-5 '>
        {/* <Selectedbox_onMap/> */}
       </div>

  </div>
</div>



          </div>

        </div>
      </div>





<Footer/>
    </>
      

  )
}

export default Community_RetailLocation
