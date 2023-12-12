// get post patch delete
import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECIEVE_COMMENTS = "comments/RECIEVE_COMMENTS"
const receiveComments = comments =>({
    type: RECIEVE_COMMENTS,
    comments
})

export const fetchComments = () => async dispatch =>{
    try {
        const res = await jwtFetch('/api/comments');
        const comments = await res.json();
        dispatch(receiveComments(comments));
        // console.log(events);
    } catch (err) {
      // console.log("hi");
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
        }
    }
}

const RECIEVE_NEW_COMMENT = "comments/RECIEVE_NEW_COMMENT"
const receiveNewComment = comment =>({
    type: RECIEVE_NEW_COMMENT,
    comment
})

export const composeComment = data => async dispatch => {
  try {
    const res = await jwtFetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const comment = await res.json();
    dispatch(receiveNewComment(comment));
    return comment;
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};


const RECEIVE_COMMENT_ERRORS = "comments/RECEIVE_COMMENT_ERRORS";
const receiveErrors = errors => ({
  type: RECEIVE_COMMENT_ERRORS,
  errors
});

const CLEAR_COMMENT_ERRORS = "comments/CLEAR_COMMENT_ERRORS";
export const clearCommentErrors = errors => ({
    type: CLEAR_COMMENT_ERRORS,
    errors
});

const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const updateComment = comment=> ({
    type: UPDATE_COMMENT,
    comment
});

export const updateEventThunk = (eventId, data) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/events/${eventId}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
    const comment = await res.json();
    dispatch(updateComment(comment));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

const DELETE_COMMENT = "comments/DELETE_COMMENT";
const deleteComment = commentId => ({
  type: DELETE_COMMENT,
  commentId
});

export const deleteCommentThunk = commentId => async dispatch => {
  try {
    await jwtFetch(`/api/events/${commentId}`, {
      method: 'DELETE'
    });
    dispatch(deleteComment(commentId));
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
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;
    case RECIEVE_NEW_COMMENT:
      return {...state, [action.comment._id]: action.comment}
    case CLEAR_COMMENT_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const eventsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  switch(action.type) {
    case RECIEVE_COMMENTS:
      const allCommentsArray = action.comments;
  
      // Transform the array into an object with _id as the key
      const allCommentsObject = allCommentsArray.reduce((accumulator, comment) => {
        accumulator[comment._id] = comment;
        return accumulator;
      }, {});

      return { ...state, all: allCommentsObject, new: undefined };
      // return { ...state, all: action.events, new: undefined};
    case RECIEVE_NEW_COMMENT:
      return { ...state, all: { ...state.all, [action.event._id]: action.event }, new: undefined };
    case UPDATE_COMMENT:
      return { ...state, all: { ...state.all, [action.event._id]: action.event }, new: undefined };
    case DELETE_COMMENT:
      const { [action.eventId]: deletedEvent, ...rest } = state.all;
      return { ...state, all: rest, new: undefined };
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined }
    default:
      return state;
  }
};

export default eventsReducer;




