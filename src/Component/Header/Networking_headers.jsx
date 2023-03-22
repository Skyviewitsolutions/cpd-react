import React from "react";
import "./Networking_headers.css";
const Networking_headers = (props) => {

  const {title } = props
  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-12 col-md-12 col-12 explore">
            <h5>Explore {title}</h5>
            <h6>
              Please Click <a href="">update your resume</a> for view more
              community and their events
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Networking_headers;
