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
    var cards = this.props.users.map(function (card) {
      return (
        <Column key={card._id}>
          <Card className="fluid">
            <a href={ '#/people/' + card._id}>
              <Reveal className="fade">
                <Content className="visible">
                  <Image src={card.pictureURL}
                         />
                </Content>
              </Reveal>
            </a>

            <Content>
              <a href={ '#/people/' + card._id}>
                <Header className="center aligned">
                  {card.username}
                </Header>
              </a>
              <div className="center aligned ">
                <p className="">
                  {card.email}
                </p>
                <div className="meta center aligned ">


                </div>
              </div>
            </Content>
          </Card>
        </Column>
      );
    });

    return(
      <div className="ui container">
        <Segment className="basic stackable one column grid">

        </Segment>
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
