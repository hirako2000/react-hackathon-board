import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var HackathonSchema = new Schema({
  id: Number,
  title: String,
  shortDescription: String,
  description: String,
  rules: String,
  prizes: String,
  startDate: Date,
  endDate: Date,
  location: String,
  pictureURL: String,
  category: String,
  season: String,
  open: { type: Boolean, default: false },
  active: { type: Boolean, default: false},
  owner: String
});

var Hackathon = mongoose.model('Hackathon', HackathonSchema);

export default Hackathon;
