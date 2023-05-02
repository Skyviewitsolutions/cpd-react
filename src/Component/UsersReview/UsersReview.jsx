import React from "react";
import "./userReview.css";
import { AiFillStar } from "react-icons/ai";
import User from "../../assets/Icons/user.png";
import { useState } from "react";
import { useEffect } from "react";
import { endpoints, imgPath } from "../services/endpoints";
import axios from "axios";


const UsersReview = (props) => {

  // const reviews = [1, 2, 3, 4, 5];
  const {id} = props;

  const [reviews , setReviews] = useState([])
  const token = localStorage.getItem("token");
  const imgPth = imgPath.user;

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const getAllReviews = () =>{
    const url = endpoints.review.listOfReview + id
    axios.get(url , {headers : headers})
    .then((res) =>{
      if(res.data.result){
        const val = res.data.data;
        setReviews(val);
      }
    })
  }
  useEffect(() =>{
    getAllReviews()
  },[])

  return (
    <>
    {reviews.length !== 0 &&
    <div className="userReviewCont">
      <div className="product_Revews_header">
        <h5>Reviews</h5>
      </div>
      <div className="product_revew_details">
        {reviews.map((item, index) => {
        
          const img = imgPth + "/" + item.user_profile?.avtar
          console.log(img , "d")
          return (
              <div className="row no-gutters revwDtlsBox d-flex" key={index}>
                <div className="col-auto review_customer_img">
                  <img
                    src={item.user_profile?.avtar ? img : User}
                  />
                </div>
                <div className="col rivewDetls">
                  <p className="review-customer-name">William Rovert</p>
                  <h6
                    style={{
                      display: "inline-block",
                      direction: "ltr",
                      justifyContent: "center",
                    }}
                  >
                    <span className="rivewDetls_rating"> {item?.rating} </span>
                    <AiFillStar color="var(--primary)" />
                  </h6>
                  <p className="review-cutomer-content">
                   {item?.comment}
                  </p>
                </div>
              </div>
          );
        })}
      </div>
    </div>}
    </>);
};

export default UsersReview;
