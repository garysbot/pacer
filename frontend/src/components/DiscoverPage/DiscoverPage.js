import React, { useEffect, useState, useRef } from "react";
import './DiscoverPage.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/events";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoginForm from '../SessionForms/LoginForm';
import Modal from '../../context/Modal';
import { difficultyBadge } from "./DiscoverPageHelpers";

export default function DiscoverPage(props){
    const sportsWithEmojis = [
        'Basketball 🏀', 'Soccer ⚽', 'Baseball ⚾', 'Tennis 🎾', 'Running 🏃‍♂️', 'Volleyball 🏐', 'Swimming 🏊‍♂️',
        'Yoga 🧘', 'Gym (Fitness) 🏋️', 'Handball 🤾', 'Biking 🚴', 'Martial Arts 🥋', 'Hockey 🏒', 'Football 🏈',
        'Hiking 🥾', 'Bowling 🎳', 'Water Sports 🏄', 'Ping Pong 🏓', 'Golf ⛳', 'Pickleball 🏓', 'Rock Climbing 🧗',
        'Skateboarding 🛹', 'Badminton 🏸', 'Walking 🚶', 'Lacrosse 🥍', 'Ultimate Frisbee 🥏', 'Rugby 🏉',
        'Archery 🏹', 'Fencing 🤺', 'Sailing ⛵', 'Rowing 🚣', 'Table Tennis 🏓', 'Squash 🧃', 'Equestrian 🐎',
        'CrossFit 🏋️‍♂️', 'Triathlons 🏊‍♂️🚴‍♂️🏃‍♂️', 'Cricket 🏏', 'Jiu-Jitsu 🥋', 'Boxing 🥊'
    ];
    const history = useHistory()
    const [filteredSports, setFilteredSports] = useState(sportsWithEmojis);
    const eventsObj = useSelector(state => state.events?.all);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const events = Object.values(eventsObj);
    // ==================== calculating time functionality =============================
    const nowTime = new Date()
    const futureEvents = events.filter((e)=> nowTime.getTime() < new Date(e.dateTime).getTime())
    const [renderedEvents, setRenderedEvents] = useState(futureEvents)

    // ======= filtering logic ================
    const [canRemoveFilters, setCanRemoveFilters] = useState(true)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch, history])


    function handleFilter(eventType){
        setCanRemoveFilters(false)
        let toFilter = eventType.split(' ')[0]
        let filteredEvents = renderedEvents.filter((event)=>event.eventType===toFilter)
        let newSportList = filteredSports.filter((sport)=>sport===eventType)
        setRenderedEvents(filteredEvents)
        setFilteredSports(newSportList)
    }

    function resetFilters(){
        setRenderedEvents(futureEvents)
        setFilteredSports(sportsWithEmojis)
    }

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

    const [showModal, setShowModal] = useState(null); // Use null for no modal, 'signup' for signup, 'signin' for signin

    const openModal = (modalType) => {
        setShowModal(modalType);
    };

    const closeModal = () => {
        setShowModal(null);
    };

    const handleSignInSuccess = () => {
        closeModal();
    };

    const handleCreateEventBtn = () => {
        if (sessionUser) {
            history.push("/event-form")
        }
        else {
            openModal('signin');
        }
    }

    return (
        <>
          <main>
            <Modal isOpen={showModal === 'signin'} onClose={closeModal}>
                <LoginForm onSuccess={handleSignInSuccess} />
            </Modal>
            <div className="discover-parent-container">
              <div className="filter-container">
                  <form>                           
                      <h3>Filter</h3>
                      <p>Sport</p>
                      <p>Experience</p>
                      <p>Borough</p>
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
                    <p className="sport-label" onClick={resetFilters}>X</p>
                    {filteredSports.map((sport)=>{
                        return (
                            <p className="sport-label"
                                onClick={()=>handleFilter(sport)}
                            >
                                {sport}
                            </p>
                        )
                    })}
                    <p className="sport-label">Rob's Easter Egg</p>
                  </div>
                    <button id="event-create-button"
                      onClick={handleCreateEventBtn}
                    >
                      Create an event!
                    </button>
                    {
                      renderedEvents?.map((event, index) =>    
                        (
                          <div className="event-container">
                            <div className="event-content">
                              <div className="event-header">
                                <Link key={index} to={`/events/${event._id}`}>
                                  <h3>{event.eventName}</h3>
                                </Link>
                                <div className="event-subheader">
                                    { difficultyBadge(event.difficulty, event.eventType) }
                                    <p className="event-subheader-difficulty">{event.difficulty}</p>
                                    <p className="event-subheader-host">with {`${event.ownerDetails?.firstName} ${event.ownerDetails?.lastName}`}</p>
                                </div>
                              </div>
                              <div className="date-time-location">
                                { timeConverter(event.dateTime) }
                                <p>{event.locationName}</p>
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