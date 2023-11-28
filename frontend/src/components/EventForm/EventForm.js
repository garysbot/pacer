import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { composeEvent } from "../../store/events";

export default function EventForm({props}){
    const dispatch = useDispatch()
    const owner = useSelector(store => store.session.user._id)
    const [eventName, setEventName] = useState('')
    const [locationName, setLocationName] = useState('')
    const [description, setDescription] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [type, setType] = useState('')
    const [difficulty, setDifficulty] = useState()
    const [maxGroupSize, setMaxGroupSize] = useState()
    // const [attending, setAttending] = useState([])
    // ⁡⁣⁣⁢set longitude and latitude for later⁡
    function handleSubmit(e){
        e.preventDefault()
        const newEvent = {
            owner,
            eventName,
            locationName,
            description,
            dateTime,
            type,
            difficulty,

        }
        dispatch(composeEvent(newEvent))


        console.log(newEvent)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    What is the name of this event?
                    <input type="text" onChange={(e)=>setEventName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    What is the location of this event?
                    <input type="text" onChange={(e)=> setLocationName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    please provide a description for this event
                    <input type="text" onChange={(e)=>setDescription(e.target.value)}/>
                </label>
                <br/>
                <label>
                    When is the event2 taking place?
                    <input type="date" onChange={(e)=>setDateTime(e.target.value)}/>
                </label>
                <br/>       
                <label>
                    What is the maximum group size for this event?
                    <input type="number" onChange={(e)=>setDifficulty(e.target.value)}/>
                </label>
                <br/>
                <label>
                    What type of event is this?
                    <input type="text" onChange={(e)=>setType(e.target.value)}/>
                </label>
                <input type="submit" value="Create Event!"/>
            </form>
        </div>
    )
}