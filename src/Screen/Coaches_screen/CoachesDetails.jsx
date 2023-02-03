import React from 'react';
import './CoachesDetails.css';
import dommyperson from '../../assets/Images/dommyperson.jpg';
import coachesDetailscardimages from '../../assets/Images/coachesDetailscardimages.jpg';
import Homepage_header from '../../Component/Header/Homepage_header';
import Footer from '../../Component/Footer/Footer';
import Networking_headers from '../../Component/Header/Networking_headers';
import {BsCalendarDateFill} from 'react-icons/bs';
const CoachesDetails = () => {
  return (
   <>
   <Homepage_header/>
   <div className='container-fluid'>
        <div className='row '>
            <div className='col-lg-12 col-md-12 col-12 explore'>
 <h5>Explore Coacheing and Workshop</h5>
 {/* <h6>Please Click <a href=''>update your resume</a> for view more community and their events</h6> */}
            </div>
        </div>
      </div>
  <div className='coachesDetailsWrapper'>
    <section className='coachesDetailsSection1'>
    <div className="coachesDetailsimagesBox">
        <img src={dommyperson} alt="" />
        </div>

<div className='coachesDetailsDescription'>
<h4>Coache Name : <span style={{color:"#2c6959"}}>James Watt</span></h4>
<h6>Spacility: IT Sector</h6>
       <p>A Coach, or Head Coach, guides and teaches athletes the skills they need for a specific sport. Their duties include skills coaching, helping to condition athletes and enforcing safety procedures. </p>
</div>
      {/* <div className='row'>
      <div className="col-lg-2 col-md-2 col-12">
        <div className="coachesDetailsimagesBox">
        <img src={dommyperson} alt="" />
        </div>
        </div>
        <div className="col-lg-10 col-md-10 col-12">

       <h4>Coaches Name : <span style={{color:"#2c6959"}}>James Watt</span></h4>
       <p>A Coach, or Head Coach, guides and teaches athletes the skills they need for a specific sport. Their duties include skills coaching, helping to condition athletes and enforcing safety procedures. </p>
        </div>
       
      </div> */}

    </section>
    <section className="Workshop_section2">
          <div className="row">
           
            <div className="col-lg-12 col-md-12 col-12 ">
              <h5 className="coachesDetailsheading">Coaching List</h5>
              <div className="row">
              <div className="col-lg-3 col-md-6 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={coachesDetailscardimages} alt="" />
                      
                    </div>
                    <div className="coachesDetailslistcard_descriptionBox">
                      <div className='coachesDetailslistcardtitle'>
                      <h4>
                        DIY Organic Bath and Body Products  
                      </h4>
                      <BsCalendarDateFill style={{color:"#2c6959", fontSize:"20px"}}/>
                           
                      </div>
                     
                     
                      
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <h6>Domain : Retail</h6>
                       
                      </div>
                      <div className="domainBox">
                        <div className='row'>
                        <div className='col-lg-7 col-md-8 col-12'>
                        <h6 id="enrolled" >Currently Enrolled (5/10)</h6>
                        </div>
                        <div className='col-lg-5 col-md-4 col-12'>
                          <div className=' coachesDetailsbuttonpending'>
                        <button className=''>Pending</button>
                        </div>
                        </div>
                        </div>
                      {/* <h6 id="enrolled" >Currently Enrolled (5/10)</h6> */}
                     
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={coachesDetailscardimages} alt="" />
                      
                    </div>
                    <div className="coachesDetailslistcard_descriptionBox">
                      <div className='coachesDetailslistcardtitle'>
                      <h4>
                        DIY Organic Bath and Body Products  
                      </h4>
                      <BsCalendarDateFill style={{color:"#2c6959", fontSize:"20px"}}/>
                           
                      </div>
                     
                     
                      
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <h6>Domain : Retail</h6>
                       
                      </div>
                      <div className="domainBox">
                        <div className='row'>
                        <div className='col-lg-7 col-md-8 col-12'>
                        <h6 id="enrolled" >Currently Enrolled (5/10)</h6>
                        </div>
                        <div className='col-lg-5 col-md-4 col-12'>
                          <div className=' coachesDetailsbuttonpending'>
                        <button className=''>Pending</button>
                        </div>
                        </div>
                        </div>
                      {/* <h6 id="enrolled" >Currently Enrolled (5/10)</h6> */}
                     
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={coachesDetailscardimages} alt="" />
                      
                    </div>
                    <div className="coachesDetailslistcard_descriptionBox">
                      <div className='coachesDetailslistcardtitle'>
                      <h4>
                        DIY Organic Bath and Body Products  
                      </h4>
                      <BsCalendarDateFill style={{color:"#2c6959", fontSize:"20px"}}/>
                           
                      </div>
                     
                     
                      
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <h6>Domain : Retail</h6>
                       
                      </div>
                      <div className="domainBox">
                        <div className='row'>
                        <div className='col-lg-7 col-md-8 col-12'>
                        <h6 id="enrolled" >Currently Enrolled (5/10)</h6>
                        </div>
                        <div className='col-lg-5 col-md-4 col-12'>
                          <div className=' coachesDetailsbuttonconfirmed'>
                        <button className=''>confirmed</button>
                        </div>
                        </div>
                        </div>
                      {/* <h6 id="enrolled" >Currently Enrolled (5/10)</h6> */}
                     
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={coachesDetailscardimages} alt="" />
                      
                    </div>
                    <div className="coachesDetailslistcard_descriptionBox">
                      <div className='coachesDetailslistcardtitle'>
                      <h4>
                        DIY Organic Bath and Body Products  
                      </h4>
                      <BsCalendarDateFill style={{color:"#2c6959", fontSize:"20px"}}/>
                           
                      </div>
                     
                     
                      
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <h6>Domain : Retail</h6>
                       
                      </div>
                      <div className="domainBox">
                        <div className='row'>
                        <div className='col-lg-7 col-md-8 col-12'>
                        <h6 id="enrolled" >Currently Enrolled (5/10)</h6>
                        </div>
                        <div className='col-lg-5 col-md-4 col-12'>
                          <div className=' coachesDetailsbuttonpending'>
                        <button className=''>Pending</button>
                        </div>
                        </div>
                        </div>
                      {/* <h6 id="enrolled" >Currently Enrolled (5/10)</h6> */}
                     
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={coachesDetailscardimages} alt="" />
                      
                    </div>
                    <div className="coachesDetailslistcard_descriptionBox">
                      <div className='coachesDetailslistcardtitle'>
                      <h4>
                        DIY Organic Bath and Body Products  
                      </h4>
                      <BsCalendarDateFill style={{color:"#2c6959", fontSize:"20px"}}/>
                           
                      </div>
                     
                     
                      
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <h6>Domain : Retail</h6>
                       
                      </div>
                      <div className="domainBox">
                        <div className='row'>
                        <div className='col-lg-7 col-md-8 col-12'>
                        <h6 id="enrolled" >Currently Enrolled (5/10)</h6>
                        </div>
                        <div className='col-lg-5 col-md-4 col-12'>
                          <div className=' coachesDetailsbuttonpending'>
                        <button className=''>Pending</button>
                        </div>
                        </div>
                        </div>
                      {/* <h6 id="enrolled" >Currently Enrolled (5/10)</h6> */}
                     
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={coachesDetailscardimages} alt="" />
                      
                    </div>
                    <div className="coachesDetailslistcard_descriptionBox">
                      <div className='coachesDetailslistcardtitle'>
                      <h4>
                        DIY Organic Bath and Body Products  
                      </h4>
                      <BsCalendarDateFill style={{color:"#2c6959", fontSize:"20px"}}/>
                           
                      </div>
                     
                     
                      
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <h6>Domain : Retail</h6>
                       
                      </div>
                      <div className="domainBox">
                        <div className='row'>
                        <div className='col-lg-7 col-md-8 col-12'>
                        <h6 id="enrolled" >Currently Enrolled (5/10)</h6>
                        </div>
                        <div className='col-lg-5 col-md-4 col-12'>
                          <div className=' coachesDetailsbuttonpending'>
                        <button className=''>Pending</button>
                        </div>
                        </div>
                        </div>
                      {/* <h6 id="enrolled" >Currently Enrolled (5/10)</h6> */}
                     
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
       
        <section className="Workshop_section2">
          <div className="row">
           
            <div className="col-lg-12 col-md-12 col-12 ">
            <h5 className="coachesDetailsheading">Workshop List</h5>
              <div className="row">
              <div className="col-lg-3 col-md-6 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={coachesDetailscardimages} alt="" />
                      
                    </div>
                    <div className="coachesDetailslistcard_descriptionBox">
                      <div className='coachesDetailslistcardtitle'>
                      <h4>
                        DIY Organic Bath and Body Products  
                      </h4>
                      <BsCalendarDateFill style={{color:"#2c6959", fontSize:"20px"}}/>
                           
                      </div>
                     
                     
                      
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <h6>Domain : Retail</h6>
                       
                      </div>
                      <div className="domainBox">
                        <div className='row'>
                        <div className='col-lg-7 col-md-8 col-12'>
                        <h6 id="enrolled" >Currently Enrolled (5/10)</h6>
                        </div>
                        <div className='col-lg-5 col-md-4 col-12'>
                          <div className=' coachesDetailsbuttonpending'>
                        <button className=''>Pending</button>
                        </div>
                        </div>
                        </div>
                      {/* <h6 id="enrolled" >Currently Enrolled (5/10)</h6> */}
                     
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={coachesDetailscardimages} alt="" />
                      
                    </div>
                    <div className="coachesDetailslistcard_descriptionBox">
                      <div className='coachesDetailslistcardtitle'>
                      <h4>
                        DIY Organic Bath and Body Products  
                      </h4>
                      <BsCalendarDateFill style={{color:"#2c6959", fontSize:"20px"}}/>
                           
                      </div>
                     
                     
                      
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <h6>Domain : Retail</h6>
                       
                      </div>
                      <div className="domainBox">
                        <div className='row'>
                        <div className='col-lg-7 col-md-8 col-12'>
                        <h6 id="enrolled" >Currently Enrolled (5/10)</h6>
                        </div>
                        <div className='col-lg-5 col-md-4 col-12'>
                          <div className=' coachesDetailsbuttonpending'>
                        <button className=''>Pending</button>
                        </div>
                        </div>
                        </div>
                      {/* <h6 id="enrolled" >Currently Enrolled (5/10)</h6> */}
                     
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={coachesDetailscardimages} alt="" />
                     
                    </div>
                    <div className="coachesDetailslistcard_descriptionBox">
                      <div className='coachesDetailslistcardtitle'>
                      <h4>
                        DIY Organic Bath and Body Products  
                      </h4>
                      <BsCalendarDateFill style={{color:"#2c6959", fontSize:"20px"}}/>
                           
                      </div>
                     
                     
                      
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <h6>Domain : Retail</h6>
                       
                      </div>
                      <div className="domainBox">
                        <div className='row'>
                        <div className='col-lg-7 col-md-8 col-12'>
                        <h6 id="enrolled" >Currently Enrolled (5/10)</h6>
                        </div>
                        <div className='col-lg-5 col-md-4 col-12'>
                          <div className=' coachesDetailsbuttonpending'>
                        <button className=''>Pending</button>
                        </div>
                        </div>
                        </div>
                      {/* <h6 id="enrolled" >Currently Enrolled (5/10)</h6> */}
                     
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={coachesDetailscardimages} alt="" />
                      
                    </div>
                    <div className="coachesDetailslistcard_descriptionBox">
                      <div className='coachesDetailslistcardtitle'>
                      <h4>
                        DIY Organic Bath and Body Products  
                      </h4>
                      <BsCalendarDateFill style={{color:"#2c6959", fontSize:"20px"}}/>
                           
                      </div>
                     
                     
                      
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <h6>Domain : Retail</h6>
                       
                      </div>
                      <div className="domainBox">
                        <div className='row'>
                        <div className='col-lg-7 col-md-8 col-12'>
                        <h6 id="enrolled" >Currently Enrolled (5/10)</h6>
                        </div>
                        <div className='col-lg-5 col-md-4 col-12'>
                          <div className=' coachesDetailsbuttonpending'>
                        <button className=''>Pending</button>
                        </div>
                        </div>
                        </div>
                      {/* <h6 id="enrolled" >Currently Enrolled (5/10)</h6> */}
                     
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={coachesDetailscardimages} alt="" />
                      
                    </div>
                    <div className="coachesDetailslistcard_descriptionBox">
                      <div className='coachesDetailslistcardtitle'>
                      <h4>
                        DIY Organic Bath and Body Products  
                      </h4>
                      <BsCalendarDateFill style={{color:"#2c6959", fontSize:"20px"}}/>
                           
                      </div>
                     
                     
                      
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <h6>Domain : Retail</h6>
                       
                      </div>
                      <div className="domainBox">
                        <div className='row'>
                        <div className='col-lg-7 col-md-8 col-12'>
                        <h6 id="enrolled" >Currently Enrolled (5/10)</h6>
                        </div>
                        <div className='col-lg-5 col-md-4 col-12'>
                          <div className=' coachesDetailsbuttonpending'>
                        <button className=''>Pending</button>
                        </div>
                        </div>
                        </div>
                      {/* <h6 id="enrolled" >Currently Enrolled (5/10)</h6> */}
                     
                      </div>
                    
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={coachesDetailscardimages} alt="" />
                      
                    </div>
                    <div className="coachesDetailslistcard_descriptionBox">
                      <div className='coachesDetailslistcardtitle'>
                      <h4>
                        DIY Organic Bath and Body Products  
                      </h4>
                      <BsCalendarDateFill style={{color:"#2c6959", fontSize:"20px"}}/>
                           
                      </div>
                     
                     
                      
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <h6>Domain : Retail</h6>
                       
                      </div>
                      <div className="domainBox">
                        <div className='row'>
                        <div className='col-lg-7 col-md-8 col-12'>
                        <h6 id="enrolled" >Currently Enrolled (5/10)</h6>
                        </div>
                        <div className='col-lg-5 col-md-4 col-12'>
                          <div className=' coachesDetailsbuttonpending'>
                        <button className=''>Pending</button>
                        </div>
                        </div>
                        </div>
                      {/* <h6 id="enrolled" >Currently Enrolled (5/10)</h6> */}
                     
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  </div>
  <Footer/>
   </>
  )
}

export default CoachesDetails