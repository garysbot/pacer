import React, { useEffect } from "react";
import './EventsShow.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventThunk } from "../../store/events";
import { useParams } from "react-router-dom";

export default function EventsShow(){

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getEventThunk(id));
    }, [dispatch, id]);
    debugger;

    const selectedEvent = useSelector((state) => state.events.selectedEvent);

    return (
        <>
            <p id="event-edit">Edit Event</p>
            <div className="name-box">  
                {/* <p>{selectedEvent.difficulty}</p> */}
                
            </div>

        </>
    )
}
