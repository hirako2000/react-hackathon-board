/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hacksActions } from '../../redux/modules/hacks';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';

import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';


// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type
Props = {
  hacks: Array,
  listFromServer: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HacksAsCardsComponent extends React.Component {

  static propTypes = {
    hacks: PropTypes.array.isRequired,
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

  handleCreate() {
    window.location = '#/hacks/create/new/';
  }

  render() {
    var cards = this.props.hacks.map(function (card) {
      return (
        <Column key={card._id}>
          <Card className="fluid">
            <a href={ '#/hacks/' + card._id}>
              <Reveal className="fade">
                <Content className="hidden">
                  <Image type="link" src={'user-images/' + card.pictureURL}  className={classes['brighter']}/>
                </Content>
                <Content className="visible">
                  <Image src={'user-images/' + card.pictureURL} className="" />
                </Content>
              </Reveal>
            </a>

            <Content>
              <a href={ '#/hacks/' + card._id}>
                <Header>{card.title}</Header>
              </a>
              <div className="meta">
                <span className="time">{card.shortDescription}</span>
              </div>
            </Content>
          </Card>
        </Column>
      );
    });

    return(
      <div className="ui container">
        <Segment className="basic stackable one column grid">
          <Button className="column right floated" color="blue" onClick={this.handleCreate} >
            <Icon className="plus"/> Create Hack
          </Button>
        </Segment>
        <Segment loading={!this.props.hacks} className="ui stackable four column grid basic">
          {cards}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hacks: state.hacks
});
export default connect(mapStateToProps, hacksActions)(HacksAsCardsComponent);
