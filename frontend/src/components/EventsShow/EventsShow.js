import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getEventThunk } from "../../store/events";
import EditForm from "./Editform/Editform";
import LoginForm from '../SessionForms/LoginForm';
import Modal from '../../context/Modal';
import './EventsShow.css';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { difficultyBadge } from "../DiscoverPage/DiscoverPageHelpers";
import AttendeeDropdowns from "./AttendeeDropdowns";
import MaybeDropdowns from "./MaybeDropdowns";
import EventComments from "./EventComments";

export default function EventsShow(){
  const dispatch = useDispatch();
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user);

  // ! Loads current event on page load
  useEffect(() => {
      dispatch(getEventThunk(id));
  }, [dispatch, id]);

  const selectedEvent = useSelector((state) => state.events.all[id]);
  const currentUser = useSelector((state) => state.session.user)

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

  useEffect(() => {
    if (selectedEvent?.attendees.includes(sessionUser?._id) && !attending) {
      setAttending(true);
    } else if (!sessionUser) {
      setAttending(false);
    }
  }, [selectedEvent?.attendees, sessionUser?._id]);


  useEffect(() => {
    if (selectedEvent?.maybes.includes(sessionUser?._id) && !interested) {
      setInterested(true);
    } else if (!sessionUser) {
      setInterested(false);
    }
  }, [selectedEvent?.maybes, sessionUser?._id]);

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

  

  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  // State to manage the visibility of the InfoWindow
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  // Function to handle marker click and toggle the InfoWindow visibility
  const handleMarkerClick = () => {
    setInfoWindowVisible(!infoWindowVisible);
  };

  return (
    <>
    <Modal isOpen={showModal === 'signin'} onClose={closeModal}>
      <LoginForm onSuccess={handleSignInSuccess} />
    </Modal>

    {!editPage ? (
    <>
      <div className="event-show-parent-container">
        <div className="event-show-banner-container"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, transparent, rgba(244, 255, 253, 0.8)), url("https://maps.googleapis.com/maps/api/staticmap?center=${selectedEvent?.latitude},${selectedEvent?.longitude}&zoom=12&size=800x800&markers=color:red%7Clabel:A%7C${selectedEvent?.latitude},${selectedEvent?.longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}")`,
          }}
          >
          <div className="event-name-container">  
            <h1>{selectedEvent?.eventName}</h1>
            <div className="event-subheader event-banner-subhead">
              { difficultyBadge(selectedEvent?.difficulty, selectedEvent?.eventType) }
              <p className="event-banner-profile-link">{selectedEvent?.difficulty} {selectedEvent?.eventType} hosted by <Link to={`/users/${selectedEvent?.owner?._id}`}>{selectedEvent?.owner?.firstName} {selectedEvent?.owner?.lastName}</Link></p>
              <p className="event-subheader-host"></p>
            </div>
          </div>
        </div>

        <div className="event-show-content-container">
          <div className="event-show-detail-container">

            <div className="detail-container-row-one">
              <div className="detail-event-inner-left">
                <div className="detail-event-info">
                  <div className="desc-row">
                    <p>
                      <span className="desc-field-label">
                        Date
                      </span>
                      {` ${formattedDate}`}
                    </p>
                    <p>
                      <span className="desc-field-label">Time</span> {` ${formattedTime}`}</p>
                  </div>

                  <div className="desc-row">
                    <p style={{width: '100%'}}>
                      <span className="desc-field-label">Location </span> {selectedEvent?.locationName}</p>
                    
                  </div>
                  <p style={{width: '60%'}}>
                      <span className="desc-field-label">Max Attendees </span> {selectedEvent?.maxGroupSize} people</p>
                  
                  <br></br>
                  <p className="desc-field-label">Details</p>
                  <p>{selectedEvent?.description}</p>
                </div>
                <div className="event-show-rsvp-buttons">
                  <p className="desc-field-label">RSVP</p>
                  {
                    currentUser?._id !== selectedEvent?.owner?._id 
                    && 
                    (
                      <div className="join-event">
                        <button
                          onClick={handleAttendEvent}
                          style={{
                            background: 
                              attending ? 
                                '#89FC00' : 
                                'linear-gradient(145deg, rgba(250,130,76,1) 0%, rgba(255,89,100,1) 100%)',
                            color: attending ? 'green' : '#F4FFFD',
                            height: '3rem',
                            width: '12rem',
                            border: 'none'
                          }}
                          disabled={attending && !interested}
                        >
                          {attending ? 'Attending' : 'Attending?'}
                        </button>
                        <button
                          onClick={handleInterestedInEvent}
                          style={{ 
                            background: 
                              interested ? 
                                '#89FC00' : 
                                'linear-gradient(145deg, rgba(250,130,76,1) 0%, rgba(255,89,100,1) 100%)',
                            color: interested ? 'green' : '#F4FFFD',
                            height: '3rem',
                            width: '12rem',
                            border: 'none'
                            
                          }}
                          disabled={interested && !attending}
                        >
                          {interested ? 'Interested' : 'Interested?'}
                        </button>
                      </div>
                    )
                  }
                  </div>
                </div>
              
                
                <div className="detail-attendees-info">
                  <div className="detail-event-edit">
                    {
                      currentUser?._id === selectedEvent?.owner?._id 
                      && 
                      <div id="event-edit-cont" onClick={handleEditClick}>
                        <p id="event-edit">Edit Event</p>
                      </div>
                    }
                  </div>
                  <p><AttendeeDropdowns selectedEvent={selectedEvent} /></p>
                  <p><MaybeDropdowns selectedEvent={selectedEvent}/></p>
                </div>
            </div>
          </div>

          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={14}
            center={{
              lat: selectedEvent?.latitude,
              lng: selectedEvent?.longitude,
            }}
          >
            <Marker position={{
              lat: selectedEvent?.latitude,
              lng: selectedEvent?.longitude,
            }} 
              onClick={handleMarkerClick}
            />
            {infoWindowVisible && (
              <InfoWindow
                position={{
                  lat: selectedEvent?.latitude,
                  lng: selectedEvent?.longitude,
                }}
                onCloseClick={() => setInfoWindowVisible(false)}
              >
                <div>
                  <p>Location: {selectedEvent?.locationName}</p>
                  <p>Time of Event: {formattedTime}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
          <EventComments selectedEvent={selectedEvent} />
        </div>
      </div>
    </>
    ) : (
      <EditForm setEditPage={setEditPage}/>
    )}
    </>
  )
}