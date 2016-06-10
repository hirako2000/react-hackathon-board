import Router from 'koa-router';
import User from '../models/user';

const user = new Router();

user.get('/me', function * (next) {
  console.log('GET /user/me');
  var user = new Object();
  if (this.isAuthenticated()) {
    user = this.passport.user;
    user.password = undefined;
  }
  this.body = user;

});

user.get('/', function * (next) {
  console.log('GET /user/');
  var users = yield User.find({}, 'username profile judge');
  this.body = users;
});

export default user;
