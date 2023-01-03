import React from "react";
import "./Workshop.css";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import "../../fonts/Inter-Bold.ttf";
import "../../fonts/Inter-Regular.ttf";
import { HiSearch } from "react-icons/hi";
import eye from "../../assets/Images/eye.svg";
import { CgHeart } from "react-icons/cg";
import workshop_bannerImage from "../../assets/Images/workshop_bannerImage.png";
import dommy_workshopImage from "../../assets/Images/dommy_workshopImage.png";
const Workshop = () => {
  return (
    <>
      <Homepage_header />
      <div className="wiper">
        <section className="Workshop_section1">
          <div className="row ">
            <div className="col-lg-8 col-md-7 col-12 workshop_headingblock ">
              <h1>Enroll Workshop</h1>
              <h5>Identify The Skills Yor Need To Advance Your Career</h5>
              <h6>Search For The Most Popular Workshops Skills Here</h6>
            </div>
            <div className="col-lg-4 col-md-5 col-12 ">
              <div className="workshop_imageblock">
              <img src={workshop_bannerImage} />
              </div>
            </div>
          </div>
          <div className="row workshop_searchBox">
            <div className="col-12 col-md-12 col-lg-4">
              <h5>This Week's Top Enroll Workshop</h5>
            </div>
            <div className="col-12 col-md-12 col-lg-8">
              <div className="workshop_searchBar">
                <div className="form-group ">
                  <HiSearch id="workshop_search" />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Here"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="Workshop_section2">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-12 d-lg-block d-block"></div>
            <div className="col-lg-9 col-md-12 col-12 ">
              <div className="row">
                <div className="col-lg-4 col-md-12 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={dommy_workshopImage} alt="" />
                      <div className="tags_onImage">
                        <h6>Workshop</h6>
                      </div>
                    </div>
                    <div className="workshopcard_descriptionBox">
                      <h4>
                        DIY Organic Bath and Body Products | Start your Business
                        at Home!
                      </h4>
                      <h5>September 3 | 3PM-September 13 | 4PM</h5>
                      <h6 class="colorText">Upcoming</h6>
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <div className="viewDetailsBox">
                          <span className="colorText">
                            {" "}
                            <img src={eye} alt="" /> View Details{" "}
                          </span>
                          <CgHeart id="heart-icon" />
                        </div>
                      </div>
                      <div className="domainBox">
                      <h6>Domain : Retail</h6>
                        <h6>Industries : All</h6>
                      </div>
                      <h6 id="enrolled">Currently Enrolled (5/10)</h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={dommy_workshopImage} alt="" />
                      <div className="tags_onImage">
                        <h6>Workshop</h6>
                      </div>
                    </div>
                    <div className="workshopcard_descriptionBox">
                      <h4>
                        DIY Organic Bath and Body Products | Start your Business
                        at Home!
                      </h4>
                      <h5>September 3 | 3PM-September 13 | 4PM</h5>
                      <h6 class="colorText">Upcoming</h6>
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <div className="viewDetailsBox">
                          <span className="colorText">
                            {" "}
                            <img src={eye} alt="" /> View Details{" "}
                          </span>
                          <CgHeart id="heart-icon" />
                        </div>
                      </div>
                      <div className="domainBox">
                      <h6>Domain : Retail</h6>
                        <h6>Industries : All</h6>
                      </div>
                      <h6 id="enrolled">Currently Enrolled (5/10)</h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={dommy_workshopImage} alt="" />
                      <div className="tags_onImage">
                        <h6>Workshop</h6>
                      </div>
                    </div>
                    <div className="workshopcard_descriptionBox">
                      <h4>
                        DIY Organic Bath and Body Products | Start your Business
                        at Home!
                      </h4>
                      <h5>September 3 | 3PM-September 13 | 4PM</h5>
                      <h6 class="colorText">Upcoming</h6>
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <div className="viewDetailsBox">
                          <span className="colorText">
                            {" "}
                            <img src={eye} alt="" /> View Details{" "}
                          </span>
                          <CgHeart id="heart-icon" />
                        </div>
                      </div>
                      <div className="domainBox">
                      <h6>Domain : Retail</h6>
                        <h6>Industries : All</h6>
                      </div>
                      <h6 id="enrolled">Currently Enrolled (5/10)</h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={dommy_workshopImage} alt="" />
                      <div className="tags_onImage">
                        <h6>Workshop</h6>
                      </div>
                    </div>
                    <div className="workshopcard_descriptionBox">
                      <h4>
                        DIY Organic Bath and Body Products | Start your Business
                        at Home!
                      </h4>
                      <h5>September 3 | 3PM-September 13 | 4PM</h5>
                      <h6 class="colorText">Upcoming</h6>
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <div className="viewDetailsBox">
                          <span className="colorText">
                            {" "}
                            <img src={eye} alt="" /> View Details{" "}
                          </span>
                          <CgHeart id="heart-icon" />
                        </div>
                      </div>
                      <div className="domainBox">
                      <h6>Domain : Retail</h6>
                        <h6>Industries : All</h6>
                      </div>
                      <h6 id="enrolled">Currently Enrolled (5/10)</h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={dommy_workshopImage} alt="" />
                      <div className="tags_onImage">
                        <h6>Workshop</h6>
                      </div>
                    </div>
                    <div className="workshopcard_descriptionBox">
                      <h4>
                        DIY Organic Bath and Body Products | Start your Business
                        at Home!
                      </h4>
                      <h5>September 3 | 3PM-September 13 | 4PM</h5>
                      <h6 class="colorText">Upcoming</h6>
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <div className="viewDetailsBox">
                          <span className="colorText">
                            {" "}
                            <img src={eye} alt="" /> View Details{" "}
                          </span>
                          <CgHeart id="heart-icon" />
                        </div>
                      </div>
                      <div className="domainBox">
                        <h6>Domain : Retail</h6>
                        <h6>Industries : All</h6>
                      </div>
                      <h6 id="enrolled">Currently Enrolled (5/10)</h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-12 workshop-card">
                  <div className="card">
                    <div className="workshopcard_media">
                      <img src={dommy_workshopImage} alt="" />
                      <div className="tags_onImage">
                        <h6>Workshop</h6>
                      </div>
                    </div>
                    <div className="workshopcard_descriptionBox">
                      <h4>
                        DIY Organic Bath and Body Products | Start your Business
                        at Home!
                      </h4>
                      <h5>September 3 | 3PM-September 13 | 4PM</h5>
                      <h6 class="colorText">Upcoming</h6>
                      <div className="workshop_FreeBox">
                        <h6>Free</h6>
                        <div className="viewDetailsBox">
                          <span className="colorText">
                            {" "}
                            <img src={eye} alt="" /> View Details{" "}
                          </span>
                          <CgHeart id="heart-icon" />
                        </div>
                      </div>
                      <div className="domainBox">
                        <h6>Domain : Retail</h6>
                        <h6>Industries : All</h6>
                      </div>
                      <h6 id="enrolled">Currently Enrolled <span>(5/10)</span></h6>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Workshop;
