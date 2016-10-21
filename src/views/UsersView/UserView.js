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
        <div className="ui vertical segment loading-height">
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
              <h1>{this.props.otherUser.profile.name}</h1>
            </div>
            <div className="thirteen wide column">
                <div className="ui raised segment">
                  <div className="ui blue ribbon label">
                    Description
                  </div>
                  <p></p>
                  <pre className="">
                    {this.props.otherUser.profile.description}
                  </pre>
                  <p></p>

                  <div className="ui blue ribbon label">
                    Location
                  </div>
                  <p></p>
                  <span>
                    {this.props.otherUser.profile.location}
                  </span>
                  <p></p>

                  <div className="ui blue ribbon label">
                    Website
                  </div>
                  <p></p>
                  <span>
                    {this.props.otherUser.profile.website}
                  </span>
                  <p></p>

                  <div className="ui blue ribbon label">
                    Email
                  </div>
                  <p></p>
                  <span>
                    {this.props.otherUser.username}
                  </span>
                  <p></p>
                </div>
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
