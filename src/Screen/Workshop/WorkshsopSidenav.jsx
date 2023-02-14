import React, {useEffect} from 'react';
import './WorkshopSidenav.css';
import { FaBars } from "react-icons/fa";
import {BsFilterLeft} from 'react-icons/bs';
import $ from "jquery";

const WorkshsopSidenav = () => {

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
        <div className="workshopsidebar">
          <div className="sibar-community-toggle">
            <div class="btn sideBarBtn">
              <div class="texthideShow">
                <BsFilterLeft/>
              </div>
            </div>
            
            <nav class="sidebar">
              <div class="text">Details</div>
              <ul>
                <h6 className="AddCmntyMenuText">Domain</h6>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Finance</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Accounting</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Data Analytics</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Medical</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Digital Enablement</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Development</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Operations Management</span>
                  </a>
                </li>
                <h6 className="AddCmntyMenuText">Industry</h6>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Communications</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Retail</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Technology</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Health</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Educations</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                    <span>Public Sector</span>
                  </a>
                </li>
                
              </ul>
            </nav>
          </div>
          </div>
        </>
      );
    };
    
export default WorkshsopSidenav
