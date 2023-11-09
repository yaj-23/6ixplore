import React from "react";
import './dashboard.css'
import Navbar from "../components/navbar/nav";
import Section from "../components/section/section";
import unlike from '../assets/x.svg'
import like from '../assets/heart.svg'

// TEMPORARY! REMOVE LATER!
const events = [
  {
    name: "EXAMPLE EVENT",
    location: "123 One Piece Avenue, Konoha A1B2C3",
    genres: ["bar/club", "fast food", "fine dining", "escape room", "physical activity"]
  },
]

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Section>
        <div className="dashboard-con">
          <div className="dashboard-button" >
            <img src={unlike} alt=""/>
          </div>
          <div className="dashboard-image">
          </div>
          <div className="dashboard-button">
            <img src={like} alt=""/>
          </div>
        </div>
        <div className="dashboard-description">
          {/* Here we'll map the events from the DB.. event genres are just text so thats what they'll take in when mapping the event genres */}
          {events.map(({name, location, genres, rating}) => (
            <>
            <h1>{name}</h1>
            <div>{location}</div>
            <div className="dashboard-ratings">
            {[...Array(5)].map(() => {        
              return (         
                <div className="star">&#9733;</div>        
              );
            })}
            </div>
            <div>
            {genres.map((d) => (
              <>
                <button><b>{d}</b></button>
              </>
            ))}
            </div>
            </>
          ))}
        </div>
      </Section>
    </>
  );
}
