import express from "express";
import data from "../data/words_dictionary.json" assert { type: "json" };

const router = express.Router();

const filterWordsByLength = (words, length) =>
  words.filter((word) => word.length === length);

const ensureUniqueLetters = (words) =>
  words.filter((word) => new Set(word.split("")).size === word.length);

router.get("/", (req, res) => {
  let words = Object.keys(data);
  const length = parseInt(req.query.length) || 5;
  const uniqueLetters = req.query.unique === "true";

  words = filterWordsByLength(words, length);

  if (uniqueLetters) {
    words = ensureUniqueLetters(words);
  }

  res.status(200).json({ words });
});


export default router;
