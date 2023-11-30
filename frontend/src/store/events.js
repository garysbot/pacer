import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_EVENTS = "events/RECIEVE_EVENTS"
const RECEIVE_EVENT = "events/RECIEVE_EVENT"
const RECEIVE_NEW_EVENT = "events/RECEIVE_NEW_EVENT";
const RECEIVE_EVENT_ERRORS = "events/RECEIVE_EVENT_ERRORS";
const CLEAR_EVENT_ERRORS = "events/CLEAR_EVENT_ERRORS";
const UPDATE_EVENT = "events/UPDATE_EVENT";
const DELETE_EVENT = "events/DELETE_EVENT";


const receiveEvents = events =>({
    type: RECEIVE_EVENTS,
    events
})

const receiveEvent = event =>({
    type: RECEIVE_EVENT,
    event
})

const updateEvent = event => ({
  type: UPDATE_EVENT,
  event
});

const deleteEvent = eventId => ({
  type: DELETE_EVENT,
  eventId
});

const receiveNewEvent = event => ({
  type: RECEIVE_NEW_EVENT,
  event
});

const receiveErrors = errors => ({
  type: RECEIVE_EVENT_ERRORS,
  errors
});

export const clearEventErrors = errors => ({
    type: CLEAR_EVENT_ERRORS,
    errors
});


export const fetchEvents = () => async dispatch =>{
    try {
        const res = await jwtFetch('/api/events');
        const events = await res.json();
        dispatch(receiveEvents(events));
        // console.log(events);
    } catch (err) {
      // console.log("hi");
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
        }
    }
}


export const composeEvent = data => async dispatch => {
  try {
    const res = await jwtFetch('/api/events/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const event = await res.json();
    dispatch(receiveNewEvent(event));
    return event;
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const updateEventThunk = (eventId, data) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    const event = await res.json();
    dispatch(updateEvent(event));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const deleteEventThunk = eventId => async dispatch => {
  try {
    await jwtFetch(`/api/events/${eventId}`, {
      method: 'DELETE'
    });
    dispatch(deleteEvent(eventId));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const getEventThunk = eventId => async dispatch => {
  try {
    const res = await jwtFetch(`/api/events/${eventId}`);
    const event = await res.json();
    dispatch(receiveEvent(event));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};


const nullErrors = null;

export const eventErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_EVENT_ERRORS:
      return action.errors;
    case RECEIVE_NEW_EVENT:
      return {...state, [action.event._id]: action.event}
    case CLEAR_EVENT_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const eventsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  switch(action.type) {
    case RECEIVE_EVENTS:
      const allEventsArray = action.events;
  
      // Transform the array into an object with _id as the key
      const allEventsObject = allEventsArray.reduce((accumulator, event) => {
        accumulator[event._id] = event;
        return accumulator;
      }, {});

      return { ...state, all: allEventsObject, new: undefined };
      // return { ...state, all: action.events, new: undefined};
    case RECEIVE_NEW_EVENT:
      return { ...state, all: { ...state.all, [action.event._id]: action.event }, new: undefined };
    case UPDATE_EVENT:
      return { ...state, all: { ...state.all, [action.event._id]: action.event }, new: undefined };
    case DELETE_EVENT:
      const { [action.eventId]: deletedEvent, ...rest } = state.all;
      return { ...state, all: rest, new: undefined };
    case RECEIVE_EVENT:
      return { ...state, all: { ...state.all, [action.event._id]: action.event }, new: undefined };
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined }
    default:
      return state;
  }
};

export default eventsReducer;