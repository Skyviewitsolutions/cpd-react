

import React from "react";
import { toast } from "react-toastify";

const CustomToast = ({ message, type }) => {
  return (
    <div className={`custom-toast custom-toast-${type}`}>
      <span>{message}</span>
    </div>
  );
};

const showToast = (message, type) => {
  if(type === "success"){
  toast(
    <CustomToast message={message} type={type} />,
    { autoClose: 1500, position: "top-right" , type : "success"}
  );
  }
  else if(type === "warning"){
    toast(
      <CustomToast message={message} type={type} />,
      { autoClose: 1500, position: "top-right" , type : "warning"}
    );
  }
  else if(type === "info"){
    toast(
      <CustomToast message={message} type={type} />,
      { autoClose: 1500, position: "top-right" , type : "info"}
    );
  }
  else if(type === "error"){
    toast(
      <CustomToast message={message} type={type} />,
      { autoClose: 1500, position: "top-right" , type : "error"}
    );
  }
};

export default showToast;
