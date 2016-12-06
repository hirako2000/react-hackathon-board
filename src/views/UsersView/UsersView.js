import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as usersActions } from '../../redux/modules/users';
import ReactDOM from 'react-dom';

import {Button, Card, Content, Header, Column, Image, Segment, Icon} from 'react-semantify';

type
Props = {
  users: Array,
  listFromServer: Function
};

var Avatar = React.createClass({

  render: function() {
    if(this.props.profile.picture){
      return (
      <img src={'user-images/' + this.props.profile.picture} />
      )
    } else {
      return(
        <object type="image/svg+xml" data={'user-images/' + this.props.profile.avatar}>
        </object>
      );
    }
  }
});

export class UsersAsCardsComponent extends React.Component {

  static propTypes = {
    users: PropTypes.array.isRequired,
    listFromServer: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.listFromServer();
    this.getData();
  }

  getData() {
    this.setState({
    });
  }

  render() {
    if(!this.props.users) {
      return (
        <div className="ui basic segment loading-height">
          <div className="ui active inverted dimmer row">
            <div className="ui medium inverted text loader">Loading</div>
          </div>
          <p></p>
          <p></p>
        </div>
      )
    }
    var cards = this.props.users.map(function (card) {
      return (
        <Column key={card._id}>
          <Card className="ui">
              <a className="image" href ={ '#/people/' + card._id}>
                <Avatar profile={card.profile}/>
              </a>
              <div className="content">
                <a href={ '#/people/' + card._id} className="header">
                  {card.profile.name}
                </a>
                <div className="description">
                  <i className="mail icon"></i>
                  {card.email}
                </div>
              </div>
              <div className="extra content">
                <i className="marker icon"></i>
                {card.profile.location ? card.profile.location : 'Unknown location' }
              </div>

          </Card>
        </Column>
      );
    });

    return(
      <div className="ui container">
        <Segment loading={!this.props.users} className="ui stackable five column grid basic">
          {cards}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
});
export default connect(mapStateToProps, usersActions)(UsersAsCardsComponent);
