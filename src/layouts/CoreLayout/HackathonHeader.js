import React, { PropTypes } from 'react';
import '../../styles/core.scss';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
import { Router, Route, Link } from 'react-router';
import { actions as userActions } from '../../redux/modules/user';

import {Menu, Item, Icon, Image, Content, Header, Card} from 'react-semantify';
import moment from 'moment';

type
Props = {
  user: Object
};

class HackathonHeaderView extends React.Component {

  static propTypes = {
    user: PropTypes.object
  };

  componentWillMount() {

  }

  render() {
    if(!this.props.user.hackathon || !this.props.user.hackathon.pictureURL) {
      return(
        <div>
          Loading...
        </div>
      );
    }
    return(
      <Content>
        <div className="center aligned hackathon-header">
          <div className="ui six column stackable grid">
            <div className="three wide column"/>
            <div className="three wide column center aligned">
              <Image className="hackathon-header-image-effect" src={'user-images/' + this.props.user.hackathon.pictureURL}/>
              <div className="hackathon-header-image-effect-shadow"></div>
            </div>
            <div className="four wide column center aligned">
              <Content className="padding-20px">
                <Header className="center aligned">
                    <span className="hackathon-header-title">{this.props.user.hackathon.title} </span>
                </Header>
                <div className="center aligned hackathon-header-description">
                  <p className="">
                    {this.props.user.hackathon.shortDescription}
                  </p>
                </div>
                <div className="ui description center aligned hackathon-header-date">
                  { (moment(this.props.user.hackathon.startDate).month() !== moment(this.props.user.hackathon.endDate).month() ?
                    moment(this.props.user.hackathon.startDate).format('Do MMM YY') :
                      moment(this.props.user.hackathon.startDate).format('Do'))
                      + " - "
                      + moment(this.props.user.hackathon.endDate).format('Do MMM YY')
                  }
                </div>
              </Content>
              <div className="extra center aligned">
                <a href={'#/hackathons/' + this.props.user.hackathon._id}>
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
  user: state.user
});
export default connect(mapStateToProps, userActions)(HackathonHeaderView);
