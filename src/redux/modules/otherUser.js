import axios from 'axios';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
const { notifSend } = notifActions;
import notification from './notification';

export const OTHER_USER = 'OTHER_USER';

export function otherUser (value: Object): Action {
  return {
    type: OTHER_USER,
    payload: value
  };
}

export const fetchFromServer = (id) => (dispatch) => {
  axios.get('/api/users/' + id)
    .then((res) => {
      dispatch(otherUser(res.data));
    });
};

export const toggleAdmin = (id) => (dispatch) => {
  axios.post('/api/users/toggle-admin/' + id)
    .then((res) => {
      if(res.data.judge === true) {
        dispatch(notifSend(notification('User is now judge/admin', 'success')));
      } else {
        dispatch(notifSend(notification('User is no longer judge/admin', 'success')));
      }
      dispatch(otherUser(res.data));
    });
};

export const resetPassword = (id) => (dispatch) => {
  axios.post('/api/users/reset-password/' + id)
    .then((res) => {
      dispatch(notifSend(notification('Password set to ' + res.data, 'success')));
    });
};

export const actions = {
  fetchFromServer,
  toggleAdmin,
  resetPassword
};

const ACTION_HANDLERS = {
  [OTHER_USER]: (state: object, action: {payload: object}): object => action.payload
};


const initialState = {};
export default function otherUserReducers (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
