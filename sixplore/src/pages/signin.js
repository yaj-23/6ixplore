import React, { useState } from 'react'
import './signin.css'
import Navbar from '../components/navbar/nav'
import account from '../assets/accountsignin.svg'
import { Button } from '../components/button/Button'

export default function signin() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  let currUserId = "";
  /**
   * 
   * @param {JSON} userInfo User info in JSON format
   * @returns User Id if success / false if fail
   */
  const fetchId = async (userInfo) => {
    try {
      const resp = await fetch("http://localhost:3000/login", {
        method: "post",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (resp.ok) {
        const userId = await resp.json();
        return userId;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  
  /**
   * Handles Submit Form
   * @param {Event} event Form Data 
   */
  const submitform = async event => { 
    event.preventDefault();
    // Checking is user entry is valid
    
    const userInfo = {
      email : email, 
      password : password
    }; 
    
    // Fetchig new User ID
    currUserId = await fetchId(userInfo);
    if (currUserId) {
      alert(`User has successfully logged in: ${currUserId}`);
    }
    else {
      alert("Login Successful");
    }
       
  }
  return (
    <div>
      
    <Navbar/>
    <div className="signin" id = "signin">
      <h2>Welcome back </h2>
          <div className = "signin-fields">
          <img className = "usericon" src = {account} alt = "#"/>
          <input type = "Email" placeholder="Email" required value={email} onChange={(e) => setemail(e.target.value)}/>
          <input type = "password" placeholder="Password" required value={password} onChange={(e) => setpassword(e.target.value)}/>
      </div>
      <Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary' onClick={submitform}>
        Login
      </Button>
      <p>Don't have an account? <a href="./signup"><b>Create one</b></a></p>
  </div>

</div>
  )
}
