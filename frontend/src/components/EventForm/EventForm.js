import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { composeEvent } from "../../store/events";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from "react-places-autocomplete";
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
    const [description, setDescription] = useState('')
    // const [dateTime, setDateTime] = useState('')
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [eventType, setEventType] = useState('')
    const [difficulty, setDifficulty] = useState()
    const [maxGroupSize, setMaxGroupSize] = useState(0)
    const [selectedAddress, setSelectedAddress] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [locationName, setLocationName] = useState("");
    const [error, setError] = useState({});
    // const [event, setEvent] = useState({});
  
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

    const validateForm = () => {
        const newErrors = {};
    
        if (!eventName || eventName.length < 5 || eventName.length > 100) {
            newErrors.eventName = "Event name must be between 5 and 100 characters";
        }
    
        if (!description || description.length < 5 || description.length > 1000) {
            newErrors.description = "Description must be between 5 and 1000 characters";
        }
    
        if (!selectedAddress || !latitude || !longitude || !locationName) {
            newErrors.location = "Please select a valid location";
        }
    
        const currentDateTime = new Date();
        const selectedDateTime = new Date(`${date}T${time}`);
        if (selectedDateTime <= currentDateTime) {
            newErrors.datetime = "Event datetime must be in the future";
        }

        if (!date) {
            newErrors.date = "Please select a date";
        }

        if (!time) {
            newErrors.time = "Please select a time";
        }
    
        if (maxGroupSize === 0) {
            newErrors.groupSize = "Max group size must be at least 1";
        }
    
        if (!eventType) {
            newErrors.eventType = "Please select an activity type";
        }
    
        if (!difficulty) {
            newErrors.difficulty = "Please select a difficulty level";
        }
    
        setError(newErrors);
    
        // If there are no errors, return true; otherwise, return false
        return Object.keys(newErrors).length === 0;
    };
  
    const history = useHistory();
    async function handleSubmit(e) {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }

        // Format the date and time before creating the event
        const formattedDateTime = `${date} ${time}`;
    
        const newEvent = {
          owner,
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
    
        // const event = await dispatch(composeEvent(newEvent));
        // history.push(`events/${event._id}`);
        const event = await dispatch(composeEvent(newEvent));
        redirectToShow(event);
    }

    const redirectToShow = (event) => {
        history.push(`events/${event._id}`);
    }

    const handleDescriptionChange = (e) => {
        // Limit the description to 1000 characters
        setDescription(e.target.value.slice(0, 1000));
    };
    
    return (
        <div class="event-form-div">
            <div className="create-form-header">
                <h2>🗓️ Create a new event</h2>
            </div>

            <form className="event-form-container">
                <div className="field-container create-event">
                    <p className="field-label create-event-field">Event Name</p>
                    <input 
                        className='input-field' 
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
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <input
                            className='input-field'
                            type="time"
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
                        rows={4} // You can adjust the number of rows as needed
                        maxLength={1000}
                    />
                    {error.description && <span className="event-form-errors">{error.description}</span>}
                </div>

                <div className="field-container create-event">
                    <p className="field-label create-event-field">Max Attendees</p>
                    <input 
                        className='input-field'
                        type="number" 
                        onChange={(e)=>setMaxGroupSize(e.target.value)}
                    />
                    {error.groupSize && <span className="event-form-errors">{error.groupSize}</span>}
                </div>
                
                <div className="field-container create-event">
                    <p className="field-label create-event-field">Activity</p>
                    <select 
                        onChange={(e) => setEventType(e.target.value)}
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
                
                <div className="field-container create-event">
                    <button className="form-submit signup-button" onClick={handleSubmit}> Create Event!</button>
                </div>
            </form>
        </div>
    )
}