import express from 'express';
import Highscore from '../src/models.js'; // Antag att models.js ligger direkt under src-mappen

const router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const { name, score } = req.body;
    const newHighscore = new Highscore({ name, score });
    await newHighscore.save();
    res.status(201).json(newHighscore);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Could not save highscore', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const highscores = await Highscore.find().sort({ score: -1 }); // Antag att du vill sortera resultaten efter poäng, med högst poäng först
    res.json(highscores);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong fetching the highscores' });
  }
});

export default router;


