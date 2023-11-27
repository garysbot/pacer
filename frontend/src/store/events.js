import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_EVENTS = "events/RECIEVE_EVENTS"
const RECEIVE_EVENT = "events/RECIEVE_EVENT"
const RECEIVE_NEW_EVENT = "tweets/RECEIVE_NEW_EVENT";
const RECEIVE_EVENT_ERRORS = "tweets/RECEIVE_EVENT_ERRORS";
const CLEAR_EVENT_ERRORS = "tweets/CLEAR_EVENT_ERRORS";


const recieveEvents = events =>({
    type: RECEIVE_EVENTS,
    events
})

const recieveEvent = event =>({
    type: RECEIVE_EVENT,
    event
})

const receiveNewEvent = tweet => ({
  type: RECEIVE_NEW_EVENT,
  tweet
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
        const res = await jwtFetch ('/api/events');
        const events = await res.json();
        dispatch(recieveEvents(events));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
        }
    }
}


export const composeEvent = data => async dispatch => {
  try {
    const res = await jwtFetch('/api/tweets/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const tweet = await res.json();
    dispatch(receiveNewEvent(tweet));
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
    case CLEAR_EVENT_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const eventsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  switch(action.type) {
    case RECEIVE_EVENTS:
      return { ...state, all: action.tweets, new: undefined};
    case RECEIVE_NEW_EVENT:
      return { ...state, new: action.tweet};
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined }
    default:
      return state;
  }
};

export default eventsReducer;