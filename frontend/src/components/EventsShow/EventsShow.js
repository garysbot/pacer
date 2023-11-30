import React, { useEffect, useState } from "react";
import './EventsShow.css';
import { useDispatch, useSelector } from "react-redux";
import { getEventThunk } from "../../store/events";
import { useParams } from "react-router-dom";
import EditForm from "./Editform/Editform";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoginForm from '../SessionForms/LoginForm';
import Modal from '../../context/Modal';
// import { Loader } from "@googlemaps/js-api-loader";

export default function EventsShow(){
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getEventThunk(id));
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

    const [editPage, setEditPage] = useState(false);

    const handleEditClick = () => {
      setEditPage(true)
    }

    const [attending, setAttending] = useState(false);
    const [interested, setInterested] = useState(false);
  
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
      
  // let map;

  // const loader = new Loader({
  //   apiKey: "YOUR_API_KEY",
  //   version: "weekly",
  // });
  
  // loader.load().then(async () => {
  //   const { Map } = await google.maps.importLibrary("maps");
  
  //   map = new Map(document.getElementById("event-large-map-container"), {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8,
  //   });
  // });

    return (
        <>
        <Modal isOpen={showModal === 'signin'} onClose={closeModal}>
          <LoginForm onSuccess={handleSignInSuccess} />
        </Modal>

        {!editPage ? (
        <>
          <div className="master-show-div">
            <div>
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
              </div>
              <div id="event-large-map-container">
                  <img 
                      src={`https://maps.googleapis.com/maps/api/staticmap?center=${selectedEvent?.latitude},${selectedEvent?.longitude}&zoom=12&size=800x800&markers=color:red%7Clabel:A%7C${selectedEvent?.latitude},${selectedEvent?.longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}`}
                      alt="map"
                  />

              </div>
            </div>
        </>
          ) : (
            <EditForm setEditPage={setEditPage}/>
          )}
          </>
    )}