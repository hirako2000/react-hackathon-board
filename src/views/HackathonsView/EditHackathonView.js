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
import ReactMarkdown from 'react-markdown';

type
Props = {
  hackathon: object,
  fetchFromServer: Function,
  updateToSever: Function,
  reset: Function
};

var DatePickerStartInput = React.createClass({
  getInitialState: function() {
    return {value: moment(this.props.hackathon ? this.props.hackathon.startDate : {}) };
  },

  handleChange: function(date) {
    this.props.hackathon.startDate = date;
    this.setState({
      value: date
    });
  },

  render: function() {
    return (
      <span className="three wide field">
        <label>Start Date</label>
        <DatePicker
        selected={this.state.value}
        onChange={this.handleChange} />
      </span>);
  }
});

var DatePickerEndInput = React.createClass({
  getInitialState: function() {
    return {value: moment(this.props.hackathon ? this.props.hackathon.endDate : {}) };
  },

  handleChange: function(date) {
    this.props.hackathon.endDate = date;
    this.setState({
      value: date
    });
  },

  render: function() {
    return (
      <span className="three wide field">
        <label>End Date</label>
        <DatePicker
        selected={this.state.value}
        onChange={this.handleChange} />
      </span>);
  }
});

var TitleInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.title : '' };
  },
  handleChange: function(event) {
    this.props.hackathon.title = event.target.value;
    this.setState({
      value: event.target.value
    });
  },
  render: function() {
    return (
        <div className="eight wide field">
          <label>Title</label>
          <input type="text" value={ this.state.value }
                 onChange={this.handleChange}>
          </input>
        </div>
    );
  }
});

var LocationInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.location : '' };
  },
  handleChange: function(event) {
    this.props.hackathon.location = event.target.value;
    this.setState({
      value: event.target.value
    });
  },
  render: function() {
    return (
        <div className="two wide field">
          <label>Location</label>
          <input type="text" value={ this.state.value }
                 onChange={this.handleChange}>
          </input>
        </div>
    );
  }
});

var ShortDescriptionInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.shortDescription : '' };
  },
  handleChange: function(event) {
    this.props.hackathon.shortDescription = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div  className="eight wide field">
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
    return {value: this.props.hackathon ? this.props.hackathon.description : '' };
  },
  handleChange: function(event) {
    this.props.hackathon.description = event.target.value;
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
          <ReactMarkdown source={this.props.hackathon && this.props.hackathon.description ? this.props.hackathon.description : ''}/>
        </div>
      </div>
    );
  }
});

var RulesInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.rules : '' };
  },
  handleChange: function(event) {
    this.props.hackathon.rules = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div className="fields">
        <div className="eight wide field">
          <label>Rules (markdown)</label>
          <textarea value={ this.state.value }
                    onChange={this.handleChange}>
          </textarea>
        </div>
        <div className="eight wide field">
          <label>Rule Preview</label>
          <ReactMarkdown source={this.props.hackathon && this.props.hackathon.rules ? this.props.hackathon.rules : ''}/>
        </div>
      </div>
    );
  }
});

var PrizesInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.prizes : '' };
  },
  handleChange: function(event) {
    this.props.hackathon.prizes = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div className="fields">
        <div className="eight wide field">
          <label>Prizes (markdown)</label>
          <textarea value={ this.state.value }
                    onChange={this.handleChange}>
          </textarea>
        </div>
        <div className="eight wide field">
          <label>Prizes Preview</label>
          <ReactMarkdown source={this.props.hackathon && this.props.hackathon.prizes ? this.props.hackathon.prizes : ''}/>
        </div>
      </div>
    );
  }
});


var OpenInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.open : true };
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

var ActiveInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.active : false };
  },
  handleChange: function(event) {
    this.props.hackathon.active = !this.props.hackathon.active;
    this.setState({ value: this.props.hackathon.active });
  },
  render: function() {
    return (
      <div className="field">
        <div className="ui checkbox">
          <input type="checkbox" checked={this.state.value}
                 onChange={this.handleChange}/>
          <label>Active</label>
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
    document.getElementById('container');
  }

  componentWillUnmount () {
    this.props.reset();
  }

  handleSubmit(val) {
    this.props.updateToSever(this.props.hackathon.hackathon._id, val);
    // TODO - We should use react-router's history
    //this.props.history.push('#/'); // deprecated?
    window.location = '#/';
  }

  render() {
    if(!this.props.hackathon.hackathon) {
      return (
        <div className="ui basic segment loading-height">
          <div className="ui active inverted dimmer row">
            <div className="ui medium inverted text loader">Loading</div>
          </div>
          <p></p>
          <p></p>
        </div>
      );
    }
    return (
      // The key is important for the component to be reset properly
      <Segment key={this.props.hackathon.hackathon ? this.props.hackathon.hackathon._id : null}>
          <div className="ui form">
            <h1>{ this.props.hackathon && this.props.hackathon.hackathon ? this.props.hackathon.hackathon.title : ''}</h1>

            <div className="ui horizontal divider header">
              Summary
            </div>
            <div className="fields">
              <TitleInput hackathon={ this.props.hackathon.hackathon } />
              <DatePickerStartInput hackathon={ this.props.hackathon.hackathon } />
              <DatePickerEndInput hackathon={ this.props.hackathon.hackathon } />
              <LocationInput hackathon={ this.props.hackathon.hackathon } />
            </div>

            <div className="fields">
              <ShortDescriptionInput hackathon={ this.props.hackathon.hackathon } />
              <OpenInput hackathon={ this.props.hackathon.hackathon } />
              <ActiveInput hackathon={ this.props.hackathon.hackathon } />
            </div>

            <div className="ui horizontal divider header">
              Details
            </div>

            <DescriptionInput hackathon={ this.props.hackathon.hackathon } />
            <RulesInput hackathon={ this.props.hackathon.hackathon } />
            <PrizesInput hackathon={ this.props.hackathon.hackathon } />

            <DropzoneSingleImageComponent hack={ this.props.hackathon.hackathon } />
            <p>
              <button className="ui tiny button teal" onClick={(hackathon) => this.handleSubmit(this.props.hackathon)}>Save</button>
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
