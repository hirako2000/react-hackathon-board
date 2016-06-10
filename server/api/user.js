import Router from 'koa-router';

const user = new Router();

user.get('/', function * (next) {
  console.log('GET /user');
  var user = new Object();
  if (this.isAuthenticated()) {
    user = this.passport.user;
    console.log("user pass " + user.password);
    user.password = undefined;
  }
  this.body = user;

});

export default user;
