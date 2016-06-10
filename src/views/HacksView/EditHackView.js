/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer, Field, Form, actions} from 'react-redux-form';
import { actions as hackActions } from '../../redux/modules/hack';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon, Label} from 'react-semantify';
import { push } from 'react-router-redux';
import DropzoneSingleImageComponent from './DropzoneComponent';
import ReactMarkdown from 'react-markdown';

type
Props = {
  hack: object,
  fetchFromServer: Function,
  updateToSever: Function,
  reset: Function
};

/* I prefer to extend React.Component
 But creating Classes for nested elements to use both
 Differences are minor between the two, but we might want to stick with React.Component going forward
*/
var TitleInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hack.title || '' };
  },
  handleChange: function(event) {
    this.props.hack.title = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
        <div className="field">
          <label>Title</label>
          <input type="text" value={ this.state.value }
                 onChange={this.handleChange}>
          </input>
        </div>
    );
  }
});

var ShortDescriptionInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hack.shortDescription || '' };
  },
  handleChange: function(event) {
    this.props.hack.shortDescription = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div  className="field">
        <label>Short Description</label>
          <textarea value={ this.state.value } rows="2"
                    onChange={this.handleChange}>
        </textarea>
      </div>
    );
  }
});


var DescriptionInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hack.description || '' };
  },
  handleChange: function(event) {
    this.props.hack.description = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div className="fields">
        <div className="eight wide field">
          <label>Description (markdown)</label>
          <textarea value={ this.state.value }
                    onChange={this.handleChange}>
          </textarea>
        </div>
        <div className="eight wide field">
          <label>Description Preview</label>
          <ReactMarkdown source={this.props.hack.description || ''}/>
        </div>
      </div>
    );
  }
});

var OpenInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hack.open || false };
  },
  handleChange: function(event) {
    this.props.hack.open = !this.props.hack.open;
    this.setState({ value: this.props.hack.open });
  },
  render: function() {
    return (
      <div className="field">
        <div className="ui checkbox">
          <input type="checkbox" checked={this.state.value}
                 onChange={this.handleChange}/>
          <label>Open</label>
        </div>
      </div>
    );
  }
});

export class HackViewComponent extends React.Component {

  static propTypes = {
    hack: PropTypes.object,
    fetchFromServer: PropTypes.func.isRequired,
    updateToSever: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentWillMount() {
    if (this.props.params.id) {
      this.props.fetchFromServer(this.props.params.id);
    } else {
      this.props.reset();
    }
  }

  componentWillUnmount () {
    this.props.reset();
  }

  handleSubmit(val) {
    this.props.updateToSever(this.props.hack.hack ? this.props.hack.hack._id : null, val);
    // TODO - We should use react-router's history
    //this.props.history.push('#/hacks'); // deprecated?
    window.location = '#/hacks';
  }

  render() {
    if(!this.props.hack) {
      return <div>Loading...</div>
    }
    if (!this.props.hack.hack) {
      this.props.hack.hack = new Object();
    }
    var hack = this.props.hack.hack;
    return (
      // The key is important for the component to be reset properly
      <Segment key={ hack._id }>
          <div className="ui form">
            <h1>{ hack.title  }</h1>
            <TitleInput hack={ this.props.hack.hack } />
            <ShortDescriptionInput hack={ this.props.hack.hack } />
            <DescriptionInput hack={ this.props.hack.hack } />
            <OpenInput  hack={ this.props.hack.hack } />
            <DropzoneSingleImageComponent hack={ this.props.hack.hack } />
            <p>
              <button className="ui button teal" onClick={(hack) => this.handleSubmit(this.props.hack.hack)}>
                Save
              </button>
            </p>
          </div>
      </Segment>
    );
  }

}

const mapStateToProps = (state) => ({
  hack: state.hack
});
export default connect(mapStateToProps, hackActions)(HackViewComponent);
