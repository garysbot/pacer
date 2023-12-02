import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
// import { Loader } from "@googlemaps/js-api-loader";
import { getEventThunk } from "../../store/events";
import EditForm from "./Editform/Editform";
import LoginForm from '../SessionForms/LoginForm';
import Modal from '../../context/Modal';
import './EventsShow.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function EventsShow(){
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);

  // ! Loads current event on page load
  useEffect(() => {
      dispatch(getEventThunk(id));
  }, [dispatch, id]);

  const selectedEvent = useSelector((state) => state.events.all[id]);
  const currentUser = useSelector((state) => state.session.user)

  // ! Time converter helper
  const timeConverter = (dateTime) => {
      const date = new Date(dateTime);
      const formattedDate = date.toLocaleDateString("en-US", { year: '2-digit', month: '2-digit', day: '2-digit' });
      const formattedTime = date.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true });

      return (
          <p className="date-time"> {selectedEvent?.locationName} - {formattedDate} {formattedTime}</p>
      )
  }

  // ! Formatted Dates
  const formattedDate = new Date(selectedEvent?.dateTime).toLocaleDateString("en-US", { year: '2-digit', month: '2-digit', day: '2-digit' });

  const formattedTime = new Date(selectedEvent?.dateTime).toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit', hour12: true });

  // ! Edit Event
  const [editPage, setEditPage] = useState(false);

  const handleEditClick = () => {
    setEditPage(true)
  }

  const [attending, setAttending] = useState(false);
  const [interested, setInterested] = useState(false);

  // ! Attending Event
  const handleAttendEvent = () => {
    if (sessionUser) {
      if (attending) {
        setAttending(false);
        setInterested(false);
      } else {
        setAttending(true);
        if (interested) {
          setInterested(false);
        }
      }
    } else {
      openModal('signin');
    }
  };
  
  // ! Interested Event
  const handleInterestedInEvent = () => {
    if (sessionUser) {
      if (interested) {
        setInterested(false);
        setAttending(false);
      } else {
        setInterested(true);
        if (attending) {
          setAttending(false);
        }
      }
    } else {
      openModal('signin');
    }
  };

  // ! Require logged in to attend or interested
  const [showModal, setShowModal] = useState(null);

  const openModal = (modalType) => {
      setShowModal(modalType);
  };

  const closeModal = () => {
      setShowModal(null);
  };

  const handleSignInSuccess = () => {
    closeModal();
};

  // ! Attendees hover modal
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

  // ! Maybes hover modal
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
  
  const difficultyColor = (difficulty, eventType) => {
    switch (difficulty) {
        case 'Beginner':
            return (
                <p className="sport-icon beginner">{sportIcon(eventType)}</p>
            )
        case 'Intermediate':
            return (
                <p className="sport-icon intermediate">{sportIcon(eventType)}</p>
            )
        case 'Advanced':
            return (
                <p className="sport-icon advanced">{sportIcon(eventType)}</p>
            )
        default:
            return null
    }
  }

  const sportIcon = (eventType) => {
    switch (eventType) {
        case 'Basketball':
            return "🏀";
        case 'Soccer':
            return "⚽";
        case 'Baseball':
            return "⚾";
        case 'Tennis':
            return "🎾";
        case 'Running':
            return "🏃‍♂️";
        case 'Volleyball':
            return "🏐";
        case 'Swimming':
            return "🏊‍♂️";
        case 'Yoga':
            return "🧘";
        case 'Gym (Fitness)':
            return "🏋️";
        case 'Handball':
            return "🤾";
        case 'Biking':
            return "🚴";
        case 'Martial Arts':
            return "🥋";
        case 'Hockey':
            return "🏒";
        case 'Football':
            return "🏈";
        case 'Hiking':
            return "🥾";
        case 'Bowling':
            return "🎳";
        case 'Water Sports':
            return "🏄";
        case 'Ping Pong':
            return "🏓";
        case 'Golf':
            return "⛳";
        case 'Pickleball':
            return "🏓";
        case 'Rock Climbing':
            return "🧗";
        case 'Skateboarding':
            return "🛹";
        case 'Badminton':
            return "🏸";
        case 'Walking':
            return "🚶";
        case 'Lacrosse':
            return "🥍";
        case 'Ultimate Frisbee':
            return "🥏";
        case 'Rugby':
            return "🏉";
        case 'Archery':
            return "🏹";
        case 'Fencing':
            return "🤺";
        case 'Sailing':
            return "⛵";
        case 'Rowing':
            return "🚣";
        case 'Table Tennis':
            return "🏓";
        case 'Squash':
            return "🧃";
        case 'Equestrian':
            return "🐎";
        case 'CrossFit':
            return "🏋️‍♂️";
        case 'Triathlons':
            return "🏊‍♂️";
        case 'Cricket':
            return "🏏";
        case 'Jiu-Jitsu':
            return "🥋";
        case 'Boxing':
            return "🥊";
        default:
            return ""; // Return an empty string or a default icon if eventType does not match
    }
};

  return (
    <>
    <Modal isOpen={showModal === 'signin'} onClose={closeModal}>
      <LoginForm onSuccess={handleSignInSuccess} />
    </Modal>

    {!editPage ? (
    <>
      <div className="event-show-parent-container">
        <div 
          className="event-show-banner-container"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, transparent, #F4FFFD), url("https://maps.googleapis.com/maps/api/staticmap?center=${selectedEvent?.latitude},${selectedEvent?.longitude}&zoom=12&size=800x800&markers=color:red%7Clabel:A%7C${selectedEvent?.latitude},${selectedEvent?.longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}")`,
          }}
          >
          <div className="event-name-container">  
            <h1>{selectedEvent?.eventName}</h1>
            <div className="event-subheader event-banner-subhead">
              { difficultyColor(selectedEvent?.difficulty, selectedEvent?.eventType) }
              <p className="event-subheader-difficulty event-banner-profile-link">{selectedEvent?.difficulty} with <Link to={`/users/${sessionUser?._id}`} >{`${selectedEvent?.ownerDetails?.firstName} ${selectedEvent?.ownerDetails?.lastName}`}</Link> on {formattedDate} {formattedTime}</p>
              <p className="event-subheader-host"></p>
            </div>
          </div>
        </div>

        <div className="event-show-content-container">
          <div className="event-show-detail-container">
            <div className="event-name-container">  
              <p>{selectedEvent?.eventName}</p>
            </div>
            <div className="event-edit-container">
              {
                currentUser?._id === selectedEvent?.ownerDetails._id 
                && 
                <p id="event-edit" onClick={handleEditClick}>Edit Event</p>
              }
            </div>

            <div className="event-info-container">
              <p>{timeConverter(selectedEvent?.dateTime)}</p>
              <p>{selectedEvent?.eventType} - {selectedEvent?.difficulty}</p>
              <p>Event created by {selectedEvent?.ownerDetails.firstName} {selectedEvent?.ownerDetails.lastName}</p>
              <p>{selectedEvent?.maxGroupSize} Max Group Size</p>
              <p>{selectedEvent?.description}</p>
              <p>{renderAttendees()}</p>
              <p>{renderMaybes()}</p>
            </div>
            
            {
              currentUser?._id !== selectedEvent?.ownerDetails._id 
              && 
              (
                <div className="join-event">
                  <button
                    onClick={handleAttendEvent}
                    style={{
                      backgroundColor: attending ? '#89FC00' : 'transparent', 
                      color: attending ? 'green' : '#F4FFFD' 
                    }}
                    disabled={attending && !interested}
                  >
                    {attending ? 'Attending Event !!' : 'Attend Event'}
                  </button>
                  <button
                    onClick={handleInterestedInEvent}
                    style={{ 
                      backgroundColor: interested ? '#89FC00' : 'transparent', 
                      color: interested ? 'green' : '#F4FFFD' 
                    }}
                    disabled={interested && !attending}
                  >
                    {interested ? 'Interested in Going' : 'Interested in Event?'}
                  </button>
                </div>
              )
            }
          </div>

          <div id="event-show-map-container">
              <img 
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${selectedEvent?.latitude},${selectedEvent?.longitude}&zoom=12&size=800x800&markers=color:red%7Clabel:A%7C${selectedEvent?.latitude},${selectedEvent?.longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}`}
                  alt="map"
              />
          </div>
        </div>
        
      </div>
    </>
    ) : (
      <EditForm setEditPage={setEditPage}/>
    )}
    </>
  )
}