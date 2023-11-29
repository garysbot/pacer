import React, { useEffect, useState, useRef } from "react";
import './DiscoverPage.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/events";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function DiscoverPage(props){
    const history = useHistory()
    const [filterContainerOpen, setFilterContainerOpen] = useState(false);
    const eventsObj = useSelector(state => state.events.all);
    const dispatch = useDispatch();
    const events = Object.values(eventsObj);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch])

    const timeConverter = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString("en-US", { year: '2-digit', month: '2-digit', day: '2-digit' });
        const formattedTime = date.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true });

        return (
            <p className="date-time">{formattedDate} {formattedTime}</p>
        )
    }
    // ! For sport-filter-container horizontal mouse scroll
    // Ref for the container and state for drag-scrolling
    const sportFilterContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Mouse down handler
    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - sportFilterContainerRef.current.offsetLeft);
        setScrollLeft(sportFilterContainerRef.current.scrollLeft);
    };

    // Mouse move handler
    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sportFilterContainerRef.current.offsetLeft;
        const walk = (x - startX) * 3; // Scroll-fastness
        sportFilterContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    // Mouse up and leave handlers
    const onMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    return (
        <>
            <main>
                <div className="discover-parent-container">
                    <div className="filter-container">
                        <form>                           
                            <h3>Filter</h3>
                            <p>Primary Sport</p>
                            <p>Primary Sport</p>
                            <p>Primary Sport</p>
                            <p>Primary Sport</p>
                            <p>Primary Sport</p>
                            <p>Primary Sport</p>
                            <p>Primary Sport</p>
                            <p>Primary Sport</p>
                        </form>
                    </div>
                    <div className="index-container">
                        <div className="index-header">
                            <h2>Find an event near you</h2>
                        </div>

                        <div 
                            className="sport-filter-container"
                            ref={sportFilterContainerRef}
                            onMouseDown={onMouseDown}
                            onMouseMove={onMouseMove}
                            onMouseUp={onMouseUpOrLeave}
                            onMouseLeave={onMouseUpOrLeave}
                            >
                                <p className="sport-label">Running 🏃🏻‍♂️</p>
                                <p className="sport-label">Basketball 🏀</p>
                                <p className="sport-label">Weight Lifting 🏋️</p>
                                <p className="sport-label">Tennis 🎾</p>
                                <p className="sport-label">Running 🏃🏻‍♂️</p>
                                <p className="sport-label">Basketball 🏀</p>
                                <p className="sport-label">Weight Lifting 🏋️</p>
                                <p className="sport-label">Tennis 🎾</p>
                                <p className="sport-label">Running 🏃🏻‍♂️</p>
                                <p className="sport-label">Basketball 🏀</p>
                                <p className="sport-label">Weight Lifting 🏋️</p>
                                <p className="sport-label">Tennis 🎾</p>
                                <p className="sport-label">Running 🏃🏻‍♂️</p>
                                <p className="sport-label">Basketball 🏀</p>
                                <p className="sport-label">Weight Lifting 🏋️</p>
                                <p className="sport-label">Tennis 🎾</p>
                                <p className="sport-label">Running 🏃🏻‍♂️</p>
                                <p className="sport-label">Basketball 🏀</p>
                                <p className="sport-label">Weight Lifting 🏋️</p>
                                <p className="sport-label">Tennis 🎾</p>
                        </div>
                        <button id="event-create-button"
                            onClick={()=>history.push("/event-form")}
                        >
                            Create an event!
                        </button>
                        {
                            events.map((event, index) =>    
                                (
                                    // <div key={index}>{event.id}</div>
                                    <div key={index} className="event-container">
                                        <div className="event-content">
                                            <div className="event-header">
                                                <h3>{event.eventName}</h3>
                                                <div className="event-subheader">
                                                    <p className="sport-icon">🏃🏻‍♂️</p>
                                                    <p className="event-subheader-difficulty">Intermediate</p>
                                                </div>
                                            </div>
                                            <div className="date-time-location">
                                                { timeConverter(event.dateTime) }
                                                <p>{event.locationName}</p>
                                                <p>{event.difficulty}</p>
                                                <p>{`${event.attendees.length} / ${event.maxGroupSize} Attendees`}</p>
                                            </div>
                                            <div className="event-description">
                                                {event.description}
                                            </div>
                                        </div>
                                        <div className="event-mini-map-container">
                                            <img
                                                src={`https://maps.googleapis.com/maps/api/staticmap?center=${event?.latitude},${event?.longitude}&zoom=12&size=400x400&markers=color:red%7Clabel:A%7C${event?.latitude},${event?.longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}`}
                                                alt="map"
                                            />
                                            {/* <img src='/static/temp-map.png' alt='map' /> */}
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </main>
        </>
    )
}