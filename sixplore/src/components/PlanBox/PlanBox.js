import React, { useState, useEffect, useRef } from "react";
import './PlanBox.css'
import { useUser } from '../../UserSession'



export default function PlanBox({planID}) {

    let [userEvents, setUserEvents] = useState(null);
    const {user} = useUser();

    useEffect (() =>{
        const fetchUserPlan = async () => {
          try {
              const resp = await fetch(`http://localhost:5000/item/${planID}`);
              const json = await resp.json();
              console.log("user plan", json);
              setUserEvents(json);
              console.log("UserEvents: ", userEvents);
          } catch (error) {
              console.log("error", error);
          }
        }; 
        fetchUserPlan();
      }, [userEvents]);

    return (
        <div className="planBox">
            {userEvents && <>
            <div className="planBox-header">
                {userEvents.name}
            </div>
            <div className="planBox-body">
                <div>
                    {userEvents.address}
                </div>
            </div>
            </>}
        </div>
    );
}