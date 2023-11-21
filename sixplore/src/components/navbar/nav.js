import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './nav.css'
import logo from '../../assets/logo.svg'
import account from '../../assets/account.svg'




export default function Navbar() {
  const navigate = useNavigate ();
  const handleLogoClick =() => {
    navigate('/about');
  }
  const handleProfileClick =() => {
    navigate('/signin');
  }
  return (
    <>
      <div className='nav-bar'>
          <div className='logo'>
            <img className='img-logo'src={logo} onClick={handleLogoClick} alt=""/>
          </div>
          <div className='nav-link-items'>
            <ul className='custom-ul'><li><Link to='/profile' className='custom-link'>profile</Link></li></ul>
            <ul className='custom-ul'><li><Link to='/dashboard' className='custom-link2' >explore</Link></li></ul>
            <ul className='custom-ul'><li><Link to ='/about' className='custom-link'> about</Link></li></ul>
          </div>
          <div className='profile-item'>
            <img className='img-account'src={account} onClick={handleProfileClick} alt=""/>
          </div>
      </div>
    </>
  )
}
