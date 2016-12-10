import Router from 'koa-router';
import hacksAPI from './hacks';
import hackathonsAPI from './hackathons';
import localAPI from './auth/local';
import socialAPI from './auth/social';
import userAPI from './user';
import beautifierAPI from './beautifier';
import bodyParser from 'koa-bodyparser';

var api = new Router({
  prefix: '/api'
});

api.use(bodyParser());

api.use('/auth', localAPI.routes());
api.use('/auth', socialAPI.routes());
api.use('/users', userAPI.routes());

api.use('/hacks', hacksAPI.routes());
api.use('/hackathons', hackathonsAPI.routes());

api.use('/beautifier', beautifierAPI.routes());

export default api;
