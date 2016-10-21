import Router from 'koa-router';
import Hack from '../models/hack';
import Hackathon from '../models/hackathon';
import User from '../models/user';
import multer from 'koa-router-multer';
const uploadDir = './uploads/';
const imageDir = './src/static/user-images/';
var upload = multer({ dest: uploadDir });
import lwip from 'lwip';
import _ from 'lodash';
import mongoose from 'mongoose';

const hacks = new Router();

hacks.get('/', function * (next) {
  console.log('GET /hacks/');
  var selectedHackathonId =  this.request.query.hackathonId;
  console.log("with hackathon id: " + selectedHackathonId);
  var hacks;
  if (selectedHackathonId && selectedHackathonId !== "-1") {
    hacks = yield Hack.find({ 'hackathon' : selectedHackathonId });
  } else {
    var activeHackathon = yield Hackathon.findOne({'active': true});
    if (!activeHackathon) {
      hacks = [];
    } else {
      hacks = yield Hack.find({'hackathon' : activeHackathon._id});
    }
  }

  var response;
  var user;
  response = {
    hacks: hacks
  };
  console.log("Returning " + hacks.length + " hacks");
  this.body = response;
});

hacks.get('/:id', function * (next) {
  console.log('GET /hacks/' + this.params.id);
  var hackEntity;
  if(this.params.id) {
    hackEntity = yield Hack.findOne({ '_id' : this.params.id });
  } else {
    hackEntity = new Hack;
  }
  var user = this.passport.user;
  var ownerUser = yield User.findOne({'_id': hackEntity.owner});

  // build list of people who joined it
  var joiners = [];
  for (var i = 0; i < hackEntity.joiners.length; i++) {
    var joiner = yield User.findOne({'_id': hackEntity.joiners[i]});
    joiners.push({
      username: joiner.profile.name ? joiner.profile.name : joiner.email,
      id: joiner._id
    });
  }

  var response = {
    hack: hackEntity,
    ownerDisplay: ownerUser.profile.name ? ownerUser.profile.name : ownerUser.email,
    isOwner: user && hackEntity.owner == user._id,
    hasJoined: user && hackEntity.joiners.indexOf(user._id) != -1,
    joinersDisplay: joiners
  };
  this.body = response;
});

hacks.get('/my', function * (next) {
  console.log('GET /hacks/my');
  if (!this.isAuthenticated()) {
    return this.status = 401;
  }
  var user = this.passport.user;
  var hacks = yield Hack.find({ $or: [{'owner': user._id}, {'joiners': user._id}]});

  var response = {
    hacks: hacks
  };
  console.log("Returning " + hacks.length + " hacks");
  this.body = response;
});

hacks.get('/nominated', function * (next) {
  console.log('GET /hacks/nominated');
  var selectedHackathonId =  this.request.query.hackathonId;
  console.log("Nominated hacks with hackathon id: " + selectedHackathonId);
  var hacks;
  if (selectedHackathonId && selectedHackathonId !== "-1") {
    hacks = yield Hack.find({ 'hackathon' : selectedHackathonId, 'nominated': true });
  } else {
    var activeHackathon = yield Hackathon.findOne({'active': true, 'nominated': true});
    if (!activeHackathon) {
      hacks = [];
    } else {
      hacks = yield Hack.find({'hackathon' : activeHackathon._id, 'nominated': true});
    }
  }

  var response;
  response = {
    hacks: hacks
  };
  console.log("Returning " + hacks.length + " nominated hacks");
  this.body = response;
});

hacks.put('/:id', function * (next) {
  console.log('PUT /hacks/' + this.params.id);
  if (!this.isAuthenticated()) {
    return this.status = 401;
  }

  var hackEntity;
  if(this.params.id) {
    hackEntity = yield Hack.findOne({ '_id' : this.params.id });
    if(!this.passport.user.judge && hackEntity.owner != this.passport.user._id) {
      return this.status = 403;
    }
    updateEntity(hackEntity, this.request.body);
    hackEntity.owner = this.passport.user._id;
    yield hackEntity.save();
  }
  this.body = hackEntity;
});

hacks.post('/', function * (next) {
  console.log('POST /hacks/');
  if (!this.isAuthenticated()) {
    return this.status = 401;
  }

  var hack = this.request.body;
  var hackEntity = new Hack();
  updateEntity(hackEntity, hack);
  hackEntity.owner = this.passport.user._id;
  yield hackEntity.save();
  this.body = hackEntity;
});

var updateEntity = function(existingEntity, newEntity) {
  existingEntity.hackathon = newEntity.hackathon;
  existingEntity.title = newEntity.title;
  existingEntity.shortDescription = newEntity.shortDescription;
  existingEntity.description = newEntity.description;
  existingEntity.open = newEntity.open;
  existingEntity.completed = newEntity.completed;
  existingEntity.pictureURL = newEntity.pictureURL || 'default-hack-image.png';
  existingEntity.science = newEntity.science;
  existingEntity.location = newEntity.location;
};

hacks.post('/:id/join', function * (next) {
  console.log('POST /hacks/' + this.params.id + "/join");
  if (!this.isAuthenticated()) {
    return this.status = 401;
  }

  var hackEntity;
  if(this.params.id) {
    hackEntity = yield Hack.findOne({ '_id' : this.params.id });
  } else {
    return;
  }
  var user = this.passport.user;

  hackEntity.joiners.push(user._id);
  yield hackEntity.save();

  this.body = {success: "true"};
});

hacks.post('/:id/leave', function * (next) {
  console.log('POST /hacks/' + this.params.id + "/leave");
  if (!this.isAuthenticated()) {
    return this.status = 401;
  }

  var hackEntity;
  if(this.params.id) {
    hackEntity = yield Hack.findOne({ '_id' : this.params.id });
  } else {
    return;
  }
  var user = this.passport.user;

  var indexOfJoiner = hackEntity.joiners.indexOf(user._id);
  hackEntity.joiners.splice(indexOfJoiner, 1);
  yield hackEntity.save();

  this.body = {success: "true"};
});

hacks.post('/:id/nominate', function * (next) {
  console.log('POST /hacks/' + this.params.id + "/nominate");
  if (!this.isAuthenticated()) {
    return this.status = 401;
  }
  var user = this.passport.user;
  if (!user.judge === true) {
    return this.status = 403;
  }

  var hackEntity;
  if(this.params.id) {
    hackEntity = yield Hack.findOne({ '_id' : this.params.id });
  } else {
    return this.status = 404;
  }

  hackEntity.nominated = true;
  yield hackEntity.save();

  this.body = {success: "true"};
});

hacks.post('/upload-image', upload.single('file'), function * (next) {
  console.log('POST /hacks/upload-image');
  if (!this.isAuthenticated()) {
    return this.status = 403;
  }

  var rawFilename = this.req.file.filename;
  var mimeType = this.req.file.mimetype;
  console.log("Uploaded file " + rawFilename);
  var fileType;
  switch (mimeType) {
    case 'image/jpeg':
      fileType = 'jpg';
      break;
    case 'image/png':
      fileType = 'png';
      break;
    case 'image/gif':
      fileType = 'gif';
      break;
  }
  var outputFileName = rawFilename + '.' + fileType;

  lwip.open(uploadDir + rawFilename, fileType,  function(err, image){
    // TODO check for errors
    var outputPath = imageDir + outputFileName;
    // People are crazy, they send off huge image, we don't want that, but let's size them down
    // This logic will crop larger images, while keeping image ratio if image is smaller than 800*800
    var toWidth = 800;
    var toHeight = 800;
    if(image.width() < toWidth) {
      toWidth = image.width();
    }
    if(image.height() < toHeight) {
      toHeight = image.height();
    }
    // Crops from center
    image.batch().crop(toWidth, toHeight).writeFile(outputPath, function(err) {
      // TODO remove raw uploaded image
      });
  });
  // Returns the server set image file name to allow the front end to save the entity with it
  this.body = {filename: outputFileName};
});

export default hacks;
