import Router from 'koa-router';
import hacksAPI from './hacks';
import bodyParser from 'koa-bodyparser';

const api = new Router({
  prefix: '/api'
});

api.use(bodyParser());

api.use('/hacks', hacksAPI.routes());

export default api;
