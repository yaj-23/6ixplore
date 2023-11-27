import React, { useState, useEffect, useRef } from "react";
import './profile.css'
import Navbar from '../components/navbar/nav'
import ContentBox from '../components/ContentBox/ContentBox';
import Modal from '../components/modal/modal';
import unlike from '../assets/xSmall.svg'
import { Button } from '../components/button/Button'
import { useUser } from '../UserSession'
import { useNavigate } from 'react-router-dom';
import PlanBox from "../components/PlanBox/PlanBox";

export default function Profile() {

  let [modal, setModal] = useState(false);
  let [plan, setPlan] = useState({"planID": null, "planName": ""});
  let [isClickable, setIsClickable] = useState(true);
  let [userEvents, setUserEvents] = useState(null);
  let [userPlans, setUserPlans] = useState(null);
  const [userName, setUsername] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const {user} = useUser();
  const navigate = useNavigate();

  if(user == null) {
    navigate('/about');
  }
  
  const fetchUserDets = async () => {
    try{
        const resp = await fetch(`http://localhost:5000/users/${user}/getDetails`);
        const json = await resp.json();
        setUsername(json.name);
        setUserEmail(json.email);
        // console.log("Formatted Details: ", formattedDetails);
    } catch (error) {
        console.log("error", error);
    }
  };

  if(userName === null && userEmail === null){
    fetchUserDets();
  }


  useEffect (() =>{
    const fetchUserPlans = async () => {
      try {
          const resp = await fetch(`http://localhost:5000/users/${user}/getPlans`);
          const json = await resp.json();
          //console.log("raw json", json);
          const formattedPlans = json.filter((plan) => plan != null).map(plan => ({
            planID: plan.planId,
            name: plan.planName,
          }));
          setUserPlans(formattedPlans);
          // console.log(user);
          //console.log("Formatted Plans: ", formattedPlans);
      } catch (error) {
          console.log("error", error);
      }

    }; 
    fetchUserPlans();
  }, [userPlans]);

    const deletePlan = () =>{

      const planObj = {
        "userId": user,
        "itemId" : "",
        "planId": plan.planID,
      }
      
      try {
        const resp =  fetch(`http://localhost:5000/users/deletePlan`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(planObj)
        });
        if (resp.ok) {
          console.log("Removed");
        }
      }catch (error) {
        console.log(error);
        return null;
      }
      exitModal();
    };

  useEffect (() =>{
    const fetchUserLikedEvents = async () => {
      try {
          const resp = await fetch(`http://localhost:5000/users/${user}/getFavourites`);
          const json = await resp.json();
          const formattedEvents = json.filter((event) => event != null).map(event => ({
            eventID: event._id,
            name: event.name,
            description: event.description,
            location: event.address,
            pictureURL: event.pictureURL,
            genres: event.tags
          }));
          //console.log("Formatted Events: ", formattedEvents);
          setUserEvents(formattedEvents);
          //console.log("UserEvents: ", userEvents);
      } catch (error) {
          console.log("error", error);
      }
    }; 
    fetchUserLikedEvents();
  }, [userEvents]);

  const clickModal = (Plan) => {
    setModal(true);
    setPlan({"planID": Plan.planID, "planName": Plan.name});
    setIsClickable(false);
  }

  const exitModal = () => {
    setModal(false);
    setIsClickable(true);
  }

  return (
    <div>
      {console.log(isClickable)}
      <Navbar />

      <div className="profile" id="profile">
        <div className="profile-bigDiv">
          <div className="leftDiv">

            <div className="profile-h2">
              Profile Information
            </div>
            <div className="profile-scaleBox">
              {userName &&  (
                <>
                  <h1>{userName}</h1>
                  <h1>{userEmail}</h1>
                </>
              ) }
            </div>

            <div className="profile-h2">
              <div>Plans</div>
            </div> 
            <div className="profile-scaleBox3">
              {userPlans == null && ( 
                <>
                <div>
                  <h1>You have no plans. Add one to begin!</h1>
                </div>
                </>
              )}
              {userPlans?.map((Plan) => (
                <div>
                <h1 style={{cursor: 'pointer'}} onClick={() => clickModal(Plan)}> {Plan.name} </h1>
                <Modal isOpen={modal} onClose={exitModal}>
                  <div className="profile-modal-title">{plan.planName}</div>
                  <PlanBox planID={plan.planID} />
                  <Button onClick={deletePlan} buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary' >
                    Delete Plan
                  </Button>
                </Modal>
                </div>
              ))}

            </div>
          </div>

          <div className="profile-rightDiv">
            <div className="profile-h2">Liked Destinations</div>
            <div className="profile-scaleBox2">
              {userEvents?.map(({ eventID, name, genres, location, pictureURL }) => {
                return (
                  <div>
                    <ContentBox plans={userPlans} eventID={eventID} image={pictureURL} location={location} name={name} genres={genres} clickable={isClickable} sendClickable={setIsClickable} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
