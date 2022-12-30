import React from 'react'
import './Checkbox_sidenav.css';
const Checkbox_sidenav = (props) => {
  return (
    <>
  <div class="form-check checkbox_div">
   
  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
  <label class="form-check-label" for="flexCheckChecked">
  {props.text}
  </label>

  </div>



    </>
  )
}

export default Checkbox_sidenav
