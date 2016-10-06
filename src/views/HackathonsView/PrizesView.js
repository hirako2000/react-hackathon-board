import React, { PropTypes } from 'react';
import '../../styles/core.scss';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import { actions as userActions } from '../../redux/modules/user';

import {Menu, Item, Icon, Image, Content, Header, Segment} from 'react-semantify';
import ReactMarkdown from 'react-markdown';

type
Props = {
  user: Object,
  selectedHackathon: Object
};

class PrizesView extends React.Component {

  static propTypes = {
    user: PropTypes.object,
    selectedHackathon: PropTypes.object
  };

  componentWillMount() {

  }

  render() {
    if(!this.props.selectedHackathon || !this.props.selectedHackathon.prizes) {
      return(
        <div>
          Loading...
        </div>
      );
    }
    return(
      <Content className="hacks-summary-margin">
        <div className="ui items fluid">
          <div className="ui items stackable sixteen column relaxed grid basic">
            <div className="three wide column fluid">
              <h1>Prizes</h1>
            </div>
            <Segment className="thirteen wide column">
              <div className="content">
                <div className="">
                  <ReactMarkdown source={this.props.selectedHackathon.prizes}/>
                </div>
              </div>
            </Segment>
          </div>
        </div>
      </Content>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  selectedHackathon: state.selectedHackathon
});
export default connect(mapStateToProps, userActions)(PrizesView);
