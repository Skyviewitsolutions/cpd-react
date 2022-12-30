import React from 'react'
import './Tags_button.css';
const Tags_button = (props) => {
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

export default Tags_button
