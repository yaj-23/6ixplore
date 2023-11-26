import React from "react";
import Navbar from "../components/navbar/nav";
import city from "../assets/citypic.svg";
import './homepage.css';
import { Button } from '../components/button/Button'
import { Link } from 'react-router-dom';
import { useUser } from '../UserSession';

export default function HomePage() {
  const {user ,setLoggedUser} = useUser();
  const desc = "Our app transforms urban exploration into a captivating adventure! Users can open up their phone, access our app, and swipe through an endless curated selection of unique and hidden locations, from local gems to iconic landmarks and ongoing events across Toronto.";

  return (
    <div>

      <Navbar/>
    
      <div className="full">
        <div className = "image">
          <img className ="background" src={city} alt="City"/>
        </div>

        <div className="container">
        
          <div className ="homepage">
              <h1 className="text1">rediscover the <span className="text2">6ix</span></h1>  
          </div>
          
          <div className = "description">
              <text>{desc}</text>
          </div>

          <div className = "buttons">
            {user != null && <Link to='/dashboard'><Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'>explore</Button></Link>}
            {user == null && <Link to='/signin'><Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'>explore</Button></Link>}
            <Link to='/signup'><Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'>sign up</Button></Link>
            <Link to='/suggest-event'><Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'>suggest event</Button></Link>
          </div>
        
        </div>
      </div>  
    </div>
  );
}
