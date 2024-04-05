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
  const [guessCount, setGuessCount] = useState(0);
  

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

  const [score, setScore] = useState(10); // Startpoäng
const [userName, setUserName] = useState(''); // Användarnamn

  const saveHighscore = (name, score) => {
    console.log({ name, score });
    fetch('http://localhost:5080/api/highscore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, score }),
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Failed to save highscore');
    }
    return res.json();
  })
  .then((data) => {
    console.log('Highscore saved:', data);
  })
  .catch((error) => {
    console.error('Error saving highscore:', error);
  });

  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    setGuessCount((prevCount) => prevCount + 1);

    const currentFeedback = input(guess, correctWord);
    setFeedback(currentFeedback);
    setScore((prevScore) => prevScore - 1);

    if (currentFeedback.every((item) => item.result === "correct")) {
      setGameOver(true);
      // Skicka poäng och användarnamn till backend här
    } else if (score <= 1 || guessCount >= 9) { // Om poängen är 1 innan avdrag, blir nästa 0 och game over
      setGameOver(true);
      // Du kan välja att hantera game over vid 0 poäng här, kanske skicka poängen även då
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
              onChange={(e) => setLetterCount(e.target.value)}
              min="1"
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
              <span key={index} style={{ color: getFeedbackColor(item.result) }}>
                {item.letter}
              </span>
            ))}
          </div>
        </>
      ) : guessCount >= 10 ? (
        <div style={{ color: "red", fontSize: "24px", textAlign: "center" }}>Game Over, too many guesses!</div>
      ) : (
        <>
          <div>
            <p>Grattis, du gissade rätt ord!</p>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value.substring(0, 30))}
              placeholder="Skriv ditt namn"
            />
            <button onClick={() => saveHighscore(userName, score)}>Spara Highscore</button>
          </div>
          <button onClick={() => window.location.reload()}>Spela igen</button>
        </>
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
