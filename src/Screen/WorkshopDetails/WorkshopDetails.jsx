import React from 'react'
import Footer from '../../Component/Footer/Footer';
import Homepage_header from '../../Component/Header/Homepage_header';
import './WorkshopDetails.css';
import  profileimg from '../../assets/Images/profileimg.png';
import workshopPre from '../../assets/Images/workshopPre.jfif';
import {GiRoundStar} from "react-icons/gi";
const WorkshopDetails = () => {
  return (
   <>
   <Homepage_header/>
   
   <section className="workshopDetailsSection1"> 
   <div className='container-fluid'>
   <div className="workshopDetailsfirst">
<h6>Development   Programming Languages  Python</h6>
<h3> Learn Python: The Complete Python Programming Course</h3>
<p>Learn A-Z everything about Python, from the basics, tho  advanced topics like  </p>
<p>Python GUI, Python Data  Analysis, and more ! </p>
</div>
</div>
   </section>

   <section className="workshopDetailsSection2"> 
    <div className="row">
        <div className="col-lg-8">
           
            <div className="row">
                <div className='col-lg-12 col-md-12 col-12'>
<div className="workshopDetailsBox1">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
             <h4>What you'll Learn</h4>
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                        <ul> 
                            <li> <p>Create their own Python Program</p></li>
                            <li><p>Create their own Python Program</p></li>
                            <li> <p>Create their own Python Program</p></li>
                        </ul>
                       
                    </div>
                    
                </div>
                </div>
                {/* <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <table>
                            <tr>
                                <td>Up and Running With Python</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Up and Running With Python</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Up and Running With Python</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Up and Running With Python</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Up and Running With Python</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Up and Running With Python</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Up and Running With Python</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Up and Running With Python</td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                    
                </div> */}
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        {/* <h5>Requirements</h5>
                        <ul>
                            <li>Macintosh (OSX)/ Windows(Vista and higher) Machine</li>
                            <li>Internet Connection
</li>
                            <li>Internet Connection
</li>
                        </ul> */}
                        <h5 style={{marginTop:"20px"}}>Description</h5>
                        <p style={{lineHeight:"25px" ,marginBottom:"50px"}}>Do you want to become a programmer? Do you want to learn how to create games, automate your browser, visualize data, and much more?
                   Python has rapidly become one of the most popular programming languages around the world. Compared to other languages such as Java or C++, Python consistently outranks and outperforms these languages in demand from businesses and job availability. The average Python developer makes over $100,000 - this number is only going to grow in the coming years. 
                    </p>
                    </div>
                </div>
                </div>
<div className="row">
   
   <div className="col-lg-6 col-md-6 col-12">
    <div className="reviewBox">
    <div className='row'>
    <div className="col-lg-3"> 
    <div className="reveiewProfile">
        <img src={profileimg} alt="" />
        </div>  
        </div>
    <div className="col-lg-9">
        <h6>James Whatt</h6>
        <div className="workshopRating">
        <GiRoundStar/>
        <GiRoundStar/>
        <GiRoundStar/>
        <GiRoundStar/>
        <GiRoundStar/>
        </div>
        <p> 4days ago</p>
    </div>
  <div className="col-lg-12 col-md-12 col-12">
        <p>Helpful if starting new, but a lot of information is out of date, understandably, but an update would be appreciated. Resources for other places to look for would also be very useful.</p>
    </div> 
    </div>
    </div>
   </div>
   <div className="col-lg-6 col-md-6 col-12">
    <div className="reviewBox">
    <div className='row'>
    <div className="col-lg-3"> 
    <div className="reveiewProfile">
        <img src={profileimg} alt="" />
        </div>  
        </div>
    <div className="col-lg-9">
        <h6>James Whatt</h6>
        <div className="workshopRating">
        <GiRoundStar/>
        <GiRoundStar/>
        <GiRoundStar/>
        <GiRoundStar/>
        <GiRoundStar/>
        </div>
        <p> 4days ago</p>
    </div>
  <div className="col-lg-12 col-md-12 col-12">
        <p>Helpful if starting new, but a lot of information is out of date, understandably, but an update would be appreciated. Resources for other places to look for would also be very useful.</p>
    </div> 
    </div>
    </div>
   </div>
   <div className="col-lg-6 col-md-6 col-12">
    <div className="reviewBox">
    <div className='row'>
    <div className="col-lg-3"> 
    <div className="reveiewProfile">
        <img src={profileimg} alt="" />
        </div>  
        </div>
    <div className="col-lg-9">
        <h6>James Whatt</h6>
        <div className="workshopRating">
        <GiRoundStar/>
        <GiRoundStar/>
        <GiRoundStar/>
        <GiRoundStar/>
        <GiRoundStar/>
        </div>
        <p> 4days ago</p>
    </div>
  <div className="col-lg-12 col-md-12 col-12">
        <p>Helpful if starting new, but a lot of information is out of date, understandably, but an update would be appreciated. Resources for other places to look for would also be very useful.</p>
    </div> 
    </div>
    </div>
   </div>
   <div className="col-lg-6 col-md-6 col-12">
    <div className="reviewBox">
    <div className='row'>
    <div className="col-lg-3"> 
    <div className="reveiewProfile">
        <img src={profileimg} alt="" />
        </div>  
        </div>
    <div className="col-lg-9">
        <h6>James Whatt</h6>
        <div className="workshopRating">
        <GiRoundStar/>
        <GiRoundStar/>
        <GiRoundStar/>
        <GiRoundStar/>
        <GiRoundStar/>
        </div>
       
        <p> 4days ago</p>
    </div>
  <div className="col-lg-12 col-md-12 col-12">
        <p>Helpful if starting new, but a lot of information is out of date, understandably, but an update would be appreciated. Resources for other places to look for would also be very useful.</p>
    </div> 
    </div>
    </div>
   </div>
</div>

            </div>
        </div>
        <div className="col-lg-4">
            <div className="workshopReveiw">
                <div className="workshopMedia">
                    <div className="workshopMediaImg">
                        <img src={workshopPre} alt="" />
                    </div>
                </div>
                <div className="workshopReveiwBody">
<h2>This course include</h2>


                 
                   <ul>
                    <li>14 hours on-demand video </li>
                    <li>1 article</li>
                    <li>3 downloadable resources</li>
                    <li>Full lifetime access</li>
                    <li>Access on mobile and TV</li>
                    <li>Certificate of completion</li>
                   </ul>
                   <div className="link"> 
                   <ul>
                    <li> </li>
                    <li> </li>
                    <li> </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </section>
   <Footer/>
   </>
  )
}

export default WorkshopDetails