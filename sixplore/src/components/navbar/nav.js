import React from 'react';
import { Link, useNavigate, redirect  } from 'react-router-dom';
import './nav.css'
import logo from '../../assets/logo.svg'
import account from '../../assets/account.svg'
import { useUser } from '../../UserSession'




export default function Navbar() {
  const navigate = useNavigate ();
  const {user ,setLoggedUser, isAdmin, setAdminStatus} = useUser();

  const handleLogOut =() => {
    setLoggedUser(null);
    setAdminStatus(false);
    navigate('/about');
  }
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
            {user != null && (<ul className='custom-ul'><li><Link to='/profile' className='custom-link'>profile</Link></li></ul>)}
            {user != null && (<ul className='custom-ul'><li><Link to='/dashboard' className='custom-link2' >explore</Link></li></ul>)}
            {isAdmin == true && (<ul className='custom-ul'><li><Link to='/admin' className='custom-link' >admin</Link></li></ul>)}
            <ul className='custom-ul'><li><Link to ='/about' className='custom-link'> about</Link></li></ul>
          </div>
          { user == null && (<div className='profile-item'>
            <img className='img-account'src={account} onClick={handleProfileClick} alt=""/>
          </div>)}
          { user != null && (<ul className='custom-ul' onClick={handleLogOut}><li>log out</li></ul>)}
      </div>
    </>
  )
}
