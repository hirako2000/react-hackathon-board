import mongoose from 'mongoose';
import Promise from 'bluebird';
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var HackSchema = new Schema({
  id: Number,
  owner: String,
  joiners: [String],
  title: String,
  shortDescription: String,
  description: String,
  pictureURL: String,
  category: String,
  season: String,
  hackathon: String,
  open: { type: Boolean, default: true },
  completed: { type: Boolean, default: false },
  location: String,
  science: { type: Boolean, default: false },
  nominated: { type: Boolean, default: false }
});

var Hack = mongoose.model('Event', HackSchema);

export default Hack;
