import React from 'react'
import './signup.css'

export default function Signup() {
  return (
    <div>
      <div class="topnav" id="myTopnav">
          <a href="#profile">Profile</a>
          <a href="#explore">Explore</a>
          <a href="#about">About</a>
        </div>

        <div class="signup" id = "signup">
          <h2> Sign up</h2>
              <div class = "signup-fields">
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
