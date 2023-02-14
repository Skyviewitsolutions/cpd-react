import React from "react";
import {AiOutlinePlus} from "react-icons/ai"

const CreateBtn = ({onClick}) => {
  return (
    <>
      <button
        className="coachingBtn createCoachingBtn d-flex align-items-center justify-content-center"
        onClick={onClick}
      >
        Create
      </button>
    </>
  );
};

export default CreateBtn;
