import React, { PropTypes } from 'react';
import '../../styles/core.scss';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
import { Router, Route, Link } from 'react-router';
import { actions as userActions } from '../../redux/modules/user';
import { actions as hackathonsActions } from '../../redux/modules/hackathons';

import {Menu, Item, Icon, Image, Content, Header, Card} from 'react-semantify';
import moment from 'moment';

type
Props = {
  hackathons: Object
};

class HackathonHeaderView extends React.Component {

  static propTypes = {
    hackathons: PropTypes.object
  };

  componentWillMount() {

  }

  render() {
    if(!this.props.hackathons.hackathons) {
      return(
        <div>
          Select Hackkathon <a href="/#/hackathons">here</a>
        </div>
      );
    }

    var selectedHackathon;
    for (var i = 0; i < this.props.hackathons.hackathons.length; i++) {
      console.log("looping around hackathons");
      if(this.props.hackathons.hackathons[i].selected) {
        selectedHackathon = this.props.hackathons.hackathons[i].selected;
        console.log("Found the selected hackathon");
        break;
      }
    }
    if (!selectedHackathon || !selectedHackathon.pictureURL) {
      return (
        <div></div>
      );
    }
    return(
      <Content>
        <div className="center aligned hackathon-header">
          <div className="ui six column stackable grid">
            <div className="three wide column"/>
            <div className="three wide column center aligned">
              <Image className="hackathon-header-image-effect" src={'user-images/' + selectedHackathon.pictureURL}/>
              <div className="hackathon-header-image-effect-shadow"></div>
            </div>
            <div className="four wide column center aligned">
              <Content className="padding-20px">
                <Header className="center aligned">
                    <span className="hackathon-header-title">{selectedHackathon.title} </span>
                </Header>
                <div className="center aligned hackathon-header-description">
                  <p className="">
                    {selectedHackathon.shortDescription}
                  </p>
                </div>
                <div className="ui description center aligned hackathon-header-date">
                  { (moment(selectedHackathon.startDate).month() !== moment(selectedHackathon.endDate).month() ?
                    moment(selectedHackathon.startDate).format('Do MMM YY') :
                      moment(selectedHackathon.startDate).format('Do'))
                      + " - "
                      + moment(selectedHackathon.endDate).format('Do MMM YY')
                  }
                </div>
              </Content>
              <div className="extra center aligned">
                <a href={'#/hackathons/' + selectedHackathon._id}>
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
  hackathons: state.hackathons
});
export default connect(mapStateToProps, userActions)(HackathonHeaderView);
