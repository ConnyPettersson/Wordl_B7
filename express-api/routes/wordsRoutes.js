// Importera express och din JSON-data
import express from 'express';
import data from '../data/words_dictionary.json' assert { type: "json" };;

const router = express.Router();

// Funktion för att filtrera ord efter längd med en arrow-funktion
const filterWordsByLength = (words, length) => words.filter(word => word.length === length);

// Funktion för att säkerställa att alla bokstäver i ett ord är unika med en arrow-funktion
const ensureUniqueLetters = (words) => words.filter(word => new Set(word.split('')).size === word.length);

router.get('/', (req, res) => {
  let words = Object.keys(data);
  const length = parseInt(req.query.length) || 5;
  const uniqueLetters = req.query.unique === 'true';

  words = filterWordsByLength(words, length);

  if (uniqueLetters) {
    words = ensureUniqueLetters(words);
  }

  res.status(200).json({ words });
});

// Exportera router med ES6-syntax
export default router;
