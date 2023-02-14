import React, { useState , useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import { endpoints } from "../../services/endpoints";
import axios from "axios";

const Card = (props) => {
  return <></>;
};

const MyCoachingList = () => {

  const [coachingList, setCoachingList] = useState([]);
  var token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const options = {
    margin: 20,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
        margin: 10,
      },
      400: {
        items: 1,
        margin: 10,
      },
      600: {
        items: 1.5,
      },
      700: {
        items: 2,
      },
      768: {
        items: 2,
      },
      800: {
        items: 2,
      },
      820: {
        items: 3,
      },
      1000: {
        items: 3,
      },

      1440: {
        items: 3,
      },
    },
  };


  const getMyCoachings = () => {
    const url = endpoints.coaches.myCoachings;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        console.log(res, "this is the response");
        if (res.data.result) {
          var data = res.data.data;
          setCoachingList(data);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    getMyCoachings();
  }, []);

  return (
    <div className="row">
      <OwlCarousel
        className="owl-theme category"
        id="category"
        items={5}
        loop
        margin={10}
        dots={false}
        {...options}
        nav
      >
        {coachingList.map((item, index) => {
          return (
            <>
              <Card data={item} key={index} />
            </>
          );
        })}
      </OwlCarousel>
    </div>
  );
};

export default MyCoachingList;
