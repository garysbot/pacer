import jwtFetch from './jwt';

// Action Types
const GET_USER = "users/GET_USER";
const EDIT_USER = "users/EDIT_USER";
const PATCH_USER = "users/PATCH_USER";

// Action Creators
const getUserSuccess = (user) => ({
  type: GET_USER,
  user,
});

const editUserSuccess = (user) => ({
  type: EDIT_USER,
  user,
});

const patchUserSuccess = (user) => ({
  type: PATCH_USER,
  user,
});

// Thunk Action Creators
export const getUser = (userId) => async (dispatch) => {
  try {
    const response = await jwtFetch(`/api/users/${userId}`);
    const user = await response.json();
    dispatch(getUserSuccess(user));
  } catch (error) {
    console.error(error);
    // Handle error as needed
  }
};

export const editUser = (userId, updatedUserData) => async (dispatch) => {
  try {
    const response = await jwtFetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    });
    const user = await response.json();
    dispatch(editUserSuccess(user));
  } catch (error) {
    console.error(error);
    // Handle error as needed
  }
};

export const patchUser = (userId, updatedUserData) => async (dispatch) => {
  try {
    const response = await jwtFetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    });
    const user = await response.json();
    dispatch(patchUserSuccess(user));
  } catch (error) {
    console.error(error);
    // Handle error as needed
  }
};

// Reducer
const usersReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
      };
    case EDIT_USER:
      return {
        ...state,
        user: action.user,
      };
    case PATCH_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default usersReducer;
