import React from 'react'
import './Header.css';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

import cpd_logo from '../../assets/Images/cpd_logo.png';
import user_profile from '../../assets/Images/user_profile.svg';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';


const Header = () => {
  
    const navigate = useNavigate("");
  
  return (
    <> 
    <div className='headerScreen'>
     <Nav className="navbar navbar-expand-lg bg-white lheader"> 
     <Navbar.Brand>
     <img src={cpd_logo} alt="" className='logo' onClick={() => navigate('/')}/>
     </Navbar.Brand>
    
    <div>
      {/* <form class="d-flex" role="search">
      <img src={user_profile} alt="" className='user_profile'/>
      </form> */}
    </div>

</Nav>
</div>  
          </>
  )
}

export default Header;
