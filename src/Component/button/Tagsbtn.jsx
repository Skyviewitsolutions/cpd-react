import React from 'react'
import './Tagsbtn.css';
const Tagsbtn = (props) => {
  return (
    <>
    <div>
       <button className="tag_btn">
        {props.text}
       </button> 
    </div>
      
    </>
  )
}

export default Tagsbtn
