import { Backdrop } from "@mui/material";
import React from "react";
import "./loader.css";
import { Modal } from "react-bootstrap";

const Loader = () => {
  return (
    <>
      <Modal show={true}>
        <div className="loaderContainer">
        <div class="book">
          <div class="inner">
            <div class="left"></div>
            <div class="middle"></div>
            <div class="right"></div>
          </div>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        </div>
      </Modal>
    </>
  );
};

export default Loader;
