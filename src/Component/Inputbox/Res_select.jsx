import React from 'react';
import './Res_select.css';
const Res_select = (props) => {
  return (
    <>
      <div >
        <select className='select_com'>
            <option>{props.g_option1}</option>
            <option>{props.g_option2}</option>
            <option>{props.g_option3}</option>
        </select>
      </div>
    </>
  )
}

export default Res_select
