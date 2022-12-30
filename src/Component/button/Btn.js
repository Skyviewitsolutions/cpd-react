import React from 'react'
import './Btn.css';
import Spinner from 'react-bootstrap/Spinner';

const Btn = (props) => {
  const {submit ,loading} = props;
  return (
    <>
      <div className="subbtncont"  onClick={submit}>
        {loading ?  <Spinner animation="border" variant="light" style={{width : "20px" , height : "20px"}}/> :   <button type="submit" className="subbtn" >{props.btn_name}</button>}
      </div>
    </>
  )
} 

export default Btn