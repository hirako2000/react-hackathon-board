import React, { PropTypes } from 'react';
import '../../styles/core.scss';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import { actions as otherUserActions } from '../../redux/modules/otherUser';
import { Translate, Localize } from 'react-i18nify';
import {Button, Menu, Item, Icon, Image, Content, Header, Segment} from 'react-semantify';

type
Props = {
  otherUser: Object,
  fetchFromServer: Function,
  toggleAdmin: Function
};

var Avatar = React.createClass({

  render: function() {
    if(this.props.profile.picture){
      return (
        <img className="ui medium circular image" src={'user-images/' + this.props.profile.picture} />
      )
    } else {
      return(
        <object className="ui medium circular image" type="image/svg+xml" data={'user-images/' + this.props.profile.avatar}>
        </object>
      );
    }
  }
});

class UserView extends React.Component {

  static propTypes = {
    otherUser: PropTypes.object.isRequired,
    fetchFromServer: PropTypes.func.isRequired,
    toggleAdmin: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchFromServer(this.props.params.id);
    this.getData();
    this.toggleAdmin = this.toggleAdmin.bind(this);
  }

  getData() {
    this.setState({
    });
  }

  toggleAdmin() {
    this.props.toggleAdmin(this.props.params.id);
  }

  render() {
    if(!this.props.otherUser || !this.props.otherUser._id) {
      return(
        <div className="ui basic segment loading-height">
          <div className="ui active inverted dimmer row">
            <div className="ui medium inverted text loader">
              <Translate value="common.loading"/>
            </div>
          </div>
          <p></p>
          <p></p>
        </div>
      );
    }
    return(
      <Content className="hacks-summary-margin">
        <div className="ui items fluid">
          <div className="ui items stackable sixteen column relaxed grid basic">
            <div className="three wide column fluid">
              <Avatar profile={this.props.otherUser.profile} />
              <div className="text-center padding-top-10px">
                <h3>{this.props.otherUser.profile.name}</h3>
              </div>
              <div className="padding-top-10px">
                <a href={ '#/hacks/user/' + this.props.otherUser._id }>
                  <Button className="fluid mini" color="teal">
                    <Translate value="common.showHacks"/>
                  </Button>
                </a>
              </div>
              <div className={this.props.user.user.judge !== true ? 'hide-it' : 'padding-top-10px'}>
                <Button onClick={this.toggleAdmin} className="fluid mini" color="red">
                  <Translate value={this.props.otherUser.judge ? 'removeJudge' : 'makeJudge'}/>
                </Button>
              </div>
            </div>

            <div className="thirteen wide column">
              <Segment>
                <h3><Translate value="common.about"/></h3>
                <pre className="">
                  {this.props.otherUser.profile.description}
                </pre>
              </Segment>

              <Segment>
                <h3><Translate value="profile.location"/></h3>
                <span>
                  {this.props.otherUser.profile.location}
                </span>
              </Segment>

              <Segment>
                <h3><Translate value="profile.website"/></h3>
                  <span>
                    {this.props.otherUser.profile.website}
                  </span>
              </Segment>

              <Segment>
                <h3><Translate value="profile.email"/></h3>
                 <span>
                    {this.props.otherUser.email}
                  </span>
              </Segment>
            </div>
          </div>
        </div>

      </Content>
    );
  }
}

const mapStateToProps = (state) => ({
  otherUser: state.otherUser,
  user: state.user
});
export default connect(mapStateToProps, otherUserActions)(UserView);
