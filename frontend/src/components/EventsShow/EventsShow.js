import React, { useEffect } from "react";
import './EventsShow.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventThunk } from "../../store/events";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { updateEventThunk } from "../../store/events";

export default function EventsShow(){
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getEventThunk(id));
        setEventName(selectedEvent?.eventName);
        setDescription(selectedEvent?.description);
        setDate(selectedEvent?.dateTime);
        setTime(selectedEvent?.dateTime);
        setEventType(selectedEvent?.eventType);
        setDifficulty(selectedEvent?.difficulty);
        setMaxGroupSize(selectedEvent?.maxGroupSize);
        setSelectedAddress(selectedEvent?.locationName);
        setLatitude(selectedEvent?.latitude);
        setLongitude(selectedEvent?.longitude);
        setLocationName(selectedEvent?.locationName);
    }, [dispatch, id]);

    const selectedEvent = useSelector((state) => state.events.all[id]);
    const currentUser = useSelector((state) => state.session.user)

    const timeConverter = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString("en-US", { year: '2-digit', month: '2-digit', day: '2-digit' });
        const formattedTime = date.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true });

        return (
            <p className="date-time"> {selectedEvent?.locationName} - {formattedDate} {formattedTime}</p>
        )
    }

    const dateExtract = (dateTime => {
      const date = new Date(dateTime);
      return date.toLocaleDateString("en-US", { year: '2-digit', month: '2-digit', day: '2-digit' });
    })

    const timeExtract = (dateTime => {
      const date = new Date(dateTime);
      return date.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true });
    })

    const [editPage, setEditPage] = useState(false);

    const handleEditClick = () => {
      setEditPage(true)
    }

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
    const [date, setDate] = useState(dateExtract(selectedEvent?.dateTime));
    const [time, setTime] = useState(timeExtract(selectedEvent?.dateTime));
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

        const event = await dispatch(updateEventThunk(editEvent));
        redirectToShow(event);
    }

    const redirectToShow = (event) => {
        history.push(`events/${event._id}`);
    }

    const [attending, setAttending] = useState(false);
    const [interested, setInterested] = useState(false);
  
    const handleAttendEvent = () => {
      if (attending) {
        setAttending(false);
        setInterested(false);
      } else {
        setAttending(true);
        if (interested) {
          setInterested(false);
        }
      }
    };
    
    const handleInterestedInEvent = () => {
      if (interested) {
        setInterested(false);
        setAttending(false);
      } else {
        setInterested(true);
        if (attending) {
          setAttending(false);
        }
      }
    };
    

  const [showAttendees, setShowAttendees] = useState(true);
  const attendeesCount = selectedEvent?.attendees.length || 0;

  const handleArrowToggle = () => {
    setShowAttendees(!showAttendees);
  };

  const renderAttendees = () => {
    const attendeesCount = selectedEvent?.attendees.length;

    if (attendeesCount > 5) {
      if (showAttendees) {
        return (
            <span style={{ fontSize: "1.5rem", fontWeight: "400" }}>
                {attendeesCount} Attending <span onClick={handleArrowToggle} style={{ cursor: 'pointer' }}>{showAttendees ? ' \u25B6' : ' \u25BC'}</span>
                <div className="attendees-list" style={{ display: showAttendees ? "block" : "none" }}>
                {selectedEvent?.attendeesDetails.slice(0, 5).map((attendee, index) => (
                    <span key={index} className="attendee-circle" data-name={`${attendee.firstName} ${attendee.lastName}`}></span>
                ))}
                </div>
            </span>
        );
      } else {
        const chunks = [];
        for (let i = 0; i < attendeesCount; i += 5) {
          chunks.push(selectedEvent?.attendeesDetails.slice(i, i + 5));
        }

        return (
          <span style={{ fontSize: "1.5rem", fontWeight: "400" }}>
            {attendeesCount} Attending <span onClick={handleArrowToggle} style={{ cursor: 'pointer' }}>&#9660;</span>
            <div className="attendees-list">
              {chunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex}>
                  {chunk.map((attendee, index) => (
                    <span key={index} className="attendee-circle" data-name={`${attendee.firstName} ${attendee.lastName}`}></span>
                  ))}
                </div>
              ))}
            </div>
          </span>
        );
      }
    } else {
      return (
        <span style={{ fontSize: "1.5rem", fontWeight: "400" }}>
          {attendeesCount} Attending
          <div className="attendees-list">
            {selectedEvent?.attendeesDetails.map((attendee, index) => (
              <span key={index} className="attendee-circle" data-name={`${attendee.firstName} ${attendee.lastName}`}></span>
            ))}
          </div>
        </span>
      );
    }
  };

  const [showMaybes, setShowMaybes] = useState(true);
  const maybesCount = selectedEvent?.maybes.length || 0;

  const handleDownArrowToggle = () => {
    setShowMaybes(!showMaybes);
  };

  const renderMaybes = () => {
    const maybesCount = selectedEvent?.maybes.length;

    if (maybesCount > 5) {
      if (showMaybes) {
        return (
            <span style={{ fontSize: "1.5rem", fontWeight: "400" }}>
                {maybesCount} Interested <span onClick={handleDownArrowToggle} style={{ cursor: 'pointer' }}>{showMaybes? ' \u25B6' : ' \u25BC'}</span>
                <div className="maybes-list" style={{ display: showMaybes ? "block" : "none" }}>
                {selectedEvent?.maybesDetails.slice(0, 5).map((maybes, index) => (
                    <span key={index} className="attendee-circle" data-name={`${maybes.firstName} ${maybes.lastName}`}></span>
                ))}
                </div>
            </span>
        );
      } else {
        const chunks = [];
        for (let i = 0; i < maybesCount; i += 5) {
          chunks.push(selectedEvent?.maybesDetails.slice(i, i + 5));
        }

        return (
          <span style={{ fontSize: "1.5rem", fontWeight: "400" }}>
            {maybesCount} Interested <span onClick={handleDownArrowToggle} style={{ cursor: 'pointer' }}>&#9660;</span>
            <div className="maybes-list">
              {chunks.map((chunk, chunkIndex) => (
                <div key={chunkIndex}>
                  {chunk.map((maybes, index) => (
                    <span key={index} className="attendee-circle" data-name={`${maybes.firstName} ${maybes.lastName}`}></span>
                  ))}
                </div>
              ))}
            </div>
          </span>
        );
      }
    } else {
      return (
        <span style={{ fontSize: "1.5rem", fontWeight: "400" }}>
          {maybesCount} Interested
          <div className="maybes-list">
            {selectedEvent?.maybesDetails.map((maybes, index) => (
              <span key={index} className="attendee-circle" data-name={`${maybes.firstName} ${maybes.lastName}`}></span>
            ))}
          </div>
        </span>
      );
    }
  };

    return (
        <>
        {!editPage ? (
        <>
            {currentUser?._id === selectedEvent?.ownerDetails._id && <p id="event-edit" onClick={handleEditClick}>Edit Event</p>}
            <div className="name-box">  
                <p>{selectedEvent?.eventName}</p>
            </div>
            <div className="event-info">
                <p>{timeConverter(selectedEvent?.dateTime)}</p>
                <p>{selectedEvent?.eventType} - {selectedEvent?.difficulty}</p>
                <p>Event created by {selectedEvent?.ownerDetails.firstName} {selectedEvent?.ownerDetails.lastName}</p>
                <p>{selectedEvent?.maxGroupSize} Max Group Size</p>
                <p>{selectedEvent?.description}</p>
                <p>{renderAttendees()}</p>
                <p>{renderMaybes()}</p>
            </div>
            
            {currentUser?._id !== selectedEvent?.ownerDetails._id && (
              <div className="join-event">
                <button
                  onClick={handleAttendEvent}
                  style={{ backgroundColor: attending ? '#89FC00' : 'transparent', color: attending ? 'green' : '#F4FFFD' }}
                  disabled={attending && !interested}
                >
                  {attending ? 'Attending Event !!' : 'Attend Event'}
                </button>
                <button
                  onClick={handleInterestedInEvent}
                  style={{ backgroundColor: interested ? '#89FC00' : 'transparent', color: interested ? 'green' : '#F4FFFD' }}
                  disabled={interested && !attending}
                >
                  {interested ? 'Interested in Going' : 'Interested in Event?'}
                </button>
              </div>
            )}
        </>
          ) : (
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
        </>
    )
}
