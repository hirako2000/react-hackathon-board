import axios from 'axios';

export const HACKS = 'HACKS';
export const MY_HACKS = 'MY_HACKS';
export const NOMINATED_HACKS = 'MY_HACKS';

// ------------------------------------
// Actions
// ------------------------------------
export function hacks (value: Array): Action {
  return {
    type: HACKS,
    payload: value
  };
}

export function myHacks (value: Array): Action {
  return {
    type: MY_HACKS,
    payload: value
  };
}

export function nominatedHacks (value: Array): Action {
  return {
    type: NOMINATED_HACKS,
    payload: value
  };
}

export const listFromServer = (hackathon) => (dispatch) => {
  // TODO use config path instead
  dispatch(hacks(null));
  var hackathonId = hackathon && hackathon._id ? hackathon._id : "-1";
  axios.get('/api/hacks?hackathonId=' + hackathonId)
    .then((res) => {
      dispatch(hacks(res.data.hacks));
    });
};

export const listMyHacksFromServer = () => (dispatch) => {
  axios.get('/api/hacks/my')
    .then((res) => {
      dispatch(myHacks(res.data.hacks));
    });
};

export const listNominatedHacksFromServer = (hackathon) => (dispatch) => {
  var hackathonId = hackathon && hackathon._id ? hackathon._id : "-1";
  axios.get('/api/hacks/nominated?hackathonId=' + hackathonId)
    .then((res) => {
      dispatch(nominatedHacks(res.data.hacks));
    });
};

export const actions = {
  listFromServer,
  listMyHacksFromServer,
  listNominatedHacksFromServer
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HACKS]: (state: array, action: {payload: array}): array => action.payload,
  [MY_HACKS]: (state: array, action: {payload: array}): array => action.payload,
  [NOMINATED_HACKS]: (state: array, action: {payload: array}): array => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [];
export default function hacksReducer (state: Array = initialState, action: Action): Array {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
