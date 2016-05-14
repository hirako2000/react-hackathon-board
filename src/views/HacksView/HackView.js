/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hackActions } from '../../redux/modules/hack';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';

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
    if(!this.props.hack) {
      return (<div>Loading...</div>);
    }
    var hack = this.props.hack;
      return (
        <Segment key={this.props.hack._id} className="basic stackable three column grid">
          <div className="card">
            <Content className="visible">
              <Header>
                {hack.title} (<a href={ '#/hacks/edit/' + hack._id}>
                Edit Hack
              </a>)
              </Header>
              <Image src={hack.pictureURL} className="fluid" />
            </Content>
            <div className="ui divider"></div>
            <Content>
              {hack.location}
            </Content>
            <div className="ui divider"></div>
            <Content>
              Comments
            </Content>
          </div>
          <div className="column">
            <Content>
              <Header>{hack.shortDescription}</Header>
              <span className="">{hack.description}</span>
            </Content>
          </div>
        </Segment>
      );
  }
}

const mapStateToProps = (state) => ({
  hack: state.hack
});
export default connect(mapStateToProps, hackActions)(HackViewComponent);
