import React, { PropTypes } from 'react';
import '../../styles/core.scss';

import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

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

        <FullNavBar />

      </div>
      <div className='view-container'>
        {children}
      </div>
    </div>
  );
}

var FullNavBar = React.createClass({
  render: function () {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='#'>Hackathon</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <FullNavBarCollapsible/>

      </Navbar>
    );
  }
});

var FullNavBarCollapsible = React.createClass({
  render: function () {
    return (
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href='#'>Hacks</NavItem>
          <NavItem eventKey={2} href='#'>Rules</NavItem>
          <NavItem eventKey={2} href='#'>Prize</NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href='#'>Sign up</NavItem>
          <NavItem eventKey={2} href='#'>Login</NavItem>
          <NavDropdown eventKey={3} title='Account' id='basic-nav-dropdown'>
            <MenuItem eventKey={3.1}>Profile</MenuItem>
            <MenuItem eventKey={3.2}>My Hacks</MenuItem>
            <MenuItem eventKey={3.3}>Admin</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    );
  }
});

CoreLayout.propTypes = {
  children: PropTypes.element
};

export default CoreLayout;
