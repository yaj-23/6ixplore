import React from 'react'
import './signin.css'
import Navbar from '../components/navbar/nav'
import account from '../assets/accountsignin.svg'
import { Button } from '../components/button/Button'

export default function signin() {
  return (
    <div>
      
    <Navbar/>
    <div className="signin" id = "signin">
      <h2>Welcome back </h2>
          <div className = "signin-fields">
          <img className = "usericon" src = {account} alt = "#"/>
          <input type = "Email" placeholder="Username"/>
          <input type = "password" placeholder="Password"/>
      </div>
      
      <Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'>Sign in</Button>
      <p>Don't have an account? <a href="./signup"><b>Create one</b></a></p>
  </div>

</div>
  )
}
