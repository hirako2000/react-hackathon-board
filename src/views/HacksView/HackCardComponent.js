import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hacksActions } from '../../redux/modules/hacks';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';

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
            <span className="left floated">
              {hack.nominated === true ? "Nominated" : ""}
            </span>
            <i className="float-right minus circle icon"
               className={hack.nominated !== true ? 'float-right minus circle icon' : 'float-right red trophy icon'}>
            </i>
          </div>
          <a href={ '#/hacks/' + hack._id}>
            <Reveal className="fade">
              <Content className="hidden">
                <Image type="link" src={'user-images/' + hack.pictureURL}  className={classes['brighter']}/>
              </Content>
              <Content className="visible">
                <Image src={'user-images/' + hack.pictureURL} className="" />
              </Content>
            </Reveal>
          </a>

          <Content>
            <a href={ '#/hacks/' + hack._id}>
              <Header className="word-wrap">{hack.title}</Header>
            </a>
            <div className="meta">
              <span className="time word-wrap">{hack.shortDescription}</span>
            </div>
          </Content>
          <div className={hack.completed === true ? "extra content" : "hide-it"}>
            <span className="left floated">
              {hack.completed === true ? "Completed" : "Uncompleted"}
            </span>
            <i className="float-right minus circle icon"
               className={hack.completed !== true ? 'float-right minus circle icon' : 'float-right green checkmark icon'}>
            </i>
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
