import React from "react";
import Navbar from "../components/navbar/nav";
import city from "../assets/citypic.svg";
import './homepage.css'

export default function HomePage() {
  return (
    <div>
      <Navbar/>
      <div className="full">
        
        {/* HomePage */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap"></link>


         <div className="container">
        
          <div className ="homepage">
              <h1 className="text1">rediscover the <span className="text2">6ix</span></h1>  
          </div>
          
          <div className = "description">
              {/* <p> Yabadabadoo Tamim Is My Goat Yabadabadoo Tamim Is My Goat Yabadabadoo Tamim Is My Goat Yabadabadoo.</p>
              <p> Frontend Blah Blah Frontend Blah Blah Frontend Blah Blah Frontend Blah Blah Frontend Blah Blah Frontend.</p>
              <p> Tomorrow will be a good day. Tomorrow will be a good day. Tomorrow will be a good day. Tomorrow will be a good day.</p> */}
              <text> Yabadabadoo Tamim Is My Goat Yabadabadoo Tamim Is My Goat Yabadabadoo Tamim Is My Goat Yabadabadoo. Frontend Blah Blah Frontend Blah Blah Frontend Blah Blah Frontend Blah Blah Frontend Blah Blah Frontend. Tomorrow will be a good day. Tomorrow will be a good day. Tomorrow will be a good day. Tomorrow will be a good day.</text>
          </div>

          <div className = "buttons">
            <button className ="exploreBut"><b>explore</b></button>
            <button className ="signupBut"><b>signup</b></button>
          </div>
        
        </div>
        
        <div className = "image">
          <img className ="background" src={city} alt="City"/>
        </div>

       

        {/* <div className="line">line</div> */}
      </div>  
    </div>
  );
}
