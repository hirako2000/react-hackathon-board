import axios from 'axios';

export const HACK = 'HACK';
export const UPDATE = 'UPDATE';

// ------------------------------------
// Actions
// ------------------------------------
export function hack (value: Object): Action {
  return {
    type: HACK,
    payload: value
  };
}

export function update (value: Object): Action {
  return {
    type: UPDATE,
    payload: value
  };
}

export const fetchFromServer = (id) => (dispatch) => {
  // TODO use config path instead
  axios.get('http://localhost:3000/api/hacks/' + id)
    .then((res) => {
      dispatch(hack(res.data));
    });
};

export const updateToSever = (id) => (dispatch) => {
  // TODO use config path instead
  axios.put('http://localhost:3000/api/hacks/' + id)
    .then((res) => {
      dispatch(hack(res.data));
    });
};

export const actions = {
  fetchFromServer,
  updateToSever
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HACK]: (state: Object, action: {payload: Object}): Object => action.payload,
  [UPDATE]: (state: Object, action: {payload: Object}) : Object => actio .payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function hackReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
