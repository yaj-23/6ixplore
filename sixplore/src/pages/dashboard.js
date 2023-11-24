import React, { useState, useEffect, useRef } from "react";
import './dashboard.css'
import Navbar from "../components/navbar/nav";
import Section from "../components/section/section";
import unlike from '../assets/x.svg'
import like from '../assets/heart.svg'
import { useUser } from '../UserSession'
import { useNavigate } from 'react-router-dom';
import { Collapse } from 'react-collapse';

export default function Dashboard() {
  let [events, setEvents] = useState(null);
  let [currentEvent, setCurrentEvent] = useState(0);
  let [transitionLike, setTransitionLike] = useState(false);
  let [transitionUnlike, setTransitionUnlike] = useState(false);
  let [operationHours, setOperationHours] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();


  if (user == null) {
    navigate('/about');
  }

  useEffect(() => {
    const url = "http://localhost:5000/explore";

    const fetchEvents = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setEvents(json);
        console.log(events);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchEvents();
  }, [transitionLike, transitionUnlike]);


  const likeEvent = () => {
    const eventId = events[currentEvent]._id;
    try {
      const resp = fetch(`http://localhost:5000/users/${user}-${eventId}/addFavourite`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.ok) {
        console.log("YAHAHAYA");
      }
    } catch (error) {
      console.log(error);
      return null;
    }

  }

  // CHECK IF EVNT IS LIKED ALREADU. IF YES DONT SHOW THIS AND SKIP
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

  const toggleHours = () => {
    setOperationHours(!operationHours);
    console.log('Operation Hours:', operationHours);
  }


  //console.log(events);
  return (
    <>
      <Navbar />
      <Section>
        <div className={`dashboard-con ${transitionLike || transitionUnlike ? 'transition' : ''}`}>
          <div className={`dashboard-button unlike ${transitionUnlike ? 'transitionUnlike' : ''}`} onClick={() => showNextEvent(false)}>
            <img src={unlike} alt="" />
          </div>
          <div className="dashboard-image">
            {events && <img src={events[currentEvent].pictureURL} alt="" />}
          </div>
          <div className={`dashboard-button like ${transitionLike ? 'transitionLike' : ''}`} onClick={() => showNextEvent(true)}>
            <img onClick={likeEvent} src={like} alt="" />
          </div>
        </div>
        <div className="dashboard-description">
          {/* Here we'll map the events from the DB.. event genres are just text so thats what they'll take in when mapping the event genres */}
          {console.log(events)}
          {events && events.length > 0 && (
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
              <button className="dashboard-collapse-btn" onClick={toggleHours}><b><u>Hours of Operation</u></b></button>
              <Collapse className="dashboard-collapse" isOpened={operationHours}>
                <div className="dashboard-collapse-content">
                  {
                    Object.keys(events[currentEvent].hours).map((oneKey, i) => {
                      return (
                        <div>
                          <table>
                            <tr>
                              <td>
                                <ul style={{ width: 100 }} key={i}>{oneKey}</ul>
                              </td>
                              <td>
                                <ul id='dashboard-collapse-content' key={i}>{events[currentEvent].hours[oneKey]['start'] + '-' + events[currentEvent].hours[oneKey]['end']}</ul>
                              </td>
                            </tr>
                          </table>
                          {/* <li key={i}>{events[currentEvent].hours[oneKey]}</li> */}
                        </div>
                      )
                    })
                  }
                </div>
              </Collapse>
              {/* <a data-bs-toggle="btn btn-primary" href="#dashboard-hours" role="button" aria-expanded="false" aria-controls="dashboard-hours">Hours of Operation</a>
              <div className="collapse" id="dashboard-hours">
                <div class="card card-body">
                  Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                </div>
              </div> */}
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