import React from 'react'

import Checkbox_sidenav from '../Inputbox/Checkbox_sidenav';
import './Sidenavbar.css';
const Sidenavbar = () => {
  return (
    <>
      <div className='side_nav' >
        <h5 >Details</h5>
        <div className='row'>
         
        <h6 > Domain</h6>
        <div className='col-lg-12 col-md-6 col-sm-6'>
    <Checkbox_sidenav text="Finance" />
    <Checkbox_sidenav text="Accounting"/>
    <Checkbox_sidenav text="data Analystic"/>
    <Checkbox_sidenav text="Medical"/>
    <Checkbox_sidenav text="Digital Enhanchment"/>
    <Checkbox_sidenav text="Development"/>
    <Checkbox_sidenav text="Operation Management"/>
    </div></div>
    <div className='row'>
    <div className='col-lg-12 col-md-2 col-sm-2'>

        <h6 >Industry</h6>
    <Checkbox_sidenav text="Communication"/>
    <Checkbox_sidenav text="Retail"/>
    <Checkbox_sidenav text="Technology"/>
    <Checkbox_sidenav text="Health"/>
    <Checkbox_sidenav text="Education"/>
    <Checkbox_sidenav text="Public Sectors"/>
    <button className='more'>More+</button>
    </div></div>
  

<div className='row'>
<div className='col-lg-12 col-md-6 col-sm-6'>
<h6 >Other</h6>
    <Checkbox_sidenav text="Sports" />
    <Checkbox_sidenav text="Health" />
    <Checkbox_sidenav text="Music" />
    
    <button className='more'>Clear  All</button>

      </div></div>
      </div>
    </>
  )
}

export default Sidenavbar;