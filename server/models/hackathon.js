import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var HackathonSchema = new Schema({
  id: Number,
  title: String,
  shortDescription: String,
  description: String,
  rules: String,
  prizes: [String],
  startDate: Date,
  endDate: Date,
  pictureURL: String,
  category: String,
  season: String,
  open: Boolean
});

var Hackathon = mongoose.model('Hackathon', HackathonSchema);

export default Hackathon;
