import React from 'react'
import './Index_button.css'; 
const Index_button = (props) => {
  return (
    <>
    
    <button className="status_course" style={{borderColor:props.brline, color:props.fcolor}}>{props.text}</button>
    
      
    </>
  )
}

export default Index_button

