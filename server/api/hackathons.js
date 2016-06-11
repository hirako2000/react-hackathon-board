import Router from 'koa-router';
import Hackathon from '../models/hackathon';
import User from '../models/user';
import multer from 'koa-router-multer';
var upload = multer({ dest: 'uploads/' });
import lwip from 'lwip';
import _ from 'lodash';

const hackathons = new Router();

hackathons.get('/', function * (next) {
  console.log('GET /hackathons/');
  var result = yield Hackathon.find({});
  this.body = result;
});

hackathons.get('/:id', function * (next) {
  console.log('GET /hackathons/' + this.params.id);
  var hackathonEntity;
  if(this.params.id) {
    hackathonEntity = yield Hackathon.findOne({ '_id' : this.params.id });
  } else {
    hackathonEntity = new Hackathon();
  }
  var owner = yield User.findOne({ '_id': hackathonEntity.owner});
  var ownerDisplay;
  if(owner) {
    ownerDisplay = owner.username ? owner.username : owner.email;
  }
  var response = {
    hackathon: hackathonEntity,
    ownerDisplay: ownerDisplay
  };

  this.body = response;
});

hackathons.put('/:id', function * (next) {
  console.log('PUT /hackathons/' + this.params.id);
  if (!this.isAuthenticated()) {
    this.redirect('/#/login');
  }

  var hackathonEntity;
  if(this.params.id) {
    hackathonEntity = yield Hackathon.findOne({ '_id' : this.params.id });
    updateEntity(hackathonEntity, this.request.body);
    hackathonEntity.owner = this.passport.user._id;
    yield hackathonEntity.save();
  }
  this.body = hackathonEntity;
});

hackathons.post('/', function * (next) {
  console.log('POST /hackathons/');
  if (!this.isAuthenticated()) {
    this.redirect('/#/login');
  }

  var hackathon = this.request.body;
  var hackathonEntity = new Hackathon();
  updateEntity(hackathonEntity, hackathon);
  hackathonEntity.owner = this.passport.user._id;
  yield hackathonEntity.save();
  this.body = hackathonEntity;
});

var updateEntity = function(existingEntity, newEntity) {
  existingEntity.title = newEntity.title;
  existingEntity.shortDescription = newEntity.shortDescription;
  existingEntity.description = newEntity.description;
  existingEntity.rules = newEntity.rules;
  existingEntity.prizes = newEntity.prizes;
  existingEntity.location = newEntity.location;
  existingEntity.open = newEntity.open;
  existingEntity.active = newEntity.active;
  existingEntity.startDate = newEntity.startDate;
  existingEntity.endDate = newEntity.endDate;
  existingEntity.pictureURL = newEntity.pictureURL || 'default-hack-image.png';
};

hackathons.post('/upload-image', upload.single('file'), function * (next) {
  console.log('POST /hackathons/upload-image');
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

export default hackathons;
