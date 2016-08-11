/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hackActions } from '../../redux/modules/hack';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';
import ReactMarkdown from 'react-markdown';

type
Props = {
  hack: object,
  user: object,
  fetchFromServer: Function,
  join: Function,
  leave: Function,
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
        <p key={member._id}>{member.username}</p>
      );
    });

    return (
      <div className="field">
        {members}
      </div>
    );
   }
});

export class HackViewComponent extends React.Component {

  static propTypes = {
    hack: PropTypes.object,
    user: PropTypes.object,
    fetchFromServer: PropTypes.func.isRequired,
    join: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired
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

  handleJoin(hack) {
    this.props.join(hack);
  }

  handleLeave(hack) {
    this.props.leave(hack);
  }

  render() {
    if(!this.props.hack.hack) {
      return (<div>Loading...</div>);
    }
    var hack = this.props.hack.hack;
      return (
        <div className="ui internally stackable celled grid">
          <div className="row">
            <div className="three wide column">
              <a href={ '#/hacks/edit/' + hack._id} className={this.props.hack.isOwner ? 'items' : 'hide-it'}>
                <Button className="fluid" color="teal">
                  Edit
                </Button>
              </a>
              <p/>

              <Button color="red"  className={this.props.user && this.props.user.user.judge === true ? 'fluid' : 'hide-it' }>
                Nominate
              </Button>
              <p/>

              <Button color="red" className={!this.props.user.user._id || this.props.hack.hasJoined ? 'hide-it' : 'fluid'}
                      onClick={(hack) => this.handleJoin(this.props.hack.hack)}>
                Join
              </Button>
              <p/>
              <Button color="red" className={!this.props.hack.hasJoined ? 'hide-it' : 'fluid'}
                      onClick={(hack) => this.handleLeave(this.props.hack.hack)}>
                Leave
              </Button>

              <div className="ui card fluid">
                <div className="content">
                  <div className="header">Organizer</div>
                  <div className="">
                    <span>{this.props.hack.ownerDisplay}</span>
                  </div>
                </div>
              </div>
              <div className="ui card fluid">
                <div className="content">
                  <div className="header">Team</div>
                  <TeamList hack={ this.props.hack } />
                </div>
              </div>
              <div className="ui card fluid">
                <div className="content">
                  <div className="header">Location</div>
                  <div className="">
                    <span>{hack.location}</span>
                  </div>
                </div>
              </div>

            </div>
            <div className="thirteen wide column">
              <div key={hack._id} className="ui internally stackable grid">
                <div className="six wide column">
                  <Content className="visible fluid">
                    <Image src={'user-images/' + hack.pictureURL} className="fluid" />
                  </Content>

                </div>
                <div className="ten wide column">
                  <div className="">
                    <div className="ui fluid">
                      <div className="content">
                        <div className="">
                          <ReactMarkdown source={hack.description}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ui divider"></div>
                  <Content>
                    Comments
                  </Content>
                </div>
              </div>
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
