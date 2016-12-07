import Router from 'koa-router';
import User from '../models/user';
import Hackathon from '../models/hackathon';

const user = new Router();

user.get('/me', function * (next) {
  console.log('GET /users/me');
  var user = new Object();
  if (this.isAuthenticated()) {
    user = this.passport.user;
    user.password = undefined;
  } else {
    return this.status = 401;
  }
  var selectedHackathon;
  if (user.selectedHackathon) {
    selectedHackathon = yield Hackathon.findOne({'_id' : user.selectedHackathon});
  }
  var response = {
    user: user,
    hackathon: selectedHackathon
  };
  this.body = response;

});

user.put('/me', function * (next) {
  console.log('POST /users/me/update');
  var user = new Object();
  if (this.isAuthenticated()) {
    user = this.passport.user;
    user.password = undefined;
  } else {
    this.body = {'error': 'cannot update if not logged in'};
    return;
  }
  var user = yield User.findOne({'_id': user._id}, 'username email profile');
  user.profile.name = this.request.body.profile.name;
  user.profile.location = this.request.body.profile.location;
  user.profile.website = this.request.body.profile.website;
  user.profile.picture = this.request.body.profile.picture;
  user.profile.description = this.request.body.profile.description;
  yield user.save();
  var response = {
    user: user
  };
  console.log("User was updated");
  this.body = response;
});

user.post('/select-hackathon/:id', function * (next) {
  console.log('post /users/select-hackathon/' + this.params.id);
  var user = yield User.findOne({'_id': this.passport.user._id});
  user.selectedHackathon = this.params.id;
  user.save();
  var hackathon = yield Hackathon.findOne({'_id' : this.params.id});
  this.body = hackathon;
});

user.get('/', function * (next) {
  console.log('GET /users/');
  var users = yield User.find({}, 'username email profile judge');
  this.body = users;
});

user.get('/:id', function * (next) {
  console.log('GET /users/' + this.params.id);
  var user = yield User.findOne({'_id': this.params.id}, 'username email profile judge');
  this.body = user;
});

export default user;
