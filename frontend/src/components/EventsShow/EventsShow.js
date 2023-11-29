import React, { useEffect } from "react";
import './EventsShow.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventThunk } from "../../store/events";
import { useParams } from "react-router-dom";

export default function EventsShow(){

    const dispatch = useDispatch();
    const { id } = useParams();
    let eventKey;

    useEffect(() => {
        dispatch(getEventThunk(id));
    }, [dispatch, id]);

    const selectedEvent = useSelector((state) => state.events.all);

    if (selectedEvent && Object.keys(selectedEvent).length > 0) {
        eventKey = Object.keys(selectedEvent)[0];
    }

    const timeConverter = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString("en-US", { year: '2-digit', month: '2-digit', day: '2-digit' });
        const formattedTime = date.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true });

        return (
            <p className="date-time"> {selectedEvent[eventKey]?.locationName} - {formattedDate} {formattedTime}</p>
        )
    }

    return (
        <>
            <p id="event-edit">Edit Event</p>
            <div className="name-box">  
                <p>{selectedEvent[eventKey]?.eventName}</p>
            </div>
            <div className="event-info">
                <p>{timeConverter(selectedEvent[eventKey]?.dateTime)}</p>
                <p>{selectedEvent[eventKey]?.eventType} - {selectedEvent[eventKey]?.difficulty}</p>
                <p>Event created by {selectedEvent[eventKey]?.ownerDetails.firstName} {selectedEvent[eventKey]?.ownerDetails.lastName}</p>
                <p>{selectedEvent[eventKey]?.description}</p>
            </div>

        </>
    )
}
