import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hacksActions } from '../../redux/modules/hacks';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import HackCardComponent from './HackCardComponent';

import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';

type
Props = {
  myHacks: Array,
  listMyHacksFromServer: Function
};

export class MyHacksComponent extends React.Component {

  static propTypes = {
    myHacks: PropTypes.array,
    listMyHacksFromServer: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.listMyHacksFromServer();
    this.getData();
  }

  getData() {
  }

  render() {
    var cards = this.props.myHacks
      .map(function (card) {
        return (
          <HackCardComponent hack={card} key={card._id}>

          </HackCardComponent>
        );
      });

    return(
      <div className="hacks-summary-margin">
        <div className="ui items stackable sixteen column relaxed grid basic">
          <div className="three wide column">
            <div className="ui field">
              <h1>My Hacks</h1>
            </div>
          </div>

          <div className="thirteen wide column">
            <div className="">
              <div component="div" className="ui stackable four column grid basic">
                {cards}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myHacks: state.myHacks
  }
};

export default connect(mapStateToProps, hacksActions)(MyHacksComponent);
