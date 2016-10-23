import axios from 'axios';

import { selected } from './selectedHackathon';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
const { notifSend } = notifActions;
import notification from './notification';

export const HACKATHONS = 'HACKATHONS';
export const SELECT = 'SELECT';

// ------------------------------------
// Actions
// ------------------------------------
export function hackathons (value: Array): Action {
  return {
    type: HACKATHONS,
    payload: {hackathons: value}
  };
}

export const listFromServer = () => (dispatch) => {
  axios.get('/api/hackathons')
    .then((res) => {
      var response = res.data;
      dispatch(hackathons(response));
    });
};

export const selectToServer = (hackathon) => (dispatch) => {
    dispatch(selected(hackathon));
};

export const actions = {
  listFromServer,
  selectToServer
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HACKATHONS]: (state: array, action: {payload: array}): array => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Object();
export default function hackathonsReducers (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
