import React, { PropTypes } from 'react';
import '../../styles/core.scss';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
import { Router, Route, Link } from 'react-router';
import { actions as userActions } from '../../redux/modules/user';

import {Menu, Item, Icon} from 'react-semantify';

type
Props = {
  user: Object,
  fetchFromServer: Function
};

class AccountNavBarView extends React.Component {

  static propTypes = {
    user: PropTypes.object,
    fetchFromServer: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchFromServer();
  }

  render() {
    if(!this.props.user || !this.props.user.user || !this.props.user.username) {
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
    return(
      <Menu className="right inverted borderless stackable">
        <Item className="">
          <Icon className="user" /> { this.props.user.user.username }
        </Item>
        <Item className="" type="link" href="/api/auth/logout">
          <Icon className="sign out" /> Logout
        </Item>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});
export default connect(mapStateToProps, userActions)(AccountNavBarView);
