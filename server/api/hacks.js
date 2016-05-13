import Router from 'koa-router';
import Hack from '../models/hack';

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
    hackEntity.save();
  }
  this.body = hackEntity;
});

var updateEntity = function(existingEntity, newEntity) {
  existingEntity.title = newEntity.title;
  existingEntity.shortDescription = newEntity.shortDescription;
  existingEntity.description = newEntity.description;
  existingEntity.open = newEntity.open;
};

export default hacks;
