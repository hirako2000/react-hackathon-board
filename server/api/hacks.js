import Router from 'koa-router';
import Hack from '../models/hack';

const hacks = new Router();

hacks.get('/list', function * (next) {
  console.log('hitting /hacks/list');
  var result = yield Hack.find({});
  this.body = result;
});

export default hacks;
