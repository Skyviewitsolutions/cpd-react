import React from "react";
import "./userCard.css";
// import User from "../../assets/Images/user3.jpg";
import DefaultImg from "../../assets/Images/default.png";
// import { redirect } from "react-router-dom";

const UserCard = (props) => {
  const { founder, imgPath, imgName, domain, industry, website } = props;

  // const onRedirectToSite = () => {
  //   redirect("/" + website);
  // };

  return (
    <div className="coachPrfle">
      {imgName ? <img src={imgPath} alt="" /> : <img src={DefaultImg} alt="" />}

      <h5>{founder}</h5>
      <h6>
        {domain} & {industry}
      </h6>
      {/* <p>{coachInfo?.description}</p> */}
      <a href={website} target="_blank" rel="noreferrer">
        {website}
      </a>
    </div>
  );
};

export default UserCard;
