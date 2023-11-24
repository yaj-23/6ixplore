import React, { useState } from "react";
import Navbar from "../components/navbar/nav";
import { Button } from '../components/button/Button'
import { useNavigate } from 'react-router-dom';
import './SuggestEvent.css'

export default function SuggestEvent() {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [stars, setStars] = useState(5);
    const [type, setType] = useState('PLACE');
    const [tags, setTags] = useState('');
    const [pictureURL, setPictureURL] = useState('');
    const [hoursOfOperation, setHoursOfOperation] = useState('');

    const navigate = useNavigate();

    const submitForm = async event => {
        event.preventDefault();

        let tagsArray = tags.split(',');

        const eventObj = {
            name: eventName,
            description,
            address,
            stars,
            type,
            tags: tagsArray,
            pictureURL
        }

        console.log("Event Object", eventObj);

        const response = await fetch('http://localhost:5000/new-event-proposal', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventObj)
        });
      
        if (response.ok) {
            console.log('Event object sent successfully');
            alert("Event Proposal Successfully Requested");
            navigate("/about");
        } else {
            console.log(response);
            console.error('Error sending event object');
        }
    }

    return (
        <div>
            <Navbar />
            <div className="signup" id = "signup">
                <h2>Suggest an Event (Business Only)</h2>
                <div className = "signup-fields">
                    <form>
                        <input type="text" placeholder="Event Name" required value={eventName} onChange={(e) => setEventName(e.target.value)} />
                        <input type="text" placeholder="Description" required value={description} onChange={(e) => setDescription(e.target.value)} />
                        <input type="text" placeholder="Address" required value={address} onChange={(e) => setAddress(e.target.value)} />
                        <input type="number" placeholder="Stars out of 5" required min='0' max='5' value={stars} onChange={(e) => setStars(e.target.value)} />
                        <input type="text" placeholder="Tags (comma separated)" required value={tags} onChange={(e) => setTags(e.target.value)} />
                        <input type="text" placeholder="Picture URL" required value={pictureURL} onChange={(e) => setPictureURL(e.target.value)} />
                        <input type="text" placeholder="Hours of Operation" required value={hoursOfOperation} onChange={(e) => setHoursOfOperation(e.target.value)} />
                    </form>
                </div>
                <Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary' onClick={submitForm}>
                    Submit Event
                </Button>
            </div>
        </div>
    );
}