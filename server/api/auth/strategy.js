import passport from 'koa-passport';
import User from '../../models/user';

import PassportLocal from 'passport-local';
import PassportFacebook from 'passport-facebook';
import PassportGithub from 'passport-github';
import PassportGoogleOauth from 'passport-google-oauth';

var user = { id: 1, username: 'test' };
const allAvatars = ["abraham-lincoln.svg", "john-fitzgerald-kennedy.svg", "pope-francis.svg", "arnold-schwarzenegger.svg", "johnny-depp.svg", "rafael-nadal.svg", "barack-obama.svg", "kim-jong-il.svg", "robin-williams.svg", "bruce-lee.svg", "leonardo-di-caprio.svg", "roger-federer.svg", "charlie-chaplin.svg", "lionel-messi.svg", "rowan-atkinson.svg", "charlie-sheen.svg", "mahatma-gandhi.svg", "sheikh-mohammed.svg", "che-guevara.svg", "margaret-thatcher.svg", "steve-jobs.svg", "cristiano-ronaldo.svg", "michael-schumacher.svg", "vladimir-lenin.svg", "isif-stalin.svg", "mike-tyson.svg", "vladimir-putin.svg", "jawaharlal-nehru.svg", "pel.svg", "winston-churchill.svg"];

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

User.findOne({ username: 'test@test.com' }, function (err, testUser) {
  if (!testUser) {
    console.log('test user did not exist; creating test user...');
    testUser = new User({
      username: 'test@test.com',
      email: 'test@test.com',
      password: 'test',
      judge: true
    });
    testUser.save();
    console.log('test user created')
  }
});

passport.use(new PassportLocal.Strategy(function(username, password, done) {
  console.log("local signin strategy hit");
  User.findOne({ email: username }, function (err, user){
    if(!user) {
      console.log(username + " not found to login with password");
      done(null, null);
    } else {
      console.log('found user, checking password..');
      if(user.lockedAt) {
        var currentDate = new Date();
        var coolDown = 1000 * 60 * 10; // 10 mins should do..
        var timeLapsed = currentDate.getTime() - user.lockedAt.getTime();
        if(timeLapsed < coolDown) {
          console.log("User is currently locked out: " + user.username);
          console.log("Need to wait another: " + ((coolDown - timeLapsed) / 1000) + " seconds");
          done(null, null);
          return
        } else {
          console.log("Unlocking out " + user.username);
          user.lockedAt = null;
          user.authFailedCount = 0;
          user.save();
        }
      }
      user.comparePassword(password, function(err, isMatch){
        if (err){
          console.log("Password does NOT match, error?");
          done(null, null);
        }
        if (isMatch) {
          // password matches. Log the user in
          console.log("Password matched, " + username + " logged in");
          user.lockedAt = null;
          user.authFailedCount = 0;
          user.save();
          done(null, user);
        } else {
          console.log("Password does NOT match :(");
          if(user.authFailedCount === 5) {
            console.log("Locking out: " + username);
            user.lockedAt = new Date();
          } else {
            user.authFailedCount = user.authFailedCount + 1;
          }
          user.save();
          done(null, null);
        }
      });
    }
  });
}));

passport.use('local-signup', new PassportLocal.Strategy({passReqToCallback: true}, function(req, username, password, done) {
  console.log("local signup strategy hit");
  var fullname = req.body.fullname;
  User.findOne({ email: username }, function (err, user){
    if(!user) {
      console.log(username + " signing up with password..");
      var randomAvatar = allAvatars[Math.floor(Math.random()*allAvatars.length)];
      var newUser = new User({
        profile: {
          name: fullname,
          avatar: randomAvatar
        },
        username: username,
        password: password,
        email: username
      });
      newUser.save(function (error) {
        if (error){
          console.log('error', error);
          done(null, false);
        } else {
          console.log(username + ' user created');
          done(null, newUser);
        }});
    } else {
      console.log(username + " already exists");
      done(null, false, { message: 'Email address already taken' });
    }
  });
}));

passport.use(new PassportFacebook.Strategy({
    clientID: '1665600533660584',
    clientSecret: '0cafa134c6bd5ae4be6e305c4e760bf9',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/api/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name', 'displayName']
  },
  function (token, tokenSecret, profile, done) {
    // retrieve user ...
    var foundUser = null;
    console.log("call back with profile id: " + profile.id + " email? " +  profile.emails);
    User.findOne({ email: profile.emails[0].value }, function (err, user){
      if(!user) {
        var randomAvatar = allAvatars[Math.floor(Math.random()*allAvatars.length)];
        var newUser = new User({
          profile: {
            avatar: randomAvatar
          },
          username: profile.displayName,
          password: 'test', // TODO fix this to generate a random password, and send via email
          facebook: profile.id,
          email: profile.emails[0].value // Porkupine from the 4th dimension
        });
        newUser.save(function (error) {
          if (error){
            console.log('error', error);
          } else {
            console.log(profile.displayName + ' created through Facebook');
            foundUser = newUser;
            done(null, foundUser);
          }});
      } else {
        foundUser = user;
        if (!foundUser.facebook) {
          foundUser.facebook = profile.id;
          console.log(profile.displayName + ' hooked with facebook ID');
          foundUser.save();
        }
        console.log(profile.displayName + ' logged in through Facebook');
        done(null, false, { message: 'Email address already taken' });
      }
    });
  }
));

passport.use(new PassportGithub.Strategy({
    clientID: '336c989f9cccfe779620',
    clientSecret: '3d359b0fa3ca31e3eb3e33c17b8612f0e3dcff33',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/api/auth/github/callback',
    profileFields: ['id', 'emails', 'name', 'displayName']
  },
  function (token, tokenSecret, profile, done) {
    var foundUser = null;
    User.findOne({ email: profile.emails[0].value }, function (err, user){
      if(!user) {
        var randomAvatar = allAvatars[Math.floor(Math.random()*allAvatars.length)];
        var newUser = new User({
          profile: {
            avatar: randomAvatar
          },
          username: profile.displayName,
          password: 'test', // TODO fix this to generate a random password, and send via email
          github: profile.id,
          email: profile.emails[0].value // Porkupine from the 4th dimension
        });
        newUser.save(function (error) {
          if (error){
            console.log('error', error);
          } else {
            console.log(profile.displayName + ' created through GitHub');
            foundUser = newUser;
            done(null, foundUser);
          }});
      } else {
        foundUser = user;
        if (!foundUser.github) {
          foundUser.github = profile.id;
          console.log(profile.displayName + ' hooked with github ID');
          foundUser.save();
        }
        console.log(profile.displayName + ' logged in through GitHub');
        done(null, foundUser);
      }
    });
  }
));

passport.use(new PassportGoogleOauth.OAuth2Strategy({
    clientID: '323958571566-gir3blefsfadj2c4shjiqg2mo0rfkon7.apps.googleusercontent.com',
    clientSecret: '2BSbCA9YSlKPwnVS8VuMqvlE',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/api/auth/google/callback'
  },
  function (token, tokenSecret, profile, done) {
    var foundUser = null;
    User.findOne({ email: profile.emails[0].value }, function (err, user) {
      if(!user) {
        var randomAvatar = allAvatars[Math.floor(Math.random()*allAvatars.length)];
        var newUser = new User({
          profile: {
            avatar: randomAvatar
          },
          username: profile.displayName,
          password: 'test', // TODO fix this to generate a random password, and send via email
          google: profile.id,
          email: profile.emails[0].value // Porkupine from the 4th dimension
        });
        newUser.save(function (error) {
          if (error){
            console.log('error', error);
          } else {
            console.log(profile.displayName + ' created through Google');
            foundUser = newUser;
            done(null, foundUser);
          }});
      } else {
        console.log('found user');
        foundUser = user;
        if (!foundUser.google) {
          foundUser.google = profile.id;
          console.log(profile.displayName + ' hooked with Google ID');
          foundUser.save();
        }
        console.log(profile.displayName + ' logged in through Google');
        done(null, foundUser);
      }
    });
  }
));

const TwitterStrategy = require('passport-twitter').Strategy
passport.use(new TwitterStrategy({
    consumerKey: 'your-consumer-key',
    consumerSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/api/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user
    User.findOne({ twitter_id: profile.id }, done);
  }
));
