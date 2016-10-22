/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hackActions } from '../../redux/modules/hack';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';
import ReactMarkdown from 'react-markdown';
import CommentsComponent from './CommentsComponent';

type
Props = {
  hack: Object,
  user: Object,
  fetchFromServer: Function,
  join: Function,
  leave: Function,
  nominate: Function
};

var TeamList = React.createClass ({
  getInitialState: function() {
    if (this.props.hack.joiners) {
      return { value: this.props.hack.joiners };
    } else {
      return { value: []};
    }
  },

  render: function() {
    if (!this.props.hack || !this.props.hack.joinersDisplay) {
      return (
        <div>Loading...</div>
      );
    }
    var members = this.props.hack.joinersDisplay.map(function (member) {
      return (
        <a href={ '#/people/' + member.id} key={member.id}>
          <p key={member.id}>{member.username}</p>
        </a>
      );
    });

    return (
      <div className="field">
        {members}
      </div>
    );
   }
});

var LeftBar = React.createClass ({
  getInitialState: function() {
    if (this.props.hack) {
      return { value: this.props.hack };
    } else {
      return { value: null};
    }
  },

  handleJoin(hack) {
    this.props.join(hack);
  },

  handleLeave(hack) {
    this.props.leave(hack);
  },

  handleNominate(hack) {
    this.props.nominate(hack);
  },

  render: function() {
    if(!this.props.hack.hack) {
      return (
        <div className="ui segment loading-height">
          <div className="ui active inverted dimmer row">
            <div className="ui medium inverted text loader">Loading</div>
          </div>
          <p></p>
          <p></p>
        </div>
      );
    }
    return (
      <div>
        <a href={ '#/hacks/edit/' + this.props.hack.hack._id} className={this.props.hack.isOwner ? 'items' : 'hide-it'}>
          <Button className="fluid" color="teal">
            Edit
          </Button>
        </a>
        <p/>

        <Button color="red"
                className={this.props.hack.hack.nominated === true || !this.props.user.user._id
                        || this.props.user.user.judge !== true ? 'hide-it' : 'fluid' }
                onClick={(hack) => this.handleNominate(this.props.hack.hack)}>
          Nominate
        </Button>
        <p/>

        <Button color="red" className={!this.props.user.user._id || this.props.hack.hasJoined ? 'hide-it' : 'fluid'}
                onClick={(hack) => this.handleJoin(this.props.hack.hack)}>
          Join
        </Button>
        <p/>
        <Button color="red" className={!this.props.user.user._id || !this.props.hack.hasJoined ? 'hide-it' : 'fluid'}
                onClick={(hack) => this.handleLeave(this.props.hack.hack)}>
          Leave
        </Button>

        <div className="ui card fluid">
          <div className="content">
            <div className="header">Organizer</div>
            <div className="">
              <a href={ '#/people/' + this.props.hack.hack.owner}>
                <span>{this.props.hack.ownerDisplay}</span>
              </a>
            </div>
          </div>
          <div className="extra content">
                    <span className="left floated">
                      Science
                    </span>
            <i className="float-right minus circle icon"
               className={this.props.hack.hack.science !== true ? 'float-right minus circle icon' : 'float-right checkmark icon'}>
            </i>
          </div>

        </div>
        <div className="ui card fluid">
          <div className={this.props.hack.hack.nominated === true ? "extra content" : "hide-it"}>
                    <span className="left floated">
                      {this.props.hack.hack.nominated === true ? "Nominated" : ""}
                    </span>
            <i className="float-right minus circle icon"
               className={this.props.hack.hack.nominated !== true ? 'float-right minus circle icon' : 'float-right red trophy icon'}>
            </i>
          </div>
          <div className="content">
            <div className="header">Team</div>
            <TeamList hack={ this.props.hack } />
          </div>
          <div className="extra content">
                    <span className="left floated">
                      {this.props.hack.hack.open === true ? "Open" : "Closed"}
                    </span>
            <i className="float-right minus circle icon"
               className={this.props.hack.hack.open !== true ? 'float-right minus circle icon' : 'float-right checkmark icon'}>
            </i>
          </div>
          <div className="extra content">
                    <span className="left floated">
                      {this.props.hack.hack.completed === true ? "Completed" : "Uncompleted"}
                    </span>
            <i className="float-right minus circle icon"
               className={this.props.hack.hack.completed !== true ? 'float-right minus circle icon' : 'float-right checkmark icon'}>
            </i>
          </div>
        </div>

        <div className="ui card fluid">
          <div className="content">
            <div className="header">Location</div>
            <div className="">
              <span>{this.props.hack.hack.location}</span>
            </div>
          </div>
        </div>

      </div>
    )
  }
});

var MainPart = React.createClass ({
  getInitialState: function() {
    if (this.props.hack) {
      return { value: this.props.hack };
    } else {
      return { value: null};
    }
  },

  render: function() {
    if(!this.props.hack.hack) {
      return (
        <div className="ui segment loading-height">
          <div className="ui active inverted dimmer row">
            <div className="ui medium inverted text loader">Loading</div>
          </div>
          <p></p>
          <p></p>
        </div>
      );
    }

    return(
      <div key={this.props.hack.hack._id} className="ui internally stackable grid">
        <div className="six wide column">
          <Content className="visible fluid">
            <Image src={'user-images/' + this.props.hack.hack.pictureURL} className="fluid"/>
          </Content>
        </div>
        <div className="ten wide column">
          <div className="text-center">
            <h2>
              {this.props.hack.hack.title}
            </h2>
          </div>
          <div className="">
            <div className="ui fluid">
              <div className="segment">
                <h4>About this hack</h4>
                <div className="word-wrap">
                  <ReactMarkdown source={this.props.hack.hack.description}/>
                </div>
              </div>
            </div>
          </div>
          <div className="ui divider"></div>
          <Content>
            <CommentsComponent params={this.props.params} />
          </Content>
        </div>
      </div>);
  }

});

export class HackViewComponent extends React.Component {

  static propTypes = {
    hack: PropTypes.object,
    user: PropTypes.object,
    fetchFromServer: PropTypes.func.isRequired,
    join: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired,
    nominate: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchFromServer(this.props.params.id);
    this.getData();
  }

  componentWillUnmount () {
    this.props.reset();
  }

  getData() {
    this.setState({
    });
  }

  render() {
    return (
      <div className="ui internally stackable celled grid">
        <div className="row">
          <div className="three wide column">
            <LeftBar hack={this.props.hack} user={this.props.user} join={this.props.join}
            leave={this.props.leave} nominate={this.props.nominate}/>
          </div>
          <div className="thirteen wide column">
            <MainPart hack={this.props.hack} params={this.props.params}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hack: state.hack,
  user: state.user
});
export default connect(mapStateToProps, hackActions)(HackViewComponent);
