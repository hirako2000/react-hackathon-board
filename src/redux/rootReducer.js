import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './modules/counter';
import hacks from './modules/hacks';
import hack from './modules/hack';
import { reducer as notifs } from 're-notif';

export default combineReducers({
  counter,
  hacks,
  hack,
  notifs,
  router
});
