import React, { PropTypes } from 'react';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon, Label} from 'react-semantify';

import config from '../../config/base';

export class LoginView extends React.Component<void, Props, void> {

  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: ''
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
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

  componentWillMount() {

  }

  componentDidMount() {
    var domainMessage = 'Please enter an email address';
    var domainRegex = 'email';
    if(config.signIn.userEmailDomain) {
      domainMessage = domainMessage + ' at @' + config.signIn.userEmailDomain;
      domainRegex = 'regExp[^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(' + config.signIn.userEmailDomain + ')]';

    }
    $('form').form({
      on: 'blur',
      fields: {
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
            prompt: 'Please enter a password'
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
            <form action="/api/auth/login" method="POST" className="ui form">
              <div className="field">
                <label>Email</label>
                <input type= "text" name="username" value={this.props.username}
                  onChange={this.onUsernameChange} placeholder="Email" />
              </div>
              <div className="field">
                <label>Password</label>
                  <input type="password" name="password" placeholder="password"
                    value={this.props.password}
                    onChange={this.onPasswordChange} />
              </div>
              <p>
                <button type="submit" className="ui fluid teal button">Log In</button>
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
                    Login with Facebook
                  </button>
                </a>
              </div>
              <div className="column">
                <a href="/api/auth/github">
                  <button className="ui secondary button fluid">
                    <i className="github icon"></i>
                    Login with GitHub
                  </button>
                </a>
              </div>
              <div className="column">
                <a href="/api/auth/google">
                  <button className="ui google plus button fluid">
                    <i className="google plus icon"></i>
                    Login with Google
                  </button>
                </a>
              </div>
              <div className="column">
                <button className="ui twitterr button gray fluid">
                  <i className="twitter icon"></i>
                  Login with Twitter
                </button>
              </div>
              <div className="column">
                <button className="ui linkedinn button gray fluid">
                  <i className="linkedin icon"></i>
                  Login with LinkedIn
                </button>
              </div>
            </div>
          </div>
        </Segment>
      </div>
    );
  }
}

export default (LoginView);
