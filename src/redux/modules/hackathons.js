import axios from 'axios';

import { selected } from './selectedHackathon';

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
  // TODO check the user is actually logged in
  axios.post('/api/users/select-hackathon/' + hackathon._id)
    .then((res) => {
      dispatch(selected(hackathon));
    });
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
