import React from 'react';
import { Route } from 'react-router';

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout';
import LoginView from 'views/LoginView/LoginView';
import SignupView from 'views/LoginView/SignupView';
import HomeView from 'views/HomeView/HomeView';
import HackathonsView from 'views/HackathonsView/HackathonsView';
import HackathonView from 'views/HackathonsView/HackathonView';
import EditHackathonView from 'views/HackathonsView/EditHackathonView';
import HacksView from 'views/HacksView/HacksView';
import HackView from 'views/HacksView/HackView';
import EditHackView from 'views/HacksView/EditHackView';

export default (store) => (
  <Route component={CoreLayout}>
    <Route name='login' path='/login' component={LoginView} />
    <Route name='signup' path='/signup' component={SignupView} />
    <Route name='home' path='/' component={HackathonsView} />
    <Route name='editHackathon' path='/hackathons/edit/:id' component={EditHackathonView} />
    <Route name='hackathon' path='/hackathons/:id' component={HackathonView} />
    <Route name='createHackathon' path='/hackathons/create/new/' component={EditHackathonView} />
    <Route name='hacks' path='/hacks' component={HacksView} />
    <Route name='hack' path="/hacks">
      <Route path=":id" component={HackView}/>
    </Route>
    <Route name='editHack' path='/hacks/edit/:id' component={EditHackView} />
    <Route name='createHack' path='/hacks/create/new/' component={EditHackView} />
  </Route>
);
