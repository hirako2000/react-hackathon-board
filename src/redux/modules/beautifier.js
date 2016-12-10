import axios from 'axios';

export const BEAUTIFIER = 'BEAUTIFIER';
export const BEAUTIFY = 'BEAUTIFY';

// ------------------------------------
// Actions
// ------------------------------------
export function beautifier (value: Object): Action {
  return {
    type: BEAUTIFIER,
    payload: value
  };
}

export function beautify (value: Object): Action {
  return {
    type: BEAUTIFY,
    payload: value
  };
}

export const update = (req) => (dispatch) => {
  axios.post('/api/beautifier/', req)
    .catch((res) => {
    })
    .then((res) => {
      if(res) {
        dispatch(beautifier(res.data));
      }
    });
};

export const reset = () => (dispatch) => {
  dispatch(beautifier({content: '', type: 'js'}));
};

export const actions = {
  update,
  reset
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BEAUTIFIER]: (state: Object, action: {payload: Object}): Object => action.payload,
  [BEAUTIFY]: (state: Object, action: {payload: Object}) : Object => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Object();
export default function beautifierReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
