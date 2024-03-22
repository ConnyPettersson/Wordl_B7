const express = require('express');
const router = express.Router();
const data = require('../data/words_dictionary.json'); // Antag att din fil är JSON-formaterad

// Funktion för att filtrera ord efter längd
function filterWordsByLength(words, length) {
  return words.filter(word => word.length === length);
}

// Funktion för att säkerställa att alla bokstäver i ett ord är unika
function ensureUniqueLetters(words) {
  return words.filter(word => new Set(word.split('')).size === word.length);
}

router.get('/', (req, res) => {
  let words = Object.keys(data); // Skapa en array av ord från JSON-nycklarna
  const length = parseInt(req.query.length) || 5; // Standardlängd är 5 om inget annat anges
  const uniqueLetters = req.query.unique === 'true'; // Kontrollera om unika bokstäver efterfrågas

  words = filterWordsByLength(words, length); // Filtrera ord efter längd

  if (uniqueLetters) {
    words = ensureUniqueLetters(words); // Filtrera ord för att endast inkludera de med unika bokstäver
  }

  res.json({ words });
});

module.exports = router;
