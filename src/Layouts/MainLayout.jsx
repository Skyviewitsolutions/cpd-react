// here we are creating a common layouts;
import React from "react";
import Homepage_header from "../Component/Header/Homepage_header";
import Footer from "../Component/Footer/Footer";
import "./layouts.css";

const MainLayout = () => {
  return (
    <>
      <div className="container-fluid layout-container">
        <Homepage_header />
        <div className="layoutBody">

        </div>
        <div className="layoutFooter">
        <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
