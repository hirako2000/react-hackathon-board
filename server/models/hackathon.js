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
  open: Boolean,
  active: Boolean,
  owner: String
});

var Hackathon = mongoose.model('Hackathon', HackathonSchema);

export default Hackathon;
