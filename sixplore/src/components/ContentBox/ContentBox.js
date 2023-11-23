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
    const [testClick, setTestClick] = useState(false);
    const {user} = useUser();

    const removeLIked = () =>{
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
          setTestClick(true);
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

    const exitAddPlan = () => {
        setAddPlan(false);
        sendClickable(true);
    }
    return (
        <div className="contentBox">
            <div className="contentBox-header">
                <div>
                    {console.log(addPlan)}
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
                                    <Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary' >
                                        Add to plan
                                    </Button>
                                </div>
                            </div>
                            <h4><strong>or click an existing plan</strong></h4>
                            <div className="contentBox-body-plans">
                                {plans.map((Plan) => (
                                    <div>
                                        <h4 style={{cursor: 'pointer'}}> {Plan} </h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className="contentBox-button" >
                <img onClick={removeLIked} src={unlike} alt=""/>
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