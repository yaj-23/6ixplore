import React from "react";
import Navbar from "../components/navbar/nav";
import city from "../assets/citypic.svg";
import './homepage.css'

export default function HomePage() {
  return (
    <div className="full">
      
      <Navbar/>
      {/* HomePage */}
        <div className = "image">
          <img className ="background" src={city} alt="City"/>
        </div>

        <div className="container">
        
          <div className ="homepage">
              {/* <link rel="stylesheet" href="/6ixplore/sixplore/src/pages/homepage.css"></link> */}
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap"></link>
              <h1 className="text1">rediscover the <span className="text2">6ix</span></h1>  
              {/* <h1 className="text2">6ix</h1>    */}
          </div>

          <div className = "description">
              <p> Yabadabadoo Tamim Is My Goat Yabadabadoo Tamim Is My Goat Yabadabadoo Tamim Is My Goat Yabadabadoo.</p>
              <p> Frontend Blah Blah Frontend Blah Blah Frontend Blah Blah Frontend Blah Blah Frontend Blah Blah Frontend.</p>
              <p> Tomorrow will be a good day. Tomorrow will be a good day. Tomorrow will be a good day. Tomorrow will be a good day.</p>
          </div>

          <div className = "buttons">
            <button className ="exploreBut"><b>explore</b></button>
            <button className ="signupBut"><b>signup</b></button>
          </div>
        
        </div>

        {/* <div className="line">line</div> */}
    </div>
  );
}
