import i18n from '../../config/i18n';

export const LOCALE = 'LOCALE';

// ------------------------------------
// Actions
// ------------------------------------
export function locale (value: Object): Action {
  return {
    type: LOCALE,
    payload: value
  };
}

export const update = (lang) => (dispatch) => {
  i18n.switchLocale(lang);
  dispatch(locale({lang: lang}));
};

export const actions = {
  update
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOCALE]: (state: Object, action: {payload: Object}): Object => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Object();
export default function beautifierReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
