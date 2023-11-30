import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEventThunk } from '../../../store/events';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { updateEventThunk } from "../../../store/events";

export default function Editform(){
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
        setEventName(storedData.eventName);
        setDescription(storedData.description);
        setDate(storedData.dateTime);
        setTime(storedData.dateTime);
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
        'Rugby', 'Archery', 'Fencing', 'Sailing', 'Rowing', 'Table Tennis', 'Squash', 'Equestrian sports (horseback riding)',
        'CrossFit (fitness activity/sport)', 'Triathlons', 'Cricket', 'Jiu-Jitsu', 'Boxing'
    ];
    const difficulties = ["Beginner", "Intermediate", "Advanced"]

    const [eventName, setEventName] = useState(selectedEvent?.eventName)
    const [description, setDescription] = useState(selectedEvent?.description)
    const [date, setDate] = useState(selectedEvent?.dateTime);
    const [time, setTime] = useState(selectedEvent?.dateTime);
    const [eventType, setEventType] = useState(selectedEvent?.eventType)
    const [difficulty, setDifficulty] = useState(selectedEvent?.difficulty)
    const [maxGroupSize, setMaxGroupSize] = useState(selectedEvent?.maxGroupSize)
    const [selectedAddress, setSelectedAddress] = useState(selectedEvent?.locationName);
    const [latitude, setLatitude] = useState(selectedEvent?.latitude);
    const [longitude, setLongitude] = useState(selectedEvent?.longitude);
    const [locationName, setLocationName] = useState(selectedEvent?.locationName);

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

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleEventTypeChange = (e) => {
        setEventType(e.target.value);
    };

    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    };

    const handleMaxGroupSizeChange = (e) => {
        setMaxGroupSize(e.target.value);
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
        redirectToShow(event);
    }

    const redirectToShow = (event) => {
        history.push(`events/${selectedEvent._id}`);
    }


    return (
        <>
            <div id="event-form-div">
                <label>
                    Give your event a name
                    <br/>
                    <input className='event-form-text-input' type="text" value={eventName} onChange={(e)=>setEventName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Where is this event taking place?
                    <br/>
                    <PlacesAutocomplete
                        value={locationName}
                        onChange={setSelectedAddress}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                            className="event-form-text-input"
                            {...getInputProps({
                                placeholder: "Enter location...",
                            })}
                            />
                            <div>
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => (
                                <div {...getSuggestionItemProps(suggestion)}>
                                {suggestion.description}
                                </div>
                            ))}
                            </div>
                        </div>
                        )}
                    </PlacesAutocomplete>
                </label>
                <br/>
                <label>
                    When is the event taking place?
                    <br />
                    <input
                    className="event-form-text-input"
                    value={date}
                    type="date"
                    onChange={handleDateChange}
                    />
                    <input
                    className="event-form-text-input"
                    value={time}
                    type="time"
                    onChange={handleTimeChange}
                    />
                </label>
                <br/>  
                <label>
                    Provide a description for the event
                    <br/>
                    <textarea
                        className='event-form-text-input'
                        value={description}
                        onChange={handleDescriptionChange}
                        rows={4}
                        maxLength={1000}
                    />
                </label>
                <br/>       
                <label>
                    What is the maximum group size for this event
                    <br/>
                    <input className='event-form-text-input' type="number" value={maxGroupSize} onChange={handleMaxGroupSizeChange}/>
                </label>
                <br/>
                <label>
                    What type of activity?
                    <br/>
                    <select value={eventType} onChange={handleEventTypeChange}>
                        <option value="" disabled>
                        Please select an activity
                        </option>
                        {allowedEventTypes.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    What is the relative difficulty of this event?
                    <br/>
                    <select value={difficulty} onChange={handleDifficultyChange}>
                        <option value="" disabled>
                        Please select a difficulty level
                        </option>
                        {difficulties.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                        ))}
                    </select>
                </label>

            <button id="form-submit" onClick={handleEditSubmit}> Update Event</button>
        </div>
        </>
    )}