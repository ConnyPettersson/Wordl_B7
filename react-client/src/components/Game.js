import React, { useState, useEffect } from "react";
import input from "./input"; // Antag att detta är sökvägen till din input-funktion
import selectWord from "./selectWord"; // Antag att detta är sökvägen till din selectWord-funktion

const Game = () => {
  const [correctWord, setCorrectWord] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5080/api/words")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.words);

        const word = selectWord(data.words, 5, false); 

        console.log('Correct word: ' + word)
        setCorrectWord(word);
      })
      // .catch((error) => {
      //   console.error("Fetch Error:", error);
      // });
  }, []);

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    const currentFeedback = input(guess, correctWord);
    setFeedback(currentFeedback);

    if (currentFeedback.every((item) => item.result === "correct")) {
      setGameOver(true);
    }

    setGuess("");
  };

  return (
    <div>
      <h1>Wordle-spel</h1>
      {!gameOver ? (
        <>
          <form onSubmit={handleGuessSubmit}>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              maxLength={correctWord.length}
            />
            <button type="submit">Gissa</button>
          </form>
          <div>
            {feedback.map((item, index) => (
              <span
                key={index}
                style={{ color: getFeedbackColor(item.result) }}
              >
                {item.letter}
              </span>
            ))}
          </div>
        </>
      ) : (
        <div>
          <p>Grattis, du gissade rätt ord!</p>
          <button onClick={() => window.location.reload()}>Spela igen</button>
        </div>
      )}
    </div>
  );
};

const getFeedbackColor = (result) => {
  switch (result) {
    case "correct":
      return "green";
    case "misplaced":
      return "yellow";
    case "incorrect":
      return "red";
    default:
      return "black";
  }
};

export default Game;
