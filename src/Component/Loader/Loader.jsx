import { Backdrop } from "@mui/material";
import React from "react";
import "./loader.css";
import { Modal } from "react-bootstrap";
import Lottie from "react-lottie";
import animationData from "../../lotties/Loader.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Modal show={true} centered>
        <div className="loaderCont">
          <Lottie options={defaultOptions} height={100} width={100} />
        </div>
      </Modal>
    </>
  );
};

export default Loader;
