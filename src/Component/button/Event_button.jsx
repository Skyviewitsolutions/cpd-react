import React from 'react'
import "./Event_button.css";
const event_button = (props) => {
  const {onClick} = props;
  return (
    <>
    <button className="view_communities" onClick={onClick}>{props.text}</button>
      
    </>
  )
}

export default event_button
