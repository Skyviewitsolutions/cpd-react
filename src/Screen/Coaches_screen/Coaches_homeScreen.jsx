import React , {useState} from "react";
import "./Coaches_homeScreen.css";
import dommy_person from "../../assets/Images/dommy_person.jfif";
import time from "../../assets/Images/time.svg";
import "../../fonts/Inter-Bold.ttf";
import "../../fonts/Inter-Regular.ttf";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import { HiSearch } from "react-icons/hi";
import Sidenavbar from "../../Component/navbar/Sidenavbar";
import { GrPowerForceShutdown } from "react-icons/gr";
import BookCoaches from "../../Component/Modal/BookCoaches/BookCoaches";
const Coaches_homeScreen = () => {
  const [BookCoachesShow, setBookCoachesShow] = useState(false);
  return (
    <>
      <Homepage_header />

      <section className="coachScreen">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 d-lg-block d-none coachScreen_left">
              <h5>Book Coaches</h5>
              <Sidenavbar />
            </div>
            <div className="col-lg-10 col-md-12 col-12 coachScreen_right">
              <div className="coach_searchBar">
                <div className="form-group ">
                  <HiSearch id="coach_search" />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Here"
                  />
                </div>
              </div>
              <div className="row ">
                <div class=" col-lg-6 col-md-12 col-12 ">
                <div className="card_large">
                  <div className="card CoachScreen_coachesList">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-12 img-box">
                        <div class=" img-box img-placeholder">
                          <img
                            src={dommy_person}
                            alt="#"
                            className="card__body-cover-image"
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-12 nameBox">
                        <div className="coachscreen_coachname">
                          <h5>Professor Joy</h5>
                          <div className="coaches_tooltip">
                            <GrPowerForceShutdown />
                            <span class="tooltiptext">
                              <h5>Robert Patricia</h5>
                              <p>
                                I am a design educator with areas of work being
                                fashion, textile and pattern design, spanning
                                almost eight years. I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my
                              </p>
                            </span>
                          </div>
                        </div>

                        <h6> Expertise</h6>
                        <p>Executive Coach | Career Coach</p>
                        <h6 className="details">Details</h6>
                        <p>
                          Certified professional teacher or coach assign they
                          develop your estimations of goals
                        </p>
                      </div>
                      <div className="col-lg-4  col-md-4 col-12 availabilityBox">
                        <h6>
                          Availability: <span> Mon-Friday</span>
                        </h6>
                        <h6>
                          {" "}
                          TimeSlot:
                          <img src={time} alt="" className="" />
                          <span>9pm to 5pm</span>{" "}
                        </h6>
                        <button
                          className="coach_List_bookButton"
                          onClick={() => setBookCoachesShow(true)}
                        >
                          {" "}
                          Book
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-6 col-md-12 col-12 ">
                <div className="card_large">
                  <div className="card CoachScreen_coachesList">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-12 img-box">
                        <div class=" img-box img-placeholder">
                          <img
                            src={dommy_person}
                            alt="#"
                            className="card__body-cover-image"
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-12 nameBox">
                        <div className="coachscreen_coachname">
                          <h5>Professor Joy</h5>
                          <div className="coaches_tooltip">
                            <GrPowerForceShutdown />
                            <span class="tooltiptext">
                              <h5>Robert Patricia</h5>
                              <p>
                                I am a design educator with areas of work being
                                fashion, textile and pattern design, spanning
                                almost eight years. I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my
                              </p>
                            </span>
                          </div>
                        </div>

                        <h6> Expertise</h6>
                        <p>Executive Coach | Career Coach</p>
                        <h6 className="details">Details</h6>
                        <p>
                          Certified professional teacher or coach assign they
                          develop your estimations of goals
                        </p>
                      </div>
                      <div className="col-lg-4  col-md-4 col-12 availabilityBox">
                        <h6>
                          Availability: <span> Mon-Friday</span>
                        </h6>
                        <h6>
                          {" "}
                          TimeSlot:
                          <img src={time} alt="" className="" />
                          <span>9pm to 5pm</span>{" "}
                        </h6>
                        <button
                          className="coach_List_bookButton"
                          onClick={() => setBookCoachesShow(true)}
                        >
                          {" "}
                          Book
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-6 col-md-12 col-12 ">
                <div className="card_large">
                  <div className="card CoachScreen_coachesList">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-12 img-box">
                        <div class=" img-box img-placeholder">
                          <img
                            src={dommy_person}
                            alt="#"
                            className="card__body-cover-image"
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-12 nameBox">
                        <div className="coachscreen_coachname">
                          <h5>Professor Joy</h5>
                          <div className="coaches_tooltip">
                            <GrPowerForceShutdown />
                            <span class="tooltiptext">
                              <h5>Robert Patricia</h5>
                              <p>
                                I am a design educator with areas of work being
                                fashion, textile and pattern design, spanning
                                almost eight years. I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my
                              </p>
                            </span>
                          </div>
                        </div>

                        <h6> Expertise</h6>
                        <p>Executive Coach | Career Coach</p>
                        <h6 className="details">Details</h6>
                        <p>
                          Certified professional teacher or coach assign they
                          develop your estimations of goals
                        </p>
                      </div>
                      <div className="col-lg-4  col-md-4 col-12 availabilityBox">
                        <h6>
                          Availability: <span> Mon-Friday</span>
                        </h6>
                        <h6>
                          {" "}
                          TimeSlot:
                          <img src={time} alt="" className="" />
                          <span>9pm to 5pm</span>{" "}
                        </h6>
                        <button
                          className="coach_List_bookButton"
                          onClick={() => setBookCoachesShow(true)}
                        >
                          {" "}
                          Book
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>

                <div class=" col-lg-6 col-md-12 col-12 ">
                <div className="card_large">
                  <div className="card CoachScreen_coachesList">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-12 img-box">
                        <div class=" img-box img-placeholder">
                          <img
                            src={dommy_person}
                            alt="#"
                            className="card__body-cover-image"
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-12 nameBox">
                        <div className="coachscreen_coachname">
                          <h5>Professor Joy</h5>
                          <div className="coaches_tooltip">
                            <GrPowerForceShutdown />
                            <span class="tooltiptext">
                              <h5>Robert Patricia</h5>
                              <p>
                                I am a design educator with areas of work being
                                fashion, textile and pattern design, spanning
                                almost eight years. I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my
                              </p>
                            </span>
                          </div>
                        </div>

                        <h6> Expertise</h6>
                        <p>Executive Coach | Career Coach</p>
                        <h6 className="details">Details</h6>
                        <p>
                          Certified professional teacher or coach assign they
                          develop your estimations of goals
                        </p>
                      </div>
                      <div className="col-lg-4  col-md-4 col-12 availabilityBox">
                        <h6>
                          Availability: <span> Mon-Friday</span>
                        </h6>
                        <h6>
                          {" "}
                          TimeSlot:
                          <img src={time} alt="" className="" />
                          <span>9pm to 5pm</span>{" "}
                        </h6>
                        <button
                          className="coach_List_bookButton"
                          onClick={() => setBookCoachesShow(true)}
                        >
                          {" "}
                          Book
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-6 col-md-12 col-12 ">
                <div className="card_large">
                  <div className="card CoachScreen_coachesList">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-12 img-box">
                        <div class=" img-box img-placeholder">
                          <img
                            src={dommy_person}
                            alt="#"
                            className="card__body-cover-image"
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-12 nameBox">
                        <div className="coachscreen_coachname">
                          <h5>Professor Joy</h5>
                          <div className="coaches_tooltip">
                            <GrPowerForceShutdown />
                            <span class="tooltiptext">
                              <h5>Robert Patricia</h5>
                              <p>
                                I am a design educator with areas of work being
                                fashion, textile and pattern design, spanning
                                almost eight years. I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my
                              </p>
                            </span>
                          </div>
                        </div>

                        <h6> Expertise</h6>
                        <p>Executive Coach | Career Coach</p>
                        <h6 className="details">Details</h6>
                        <p>
                          Certified professional teacher or coach assign they
                          develop your estimations of goals
                        </p>
                      </div>
                      <div className="col-lg-4  col-md-4 col-12 availabilityBox">
                        <h6>
                          Availability: <span> Mon-Friday</span>
                        </h6>
                        <h6>
                          {" "}
                          TimeSlot:
                          <img src={time} alt="" className="" />
                          <span>9pm to 5pm</span>{" "}
                        </h6>
                        <button
                          className="coach_List_bookButton"
                          onClick={() => setBookCoachesShow(true)}
                        >
                          {" "}
                          Book
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>

                <div class=" col-lg-6 col-md-12 col-12 ">
                <div className="card_large">
                  <div className="card CoachScreen_coachesList">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-12 img-box">
                        <div class=" img-box img-placeholder">
                          <img
                            src={dommy_person}
                            alt="#"
                            className="card__body-cover-image"
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-12 nameBox">
                        <div className="coachscreen_coachname">
                          <h5>Professor Joy</h5>
                          <div className="coaches_tooltip">
                            <GrPowerForceShutdown />
                            <span class="tooltiptext">
                              <h5>Robert Patricia</h5>
                              <p>
                                I am a design educator with areas of work being
                                fashion, textile and pattern design, spanning
                                almost eight years. I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my
                              </p>
                            </span>
                          </div>
                        </div>

                        <h6> Expertise</h6>
                        <p>Executive Coach | Career Coach</p>
                        <h6 className="details">Details</h6>
                        <p>
                          Certified professional teacher or coach assign they
                          develop your estimations of goals
                        </p>
                      </div>
                      <div className="col-lg-4  col-md-4 col-12 availabilityBox">
                        <h6>
                          Availability: <span> Mon-Friday</span>
                        </h6>
                        <h6>
                          {" "}
                          TimeSlot:
                          <img src={time} alt="" className="" />
                          <span>9pm to 5pm</span>{" "}
                        </h6>
                        <button
                          className="coach_List_bookButton"
                          onClick={() => setBookCoachesShow(true)}
                        >
                          {" "}
                          Book
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-6 col-md-12 col-12 ">
                <div className="card_large">
                  <div className="card CoachScreen_coachesList">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-12 img-box">
                        <div class=" img-box img-placeholder">
                          <img
                            src={dommy_person}
                            alt="#"
                            className="card__body-cover-image"
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-12 nameBox">
                        <div className="coachscreen_coachname">
                          <h5>Professor Joy</h5>
                          <div className="coaches_tooltip">
                            <GrPowerForceShutdown />
                            <span class="tooltiptext">
                              <h5>Robert Patricia</h5>
                              <p>
                                I am a design educator with areas of work being
                                fashion, textile and pattern design, spanning
                                almost eight years. I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my
                              </p>
                            </span>
                          </div>
                        </div>

                        <h6> Expertise</h6>
                        <p>Executive Coach | Career Coach</p>
                        <h6 className="details">Details</h6>
                        <p>
                          Certified professional teacher or coach assign they
                          develop your estimations of goals
                        </p>
                      </div>
                      <div className="col-lg-4  col-md-4 col-12 availabilityBox">
                        <h6>
                          Availability: <span> Mon-Friday</span>
                        </h6>
                        <h6>
                          {" "}
                          TimeSlot:
                          <img src={time} alt="" className="" />
                          <span>9pm to 5pm</span>{" "}
                        </h6>
                        <button
                          className="coach_List_bookButton"
                          onClick={() => setBookCoachesShow(true)}
                        >
                          {" "}
                          Book
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                <div class=" col-lg-6 col-md-12 col-12 ">
                <div className="card_large">
                  <div className="card CoachScreen_coachesList">
                    <div className="row">
                      <div className="col-lg-3 col-md-3 col-12 img-box">
                        <div class=" img-box img-placeholder">
                          <img
                            src={dommy_person}
                            alt="#"
                            className="card__body-cover-image"
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-12 nameBox">
                        <div className="coachscreen_coachname">
                          <h5>Professor Joy</h5>
                          <div className="coaches_tooltip">
                            <GrPowerForceShutdown />
                            <span class="tooltiptext">
                              <h5>Robert Patricia</h5>
                              <p>
                                I am a design educator with areas of work being
                                fashion, textile and pattern design, spanning
                                almost eight years. I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my I have previously taught at
                                Satyam Fashion Institute, Noida; International
                                Polytechnic for Women, Delhi; P.V. Polytechnic,
                                S.N.D.T., Mumbai, and Ivanna Institute of
                                Fashion Technology & Hotel management, Ludhiana.
                                I believe design is best taught in a
                                collaborative learning process which I try to
                                reinforce in my
                              </p>
                            </span>
                          </div>
                        </div>

                        <h6> Expertise</h6>
                        <p>Executive Coach | Career Coach</p>
                        <h6 className="details">Details</h6>
                        <p>
                          Certified professional teacher or coach assign they
                          develop your estimations of goals
                        </p>
                      </div>
                      <div className="col-lg-4  col-md-4 col-12 availabilityBox">
                        <h6>
                          Availability: <span> Mon-Friday</span>
                        </h6>
                        <h6>
                          {" "}
                          TimeSlot:
                          <img src={time} alt="" className="" />
                          <span>9pm to 5pm</span>{" "}
                        </h6>
                        <button
                          className="coach_List_bookButton"
                          onClick={() => setBookCoachesShow(true)}
                        >
                          {" "}
                          Book
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BookCoaches
        show={BookCoachesShow}
        onHide={() => setBookCoachesShow(false)}
        // BookCoachesShow={BookCoachesShow} setBookCoachesShow
        // ={setBookCoachesShow}
      />
      <Footer />
    </>
  );
};

export default Coaches_homeScreen;
