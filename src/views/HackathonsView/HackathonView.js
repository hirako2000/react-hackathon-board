/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hackathonActions } from '../../redux/modules/hackathon';
import classes from './HackathonsView.scss';
import ReactDOM from 'react-dom';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';

type
Props = {
  hackathon: object,
  fetchFromServer: Function
};

export class HackathonViewComponent extends React.Component {

  static propTypes = {
    hackathon: PropTypes.object,
    fetchFromServer: PropTypes.func.isRequired
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
    if(!this.props.hackathon.pictureURL) {
      return (<div>Loading...</div>);
    }
    var hackathon = this.props.hackathon;
      return (
        <div className="ui internally celled grid">
          <div className="row">
            <div className="three wide column">
              <div className="ui card fluid">
                <div className="content">
                  <div className="header">Organizer</div>
                  <div className="">
                    <span>John Doe</span>
                  </div>
                </div>
              </div>
              <div className="ui card fluid">
                <div className="content">
                  <div className="header">Location</div>
                  <div className="">
                    <span>{hackathon.location}</span>
                  </div>
                </div>
              </div>

            </div>
            <div className="thirteen wide column">
              <Segment key={this.props.hackathon._id} className="ui internally celled grid">
                <div className="six wide column">
                  <Content className="visible fluid">
                    <Header>
                      {hackathon.title} (<a href={ '#/hackathons/edit/' + hackathon._id}>
                      Edit Hackathon
                    </a>)
                    </Header>
                    <Image src={'user-images/' + hackathon.pictureURL} className="fluid" />
                  </Content>
                  <div className="ui divider"></div>
                </div>
                <div className="ten wide column">
                  <div className="">
                    <div className="ui card fluid">
                      <div className="content">
                        <div className="header">Summary</div>
                        <div className="">
                          <span>{hackathon.shortDescription}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ui card fluid">
                      <div className="content">
                        <div className="header">Description</div>
                        <div className="">
                          <span>{hackathon.description}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ui card fluid">
                      <div className="content">
                        <div className="header">Rules</div>
                        <div className="">
                          <span>{hackathon.rules}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ui divider"></div>
                  <Content>
                    Comments
                  </Content>
                </div>
              </Segment>
            </div>
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  hackathon: state.hackathon
});
export default connect(mapStateToProps, hackathonActions)(HackathonViewComponent);
