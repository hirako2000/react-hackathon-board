import React, { PropTypes } from 'react';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon, Label} from 'react-semantify';
import { Translate, Localize, I18n} from 'react-i18nify';

import config from '../../config/base';

export class SignupView extends React.Component<void, Props, void> {

  constructor(props) {
    super(props);
    this.state = {
        fullname: '',
        username: '',
        password: '',
        passwordConfirm: ''
    };

    this.onFullnameChange = this.onFullnameChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordConfirmChange = this.onPasswordConfirmChange.bind(this);
  };

  onFullnameChange(ev) {
    this.setState({
      fullname: ev.target.value
    });
  };

  onUsernameChange(ev) {
    this.setState({
      username: ev.target.value
    });
  };

  onPasswordChange(ev) {
    this.setState({
      password: ev.target.value
    });
  };

  onPasswordConfirmChange(ev) {
    this.setState({
      passwordConfirm: ev.target.value
    });
  };

  componentWillMount() {
  }

  componentDidMount() {
    var domainMessage = I18n.t('profile.validation.email');
    var domainRegex = 'email';
    if(config.signIn.userEmailDomain) {
      domainMessage = domainMessage + ' @' + config.signIn.userEmailDomain;
      domainRegex = 'regExp[^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(' + config.signIn.userEmailDomain + ')]';

    }
    $('form').form({
      on: 'blur',
      fields: {
          fullname: {
            identifier: 'fullname',
            rules: [{
              type: 'empty',
              prompt: I18n.t('profile.validation.fullName')
            }]
          },
          username: {
              identifier: 'username',
              rules: [{
                  type   : domainRegex,
                  prompt : domainMessage
              }]
          },
          password: {
              identifier: 'password',
              rules: [{
                  type: 'empty',
                  prompt: I18n.t('profile.validation.password')
              }]
          },
          passwordConfirm: {
              identifier: 'passwordConfirm',
              rules: [{
                  type: 'match[password]',
                  prompt: I18n.t('profile.validation.confirmPassword')
              }]
          }
      }
    });
  }

  render () {
    let {user} = this.state;
    return (
      <div className="login-margin">
        <Segment className="ui stackable six columns grid basic">
          <div className="seven wide column">
            <form action="/api/auth/signup" method="POST" className="ui form">
              <div className="field">
                <label>
                  <Translate value="profile.fullName"/>
                </label>
                <input type= "text" name="fullname" value={this.props.fullname} maxLength="35"
                       onChange={this.onFullnameChange} placeholder="John Doe" />
              </div>
              <div className="field">
                <label>
                  <Translate value="profile.email"/>
                </label>
                <input type= "text" name="username" value={this.props.username}
                  onChange={this.onUsernameChange} placeholder="Email" />
              </div>
              <div className="field">
                <label>
                  <Translate value="profile.password"/>
                </label>
                <input type="password" name="password" placeholder="password"
                  value={this.props.password}
                  onChange={this.onPasswordChange} />
              </div>
              <div className="field">
                <label>
                  <Translate value="profile.confirmPassword"/>
                </label>
                <input type="password" name="passwordConfirm" placeholder="password"
                  value={this.props.passwordConfirm}
                  onChange={this.onPasswordConfirmChange} />
              </div>
              <p>
                <button type="submit" className="ui fluid teal button">
                  <Translate value="common.signup"/>
                </button>
              </p>
              <div className="ui error message"></div>
            </form>

          </div>

          <div className={ config.signIn.enableSocialLogin ? 'two wide column' : 'hide-it' }>
            <div className="ui vertical divider">
              Or
            </div>
          </div>

          <div className={ config.signIn.enableSocialLogin ? 'seven wide column' : 'hide-it' }>

            <div className="ui stackable one column grid basic">
              <div className="column">
                <a href="/api/auth/facebook">
                  <button className="ui facebook button fluid">
                    <i className="facebook icon"></i>
                    Signup with Facebook
                  </button>
                </a>
              </div>
              <div className="column">
                <a href="/api/auth/github">
                  <button className="ui secondary button fluid">
                    <i className="github icon"></i>
                    Signup with GitHub
                  </button>
                </a>
              </div>
              <div className="column">
                <a href="/api/auth/twitter">
                  <button className="ui twitter button fluid">
                    <i className="twitter icon"></i>
                    Signup with Twitter
                  </button>
                </a>
              </div>
              <div className="column">
                <a href="/api/auth/google">
                  <button className="ui google plus button fluid">
                    <i className="google plus icon"></i>
                    Signup with Google Plus
                  </button>
                </a>
              </div>
              <div className="column">
                <button className="ui linkedin button fluid">
                  <i className="linkedin icon"></i>
                  Signup with LinkedIn
                </button>
              </div>
            </div>
          </div>
        </Segment>
      </div>
    );
  }
}

export default (SignupView);
