import React from 'react';
import { Route } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import HomeView from 'views/HomeView/HomeView';
import HacksView from 'views/HacksView/HacksView';

export default (store) => (
  <Route component={CoreLayout}>
    <Route name='home' path='/' component={HomeView} />
    <Route name='hacks' path='/hacks' component={HacksView} />
  </Route>
);
