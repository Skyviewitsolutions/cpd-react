import React from "react";
import "./CareerFareLinear.css";
import { HiSearch } from "react-icons/hi";
import { FiGrid } from "react-icons/fi";
import { TfiMenuAlt } from "react-icons/tfi";
import Homepage_header from "../../Component/Header/Homepage_header";
import Footer from "../../Component/Footer/Footer";
import USNV from "../../assets/Images/USNV.png";
import { BsHeart } from "react-icons/bs";
import CareerSidenav from '../Career/CareerSidenav';
import "../../fonts/Inter-Bold.ttf";
import "../../fonts/Inter-Medium.ttf";
import "../../fonts/Inter-Regular.ttf";
import "../../fonts/Poppins-Regular.ttf";
const CareerFareLinear = () => {
  return (
    <>
      <Homepage_header />
      <div className="careerLinearwrapper">
        <div className="row">
          <div className="col-lg-3 mt-3">
            <CareerSidenav/>
          </div>
          <div className="col-lg-9 col-md-12 col-12">
            <section>
              <div className="row">
                <div className="col-lg-2 col-md-3  ">
                  <h3 id="careerLinearHeading">Career Fare</h3>
                </div>
                <div className="col-lg-5 col-md-9 col-12">
                  <div className="careerLinear_searchBar">
                    <div className="form-group ">
                      <HiSearch id="careerLinear_search" />
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search Here"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="careerLinearviewList">
                    <ul>
                      <li>
                        <h6>View By :</h6>
                      </li>
                      <li>
                        <FiGrid />
                      </li>
                      <li>
                        <TfiMenuAlt />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-8 col-12">
                  <h6 id="careerLinearNewest">Newest</h6>
                </div>
              </div>
            </section>
            <section className="careerLinearCardBox">
              <div className="careerLinearCard">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-12">
                    <div className="careerLinearimgbox">
                      <img src={USNV} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-9 col-12">
                    <div className="careerLinearCardDescription">
                      <h3>TALLER SOBRE DECORACION DE INTERIORES</h3>
                      <p>
                        In publishing and graphic design, Lorem ipsum is a
                        placeholder text commonly used to demonstrate the visual
                        form of a document
                      </p>
                      <h4>Sun, Oct 9, 2022 12:30 AM IST</h4>
                      <h5>STARTS AT $57.00</h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12 col-12">
                    <div className="careerLinearCardRight">
                      <BsHeart />
                      <button type="submit" className="careerLinearCardsubmit">
                        Click To View On Website
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="careerLinearCard">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-12">
                    <div className="careerLinearimgbox">
                      <img src={USNV} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-9 col-12">
                    <div className="careerLinearCardDescription">
                      <h3>TALLER SOBRE DECORACION DE INTERIORES</h3>
                      <p>
                        In publishing and graphic design, Lorem ipsum is a
                        placeholder text commonly used to demonstrate the visual
                        form of a document
                      </p>
                      <h4>Sun, Oct 9, 2022 12:30 AM IST</h4>
                      <h5>STARTS AT $57.00</h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12 col-12">
                    <div className="careerLinearCardRight">
                      <BsHeart />
                      <button type="submit" className="careerLinearCardsubmit">
                        Click To View On Website
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="careerLinearCard">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-12">
                    <div className="careerLinearimgbox">
                      <img src={USNV} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-9 col-12">
                    <div className="careerLinearCardDescription">
                      <h3>TALLER SOBRE DECORACION DE INTERIORES</h3>
                      <p>
                        In publishing and graphic design, Lorem ipsum is a
                        placeholder text commonly used to demonstrate the visual
                        form of a document
                      </p>
                      <h4>Sun, Oct 9, 2022 12:30 AM IST</h4>
                      <h5>STARTS AT $57.00</h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12 col-12">
                    <div className="careerLinearCardRight">
                      <BsHeart />
                      <button type="submit" className="careerLinearCardsubmit">
                        Click To View On Website
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="careerLinearCard">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-12">
                    <div className="careerLinearimgbox">
                      <img src={USNV} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-9 col-12">
                    <div className="careerLinearCardDescription">
                      <h3>TALLER SOBRE DECORACION DE INTERIORES</h3>
                      <p>
                        In publishing and graphic design, Lorem ipsum is a
                        placeholder text commonly used to demonstrate the visual
                        form of a document
                      </p>
                      <h4>Sun, Oct 9, 2022 12:30 AM IST</h4>
                      <h5>STARTS AT $57.00</h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12 col-12">
                    <div className="careerLinearCardRight">
                      <BsHeart />
                      <button type="submit" className="careerLinearCardsubmit">
                        Click To View On Website
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="careerLinearCard">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-12">
                    <div className="careerLinearimgbox">
                      <img src={USNV} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-9 col-12">
                    <div className="careerLinearCardDescription">
                      <h3>TALLER SOBRE DECORACION DE INTERIORES</h3>
                      <p>
                        In publishing and graphic design, Lorem ipsum is a
                        placeholder text commonly used to demonstrate the visual
                        form of a document
                      </p>
                      <h4>Sun, Oct 9, 2022 12:30 AM IST</h4>
                      <h5>STARTS AT $57.00</h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12 col-12">
                    <div className="careerLinearCardRight">
                      <BsHeart />
                      <button type="submit" className="careerLinearCardsubmit">
                        Click To View On Website
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CareerFareLinear;
