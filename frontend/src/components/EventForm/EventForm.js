import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { composeEvent } from "../../store/events";
import "./EventForm.css"

export default function EventForm({props}){
    // ⁡⁢⁣⁣allowed event types⁡⁡
    const allowedEventTypes = [
        'Basketball', 'Soccer', 'Baseball', 'Tennis', 'Running', 'Volleyball', 'Swimming', 'Yoga', 'Gym (Fitness)',
        'Handball', 'Biking', 'Martial Arts', 'Hockey', 'Football', 'Hiking', 'Bowling', 'Water Sports', 'Ping Pong',
        'Golf', 'Pickleball', 'Rock Climbing', 'Skateboarding', 'Badminton', 'Walking', 'Lacrosse', 'Ultimate Frisbee',
        'Rugby', 'Archery', 'Fencing', 'Sailing', 'Rowing', 'Table Tennis', 'Squash', 'Equestrian sports (horseback riding)',
        'CrossFit (fitness activity/sport)', 'Triathlons', 'Cricket', 'Jiu-Jitsu', 'Boxing'
    ];
    const difficulties = ["Beginner", "Intermediate", "Advanced"]







    const dispatch = useDispatch()
    const owner = useSelector(store => store.session.user._id)
    const [eventName, setEventName] = useState('')
    const [locationName, setLocationName] = useState('')
    const [description, setDescription] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [eventType, setEventType] = useState('')
    const [difficulty, setDifficulty] = useState()
    const [maxGroupSize, setMaxGroupSize] = useState(0)
    // const [attending, setAttending] = useState([])
    // ⁡⁣⁣⁢set longitude and latitude for later
    // ⁡⁣⁣⁢make sure to add functionality for attendees⁡⁡
    
    function handleSubmit(e){
        e.preventDefault()
        const newEvent = {
            owner,
            eventName,
            locationName,
            description,
            dateTime,
            eventType,
            difficulty,
            maxGroupSize
        }
        dispatch(composeEvent(newEvent))
        console.log(newEvent)

    }
    // ⁡⁢⁣⁢for future groupSizing functionality⁡
    function addToMaxGroupSize(){

    }
    return (
        <div id="event-form-div">
            <form id="event-form-form">
                <label>
                    What is the name of this event?
                    <br/>
                    <input className='event-form-text-input' type="text" onChange={(e)=>setEventName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    What is the location of this event?
                    <br/>
                    <input className='event-form-text-input' type="text" onChange={(e)=> setLocationName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    please provide a description for this event
                    <br/>
                    <input className='event-form-text-input' type="text" onChange={(e)=>setDescription(e.target.value)}/>
                </label>
                <br/>
                <label>
                    When is the event taking place?
                    <br/>
                    <input className='event-form-text-input' type="date" onChange={(e)=>setDateTime(e.target.value)}/>
                </label>
                <br/>
                <label>
                    What time is it happening?
                    <br/>
                    <input type="time"/>
                </label>
                <br/>       
                <label>
                    What is the maximum group size for this event?
                    {/* ⁡⁢⁣⁢the built-in number input looks like shit on the frontend⁡ */}
                    {/* ⁡⁢⁣⁢I fully intend on changing it later⁡ - rob */}
                    <br/>
                    <input className='event-form-text-input' type="number" onChange={(e)=>setMaxGroupSize(e.target.value)}/>
                </label>
                <br/>
                <label>
                    What type of event is this?
                    <br/>
                    <select onChange={(e)=>setEventType(e.target.value)}>
                        {allowedEventTypes.map((type)=>{
                            return (
                                <option value={type}>{type}</option>
                            )
                        })}
                    </select>
                </label>
                <br/>
                <label>
                    What is the difficulty of this event?
                    <br/>
                    <select onChange={(e)=>setDifficulty(e.target.value)}>
                        {difficulties.map((d)=>{
                            return (
                                <option value={d}>{d}</option>
                            )
                        })}
                    </select>
                </label>

                <button id="form-submit" onClick={handleSubmit}> Create Event!</button>
            </form>
        </div>
    )
}