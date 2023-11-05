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
          <input type = "textbox" placeholder="Username"/>
          <input type = "password" placeholder="Password"/>
      </div>
      
      <button type="submit"><b>Sign in</b></button>
      <p>Don't have an account? <a href="./signup"><b>Create one</b></a></p>
  </div>

</div>
  )
}
