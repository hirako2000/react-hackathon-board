import Router from 'koa-router';
import hacksAPI from './hacks';

const api = new Router({
  prefix: '/api'
});

api.use('/hacks', hacksAPI.routes());

export default api;
