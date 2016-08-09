import axios from 'axios';

export const HACKATHONS = 'HACKATHONS';
export const SELECT = 'SELECT';
export const SELECTED = 'SELECTED';

// ------------------------------------
// Actions
// ------------------------------------
export function hackathons (value: Array): Action {
  return {
    type: HACKATHONS,
    payload: {hackathons: value}
  };
}

export function selected (value: Object): Action {
  return {
    type: SELECTED,
    payload: {selected: value}
  };
}

export function select (value: Object): Action {
  return {
    type: SELECT,
    payload: value
  };
}

export const listFromServer = () => (dispatch) => {
  axios.get('/api/hackathons')
    .then((res) => {
      var response = res.data;
      dispatch(hackathons(response));
    });
};

export const selectToServer = (id) => (dispatch) => {
  // TODO check the user is actually logged in
  axios.post('/api/users/select-hackathon/' + id)
    .then((res) => {
      axios.get('/api/hackathons')
        .then((res2) => {
          var response = res2.data;
          response.push({selected: res.data});
          dispatch(hackathons(response));
          //dispatch(selected(res.data));
        });
      //dispatch(select(res.data));

    });
};

export const actions = {
  listFromServer,
  selectToServer
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HACKATHONS]: (state: array, action: {payload: array}): array => action.payload,
  [SELECT]: (state: Object, action: {payload: Object}): Object => action.payload,
  [SELECTED]: (state: Object, action: {payload: Object}): Object => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Object();
export default function hackathonsReducers (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
