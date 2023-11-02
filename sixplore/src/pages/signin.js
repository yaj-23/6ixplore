import React from 'react'
import './signin.css'
import Navbar from '../components/navbar/nav'
import account from '../assets/account.svg'

export default function signin() {
  return (
    <div>
      
    <Navbar/>
    <div className="signin" id = "signin">
      <h2>Welcome back </h2>
          <div className = "signin-fields">
          <img className = "usericon" src = {account} alt = "#"/>
          <input type = "textbox" placeholder="username"/>
          <input type = "password" placeholder="Password"/>
      </div>
      
      <button type="submit"><b>Sign in</b></button>
  </div>

</div>
  )
}
