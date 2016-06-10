import Router from 'koa-router';
import User from '../models/user';
import Hackathon from '../models/hackathon';

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

user.post('/select-hackathon/:id', function * (next) {
  console.log('post /user/select-hackathon/' + this.params.id);
  var user = yield User.findOne({'_id': this.passport.user._id});
  user.selectedHackathon = this.params.id;
  user.save();
  var hackathon = yield Hackathon.findOne({'_id' : this.params.id})
  this.body = hackathon;
});

user.get('/', function * (next) {
  console.log('GET /user/');
  var users = yield User.find({}, 'username profile judge');
  this.body = users;
});

export default user;
