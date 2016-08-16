import axios from 'axios';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
const { notifSend } = notifActions;
import notification from './notification';

export const SELECTED = 'SELECTED';

// ------------------------------------
// Actions
// ------------------------------------
export function selected (value: Object): Action {
  return {
    type: SELECTED,
    payload: value
  };
}

export const select = (hackathon) => (dispatch) => {
  dispatch(selected(hackathon));
  dispatch(notifSend(notification(hackathon.title + ' is now selected', 'success')));
};

export const listFromServer = () => (dispatch) => {
  axios.get('/api/hackathons')
    .then((res) => {
      var response = res.data;
      for (var i = 0; i < response.length; i++) {
        if (response[i].active) {
          dispatch(select(response[i]));
          return;
        }
      }
      // if none are active, let's pick one
      if(response.length > 0) {
        dispatch(select(response[0]));
      }
    });
};

export const actions = {
  select,
  listFromServer
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SELECTED]: (state: Object, action: {payload: Object}): Object => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Object();
export default function selectedHackathonReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
