import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var HackSchema = new Schema({
  id: Number,
  title: String,
  shortDescription: String,
  description: String,
  pictureURL: String,
  category: String,
  season: String,
  owners: [String],
  open: Boolean,
  location: String,
  science: Boolean,
  nominated: Boolean
});

var Hack = mongoose.model('Event', HackSchema);

export default Hack;
