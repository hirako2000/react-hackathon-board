import axios from 'axios';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
const { notifSend } = notifActions;
import notification from './notification';

export const COMMENTS = 'COMMENTS';

// ------------------------------------
// Actions
// ------------------------------------
export function comments (value: Object): Action {
  return {
    type: COMMENTS,
    payload: value
  };
}

export const fetchComments = (id) => (dispatch) => {
  axios.get('/api/hacks/' + id + '/comments')
    .then((res) => {
      dispatch(comments(res.data));
    });
};

export const sendComment = (id, req) => (dispatch) => {
  axios.post('/api/hacks/' + id + '/comments', req)
    .then((res) => {
      dispatch(comments(res.data));
    });
};

export const actions = {
  fetchComments,
  sendComment
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COMMENTS]: (state: Object, action: {payload: Object}) : Object => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Object();
export default function hackReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
