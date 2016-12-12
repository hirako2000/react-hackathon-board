import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as commentsActions } from '../../redux/modules/comments';
import ReactDOM from 'react-dom';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';
import moment from 'moment';

type
Props = {
  fetchFromServer: Function,
  sendComment: Function,
  comments: Object
};

var Avatar = React.createClass({

  render: function() {
    if(this.props.comment.authorPicture){
      return (
        <img src={'user-images/' + this.props.comment.authorPicture}>
        </img>
      )
    } else {
      return(
        <object type="image/svg+xml" data={'user-images/' + this.props.comment.authorAvatar}>
        </object>
      );
    }
  }
});

var CommentsList =  React.createClass({
  render: function() {

    var comments = this.props.comments.comments.map(function (comment) {
      return (
        <div className="comment" key={comment._id}>
          <a className="avatar">
              <Avatar comment={comment}/>
          </a>
          <div className="content">
            <a href={ '#/people/' + comment.author} className="author">
              {comment.authorDisplay}
            </a>
            <div className="metadata">
              <span className="date">{moment(comment.date).format('lll')}</span>
            </div>
              <pre className="text">
                <p> {comment.content}</p>
              </pre>
          </div>
          <p></p>
        </div>
      );
    });

    return(
      <div className="ui comments">
        <h5 className="ui header">Comments</h5>
        {comments}
      </div>
    );
  }

});

var CommentInput = React.createClass ({
  getInitialState: function() {
    return {
      value: ''
    };
  },
  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  handleSubmit: function(val) {
    if(!this.state.value) {
      return;
    }
    this.props.sendComment(this.props.hackId, {'content': this.state.value});
    this.setState({
      value: ''
    })
  },

  render: function() {
    return (
      <div className="field">
        <textarea value={ this.state.value } rows="4"
                  onChange={this.handleChange}>
        </textarea>
        <div className="ui items">
          <button className="ui right floated tiny teal button" onClick={(comment) => this.handleSubmit(this.props.comment)}>
           Add comment
          </button>
        </div>
      </div>
    );
  }
});

export class CommentsComponent extends React.Component {

  static propTypes = {
    comments: PropTypes.object,
    fetchComments: PropTypes.func.isRequired,
    sendComment: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchComments(this.props.params.id);
    this.getData();
  }

  componentWillUnmount () {
  }

  getData() {
    this.setState({
      comment: ''
    });
  }

  render() {
    if (!this.props.comments || !this.props.comments.comments) {
      return (
        <div>Loading...</div>
      );
    }
    var comments = this.props.comments.comments.map(function (comment) {
      return (
        <div key={comment._id}>
          <a href={ '#/people/' + comment.author} key={comment.author}>
            {comment.authorDisplay} says:
          </a>
          <p key={comment._id}>{comment.content}</p>
        </div>
      );
    });

    return (
      <div className="field">
        <div className="ui comments">
          <CommentsList comments={this.props.comments}/>
        </div>
        <div className={!this.props.user || !this.props.user.user || !this.props.user.user._id ? 'hide-it' : "ui form"}>
          <CommentInput sendComment={this.props.sendComment} hackId={this.props.params.id}/>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  comments: state.comments,
  user: state.user
});
export default connect(mapStateToProps, commentsActions)(CommentsComponent);
