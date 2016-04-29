import Router from 'koa-router';
import Hack from '../models/hack';

const hacks = new Router();

hacks.get('/', function * (next) {
  console.log('hitting /hacks/');
  var result = yield Hack.find({});
  this.body = result;
});

hacks.get('/:id', function * (next) {
  console.log('hitting /hacks/' + this.params.id);
  var hackEntity;
  if(this.params.id) {
    hackEntity = yield Hack.findOne({ '_id' : this.params.id });
  } else {
    hackEntity = new Hack;
  }

  this.body = hackEntity;
});

export default hacks;
