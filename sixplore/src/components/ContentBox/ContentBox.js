import React, { useState, useEffect, useRef } from "react";
import './ContentBox.css'
import Modal from '../modal/modal';
import unlike from '../../assets/xSmall.svg'
import { Button } from '../button/Button'
import { useUser } from '../../UserSession'



export default function ContentBox({eventID, name, genres, location, image, sendClickable, clickable, plans}) {

    const [addPlan, setAddPlan] = useState(false);
    const [planName, setPlanName] = useState("");
    let [event, setEvent] = useState(null);
    const {user} = useUser();

    const removeLiked = () =>{
        const eventId = eventID;
        try {
          const resp =  fetch(`http://localhost:5000/users/${user}-${eventId}/removeFavourite`, {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (resp.ok) {
            console.log("Removed");
          }
        }catch (error) {
          console.log(error);
          return null;
        }
    }
    
    const clickAddPlan = () => {
        setAddPlan(true);
        setEvent(eventID);
        sendClickable(false);
    }

    const handleAddPlan = async () => {

        const planObj = {
            "userId": user,
            "itemId": eventID,
            "planId": "",
            "planName": planName
        }

        //console.log("Plan Object", planObj);

        const response = await fetch('http://localhost:5000/users/addPlan', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(planObj)
        });
      
        if (response.ok) {
            console.log('Plan object sent successfully');
        } else {
            console.log(response);
            console.error('Error sending plan object');
        }
    }

    const handleAddEventToPlan = async (planId) => {

        const planObj = {
            "userId": user,
            "itemId": eventID,
            "planId": planId,
            "planName": ""
        }

        console.log("Plan Object", planObj);

        const response = await fetch('http://localhost:5000/users/addPlan', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(planObj)
        });
      
        if (response.ok) {
            console.log('Plan object sent successfully');
        } else {
            console.log(response);
            console.error('Error sending plan object');
        }
    }

    const exitAddPlan = () => {
        setAddPlan(false);
        sendClickable(true);
    }

    return (
        <div className="contentBox">
            <div className="contentBox-header">
                <div>
                    {clickable && <img onClick={() => clickAddPlan()} src={unlike} style={{ cursor: 'pointer', transform: 'rotate(45deg)' }} alt=""/>}
                    <Modal isOpen={addPlan} onClose={exitAddPlan}>
                        <div className="contentBox-body">
                            <h4>Create a Plan starting with {name}</h4>
                            <div>
                                <div>
                                    <form>
                                        <input type = "textbox" placeholder="Plan name"  required value={planName} onChange={(e) => setPlanName(e.target.value)}/>
                                    </form>
                                </div>
                                <div>
                                    <Button onClick={() => handleAddPlan()} buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary' >
                                        Add to plan
                                    </Button>
                                </div>
                            </div>
                            <h4><strong>or click an existing plan</strong></h4>
                            <div className="contentBox-body-plans">
                                {plans?.map((Plan) => (
                                    <div>
                                        <h4 onClick={()=> handleAddEventToPlan(Plan.planID, Plan.name)} style={{cursor: 'pointer'}}> {Plan.name} </h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className="contentBox-button" >
                    {clickable  && <img onClick={removeLiked} src={unlike} alt=""/> }
                </div>
            </div>
            <h4>{name}</h4>
            <h4>{location}</h4>
            <div className="contentBox-image">
                <img src={image} alt=""/>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {genres.map((d) => (
                    <h3>{d}</h3>
                ))}
            </div>
        </div>
    );
}