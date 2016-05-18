import Router from 'koa-router';
import hacksAPI from './hacks';
import hackathonsAPI from './hackathons';
import bodyParser from 'koa-bodyparser';

const api = new Router({
  prefix: '/api'
});

api.use(bodyParser());

api.use('/hacks', hacksAPI.routes());
api.use('/hackathons', hackathonsAPI.routes());

export default api;
