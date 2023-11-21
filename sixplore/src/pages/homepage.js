import React from "react";
import Navbar from "../components/navbar/nav";
import city from "../assets/citypic.svg";
import './homepage.css';
import { Button } from '../components/button/Button'
import { Link } from 'react-router-dom';

export default function HomePage() {
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
            <Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'>explore</Button>
            <Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'>sign in</Button>
            <Link to='/suggest-event'><Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'>Suggest Event</Button></Link>
          </div>
        
        </div>
      </div>  
    </div>
  );
}
