import axios from 'axios';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
const { notifSend } = notifActions;
import notification from './notification';

export const USER = 'USER';

// ------------------------------------
// Actions
// ------------------------------------
export function user (value: Object): Action {
  return {
    type: USER,
    payload: value
  };
}

export const fetchFromServer = () => (dispatch) => {
  axios.get('/api/user')
    .then((res) => {
      dispatch(user(res.data));
    });
};

export const reset = () => (dispatch) => {
  dispatch(user(null));
};

export const actions = {
  fetchFromServer,
  reset
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER]: (state: Object, action: {payload: Object}): Object => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Object();
export default function userReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
