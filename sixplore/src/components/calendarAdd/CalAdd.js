import React, { useState, useEffect, useRef } from "react";
import calPlus from '../../assets/caladd.svg';

export default function CallAdd({events}) {

    const eventName = events.name || '';
    const eventLocation = events.address || '';
    const eventDescription = events.description || '';

    const newEventName = encodeURIComponent(eventName);
    const newEventLocation = encodeURIComponent(eventLocation);
    const newEventDescription = encodeURIComponent(eventDescription);

    const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${newEventName}&details=${newEventDescription}&location=${newEventLocation}&sf=true&output=xml`

    return (
        <>
            {console.log(newEventLocation)}
            <a href={url} target="_blank" rel="nofollow">
                <img src={calPlus} alt="Add event to your calendar." />
            </a>
        </>
    );
}    
