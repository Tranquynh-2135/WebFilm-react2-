const mongoose = require("mongoose");
const episodeSchema = new mongoose.Schema({
  title: String, 
  description: String, 
  url: String,
  episodeNumber: Number,
  releaseDate: Date, 
});

const filmSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  year: Number,
  genre: String,
  episodes: [episodeSchema],
});
filmSchema.index({ title: 'text', genre: 'text', description: 'text' });

module.exports = mongoose.model("Film", filmSchema);
