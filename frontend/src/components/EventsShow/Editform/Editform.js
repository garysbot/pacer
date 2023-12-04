import React, { useEffect, useState, Redirect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEventThunk, fetchEvents } from '../../../store/events';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { updateEventThunk } from "../../../store/events";
import "./Editform.css"
import { deleteEventThunk } from '../../../store/events';

export default function Editform({ setEditPage }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const selectedEvent = useSelector((state) => state.events.all[id]);
    const currentUser = useSelector((state) => state.session.user)

    useEffect(() => {
        if (!selectedEvent && id) {
        dispatch(getEventThunk(id));
        } else {
        localStorage.setItem('selectedEventData', JSON.stringify(selectedEvent));
        }
    }, [dispatch, id, selectedEvent]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('selectedEventData'));
        if (storedData) {
            const dateObject = new Date(storedData.dateTime);
            const date = dateObject.toISOString().split('T')[0];
            let hours = dateObject.getHours();
            const minutes = dateObject.getMinutes();
            const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const time = `${formattedHours}:${formattedMinutes}`;

        setEventName(storedData.eventName);
        setDescription(storedData.description);
        setDate(date);
        setTime(time);
        setEventType(storedData.eventType);
        setDifficulty(storedData.difficulty);
        setMaxGroupSize(storedData.maxGroupSize);
        setSelectedAddress(storedData.locationName);
        setLatitude(storedData.latitude);
        setLongitude(storedData.longitude);
        setLocationName(storedData.locationName);
        }
    }, []);


    const allowedEventTypes = [
        'Basketball', 'Soccer', 'Baseball', 'Tennis', 'Running', 'Volleyball', 'Swimming', 'Yoga', 'Gym (Fitness)',
        'Handball', 'Biking', 'Martial Arts', 'Hockey', 'Football', 'Hiking', 'Bowling', 'Water Sports', 'Ping Pong',
        'Golf', 'Pickleball', 'Rock Climbing', 'Skateboarding', 'Badminton', 'Walking', 'Lacrosse', 'Ultimate Frisbee',
        'Rugby', 'Archery', 'Fencing', 'Sailing', 'Rowing', 'Table Tennis', 'Squash', 'Equestrian',
        'CrossFit)', 'Triathlons', 'Cricket', 'Jiu-Jitsu', 'Boxing'
    ];
    const difficulties = ["Beginner", "Intermediate", "Advanced"]

    const [eventName, setEventName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [eventType, setEventType] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [maxGroupSize, setMaxGroupSize] = useState(0)
    const [selectedAddress, setSelectedAddress] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [locationName, setLocationName] = useState("");
    const [error, setError] = useState({});

    const handleSelect = async (address) => {
        try {
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0]);
        setSelectedAddress(address);
        setLatitude(latLng.lat);
        setLongitude(latLng.lng);
        setLocationName(results[0].formatted_address);
        } catch (error) {
        console.error("Error selecting address", error);
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value.slice(0, 1000));
    };

    const history = useHistory();
    async function handleEditSubmit(e) {
        e.preventDefault();
    
        const formattedDateTime = `${date} ${time}`;
    
        const editEvent = {
            owner: currentUser._id,
            eventName,
            description,
            locationName,
            dateTime: formattedDateTime,
            difficulty,
            eventType, 
            maxGroupSize,
            latitude,
            longitude,
            eventPrivacy: false
        };

        const event = await dispatch(updateEventThunk(selectedEvent._id ,editEvent));
        await dispatch(getEventThunk(id)); 
        setEditPage(false);
    }

    const handleDelete = async (e) => {
        history.push('/discover');
        await dispatch(deleteEventThunk(selectedEvent._id));
        await dispatch(getEventThunk());
    }

    return (
        <>
            <div className="edit-form-div">
                <div className="create-form-header">
                    <h2>🗓️ Update your event</h2>
                </div>

                <form className="event-form-container">
                <div className="field-container create-event">
                    <p className="field-label create-event-field">Event Name</p>
                    <input 
                        className='input-field' 
                        value={eventName}
                        type="text" 
                        placeholder="Event Name"
                        onChange={(e)=>setEventName(e.target.value)}
                    />
                    {error.eventName && <span className="event-form-errors">{error.eventName}</span>}
                </div>
                
                <div className="field-container-create-event">
                    <p className="field-label">Location</p>
                    <PlacesAutocomplete
                        value={selectedAddress}
                        onChange={setSelectedAddress}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div className="location-result-container">
                            <input
                                className='input-field'
                                {...getInputProps({
                                    placeholder: "Enter location...",
                                })}
                            />
                            {loading && <div className="location-result">Loading...</div>}
                            {suggestions.map((suggestion) => (
                                <div className="location-result" {...getSuggestionItemProps(suggestion)}>
                                    <p className="location-result">{suggestion.description}</p>
                                </div>
                            ))}
                        </div>
                        )}
                    </PlacesAutocomplete>
                    {error.location && <span className="event-form-errors">{error.location}</span>}
                </div>

                <div className="field-container create-event">
                    <p className="field-label  create-event-field">Event Date & Time</p>
                    <div className="date-time-input-container">
                        <input
                            className='input-field'
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <input
                            className='input-field'
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    {error.datetime && <span className="event-form-errors">{error.datetime}</span>}
                    {error.date && <span className="event-form-errors">{error.date}</span>}
                    {error.time && <span className="event-form-errors">{error.time}</span>}
                </div>

                <div className="field-container create-event">
                    <p className="field-label  create-event-field">Event Description</p>
                    <textarea
                        className='input-field'
                        value={description}
                        onChange={handleDescriptionChange}
                        rows={4}
                        maxLength={1000}
                    />
                    {error.description && <span className="event-form-errors">{error.description}</span>}
                </div>

                <div className="field-container create-event">
                    <p className="field-label create-event-field">Max Attendees</p>
                    <input 
                        className='input-field'
                        value={maxGroupSize}
                        type="number" 
                        onChange={(e)=>setMaxGroupSize(e.target.value)}
                    />
                    {error.groupSize && <span className="event-form-errors">{error.groupSize}</span>}
                </div>

                <div className="field-container create-event">
                    <p className="field-label create-event-field">Activity</p>
                    <select 
                        onChange={(e) => setEventType(e.target.value)}
                        value={eventType}
                        className='input-field'
                    >
                        <option value="" disabled selected>
                            Please select an activity
                        </option>
                        {allowedEventTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {error.eventType && <span className="event-form-errors">{error.eventType}</span>}
                </div>

                <div className="field-container create-event">
                    <p className="field-label  create-event-field">What is the relative difficulty of this event?</p>
                    <select 
                    value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className='input-field'
                    >
                        <option value="" disabled selected>
                            Please select a difficulty level
                        </option>
                        {difficulties.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                    {error.difficulty && <span className="event-form-errors">{error.difficulty}</span>}
                </div>


                <div className="field-container-update-event">
                    <button id="submit-updates" onClick={handleEditSubmit}> Update Event</button>
                    <button id='cancel-edit' onClick={() => setEditPage(false)}>Cancel Edit</button>
                </div>

                <button id="delete-event" onClick={handleDelete}>Delete Event</button>
            </form>
        </div>
        </>
    )}