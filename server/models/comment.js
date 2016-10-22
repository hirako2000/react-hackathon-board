import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  id: Number,
  author: String,
  content: String,
  hack: String,
  date: Date
});

var Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
