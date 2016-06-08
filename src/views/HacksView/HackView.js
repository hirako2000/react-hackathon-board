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
  fetchFromServer: Function
};

export class HackViewComponent extends React.Component {

  static propTypes = {
    hack: PropTypes.object,
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
    if(!this.props.hack.pictureURL) {
      return (<div>Loading...</div>);
    }
    var hack = this.props.hack;
      return (
        <div className="ui internally celled grid">
          <div className="row">
            <div className="four wide column">
              <Button className="fluid" color="red">
                Nominate
              </Button>
              <p/>
              <Button className="fluid" color="teal">
                Join
              </Button>
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
                  <div className="header">Team</div>
                  <div className="">
                    <p>John Doe</p>
                    <p>Don Quixote</p>
                  </div>
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
            <div className="twelve wide column">
              <Segment key={this.props.hack._id} className="ui internally celled grid">
                <div className="six wide column">
                  <Content className="visible fluid">
                    <Header>
                      {hack.title} (<a href={ '#/hacks/edit/' + hack._id}>
                      Edit Hack
                    </a>)
                    </Header>
                    <Image src={'user-images/' + hack.pictureURL} className="fluid" />
                  </Content>
                  <div className="ui divider"></div>
                </div>
                <div className="ten wide column">
                  <div className="">
                    <div className="ui card fluid">
                      <div className="content">
                        <div className="">
                          <span>{hack.shortDescription}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ui card fluid">
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
              </Segment>
            </div>
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  hack: state.hack
});
export default connect(mapStateToProps, hackActions)(HackViewComponent);
