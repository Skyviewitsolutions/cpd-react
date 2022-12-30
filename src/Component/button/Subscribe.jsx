import React from 'react'
import "./Subscribe.css";
import Spinner from 'react-bootstrap/Spinner';


const subscribe = ({loading , text , onClick}) => {
  return (
    <>
      <button type="submit" className='subscribe' onClick={onClick}>{loading ? <Spinner animation="border" variant="light" style={{width : "20px" , height : "20px"}}/> : text}</button>
    </>
  )
}

export default subscribe
