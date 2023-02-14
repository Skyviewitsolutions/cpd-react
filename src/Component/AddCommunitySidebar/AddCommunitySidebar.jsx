import React, { useEffect, useState } from "react";
import "./AddCommunitySidebar.css";
import { FaBars } from "react-icons/fa";
import $ from "jquery";

const AddCommunitySidebar = () => {

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
    <div className="addCommunitysidebar">
      <div className="sibar-community-toggle">
        <div class="btn sideBarBtn">
          <span class="ffa-bars">
            <FaBars className="faBars" />
          </span>
          <div class="texthideShow">Filters</div>
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
            <li>
              <a href="#">
                <button className="BtnMore">More+</button>
              </a>
            </li>
            <h6 className="AddCmntyMenuText">Other</h6>
            <li>
              <a href="#">
                <input type="checkbox" className="checkBoxAdCmnty" />{" "}
                <span>Sports</span>
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
                <span>Music</span>
              </a>
            </li>
            <li>
              <a href="#">
                <button className="ClearAllAddCmntybtn">Clear All</button>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      </div>
    </>
  );
};

export default AddCommunitySidebar;
