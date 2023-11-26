import React, { useState, useEffect, useRef } from "react";
import calPlus from '../../assets/caladd.svg';

export default function CallAdd({events}) {

    let eventName = events.name || '';
    let eventLocation = events.location || '';
    let eventDescription = events.description || '';

    //console.log(events);

    let newEventName = encodeURIComponent(eventName);
    let newEventLocation = encodeURIComponent(eventLocation);
    let newEventDescription = encodeURIComponent(eventDescription);
    
    console.log(newEventLocation);

    let url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${newEventName}&details=${newEventLocation}&location=${newEventDescription}&sf=true&output=xml`
    // console.log(url);

    return (
        <>
            <a href={url} target="_blank" rel="nofollow">
                <img src={calPlus} alt="Add event to your calendar." />
            </a>
        </>
    );
}    
