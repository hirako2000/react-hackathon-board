import React, { PropTypes } from 'react';
import '../../styles/core.scss';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
import { Router, Route, Link } from 'react-router';
import { actions as selectedHackathonActions } from '../../redux/modules/selectedHackathon';
import { actions as hackathonsActions } from '../../redux/modules/hackathons';

import {Menu, Item, Icon, Image, Content, Header, Card} from 'react-semantify';
import moment from 'moment';

type
Props = {
  selectedHackathon: Object
};

class HackathonHeaderView extends React.Component {

  static propTypes = {
    selectedHackathon: PropTypes.object
  };

  componentWillMount() {
    this.props.listFromServer();
  }

  render() {
    if(!this.props.selectedHackathon || !this.props.selectedHackathon._id) {
      return (
        <div className="ui segment loading-height-header">
          <div className="ui active inverted dimmer row">
            <div className="ui medium inverted text loader">Loading</div>
          </div>
          <p></p>
          <p></p>
        </div>
      );
    }

    return(
      <Content>
        <div className="center aligned hackathon-header">
          <div className="ui six column stackable grid">
            <div className="three wide column"/>
            <div className="three wide column center aligned desktop">
              <Image className="hackathon-header-image-effect" src={'user-images/' + this.props.selectedHackathon.pictureURL}/>
              <div className="hackathon-header-image-effect-shadow"></div>
            </div>
            <div className="four wide column center aligned">
              <Content className="padding-20px">
                <Header className="center aligned">
                    <span className="hackathon-header-title">{this.props.selectedHackathon.title} </span>
                </Header>
                <div className="center aligned hackathon-header-description desktop">
                  <p className="">
                    {this.props.selectedHackathon.shortDescription}
                  </p>
                </div>
                <div className="ui description center aligned hackathon-header-date desktop">
                  { (moment(this.props.selectedHackathon.startDate).month() !== moment(this.props.selectedHackathon.endDate).month() ?
                    moment(this.props.selectedHackathon.startDate).format('Do MMM YY') :
                      moment(this.props.selectedHackathon.startDate).format('Do'))
                      + " - "
                      + moment(this.props.selectedHackathon.endDate).format('Do MMM YY')
                  }
                </div>
              </Content>
              <div className="extra center aligned">
                <a href={'#/hackathons/' + this.props.selectedHackathon._id}>
                    Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </Content>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedHackathon: state.selectedHackathon
});
export default connect(mapStateToProps, selectedHackathonActions)(HackathonHeaderView);
