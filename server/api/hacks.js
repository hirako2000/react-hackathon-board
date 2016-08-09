import Router from 'koa-router';
import Hack from '../models/hack';
import User from '../models/user';
import multer from 'koa-router-multer';
var upload = multer({ dest: 'uploads/' });
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
    var id = mongoose.Types.ObjectId(selectedHackathonId);
    hacks = yield Hack.find({ '_id' : id });
  } else {
    hacks = yield Hack.find({});
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
      username: joiner.username ? joiner.username : joiner.email,
      id: joiner._id
    });
  }

  var response = {
    hack: hackEntity,
    ownerDisplay: ownerUser.username ? ownerUser.username : ownerUser.email,
    isOwner: hackEntity.owner == user._id,
    hasJoined: hackEntity.joiners.indexOf(user._id) != -1,
    joinersDisplay: joiners
  };
  this.body = response;
});

hacks.put('/:id', function * (next) {
  console.log('PUT /hacks/' + this.params.id);
  if (!this.isAuthenticated()) {
    return this.status = 403;
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
    return this.status = 403;
  }

  var hack = this.request.body;
  var hackEntity = new Hack();
  updateEntity(hackEntity, hack);
  hackEntity.owner = this.passport.user._id;
  yield hackEntity.save();
  this.body = hackEntity;
});

var updateEntity = function(existingEntity, newEntity) {
  existingEntity.title = newEntity.title;
  existingEntity.shortDescription = newEntity.shortDescription;
  existingEntity.description = newEntity.description;
  existingEntity.open = newEntity.open;
  existingEntity.pictureURL = newEntity.pictureURL || 'default-hack-image.png';
};

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

  lwip.open('./uploads/' + rawFilename, fileType,  function(err, image){
    // TODO check for errors
    var outputPath = './src/static/user-images/' + outputFileName;
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
