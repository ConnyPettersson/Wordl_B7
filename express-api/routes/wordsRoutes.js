const express = require('express');
const router = express.Router();

const data = require('../data/words_dictionary.json'); // Anta att din fil är JSON-formaterad

router.get('/', (req, res) => {
  res.json(data);
});


module.exports = router;
