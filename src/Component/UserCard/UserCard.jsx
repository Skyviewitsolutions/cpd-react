import React from "react";
import "./userCard.css";
import User from "../../assets/Images/user3.jpg";
import DefaultImg from "../../assets/Images/default.png"

const UserCard = (props) => {
  const { coachInfo, imgPath, imgName } = props;

  return (
    <div className="coachPrfle">
      {imgName ? <img src={imgPath} alt="" /> : <img src={DefaultImg} />}

      <h5>
        {coachInfo?.first_name} {coachInfo?.last_name}
      </h5>
      <h6>
        {coachInfo?.domain?.[0]} & {coachInfo?.industry?.[0]}
      </h6>
      <p>{coachInfo?.description}</p>
    </div>
  );
};

export default UserCard;
