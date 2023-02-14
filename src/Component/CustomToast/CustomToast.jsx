import React from 'react';
import "./customToast.css";

const CustomToast = () => {
  return (
    <div class="container">
    <div class="notification success">
      <i class="fa-solid fa-check"></i>
      <span>A successful Toast</span>
      <i class="fa-solid fa-times"></i>
    </div>
    <div class="notification info">
      <i class="fa-solid fa-info"></i>
      <span>A informational Toast</span>
      <i class="fa-solid fa-times"></i>
    </div>
    <div class="notification warning">
      <i class="fa-solid fa-exclamation"></i>
      <span>A warning Toast</span>
      <i class="fa-solid fa-times"></i>
    </div>
    <div class="notification danger">
      <i class="fa-solid fa-exclamation"></i>
      <span>A destructive Toast</span>
      <i class="fa-solid fa-times"></i>
    </div>
  </div>
  )
}

export default CustomToast