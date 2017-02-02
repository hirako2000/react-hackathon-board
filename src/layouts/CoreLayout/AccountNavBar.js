import React, { PropTypes } from 'react';
import '../../styles/core.scss';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
import { Router, Route, Link } from 'react-router';
import { actions as userActions } from '../../redux/modules/user';

import { Menu, Item, Icon, Dropdown} from 'react-semantify';
import LocalePickerView from './LocalePicker';
import { Translate, Localize } from 'react-i18nify';

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

  userAvatar() {
    // react lets you do really weird things...
     if(this.props.user.user.profile.picture){
       return (
       <img className="ui avatar image" src={'user-images/' +  this.props.user.user.profile.picture} />
       )
     } else {
       return(
         <object className="ui avatar image"type="image/svg+xml" data={'user-images/' + this.props.user.user.profile.avatar}>
         </object>
       );
     }
   }

  render() {
    if(!this.props.user || !this.props.user.user || !this.props.user.user._id) {
      return(
        <Menu className="right borderless noborder stackable">
          <Link activeClassName="active" className="item" to="login">
            <Icon className="sign in" /> <Translate value="common.login"/>
          </Link>
          <Link activeClassName="active" className="item" to="signup">
            <Icon className="" /> <Translate value="common.signup"/>
          </Link>
        </Menu>
      );
    }

    return(
      <Menu className="right borderless noborder stackable">
        <div className="mobile">
          <LocalePickerView/>
        </div>
        <Dropdown init={true} className="">
          <Item>
            {this.userAvatar()}
            <div>
              { this.props.user.user.profile.name ? this.props.user.user.profile.name : this.props.user.user.username }
            </div>
          </Item>
          <Menu className="ui borderless">
            <Item className="" type="link" href="/#/hacks/my">
              <Translate value="menu.myhacks"/>
            </Item>
            <Item className="" type="link" href="/#/profile">
               <Translate value="menu.profile"/>
            </Item>
            <div className="divider"/>
            <Item className="" type="link" href="/api/auth/logout">
              <Icon className="sign out" /> <Translate value="menu.logout"/>
            </Item>
          </Menu>
        </Dropdown>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});
export default connect(mapStateToProps, userActions)(AccountNavBarView);
