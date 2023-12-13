import React, { useEffect, useState, useRef } from "react";
import './DiscoverPage.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/events";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoginForm from '../SessionForms/LoginForm';
import Modal from '../../context/Modal';
import DiscoverPageEventContainer from "./DiscoverPageEventContainer";

export default function DiscoverPage() {
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
  const futureEvents = events.filter((e) => nowTime.getTime() < new Date(e.dateTime).getTime())
  const [renderedEvents, setRenderedEvents] = useState(futureEvents)

  // ======= filtering logic ================
  const [canRemoveFilters, setCanRemoveFilters] = useState(true)

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, history])


  function handleFilter(eventType) {
    setCanRemoveFilters(false)
    let toFilter = eventType.split(' ')[0]
    let filteredEvents = renderedEvents.filter((event) => event.eventType === toFilter)
    let newSportList = filteredSports.filter((sport) => sport === eventType)
    setRenderedEvents(filteredEvents)
    setFilteredSports(newSportList)
  }

  function resetFilters() {
    setRenderedEvents(futureEvents)
    setFilteredSports(sportsWithEmojis)
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

  const [selectedSport, setSelectedSport] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const updateFilters = () => {
    let filteredEvents = futureEvents;

    // Sport filter
    if (selectedSport) {
      filteredEvents = filteredEvents.filter(event =>
        selectedSport === event.eventType.split(' ')[0]
      );
    }

    // Location filter
    if (selectedLocation) {
      filteredEvents = filteredEvents.filter(event =>
        selectedLocation === event.location
      );
    }

    // Difficulty filter
    if (selectedDifficulty) {
      filteredEvents = filteredEvents.filter(event =>
        selectedDifficulty === event.difficulty
      );
    }

    setRenderedEvents(filteredEvents);
    setCanRemoveFilters(false);
  };

  const locations = ['Brooklyn', 'Manhattan', 'Bronx', 'Queens', 'Staten Island', 'New Jersey'];
  const difficultyLevel = ['Beginner', 'Intermediate', 'Advanced'];

  return (
    <>
      <main>
        <Modal isOpen={showModal === 'signin'} onClose={closeModal}>
          <LoginForm onSuccess={handleSignInSuccess} />
        </Modal>
        <div className="discover-parent-container">
          <div className="filter-container">
            <form>
              <button
                className="filter-sidebar-button"
                type="button"
                onClick={() => {
                  setSelectedSport('');
                  setSelectedDifficulty('');
                  setSelectedLocation('');
                  updateFilters();
                }}
              >
                Reset Filter
              </button>
              <div className="filter-sidebar-field-container">
                <div className="filter-sidebar-field-title">
                  <h3>Sport</h3>
                </div>
                <div className="filter-sidebar-sport-options">
                  {sportsWithEmojis.map((sport, index) => (
                    <div className="filter-field-option">
                      <label key={index}>
                        <input
                          className="filter-radio"
                          type="radio"
                          name="sport"
                          value={sport.split(' ')[0]}
                          checked={selectedSport === sport.split(' ')[0]}
                          onChange={(e) => {
                            const selectedSport = e.target.value;
                            setSelectedSport(selectedSport);
                            updateFilters();
                          }}
                        />
                        {sport}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="filter-sidebar-field-container">
                <div className="filter-sidebar-field-title">
                  <p>Experience</p>
                </div>
                <div className="filter-sidebar-options">
                  {difficultyLevel.map((difficulty, index) => (
                    <label key={index}>
                      <input
                        type="radio"
                        name="difficulty"
                        value={difficulty.split(' ')[0]}
                        checked={selectedDifficulty === difficulty.split(' ')[0]}
                        onChange={(e) => {
                          const selectedDifficulty = e.target.value;
                          setSelectedDifficulty(selectedDifficulty);
                          updateFilters();
                        }}
                      />
                      {difficulty}
                    </label>
                  ))}
                </div>
              </div>
              <p>Location</p>
              {locations.map((location, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="location"
                    value={location.split(' ')[0]}
                    checked={selectedLocation === location.split(' ')[0]}
                    onChange={(e) => {
                      const selectedLocation = e.target.value;
                      setSelectedLocation(selectedLocation);
                      updateFilters();
                    }}
                  />
                  {location}
                </label>
              ))}
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
              {filteredSports.map((sport) => {
                return (
                  <p className="sport-label"
                    onClick={() => handleFilter(sport)}
                  >
                    {sport}
                  </p>
                )
              })}
              <p className="sport-label">Rob's Easter Egg</p>
            </div>
            <button id="event-create-button" className="auth-buttons" onClick={handleCreateEventBtn}>
              Create an event!
            </button>
            {renderedEvents?.map((event, index) => (<DiscoverPageEventContainer event={event} index={index} />))}
          </div>
        </div>
      </main>
    </>
  )
}