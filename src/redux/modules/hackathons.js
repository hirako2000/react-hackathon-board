import axios from 'axios';

export const HACKATHONS = 'HACKATHONS';

// ------------------------------------
// Actions
// ------------------------------------
export function hackathons (value: Array): Action {
  return {
    type: HACKATHONS,
    payload: value
  };
}

export const listFromServer = () => (dispatch) => {
  // TODO use config path instead
  axios.get('/api/hackathons')
    .then((res) => {
      dispatch(hackathons(res.data));
    });
};

export const actions = {
  listFromServer
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
const initialState = [];
export default function hackathonsReducers (state: Array = initialState, action: Action): Array {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
