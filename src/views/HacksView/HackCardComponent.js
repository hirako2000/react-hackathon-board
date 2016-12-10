import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hacksActions } from '../../redux/modules/hacks';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Button, Card, Content, Header, Column, Image, Segment, Icon} from 'react-semantify';

type
Props = {
  hack: Object
};

export class HackCardComponent extends React.Component {

  static propTypes = {
    hack: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.getData();
  }

  getData() {
    this.setState({
    });
  }

  render() {
    var hack = this.props.hack;
    return (
      <Column key={hack._id}>
        <Card className="fluid">
          <div className={hack.nominated === true ? "extra content" : "hide-it"}>
            <div className="left floated">
             Nominated
            </div>
            <i className="float-right yellow trophy icon">
            </i>
          </div>
          <div className={hack.completed === true ? "extra content" : "hide-it"}>
            <span className="left floated">
              Completed
            </span>
            <i className="float-right green checkmark icon">
            </i>
          </div>

          <a href={ '#/hacks/' + hack._id}>
            <Content className="">
              <Image src={'user-images/' + hack.pictureURL} className="" />
            </Content>
          </a>

          <Content>
            <a href={ '#/hacks/' + hack._id}>
              <Header className="word-wrap">{hack.title}</Header>
            </a>
            <div className="meta">
              <span className="time word-wrap">{hack.shortDescription}</span>
            </div>
          </Content>
          <div className="extra content">
            <i className="marker icon"></i>
            {hack.location ? hack.location : 'Unknown location' }
          </div>
        </Card>
      </Column>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

export default connect(mapStateToProps, hacksActions)(HackCardComponent);
