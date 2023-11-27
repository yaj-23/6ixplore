import React, { useState, useEffect, useRef } from "react";
import friendAdd from '../../assets/addFriend.svg';
import './calLink.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CalLink({ events }) {

    const eventName = events.name || '';
    const eventLocation = events.address || '';
    const eventDescription = events.description || '';

    const newEventName = encodeURIComponent(eventName);
    const newEventLocation = encodeURIComponent(eventLocation);
    const newEventDescription = encodeURIComponent(eventDescription);

    const url = `Add my event to your calendar:\n\nhttps://calendar.google.com/calendar/u/0/r/eventedit?text=${newEventName}&details=${newEventDescription}&location=${newEventLocation}&sf=true&output=xml`

    // const msg = "Event Link Copied! \n Send it to your friends to invite them.";

    const Msg = ({ closeToast, toastProps }) => (
        <div>
            Event Link Copied! <br /> Send it to your friends to invite them.
        </div>
    )

    function buttonAction() {
        navigator.clipboard.writeText(url)

        toast.success(<Msg />, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: "toast-message",
        });
    }

    return (
        <>
            <img className="friendIcon" onClick={buttonAction} src={friendAdd} title="Copy the event invite link to send to your friends." alt="Copy the event invite link for friends." />
            <ToastContainer />
        </>
    );
}   