import React,{useEffect} from 'react';
import './CareerSidenav.css';
import {BsFilterLeft} from 'react-icons/bs';
import $ from "jquery";
const CareerSidenav = () => {
    useEffect(() => {
        $(document).ready(function () {
          toggleNav();
        },[]);
    
        function toggleNav(params) {
          var windowWidth = $(window).width();
          if (windowWidth > 820) {
            $(".sidebar").toggleClass("show");
            $(".btn").addClass("click");
          }
        }
    
        $(window).on("resize", function (event) {
          toggleNav();
        });
    
        $(".btn").click(function () {
          $(this).toggleClass("click");
          $(".sidebar").toggleClass("show");
        });
        $(".feat-btn").click(function () {
          $("nav ul .feat-show").toggleClass("show");
          $("nav ul .first").toggleClass("rotate");
        });
        $(".serv-btn").click(function () {
          $("nav ul .serv-show").toggleClass("show1");
          $("nav ul .second").toggleClass("rotate");
        });
        $("nav ul li").click(function () {
          $(this).addClass("active").siblings().removeClass("active");
        });
      }, []);
    
    
    
      return (
        <>
        <div className="careersidebar">
          <div className="sibar-community-toggle">
            <div class="btn sideBarBtn">
              {/* <span class="ffa-bars">
                <FaBars className="faBars" />
              </span> */}
              <div class="texthideShow">
                <BsFilterLeft/>
              </div>
            </div>
            
            <nav class="sidebar">
              <div class="text">Details</div>
              <ul>
                <h6 className="AddCmntyMenuText">Fare Type</h6>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Internship</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Job Fare</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Events</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Seminar</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Workshop</span>
                  </a>
                </li>
                
                
                <h6 className="AddCmntyMenuText">Format</h6>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Class</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Conference</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Festival</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Appearance</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Attraction</span>
                  </a>
                </li>

                <h6 className="AddCmntyMenuText">Company</h6>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Screening</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Seminar</span>
                  </a>
                </li>
                
              </ul>
            </nav>
          </div>
          </div>
    </>
  )
}

export default CareerSidenav
