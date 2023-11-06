import React from 'react'
import './signup.css'
import Navbar from '../components/navbar/nav'

export default function Signup() {
  return (
    <div>
      
        <Navbar/>
        <div className="signup" id = "signup">
          <h2> Sign up</h2>
              <div className = "signup-fields">
              <input type = "textbox" placeholder="Name"/>
              <input type = "textbox" placeholder="Email"/>
              <input type = "password" placeholder="Password"/>
              <input type = "password" placeholder="Confirm your password"/>
          </div>
          
          <button type="submit"><b>Sign up</b></button>
      </div>

    </div>
  )
}
