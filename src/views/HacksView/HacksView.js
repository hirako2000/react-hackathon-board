import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hacksActions } from '../../redux/modules/hacks';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import HackCardComponent from './HackCardComponent';

import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';

type
Props = {
  hacks: Array,
  selectedHackathon: Object,
  listFromServer: Function
};

export class HacksAsCardsComponent extends React.Component {

  static propTypes = {
    hacks: PropTypes.array,
    selectedHackathon: PropTypes.object.isRequired,
    listFromServer: PropTypes.func.isRequired
  };

  componentWillMount() {
    var selectedHackathon = this.props.selectedHackathon ? this.props.selectedHackathon : "-1";
    this.props.listFromServer(selectedHackathon);
    this.getData();
    this.onSearch = this.onSearch.bind(this);
  }

  getData() {
    this.setState({
      search: ''
    });
  }

  handleCreate() {
    window.location = '#/hacks/create/new/';
  }

  onSearch(event) {
    this.setState({
      search: event.target.value
    });
  }

  render() {
    if(!this.props.hacks) {
      return (
        <div className="ui basic segment loading-height">
          <div className="ui active inverted dimmer row">
            <div className="ui medium inverted text loader">Loading</div>
          </div>
          <p></p>
          <p></p>
        </div>
      );
    }
    var searchString = this.state.search;
    var cards = this.props.hacks
    .filter(function(hack) {
        return (!hack.title
                  || hack.title.toLowerCase().indexOf(searchString.toLowerCase()) != -1)
              || (hack.shortDescription
                      && hack.shortDescription.toLowerCase().indexOf(searchString.toLowerCase()) != -1)
              || (hack.location
                      && hack.location.toLowerCase().indexOf(searchString.toLowerCase()) != -1);
    })
    .map(function (card) {
      return (
        <HackCardComponent hack={card} key={card._id}>
        </HackCardComponent>
      );
    });

    return(
      <div className="hacks-summary-margin">
        <div className={!this.props.user || !this.props.user.user || !this.props.user.user._id
                          || this.props.user.user.judge !== true ? 'hide-it' : 'fluid padding-top-20px' }>
          <a href={ '/api/hacks/export/' + this.props.selectedHackathon._id}>
            <Button color="teal" className="fluid tiny">
              Export To CSV
            </Button>
          </a>
        </div>
        <div className="ui items stackable sixteen column relaxed grid basic">
          <div className="three wide column">
            <div className="ui field">
              <div className="ui items form">
                <Button className={!this.props.user || !this.props.user.user || !this.props.user.user._id ? 'hide-it' : "fluid tiny field"} color="blue" onClick={this.handleCreate} >
                  <Icon className="plus"/> Create Hack
                </Button>
                <div className="field">
                  <input type="text" name="search"
                  value={this.props.hacks.search}
                  onChange={this.onSearch}
                  placeholder="Search"/>
                </div>
              </div>
            </div>
          </div>

          <div className="thirteen wide column">
            <div className="">
              <div className="ui stackable four column grid basic">
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
    hacks: state.hacks,
    selectedHackathon: state.selectedHackathon,
    user: state.user
  }
};

export default connect(mapStateToProps, hacksActions)(HacksAsCardsComponent);
