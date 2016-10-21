import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './modules/counter';
import hackathons from './modules/hackathons';
import hackathon from './modules/hackathon';
import selectedHackathon from './modules/selectedHackathon';
import hacks from './modules/hacks';
import myHacks from './modules/hacks';
import nominatedHacks from './modules/hacks';
import hack from './modules/hack';
import user from './modules/user';
import users from './modules/users';
import otherUser from './modules/otherUser';
import { reducer as notifs } from 're-notif';

export default combineReducers({
  counter,
  hackathons,
  hackathon,
  selectedHackathon,
  hacks,
  myHacks,
  nominatedHacks,
  hack,
  notifs,
  user,
  users,
  otherUser,
  router
});
