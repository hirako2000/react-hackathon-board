import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hacksActions } from '../../redux/modules/hacks';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';

type
Props = {
  hacks: Array,
  hackathons: Object,
  listFromServer: Function
};

export class HacksAsCardsComponent extends React.Component {

  static propTypes = {
    hacks: PropTypes.array.isRequired,
    hackathons: PropTypes.object.isRequired,
    listFromServer: PropTypes.func.isRequired
  };

  componentWillMount() {
    var selectedHackathon = "-1";
    if(this.props.hackathons.hackathons) {
      for (var i = 0; i < this.props.hackathons.hackathons.length; i++) {
        console.log("looping around hackathons");
        if(this.props.hackathons.hackathons[i].selected) {
          selectedHackathon = this.props.hackathons.hackathons[i].selected;
          console.log("Found the selected hackathon");
          break;
        }
      }
    }

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
    var searchString = this.state.search;
    var cards = this.props.hacks
    .filter(function(hack) {
        return !hack.title || hack.title.toLowerCase().indexOf(searchString.toLowerCase()) != -1;
    })
    .map(function (card) {
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
      <div className="hacks-summary-margin">
        <div className="ui items stackable sixteen column relaxed grid basic">
          <div className="three wide column">
            <div className="ui field">
              <Button className="fluid" color="blue" onClick={this.handleCreate} >
                <Icon className="plus"/> Create Hack
              </Button>
              <div className="ui items form">
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
            <div loading={!this.props.hacks} className="">
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

const mapStateToProps2 = (state) => ({
  hacks: state.hacks,
  selected: state.hackathons.selected !== undefined ? state.hackathons.selected : {}
});


const mapStateToProps = (state) => {
  console.log(JSON.stringify(state.hackathons.selected));
  return {
    hacks: state.hacks,
    hackathons: state.hackathons
  }
}

export default connect(mapStateToProps, hacksActions)(HacksAsCardsComponent);
