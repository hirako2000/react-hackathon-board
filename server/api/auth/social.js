import Router from 'koa-router';
import passport from 'passport';

const social = new Router();

social.get('/facebook', function * (next) {
  console.log("Hitting facebook auth");
  yield passport.authenticate('facebook', { scope: ['email'] });
});

social.get('/facebook/callback', function * (next) {
  yield passport.authenticate('facebook', {
    successRedirect: '/#/hacks',
    failureRedirect: '/#/login',
    session: true
  });
  yield next;
});

social.get('/github', function * (next) {
  console.log("Hitting github auth");
  yield passport.authenticate('github', { scope: [ 'user:email' ] });
});

social.get('/github/callback', function * (next) {
  yield passport.authenticate('github', {
    successRedirect: '/#/hacks',
    failureRedirect: '/#/login',
    session: true
  });
  yield next;
});

social.get('/google', function * (next) {
  console.log("Hitting google auth");
  yield passport.authenticate('google', { scope: ['profile', 'email'] });
});

social.get('/google/callback', function * (next) {
  yield passport.authenticate('google', {
    successRedirect: '/#/hacks',
    failureRedirect: '/#/login',
    session: true
  });
  yield next;
});

export default social;
