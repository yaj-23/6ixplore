import React from 'react'
import './signup.css'
import Navbar from '../components/navbar/nav'
import { Button } from '../components/button/Button'

export default function Signup() {
  return (
    <div>
      
        <Navbar/>
        <div className="signup" id = "signup">
          <h2> Sign up</h2>
              <div className = "signup-fields">
              <form>
                <input type = "textbox" placeholder="Name"/>
                <input type = "textbox" placeholder="Email"/>
                <input type = "password" placeholder="Password"/>
                <input type = "password" placeholder="Confirm your password"/>
              </form>
          </div>
          <Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'>
            Sign up
          </Button>
      </div>

    </div>
  )
}
