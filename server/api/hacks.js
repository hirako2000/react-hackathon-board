import Router from 'koa-router';
import Hack from '../models/hack';
import multer from 'koa-router-multer';
var upload = multer({ dest: 'uploads/' });
import lwip from 'lwip';

const hacks = new Router();

hacks.get('/', function * (next) {
  console.log('GET /hacks/');
  var result = yield Hack.find({});
  this.body = result;
});

hacks.get('/:id', function * (next) {
  console.log('GET /hacks/' + this.params.id);
  var hackEntity;
  if(this.params.id) {
    hackEntity = yield Hack.findOne({ '_id' : this.params.id });
  } else {
    hackEntity = new Hack;
  }

  this.body = hackEntity;
});

hacks.put('/:id', function * (next) {
  console.log('PUT /hacks/' + this.params.id);
  var hackEntity;
  if(this.params.id) {
    hackEntity = yield Hack.findOne({ '_id' : this.params.id });
    updateEntity(hackEntity, this.request.body);
    yield hackEntity.save();
  }
  this.body = hackEntity;
});

hacks.post('/', function * (next) {
  console.log('POST /hacks/');
  var hack = this.request.body;
  var hackEntity = new Hack();
  updateEntity(hackEntity, hack);
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
