import React, { useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import $ from "jquery";
import { getDomainList, getIndustryList } from "../../utils/api";


const CustomFilter = (props) => {

  const { filterByDomain = [] , setFilterByDomain , filterByIndustry = [] , setFilterByIndustry } = props

  const [allDomain, setAllDomain] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);

  useEffect(() => {
    $(document).ready(function () {
      toggleNav();
    }, []);

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

  // here we are fetching industry and domain list ;

  useEffect(() => {

    getIndustryList()
      .then((res) => {
        if (res.data.data) {
          var data = res.data.data;
          setAllIndustry(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getDomainList()
      .then((res) => {
        if (res.data.data) {
          var data = res.data.data;
          setAllDomain(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleFilter = (value) =>{
  //   var val = value.toLowerCase();
  //   if(filterBy.includes(val)){
  //     var filteredData = filterBy.filter((item,index) => {return item.toLowerCase() != val})
  //     setFilterBy(filteredData)
  //   }
  //   else {
  //     setFilterBy((itm) =>{
  //       return [...itm , val]
  //     })
  //   }
  // }


  return (
    <div className="workshopsidebar">
      <div className="sibar-community-toggle">
        <div class="btn sideBarBtn">
          <div class="texthideShow">
            <BsFilterLeft />
          </div>
        </div>

        <nav class="sidebar">
          <div class="text">Details</div>
          <ul>
            <h6 className="AddCmntyMenuText">Domain</h6>
            {allDomain.length != 0 &&
              allDomain.map((domain, index) => {
                return (
                  <>
                    <li key={index}>
                      <a href="#">
                        <input type="checkbox" className="checkBoxAdCmnty" />
                        <span>{domain.title}</span>
                      </a>
                    </li>
                  </>
                );
              })}

           </ul>
           <ul>
            <h6 className="AddCmntyMenuText">Industry</h6>
            {allIndustry.length != 0 &&
              allIndustry.map((industry, index) => {
                return (
                  <>
                    <li key={index}>
                      <a href="#">
                        <input type="checkbox" className="checkBoxAdCmnty" />
                        <span>{industry.title}</span>
                      </a>
                    </li>
                  </>
                );
              })}
          
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CustomFilter;
