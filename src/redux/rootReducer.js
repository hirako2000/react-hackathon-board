import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import hackathons from './modules/hackathons';
import hackathon from './modules/hackathon';
import selectedHackathon from './modules/selectedHackathon';
import hacks from './modules/hacks';
import myHacks from './modules/hacks';
import nominatedHacks from './modules/hacks';
import hack from './modules/hack';
import comments from './modules/comments';
import user from './modules/user';
import users from './modules/users';
import otherUser from './modules/otherUser';
import beautifier from './modules/beautifier';
import locale from './modules/locale';
import { reducer as notifs } from 're-notif';

export default combineReducers({
  hackathons,
  hackathon,
  selectedHackathon,
  hacks,
  myHacks,
  nominatedHacks,
  hack,
  comments,
  notifs,
  user,
  users,
  otherUser,
  beautifier,
  router,
  locale
});
