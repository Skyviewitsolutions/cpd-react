import React from "react";
import Footer from "../../Component/Footer/Footer";
import Homepage_header from "../../Component/Header/Homepage_header";
import dommy_workshopImage from "../../assets/Images/dommy_workshopImage.png";
import "./ViewDetail.css";
const ViewDetail = () => {
  return (
    <>
      <Homepage_header />
      <div className="viewDetailWrapper">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="workshopDetailImage">
              <img src={dommy_workshopImage} />
            </div>
          </div>
          <h5>
            {" "}
            DIY Organic Bath and Body Products | Start your Business at Home!
          </h5>
          <p> </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewDetail;
