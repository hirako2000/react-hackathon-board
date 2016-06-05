import Router from 'koa-router';
import passport from 'passport';

const local = new Router();

local.post('/login', function * (next) {
  console.log("Hitting local login");
  yield passport.authenticate('local', {
    successRedirect: '/#/hacks',
    failureRedirect: '/#/login',
    session: true
  });
  yield next;
});

local.post('/signup', function * (next) {
  console.log("Hitting local signup");
  yield passport.authenticate('local-signup', {
    successRedirect: '/#/hacks',
    failureRedirect: '/#/login',
    session: true
  });
  yield next;
});

local.get('/logout', function(next) {
  console.log("Logging out");
  this.logout();
  this.redirect('/')
});

export default local;
