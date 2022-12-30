import React from 'react'
import './Community_finance.css';
//import Latest_session from '../Component/Cards/Latest_session';
import Footer from '../Component/Footer/Footer';
import Homepage_header from '../Component/Header/Homepage_header';
import Sidenav_communityFinance from '../Component/navbar/Sidenav_communityFinance';
import Checkbox_sidenav from '../Component/Inputbox/Checkbox_sidenav';
import Latest_session from '../Component/Cards/Latest_session';
import Community_header from '../Component/Header/Community_header';
import Networking_headers from '../Component/Header/Networking_headers';
const community_finance = () => {
  return (
    <>
      <Homepage_header/>
     <Networking_headers/>

      <div className="container">

       <Community_header/>

        <div className='row'>
            <div className="col-lg-3 col-md-12 col- mt-5 ps-5 pe-5">
                <Sidenav_communityFinance />
            </div>
            <div className="col-lg-9 col-md-12 col-12">
                <div className="row">
                <div className='upcoming_heading'>
    <h3>Latest</h3>
    <button>View All</button>
  </div><div className="col-lg-4 col-md-6 col-12 mb-5">
                <Latest_session/>
                </div>
                <div className="col-lg-4 col-md-6 col-12 mb-5">
                <Latest_session/>                </div>
                <div className="col-lg-4 col-md-6 col-12 mb-5">
                <Latest_session/>
                </div>
                </div>

                <div className='upcoming_heading'>
    <h3>Upcoming</h3>
    <button>View All</button>
  </div>


                <div className='row'>
                <div className="col-lg-4 col-md-6 col-12 mb-5">
                <Latest_session/>
                </div>
                <div className="col-lg-4 col-md-6 col-12 mb-5">
                <Latest_session/>                </div>
                <div className="col-lg-4 col-md-6 col-12 mb-5">
                <Latest_session/>                </div>
                
                </div>
            </div>

        </div>
      </div>

      <Footer/>
    </>
  )
}

export default community_finance
