import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hacksActions } from '../../redux/modules/hacks';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import HackCardComponent from './HackCardComponent';

import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';

type
Props = {
  nominatedHacks: Array,
  selectedHackathon: Object,
  listNominatedHacksFromServer: Function
};

var NoNomination = React.createClass({
  render: function() {
    return (
      <div>
        No Nomination yet...
      </div>
    );
  }
});

export class NominatedComponent extends React.Component {

  static propTypes = {
    nominatedHacks: PropTypes.array.isRequired,
    selectedHackathon: PropTypes.object.isRequired,
    listNominatedHacksFromServer: PropTypes.func.isRequired
  };

  componentWillMount() {
    var selectedHackathon = this.props.selectedHackathon ? this.props.selectedHackathon : "-1";
    this.props.listNominatedHacksFromServer(selectedHackathon);
    this.getData();
  }

  getData() {
  }

  render() {
    var cards = this.props.nominatedHacks
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
              <h1>Nominated Hacks</h1>
            </div>
          </div>

          <div className="thirteen wide column">
            <div className="">
                { this.props.nominatedHacks.length === 0 ? <NoNomination /> : null }
              <ReactCSSTransitionGroup component="div" className="ui stackable four column grid basic"
                                       transitionName="card" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {cards}
              </ReactCSSTransitionGroup>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nominatedHacks: state.nominatedHacks,
    selectedHackathon: state.selectedHackathon
  }
};

export default connect(mapStateToProps, hacksActions)(NominatedComponent);