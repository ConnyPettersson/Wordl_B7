import mongoose from 'mongoose';

const HighscoreSchema = new mongoose.Schema({
  name: String,
  score: Number,
  time: Number,
  guesses: String
});

const Highscore = mongoose.model('Highscore', HighscoreSchema);

export default Highscore 