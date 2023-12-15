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
    'Basketball', 'Soccer', 'Baseball', 'Tennis', 'Running', 'Volleyball', 'Swimming',
    'Yoga', 'Gym (Fitness)', 'Handball', 'Biking', 'Martial Arts', 'Hockey', 'Football',
    'Hiking', 'Bowling', 'Water Sports', 'Ping Pong', 'Golf', 'Pickleball', 'Rock Climbing',
    'Skateboarding', 'Badminton', 'Walking', 'Lacrosse', 'Ultimate Frisbee', 'Rugby',
    'Archery', 'Fencing', 'Sailing', 'Rowing', 'Table Tennis', 'Squash', 'Equestrian',
    'CrossFit', 'Triathlons', 'Cricket', 'Jiu-Jitsu', 'Boxing'
  ];
  const history = useHistory()
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const eventsObj = useSelector(state => state.events?.all);
  const events = Object.values(eventsObj);
  const nowTime = new Date()
  const futureEvents = events.filter((event) => nowTime.getTime() < new Date(event.dateTime).getTime())

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, history])

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
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const difficultyLevel = ['Beginner', 'Intermediate', 'Advanced'];
  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleSportFilter = (sport) => {
    setSelectedSport(sport);
  };

  const handleDifficultyFilter = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  useEffect(() => {
    // Apply filters to events
    const filteredBySport = selectedSport
      ? futureEvents.filter((event) => event.eventType === selectedSport)
      : futureEvents;

    const filteredByDifficulty = selectedDifficulty
      ? filteredBySport.filter((event) => event.difficulty === selectedDifficulty)
      : filteredBySport;

    // Sort events by dateTime in descending order
    const sortedEvents = filteredByDifficulty.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

    // Check if the filtered events are different before updating the state
    if (!arraysAreEqual(filteredEvents, sortedEvents)) {
      setFilteredEvents(sortedEvents);
    }
  }, [selectedSport, selectedDifficulty, futureEvents, filteredEvents]);

  
  // Utility function to compare arrays
  const arraysAreEqual = (arr1, arr2) =>
    arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
    
  return (
    <>
      <main>
        <Modal isOpen={showModal === 'signin'} onClose={closeModal}>
          <LoginForm onSuccess={handleSignInSuccess} />
        </Modal>
        <div className="discover-parent-container">
          <div className="filter-container">
            {/* Sport filter */}
            <div>
              <h3>Sport</h3>
              <label>
                <input
                  type="radio"
                  name="sport"
                  value=""
                  checked={!selectedSport}
                  onChange={() => handleSportFilter('')}
                />
                All Sports
              </label>
              {sportsWithEmojis.map((sport, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="sport"
                    value={sport}
                    checked={selectedSport === sport}
                    onChange={() => handleSportFilter(sport)}
                  />
                  {sport}
                </label>
              ))}
            </div>

            {/* Difficulty filter */}
            <div>
              <h3>Difficulty</h3>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value=""
                  checked={!selectedDifficulty}
                  onChange={() => handleDifficultyFilter('')}
                />
                All Difficulty
              </label>
              {difficultyLevel.map((difficulty, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="difficulty"
                    value={difficulty}
                    checked={selectedDifficulty === difficulty}
                    onChange={() => handleDifficultyFilter(difficulty)}
                  />
                  {difficulty}
                </label>
              ))}
            </div>
          </div>

          {/* Render filtered events */}
          <div className="index-container">
            <div className="index-header">
              <h2>Find an event near you</h2>
            </div>
            <button id="event-create-button" className="auth-buttons" onClick={handleCreateEventBtn}>
              Create an event!
            </button>
            {filteredEvents.map((event, index) => (
              <DiscoverPageEventContainer key={index} event={event} index={index} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}