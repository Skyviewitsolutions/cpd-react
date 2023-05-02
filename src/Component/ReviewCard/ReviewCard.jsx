import "./reviewCard.css";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Button from "../../Component/button/Button/Button";
import { endpoints } from "../services/endpoints";
import axios from "axios";
import showToast from "../CustomToast/CustomToast";


const ProductReview = (props) => {

  const { setRating } = props;
  const [activeStar, setActiveStar] = useState(0);

  const totalStars = 5;
  const activeStars = 3;
  const handleClick = (index) => {
    setActiveStar(index);
    setRating(index + 1);
  };
  return (
    <>
      <Box
        sx={{
          display: "inline-flex",
          position: "relative",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {[...new Array(totalStars)].map((arr, index) => {
          return (
            <Box
              position="relative"
              sx={{
                cursor: "pointer",
              }}
              onClick={() => handleClick(index)}
            >
              <Box
                sx={{
                  width: index <= activeStar ? "100%" : "0%",
                  overflow: "hidden",
                  position: "absolute",
                }}
              >
                <StarIcon />
              </Box>
              <Box>
                <StarBorderIcon />
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

const ReviewCard = (props) => {

  const {entityType , id } = props;

    const [rating , setRating ] = useState("");
    const [reviewNotes , setReviewNotes] = useState("");
    const [loading , setLoading] = useState(false)

    const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const clearFields = () =>{
    setRating(0)
    setReviewNotes("")
  }


    const submitReview = () =>{
      const url = endpoints.review.createReview;
      const val = {
        entity_type : entityType ,
        entity_id : id ,
        comment : reviewNotes ,
        rating : rating 
      }
      setLoading(true)
      axios.post(url , val , {headers : headers})
      .then((res) =>{
        setLoading(false)
        clearFields()
        if(res.data.result){
          showToast("Review submitted " , "success")
        }
        else if(res.data.result === false){
          showToast(res?.data?.message , "warning")
        }
      })
      .catch((err) =>{
        setLoading(false)
        console.log(err , "error")
      })
    }

  return (
    <div className="reiview_product common-card">
      <h5>Write Reviews</h5>

      <div className="product_review_text">
        <h6> Select Star</h6>
        <ProductReview setRating={setRating} />
        <div className="rieview_form mt-2">
          <label className="font-weight-900">Write Description :</label>
          <textarea
            className="form-control mt-2"
            rows="4"
            cols="50"
            placeholder="Write message ..."
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
          ></textarea>
          <div className="mt-2">
          <Button
            onClick={submitReview}
            title="Submit Review"
            loading={loading}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
