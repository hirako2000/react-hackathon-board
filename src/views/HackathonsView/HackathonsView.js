import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hackathonsActions } from '../../redux/modules/hackathons';
import classes from './HackathonsView.scss';
import ReactDOM from 'react-dom';
import moment from 'moment';

import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';

type
Props = {
  hackathons: Array,
  listFromServer: Function
};

export class HackathonsView extends React.Component<void, Props, void> {
  static propTypes = {
    hackathons: PropTypes.array.isRequired,
    listFromServer: PropTypes.func.isRequired
  };

  render () {

    return (
      <div className='container text-center'>
        <h1>Hackathons</h1>
        <button className='btn btn-default' onClick={this.props.listFromServer}>
          List
        </button>
        <span className={classes['counter--green']}>{this.props.hackathons[0] ? this.props.hackathons[0].title : 'click'}</span>

      </div>
    );
  }
}

export class HackathonsAsCardsComponent extends React.Component {

  static propTypes = {
    hackathons: PropTypes.array.isRequired,
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
    window.location = '#/hackathons/create/new/';
  }

  render() {
    var cards = this.props.hackathons.map(function (card) {
      return (
        <Column key={card._id}>
          <Card className="fluid">
            <a href={ '#/hackathons/' + card._id}>
              <Reveal className="fade">
                <Content className="hidden">
                  <Image type="link" src={'user-images/' + card.pictureURL} className={classes['sepia']}/>
                </Content>
                <Content className="visible">
                  <Image src={'user-images/' + card.pictureURL} className="" />
                </Content>
              </Reveal>
            </a>

            <Content>
              <a href={ '#/hackathons/' + card._id}>
                <Header className="center aligned">
                  {card.title}
                </Header>
              </a>
              <div className="center aligned ">
                <p className="">
                  {card.shortDescription}
                </p>
                <div className="meta center aligned ">

                  { (moment(card.startDate).month() !== moment(card.endDate).month() ?
                    moment(card.startDate).format('Do MMM YY') :
                      moment(card.startDate).format('Do'))
                      + " - "
                      + moment(card.endDate).format('Do MMM YY')
                  }
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
          <Button className="column right floated" color="blue" onClick={this.handleCreate} >
            <Icon className="plus"/> Create Hackathon
          </Button>
        </Segment>
        <Segment loading={!this.props.hackathons} className="ui stackable three column grid basic">
          {cards}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hackathons: state.hackathons
});
export default connect(mapStateToProps, hackathonsActions)(HackathonsAsCardsComponent);
