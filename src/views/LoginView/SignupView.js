import React, { PropTypes } from 'react';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon, Label} from 'react-semantify';

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
    $('form').form({
      on: 'blur',
      fields: {
          fullname: {
            identifier: 'fullname',
            rules: [{
              type: 'empty',
              prompt: 'Please enter your full name'
            }]
          },
          username: {
              identifier: 'username',
              rules: [{
                  type: 'email',
                  prompt: 'Please enter an email address'
              }]
          },
          password: {
              identifier: 'password',
              rules: [{
                  type: 'empty',
                  prompt: 'Please enter a password'
              }]
          },
          passwordConfirm: {
              identifier: 'passwordConfirm',
              rules: [{
                   type: 'match[password]',
                  prompt: 'Please confirm your password'
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
                <label>Full Name</label>
                <input type= "text" name="fullname" value={this.props.fullname} maxLength="35"
                       onChange={this.onFullnameChange} placeholder="John Doe" />
              </div>
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
              <div className="field">
                <label>Confirm Password</label>
                  <input type="password" name="passwordConfirm" placeholder="password"
                    value={this.props.passwordConfirm}
                    onChange={this.onPasswordConfirmChange} />
              </div>
              <p>
                <button type="submit" className="ui fluid teal button">Log In</button>
              </p>
              <div className="ui error message"></div>
            </form>

          </div>

          <div className="two wide column">
            <div className="ui vertical divider">
              Or
            </div>
          </div>

          <div className="seven wide column">

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
