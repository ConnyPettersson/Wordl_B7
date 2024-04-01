import React, { useState, useEffect } from "react";
import input from "./input"; // Antag att detta är sökvägen till din input-funktion
import selectWord from "./selectWord"; // Antag att detta är sökvägen till din selectWord-funktion

const Game = () => {
  const [correctWord, setCorrectWord] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [letterCount, setLetterCount] = useState(5);
  const [uniqueChar, setUniqueChar] = useState(false);

  useEffect(() => {
    const url = `http://localhost:5080/api/words?length=${letterCount}&unique=${uniqueChar}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.words);

        const word = selectWord(data.words); 

        console.log('Correct word: ' + word)
        setCorrectWord(word);
      })
      // .catch((error) => {
      //   console.error("Fetch Error:", error);
      // });
  }, [letterCount, uniqueChar]);

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
             <div>
            <label htmlFor="letterCount">Välj antal bokstäver: </label>
            <input
              id="letterCount"
              type="number"
              value={letterCount}
              onChange={(e) => setLetterCount(e.target.value)} // Uppdaterar letterCount baserat på användarens inmatning
              min="1" // Sätt ett lämpligt minimumvärde
            />
          </div>
          <div>
            <label htmlFor="uniqueChar">Unika bokstäver: </label>
            <input 
            id="uniqueChar"
            type="checkbox"
            checked={uniqueChar}
            onChange={(e) => setUniqueChar(e.target.checked)}
            />
          </div>
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
