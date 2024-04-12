import express from "express";
import Highscore from "../src/models.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, score, time, guesses, letterCount, uniqueChar } = req.body;
    const newHighscore = new Highscore({
      name,
      score,
      time,
      guesses,
      letterCount,
      uniqueChar,
    });

    await newHighscore.save();

    res.status(201).json(newHighscore);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Could not save highscore", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const highscores = await Highscore.find().sort({ score: -1 });
    res.json(highscores);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Something went wrong fetching the highscores" });
  }
});

export default router;
