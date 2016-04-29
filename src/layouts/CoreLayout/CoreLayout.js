import React, { PropTypes } from 'react';
import '../../styles/core.scss';

import {Menu, Item, Icon} from 'react-semantify';

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
    <div className='page-container'>
      <div className=''>

        <NavBarLeft>
        </NavBarLeft>

      </div>
      <div className='view-container'>
        {children}
      </div>
    </div>
  );
}

var NavBarLeft = React.createClass({
  render: function () {
    return(
    <Menu className="inverted borderless stackable">
      <Item className="active" type="link" href="#/">
        <Icon className="home" /> Home
      </Item>
      <Item className="" type="link" href="#/hacks">
        <Icon className="lab" /> Hacks
      </Item>
      <Item className="" type="link" href="#/rules">
        <Icon className="book" /> Rules
      </Item>
      <Item className="" type="link" href="#/prize">
        <Icon className="gift" /> Prize
      </Item>
      <Item className="" type="link" href="#/hacks">
        <Icon className="trophy" /> Judging
      </Item>
      <NavBarRight />
    </Menu>
    );
  }
});

var NavBarRight = React.createClass({
  render: function () {
    return(
      <Menu className="right inverted borderless stackable">
        <Item className="" type="link" href="#/login">
          <Icon className="sign in" /> Login
        </Item>
        <Item className="" type="link" href="#/signup">
          <Icon className="" /> Sign up
        </Item>
      </Menu>
    );
  }
});

CoreLayout.propTypes = {
  children: PropTypes.element
};

export default CoreLayout;
