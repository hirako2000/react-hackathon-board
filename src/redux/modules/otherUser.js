import axios from 'axios';

export const OTHER_USER = 'OTHER_USER';

export function otherUser (value: Object): Action {
  return {
    type: OTHER_USER,
    payload: value
  };
}

export const fetchFromServer = (id) => (dispatch) => {
  axios.get('/api/users/' + id)
    .then((res) => {
      dispatch(otherUser(res.data));
    });
};

export const toggleAdmin = (id) => (dispatch) => {
  axios.post('/api/users/toggle-admin/' + id)
    .then((res) => {
      dispatch(otherUser(res.data));
    });
};


export const actions = {
  fetchFromServer,
  toggleAdmin
};

const ACTION_HANDLERS = {
  [OTHER_USER]: (state: object, action: {payload: object}): object => action.payload
};


const initialState = {};
export default function otherUserReducers (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
