import axios from 'axios';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
const { notifSend } = notifActions;
import notification from './notification';

export const USER = 'USER';
export const UPDATE = 'UPDATE_USER';

// ------------------------------------
// Actions
// ------------------------------------
export function user (value: Object): Action {
  return {
    type: USER,
    payload: value
  };
}

export function update (value: Object): Action {
  return {
    type: UPDATE,
    payload: value
  };
}

export const fetchFromServer = () => (dispatch) => {
  axios.get('/api/users/me')
    .then((res) => {
      dispatch(user(res.data));
    }).catch(function (error) {
      console.log("Caught error fetching /me");
    });
};

export const updateToSever = (req) => (dispatch) => {
  axios.put('/api/users/me', req)
    .catch((res) => {
      dispatch(notifSend(notification('Could not update profile', 'warning')));
    })
    .then((res) => {
      if(res) {
        dispatch(update(res.data));
        dispatch(notifSend(notification(res.data.user.username + ' is now updated', 'success')));
      }
    });
};

export const reset = () => (dispatch) => {
  dispatch(user(null));
};

export const actions = {
  fetchFromServer,
  updateToSever,
  reset
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER]: (state: Object, action: {payload: Object}): Object => action.payload,
  [UPDATE]: (state: Object, action: {payload: Object}) : Object => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Object();
export default function userReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
