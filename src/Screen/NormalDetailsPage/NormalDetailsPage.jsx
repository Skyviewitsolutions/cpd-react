import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import "./normalDetailsPage.css";
import BackGroundImg from "../../assets/Images/background.jpg";
import Star from "../../assets/Icons/star.png";
import DummyBanner from "../../assets/Icons/dummyBanner.png";
import CourseContent from "../../Component/CourseContent/CourseContent";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineYoutube, AiOutlineTrophy } from "react-icons/ai";
import { BiFileBlank, BiMobile } from "react-icons/bi";
import { RiFolderDownloadLine } from "react-icons/ri";
import { MdOutlineLink } from "react-icons/md";
import User from "../../assets/Images/user3.jpg";
import workshopImg1 from "../../assets/Images/workshopimg1.png";
import workshopImg2 from "../../assets/Images/workshopimg2.jpeg";
import {RiShareFill} from "react-icons/ri";


const NormalDetailsPage = () => {

  return (
    <MainLayout>
      <div className="dtlscont">
        <div className="dltsline"></div>
        <div className="dltsMain">
          <img src={BackGroundImg} alt="" />
          <div className="wrkshoDtls">
            <h1 className="wrkshTitle">Future of PHP</h1>
            <p className="wrkpara">
              The term PHP is an acronym for PHP: Hypertext Preprocessor. PHP is
              a server-side scripting language designed specifically for web
              development. It is open-source which means it is free to download
              and use. It is very simple to learn and use. The files have the
              extension “.php”. Rasmus Lerdorf inspired the first version of PHP
              and participated in the later versions. It is an interpreted
              language and it does not require a compiler.{" "}
            </p>
            <div className="wrkshpOther flex-wrap">
              <h6>Max Members : 50</h6>
              <h6>Joined Members : 3</h6>
              <h6>Session Type : Offline</h6>
            </div>
          </div>
        </div>

        <div className="dltsSecond ">
          <div className="row " style={{ width: "100%" }}>
            <div className="dltsSecondLeft col-lg-7 col-md-12 col-12">
              <div className="harbar">
                <h5>Home</h5> <span>></span>
                <h5>Workshop</h5> <span>></span>
                <h5>Details</h5>
              </div>
              <div className="whatlearn">
                <h4>What You'll Learn</h4>
                <div className="whatLearnP">
                  <h6>
                    <img src={Star} alt="" />
                    Create you own php program
                  </h6>
                  <h6>
                    <img src={Star} alt="" />
                    Create you own php program
                  </h6>
                  <h6>
                    <img src={Star} alt="" />
                    Create you own php program
                  </h6>
                </div>
              </div>

              <div className="crsCont">
                <h4>Course Content</h4>
                <div className="crsttitlesc">
                  <p>
                    15 Sections <span></span> 146 Lectures <span></span> 14H 42M
                    Total Length
                  </p>
                  <h6>Expand All Sections</h6>
                </div>
                <div className="accordiancont">
                  <CourseContent />
                </div>

                {/* here we are creating descriptions sections */}
                <div className="wrkshopDescriptions">
                  <h5>Descriptions</h5>
                  <p>
                    The term PHP is an acronym for PHP: Hypertext Preprocessor.
                    PHP is a server-side scripting language designed
                    specifically for web development. It is open-source which
                    means it is free to download and use. It is very simple to
                    learn and use. The files have the extension “.php”. Rasmus
                    Lerdorf inspired the first version of PHP and participated
                    in the later versions. It is an interpreted language and it
                    does not require a compiler.{" "}
                  </p>
                  <ul>
                    <li>During this exclusive webinar , you will learn:</li>
                    <li>
                      Techniques of crafting memorable speeches that really
                      engage your audience .
                    </li>
                    <li>
                      Proven methods for developing confidence when talking
                      infornt of large groups
                    </li>
                    <li>Tips for overcoming fear of public speaking </li>
                    <li>
                      Strategies for giving presentations that inspires others.
                    </li>
                    <li>
                      How to craft stories and use anecdotes effectively in
                      order to make your message more compilling and much more!
                    </li>
                  </ul>
                </div>

                <div className="relatedCourse">
                  <h4 className="corsTitle">Related Workshop</h4>
                  <div className="courseBox">
                    <div className="d-flex">
                      <img src={workshopImg1} alt="" />
                      <div>
                        <h5>
                          The complete Python bootcamp for beginners to learn
                          everything about python.
                        </h5>
                        <h6>
                          23 hours total <li>Updated 23/04/2022</li>
                        </h6>
                      </div>
                    </div>
                    <div className="pricePart">
                      <h6>Price : 243 HKD</h6>
                    </div>
                  </div>
                  <div className="courseBox">
                    <div className="d-flex">
                      <img src={workshopImg1} alt="" />
                      <div>
                        <h5>
                          The complete Python bootcamp for beginners to learn
                          everything about python.
                        </h5>
                        <h6>
                          23 hours total <li>Updated 23/04/2022</li>
                        </h6>
                      </div>
                    </div>
                    <div className="pricePart">
                      <h6>Price : 243 HKD</h6>
                    </div>
                  </div>
                  <div className="courseBox">
                    <div className="d-flex">
                      <img src={workshopImg1} alt="" />
                      <div>
                        <h5>
                          The complete Python bootcamp for beginners to learn
                          everything about python.
                        </h5>
                        <h6>
                          23 hours total <li>Updated 23/04/2022</li>
                        </h6>
                      </div>
                    </div>
                    <div className="pricePart">
                      <h6>Price : 243 HKD</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dltsSecondRght col-lg-5 col-md-12 col-12">
              <div className="vdoDtls">
                <div className="vdoDtlsVdo">
                  <img src={DummyBanner} alt="" />
                  <div className="vdoPlay">
                    <BsFillPlayFill size={36} />
                  </div>
                  <h6>Preview this course</h6>
                </div>
                <div className="vdoTxt">
                  <h5>Price : 624 HKD </h5>
                  <button className="addtoCrt">Book Now</button>
                </div>
              </div>

              <div className="crsIncld">
                <h6>This Course Includes : </h6>
                <div className="crsIncldBx">
                  <AiOutlineYoutube size={18} color="black" />
                  <h6>14 hours on-demand video</h6>
                </div>
                <div className="crsIncldBx">
                  <BiFileBlank size={18} color="black" />
                  <h6>1 Article</h6>
                </div>
                <div className="crsIncldBx">
                  <RiFolderDownloadLine size={18} color="black" />
                  <h6>3 downloadable resources</h6>
                </div>
                <div className="crsIncldBx">
                  <MdOutlineLink size={18} color="black" />
                  <h6>FullTime access</h6>
                </div>
                <div className="crsIncldBx">
                  <BiMobile size={18} color="black" />
                  <h6>Access to mobile and TV</h6>
                </div>
                <div className="crsIncldBx">
                  <AiOutlineTrophy size={18} color="black" />
                  <h6>Certificate of completion</h6>
                </div>
                <div className="crsIncldBx">
                  
                  <button className="addtoCrt"> <RiShareFill size={18} color="white" style={{marginRight : "10px" }} /> Share</button>
                </div>
              </div>

              {/* coach profile */}
              <div className="coachPrfle">
                <img src={User} alt="" />
                <h5>Rovert William</h5>
                <h6>Technical & IOT</h6>
                <p>
                  Robert William is a professional speaker and a php developer
                  and has a 15 years of experience in this technology . I have
                  worked on serveral company domestic and internals and also
                  doing working currenly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NormalDetailsPage;
