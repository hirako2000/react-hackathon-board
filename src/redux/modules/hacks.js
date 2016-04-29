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

export const listFromServer = () => (dispatch) => {
  // TODO use config path instead
  axios.get('http://localhost:3000/api/hacks/list')
    .then((res) => {
      dispatch(hacks(res.data));
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
