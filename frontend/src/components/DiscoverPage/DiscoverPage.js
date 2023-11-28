import React, { useEffect } from "react";
import './DiscoverPage.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/events";

export default function DiscoverPage(props){
    const [filterContainerOpen, setFilterContainerOpen] = useState(false);
    const eventsObj = useSelector(state => state.events.all);
    const dispatch = useDispatch();
    const events = Object.values(eventsObj);
    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch])

    return (
        <>
            <main>
                <div className="discover-parent-container">
                    <div className="filter-container">
                        <form>                           
                            <h3>Filter</h3>
                            <p>Primary Sport</p>
                        </form>
                    </div>

                    <div className="index-container">
                        <div className="index-header">
                            <h2>Find an event near you</h2>
                        </div>

                        <div className="sport-filter-container">
                            <p className="sport-label">Running 🏃🏻‍♂️</p>
                            <p className="sport-label">Basketball 🏀</p>
                            <p className="sport-label">Weight Lifting 🏋️</p>
                            <p className="sport-label">Tennis 🎾</p>
                        </div>
                        {
                            events.map(event =>    
                                (
                                    <>
                                        <p></p>

                                        <div className="event-container">
                                            <div className="event-content">
                                                <div className="event-header">
                                                    <h3>{event.eventName}</h3>
                                                    <div className="event-icons">
                                                        <p className="sport-label">🏃🏻‍♂️</p>
                                                    </div>
                                                </div>
                
                                                <div className="date-time-location">
                                                    <p>{event.dateTime}</p>
                                                    <p>{event.locationName}</p>
                                                    <p>{event.difficulty}</p>
                                                    <p>{`${event.attendees.length} / ${event.maxGroupSize} Attendees`}</p>
                                                </div>
                                                <div className="event-description">
                                                    {event.description}
                                                </div>
                                            </div>
                                            
                                            <div className="event-mini-map-container">
                                                <img src='/static/temp-map.png' alt='map' />                            
                                            </div>
                                        </div>
                                    </>
                                )
                            )
                        }
                        



                    </div>
                        

                </div>
            </main>
        </>
    )
}