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

  const [showAttendees, setShowAttendees] = useState(false);
  const attendeesCount = selectedEvent[eventKey]?.attendees.length || 0;

  const handleArrowToggle = () => {
    setShowAttendees(!showAttendees);
  };

  const renderAttendees = () => {
    const attendeesCount = selectedEvent[eventKey]?.attendees.length;

    if (attendeesCount > 5) {
      if (showAttendees) {
        return (
            <span onClick={handleArrowToggle} style={{ fontSize: "1.5rem", fontWeight: "400" }}>
                {attendeesCount} Attending <span style={{ cursor: 'pointer' }}>{showAttendees ? ' \u25B6' : ' \u25BC'}</span>
                <div className="attendees-list" style={{ display: showAttendees ? "block" : "none" }}>
                {selectedEvent[eventKey]?.attendees.slice(0, 5).map((attendee, index) => (
                    <span key={index} className="attendee-circle" data-name={`${attendee.firstName} ${attendee.lastName}`}></span>
                ))}
                </div>
            </span>
        );
      } else {
        const chunks = [];
        for (let i = 0; i < attendeesCount; i += 5) {
          chunks.push(selectedEvent[eventKey]?.attendees.slice(i, i + 5));
        }

        return (
          <span onClick={handleArrowToggle} style={{ fontSize: "1.5rem", fontWeight: "400" }}>
            {attendeesCount} Attending <span style={{ cursor: 'pointer' }}>&#9660;</span>
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
            {selectedEvent[eventKey]?.attendees.map((attendee, index) => (
              <span key={index} className="attendee-circle" data-name={`${attendee.firstName} ${attendee.lastName}`}></span>
            ))}
          </div>
        </span>
      );
    }
  };

  const [showMaybes, setShowMaybes] = useState(false);
  const maybesCount = selectedEvent[eventKey]?.maybes.length || 0;

  const handleDownArrowToggle = () => {
    setShowMaybes(!showMaybes);
  };

  const renderMaybes = () => {
    const maybesCount = selectedEvent[eventKey]?.maybes.length;

    if (maybesCount > 5) {
      if (showMaybes) {
        return (
            <span onClick={handleDownArrowToggle} style={{ fontSize: "1.5rem", fontWeight: "400" }}>
                {maybesCount} Interested <span style={{ cursor: 'pointer' }}>{showMaybes? ' \u25B6' : ' \u25BC'}</span>
                <div className="maybes-list" style={{ display: showMaybes ? "block" : "none" }}>
                {selectedEvent[eventKey]?.maybes.slice(0, 5).map((maybes, index) => (
                    <span key={index} className="attendee-circle" data-name={`${maybes.firstName} ${maybes.lastName}`}></span>
                ))}
                </div>
            </span>
        );
      } else {
        const chunks = [];
        for (let i = 0; i < maybesCount; i += 5) {
          chunks.push(selectedEvent[eventKey]?.maybes.slice(i, i + 5));
        }

        return (
          <span onClick={handleDownArrowToggle} style={{ fontSize: "1.5rem", fontWeight: "400" }}>
            {maybesCount} Interested <span style={{ cursor: 'pointer' }}>&#9660;</span>
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
            {selectedEvent[eventKey]?.maybes.map((maybes, index) => (
              <span key={index} className="attendee-circle" data-name={`${maybes.firstName} ${maybes.lastName}`}></span>
            ))}
          </div>
        </span>
      );
    }
  };


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
                <p>{selectedEvent[eventKey]?.maxGroupSize} Max Group Size</p>
                <p>{selectedEvent[eventKey]?.description}</p>
                <p>{renderAttendees()}</p>
                <p>{renderMaybes()}</p>
            </div>

        </>
    )
}
