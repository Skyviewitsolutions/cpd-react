import React from 'react'
import './Community_retailNav.css';
import {BiFilterAlt} from 'react-icons/bi';
import{BsGrid} from "react-icons/bs";
import {TfiMenuAlt} from 'react-icons/tfi';
import {HiOutlineGlobe} from 'react-icons/hi';

const Community_retailNav = () => {
  return (
    <>
                  <div className="row">
              <div className="col-12 col-md-12 col-lg-6 retailLocation_icons">
             <h5 style={{paddingBottom:"10px"}}>All Members</h5>
              <BsGrid style={{fontSize:"30px", paddingLeft:"5px" , marginTop:"5px"}} />
            <TfiMenuAlt style={{fontSize:"30px", paddingLeft:"5px" , marginTop:"5px"}}/>
            <HiOutlineGlobe style={{fontSize:"30px", color:"#2c6959", paddingLeft:"5px" , marginTop:"5px"}}/>
              </div>
              <div className="col-12 col-md-12 col-lg-6 filter_search_retailLocation">
<BiFilterAlt style={{fontSize:"40px", color:"#2c6959"}}/>
<input type="search" className=" retailLocation_searchbox" placeholder="search"/>

              </div>

                          </div>

    </>
  )
}

export default Community_retailNav
