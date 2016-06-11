import React, { PropTypes } from 'react';
import '../../styles/core.scss';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
import { Router, Route, Link } from 'react-router';
import AccountNavBarView from './AccountNavBar';
import HackathonHeaderView from './HackathonHeader';

import {Menu, Item, Icon} from 'react-semantify';

const kindToClassMap = new Object();
kindToClassMap['info'] = 'info';
kindToClassMap['success'] = 'positive';
kindToClassMap['warning'] = 'warning';
kindToClassMap['danger'] = 'negative';


class CustomNotif extends React.Component {

  render() {
    return (
      <div className={'ui ' + kindToClassMap[this.props.kind] + ' message'}>
        <div className="header">
          {this.props.message}
        </div>
      </div>
    );
  }
}

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
        <Notifs CustomComponent={CustomNotif} />
        {children}
      </div>
    </div>
  );
}

var NavBarLeft = React.createClass({
  render: function () {
    return(
    <div>
      <Menu className="inverted borderless stackable">
        <Link activeClassName="active" className="item" to="hackathons">
          <Icon className="home" /> Home
        </Link>
        <Link activeClassName="active" className="item" to="hacks">
          <Icon className="lab" /> Hacks
        </Link>
        <Link className="item" to="rules">
          <Icon className="book" /> Rules
        </Link>
        <Link className="item" to="prizes">
          <Icon className="gift" /> Prize
        </Link>
        <Link className="item" to="hacks">
          <Icon className="trophy" /> Judging
        </Link>
        <Link className="item" to="people">
          <Icon className="users" /> People
        </Link>
        <AccountNavBarView />
      </Menu>
      <div className="ui fluid">
        <HackathonHeaderView />
      </div>
    </div>
    );
  }
});

CoreLayout.propTypes = {
  children: PropTypes.element
};

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  };
}

export default connect(mapStateToProps, notifActions)(CoreLayout);
