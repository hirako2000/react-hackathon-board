import axios from 'axios';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
const { notifSend } = notifActions;
import notification from './notification';

export const HACKATHON = 'HACKATHON';
export const UPDATE = 'UPDATE';

// ------------------------------------
// Actions
// ------------------------------------
export function hackathon (value: Object): Action {
  return {
    type: HACKATHON,
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
  axios.get('/api/hackathons/' + id)
    .then((res) => {
      dispatch(hackathon(res.data));
    });
};

export const reset = () => (dispatch) => {
  dispatch(hackathon({hackathon: {}}));
};

export const updateToSever = (id, req) => (dispatch) => {
  // TODO use config path instead
  if(id) {
    axios.put('/api/hackathons/' + id, req.hackathon)
      .then((res) => {
        dispatch(update(res.data));
        dispatch(notifSend(notification(res.data.title + ' is now updated', 'success')));
      });
  } else {
    axios.post('/api/hackathons/', req.hackathon)
      .then((res) => {
        dispatch(update(res.data));
        dispatch(notifSend(notification(res.data.title + ' is now created', 'success')));
      });
  }
};

export const actions = {
  fetchFromServer,
  updateToSever,
  reset
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HACKATHON]: (state: Object, action: {payload: Object}): Object => action.payload,
  [UPDATE]: (state: Object, action: {payload: Object}) : Object => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Object();
export default function hackathonReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
