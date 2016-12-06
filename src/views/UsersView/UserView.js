import React, { PropTypes } from 'react';
import '../../styles/core.scss';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import { actions as otherUserActions } from '../../redux/modules/otherUser';

import {Menu, Item, Icon, Image, Content, Header, Segment} from 'react-semantify';

type
Props = {
  otherUser: Object,
  fetchFromServer: Function
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
    fetchFromServer: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchFromServer(this.props.params.id);
    this.getData();
  }

  getData() {
    this.setState({
    });
  }

  render() {
    if(!this.props.otherUser || !this.props.otherUser._id) {
      return(
        <div className="ui basic segment loading-height">
          <div className="ui active inverted dimmer row">
            <div className="ui medium inverted text loader">Loading</div>
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
              <div className="text-center">
                <h3>{this.props.otherUser.profile.name}</h3>
              </div>
            </div>
            <div className="thirteen wide column">
              <Segment>
                <h3>About me</h3>
                  <pre className="">
                    {this.props.otherUser.profile.description}
                  </pre>
              </Segment>

              <Segment>
                <h3>Location</h3>
                  <span>
                    {this.props.otherUser.profile.location}
                  </span>
              </Segment>

              <Segment>
                <h3>Website</h3>
                  <span>
                    {this.props.otherUser.profile.website}
                  </span>
              </Segment>

              <Segment>
                <h3>Email</h3>
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
  otherUser: state.otherUser
});
export default connect(mapStateToProps, otherUserActions)(UserView);
