import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as usersActions } from '../../redux/modules/users';
import ReactDOM from 'react-dom';

import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';

type
Props = {
  users: Array,
  listFromServer: Function
};

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
        <div className="ui vertical segment loading-height">
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
                  <img src={
                    card.profile.picture && card.profile.picture != ''
                        ? 'user-images/' + card.profile.picture
                      : 'user-images/' + 'default-hack-image.png'}/>
              </a>
              <div className="content">
                <a href={ '#/people/' + card._id} className="header">
                  {card.profile.name}
                </a>
                <div className="description">
                  <i className="mail icon"></i>
                  {card.username}
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
        <Segment loading={!this.props.users} className="ui stackable three column grid basic">
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
