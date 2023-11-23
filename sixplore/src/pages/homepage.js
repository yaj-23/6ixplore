import React from "react";
import Navbar from "../components/navbar/nav";
import city from "../assets/citypic.svg";
import './homepage.css';
import { Button } from '../components/button/Button'
import { Link } from 'react-router-dom';
import { useUser } from '../UserSession';

export default function HomePage() {
  const {user ,setLoggedUser} = useUser();

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
              <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis felis vitae rhoncus congue. Morbi dictum lacinia neque, non ornare dolor ornare non. Vestibulum porttitor magna magna, a bibendum leo sagittis vitae. Fusce facilisis tincidunt justo vel viverra. Nunc non ligula sapien. Nunc tempus nisl sit amet nisl.</text>
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
