import axios from 'axios';

export const HACKS = 'HACKS';

// ------------------------------------
// Actions
// ------------------------------------
export function hacks (value: Array): Action {
  return {
    type: HACKS,
    payload: value
  };
}

export const listFromServer = (value) => (dispatch) => {
  // TODO use config path instead
  var hackathonId = value && value._id ? value._id : "-1";
  axios.get('/api/hacks?hackathonId=' + hackathonId)
    .then((res) => {
      dispatch(hacks(res.data.hacks));
    });
};

export const actions = {
  listFromServer
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HACKS]: (state: array, action: {payload: array}): array => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [];
export default function hacksReducer (state: Array = initialState, action: Action): Array {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
