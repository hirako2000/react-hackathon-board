import Koa from 'koa';
import convert from 'koa-convert';
import webpack from 'webpack';
import webpackConfig from '../build/webpack.config';
import serve from 'koa-static';
import api from './api';
import proxy from 'koa-proxy';
import _debug from 'debug';
import config from '../config';

var mongoose = require('mongoose');

import webpackDevMiddleware from './middleware/webpack-dev';
import webpackHMRMiddleware from './middleware/webpack-hmr';

const debug = _debug('app:server');
const paths = config.utils_paths;
const app = new Koa();

/** Includes API
 *
 */
app.use(api.routes());

/**
 * Connect to MongoDB.
 */
mongoose.connect(config.db);
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error.');
  console.log('MongoDB is expected to be at: ' + config.db);
  console.log('Please make sure that MongoDB is running there');
  process.exit(1);
});

// Enable koa-proxy if it has been enabled in the config.
if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)));
}

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig);

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output;

  app.use(webpackDevMiddleware(compiler, publicPath));
  app.use(webpackHMRMiddleware(compiler));

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(convert(serve(paths.client('static'))));
} else {
  debug(
      'Server is being run outside of live development mode.'
    );

    // Serving ~/dist by default. Ideally these files should be served by
    // the web server and not the app server, but this helps to demo the
    // server in production.
  app.use(convert(serve(paths.base(config.dir_dist))));
}

export default app;
