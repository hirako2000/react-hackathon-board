import axios from 'axios';

export const USERS = 'USERS';

export function users (value: Array): Action {
  return {
    type: USERS,
    payload: value
  };
}

export const listFromServer = () => (dispatch) => {
  axios.get('/api/users')
    .then((res) => {
      dispatch(users(res.data));
    });
};

export const actions = {
  listFromServer
};

const ACTION_HANDLERS = {
  [USERS]: (state: array, action: {payload: array}): array => action.payload
};

const initialState = [];
export default function usersReducers (state: Array = initialState, action: Action): Array {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
