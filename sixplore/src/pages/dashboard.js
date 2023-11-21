import React, { useState, useEffect, useRef } from "react";
import './dashboard.css'
import Navbar from "../components/navbar/nav";
import Section from "../components/section/section";
import unlike from '../assets/x.svg'
import like from '../assets/heart.svg'
import { useUser } from '../UserSession'
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  let [events, setEvents] = useState(null);
  let [currentEvent, setCurrentEvent] = useState(0);
  let [transitionLike, setTransitionLike] = useState(false);
  let [transitionUnlike, setTransitionUnlike] = useState(false);
  const {user} = useUser();
  const navigate = useNavigate();

  if(user == null) {
    navigate('/about');
  }

  useEffect(() => {
    const url = "http://localhost:5000/explore";

    const fetchEvents = async () => {
      try {
          const response = await fetch(url);
          const json = await response.json();
          setEvents(json);
          //console.log(events);
      } catch (error) {
          console.log("error", error);
      }
      };

      fetchEvents();
  }, [transitionLike, transitionUnlike]);

  const showNextEvent = (isLike) => {
    setCurrentEvent((currentEvent) => (currentEvent + 1) % events.length);
    if (isLike) {
      setTransitionLike(true);
      setTimeout(() => {
        setTransitionLike(false);
      }, 400);
    } else {
      setTransitionUnlike(true);
      setTimeout(() => {
        setTransitionUnlike(false);
      }, 400);
    }
  };

  //console.log(events);
  return (
    <>
      <Navbar />
      <Section>
        <div className={`dashboard-con ${transitionLike || transitionUnlike ? 'transition' : ''}`}>
          <div className={`dashboard-button unlike ${transitionUnlike ? 'transitionUnlike' : ''}`} onClick={() => showNextEvent(false)}>
            <img src={unlike} alt=""/>
          </div>
          <div className="dashboard-image">
          </div>
          <div className={`dashboard-button like ${transitionLike ? 'transitionLike' : ''}`} onClick={() => showNextEvent(true)}>
            <img src={like} alt=""/>
          </div>
        </div>
        <div className="dashboard-description">
          {/* Here we'll map the events from the DB.. event genres are just text so thats what they'll take in when mapping the event genres */}
          {console.log(events)}
          {events && events.length >0 && (
            <>
            <h1>{events[currentEvent].name}</h1>
            <div>{events[currentEvent].location}</div>
            <div className="dashboard-ratings">
            {[...Array(Math.round(events[currentEvent].stars))].map(() => {        
              return (         
                <div className="star">&#9733;</div>        
              );
            })}
            </div>
            <div>
            {events[currentEvent].tags.map((d) => (
              <>
                <button><b>{d}</b></button>
              </>
            ))}
            </div>
            </>
          )}
        </div>
      </Section>
    </>
  );
}