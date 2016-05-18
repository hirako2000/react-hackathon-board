/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer, Field, Form, actions} from 'react-redux-form';
import { actions as hackathonActions } from '../../redux/modules/hackathon';
import classes from './HackathonsView.scss';
import ReactDOM from 'react-dom';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon, Label} from 'react-semantify';
import { push } from 'react-router-redux';
import DropzoneSingleImageComponent from '../HacksView/DropzoneComponent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DatePickerCss from 'react-datepicker/dist/react-datepicker.css';

type
Props = {
  hackathon: object,
  fetchFromServer: Function,
  updateToSever: Function,
  reset: Function
};

var DatePickerStartInput = React.createClass({
  getInitialState: function() {
    return {value: moment(this.props.hackathon.startDate) };
  },

  handleChange: function(date) {
    this.props.hackathon.startDate = date;
    this.setState({
      value: date
    });
  },

  render: function() {
    return (
      <span className="field">
        <label>Start Date</label>
        <DatePicker
        selected={this.state.value}
        onChange={this.handleChange} />
      </span>);
  }
});

var DatePickerEndInput = React.createClass({
  getInitialState: function() {
    return {value: moment(this.props.hackathon.endDate) };
  },

  handleChange: function(date) {
    this.props.hackathon.endDate = date;
    this.setState({
      value: date
    });
  },

  render: function() {
    return (
      <span className="field">
        <label>End Date</label>
        <DatePicker
        selected={this.state.value}
        onChange={this.handleChange} />
      </span>);
  }
});

var TitleInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon.title || '' };
  },
  handleChange: function(event) {
    this.props.hackathon.title = event.target.value;
    this.setState({
      value: event.target.value
    });
  },
  render: function() {
    return (
        <div className="twelve wide field">
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
    return {value: this.props.hackathon.shortDescription || '' };
  },
  handleChange: function(event) {
    this.props.hackathon.shortDescription = event.target.value;
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
    return {value: this.props.hackathon.description || '' };
  },
  handleChange: function(event) {
    this.props.hackathon.description = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div className="field">
          <label>Description</label>
          <textarea value={ this.state.value }
                    onChange={this.handleChange}>
        </textarea>
      </div>
    );
  }
});

var RulesInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon.rules || '' };
  },
  handleChange: function(event) {
    this.props.hackathon.rules = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div className="field">
          <label>Rules</label>
          <textarea value={ this.state.value }
                    onChange={this.handleChange}>
        </textarea>
      </div>
    );
  }
});

var OpenInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon.open || false };
  },
  handleChange: function(event) {
    this.props.hackathon.open = !this.props.hackathon.open;
    this.setState({ value: this.props.hackathon.open });
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

export class HackathonViewComponent extends React.Component {

  static propTypes = {
    hackathon: PropTypes.object,
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
    this.props.updateToSever(this.props.hackathon._id, val);
    // TODO - We should use react-router's history
    //this.props.history.push('#/'); // deprecated?
    window.location = '#/';
  }

  render() {
    if(!this.props.hackathon) {
      return <div>Loading...</div>
    }
    return (
      // The key is important for the component to be reset properly
      <Segment key={this.props.hackathon._id}>
          <div className="ui form">
            <h1>{ this.props.hackathon.title }</h1>

            <div className="fields">
              <TitleInput hackathon={ this.props.hackathon } />
              <DatePickerStartInput hackathon={ this.props.hackathon } />
              <DatePickerEndInput hackathon={ this.props.hackathon } />
            </div>
            <ShortDescriptionInput hackathon={ this.props.hackathon } />
            <DescriptionInput hackathon={ this.props.hackathon } />
            <RulesInput hackathon={ this.props.hackathon } />
            <OpenInput  hackathon={ this.props.hackathon } />

            <DropzoneSingleImageComponent hack={ this.props.hackathon } />
            <p>
              <button className="ui button teal" onClick={(hackathon) => this.handleSubmit(this.props.hackathon)}>Save</button>
            </p>
          </div>
      </Segment>
    );
  }

}

const mapStateToProps = (state) => ({
  hackathon: state.hackathon
});
export default connect(mapStateToProps, hackathonActions)(HackathonViewComponent);
