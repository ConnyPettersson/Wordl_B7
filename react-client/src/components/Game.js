import React, { useState, useEffect } from "react";
import input from "./input";
import selectWord from "./selectWord";

const Game = () => {
  const [correctWord, setCorrectWord] = useState("");
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [letterCount, setLetterCount] = useState(5);
  const [uniqueChar, setUniqueChar] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [score, setScore] = useState(100); // Startpoäng
  const [userName, setUserName] = useState(""); // Användarnamn
  const [highscoreSaved, setHighscoreSaved] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const url = `http://localhost:5080/api/words?length=${letterCount}&unique=${uniqueChar}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const word = selectWord(data.words);

        console.log("Correct word: " + word);
        setCorrectWord(word);
      });
  }, [letterCount, uniqueChar]);

  useEffect(() => {
    let intervalId;
    if (!gameOver && startTime) {
      intervalId = setInterval(() => {
        setCurrentTime(new Date()); // Uppdatera aktuell tid varje sekund
      }, 1000);
    }

    return () => {
      clearInterval(intervalId); // Stoppa timern när spelet är över eller komponenten avmonteras
    };
  }, [startTime, gameOver]);

  const saveHighscore = () => {
    if (startTime && endTime) {
      const duration = (endTime - startTime) / 1000;
      const data = {
        name: userName,
        score,
        time: duration,
        guesses: guesses.toString(),
        letterCount: letterCount,
        uniqueChar: uniqueChar.toString(),
      };

      fetch("http://localhost:5080/api/highscore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          setHighscoreSaved(true);
        })
        .catch((error) => {
          console.error("Error saving highscore:", error);
        });
    }
  };

  const handleGameOver = () => {
    setEndTime(new Date()); // Ställ in sluttiden när spelet är över
    setGameOver(true);
  };

  const handleGuessSubmit = (e) => {
    if (guess === "") {
      alert("Input must not be empty");
      return;
    }

    e.preventDefault();
    setGuessCount((prevCount) => prevCount + 1);
    const currentFeedback = input(guess, correctWord);
    setFeedback(currentFeedback);
    setScore((prevScore) => prevScore - 1);

    guesses.push(guess);

    if (
      currentFeedback.every((item) => item.result === "correct") ||
      score <= 1 ||
      guessCount >= 98
    ) {
      handleGameOver();
    }

    setGuess("");
  };

  const fetchNewWord = () => {
    const url = `http://localhost:5080/api/words?length=${letterCount}&unique=${uniqueChar}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const word = selectWord(data.words);
        console.log("Correct word: " + word);
        setCorrectWord(word);
      })
      .catch((error) => console.error("Error fetching word:", error));
  };

  useEffect(() => {
    fetchNewWord(); // Kalla på fetchNewWord när komponenten monteras eller när letterCount eller uniqueChar ändras
  }, [letterCount, uniqueChar]);

  const handleReset = () => {
    const resetTime = new Date();
    fetchNewWord(); // Kalla även på fetchNewWord när spelet återställs
    // Återställ resten av statet som tidigare
    setGameOver(false);
    setGuessCount(0);
    setScore(100);
    setGuess("");
    setFeedback([]);
    setHighscoreSaved(false);
    setUserName("");
    setStartTime(resetTime);
    setCurrentTime(resetTime);
    setEndTime(null);
    setGuesses([]);
  };

  const formatTime = () => {
    if (!startTime || !currentTime) {
      return "0:00";
    }
    const duration = (currentTime - startTime) / 1000;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Wordle-Game</h1>
      {!gameOver ? (
        <>
          <div>
            <label htmlFor="letterCount">Choose number of letters: </label>
            <input
              style={{ marginBottom: "20px" }}
              id="letterCount"
              type="number"
              value={letterCount}
              onChange={(e) => setLetterCount(e.target.value)}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="uniqueChar">Only unique characters: </label>
            <input
              id="uniqueChar"
              type="checkbox"
              style={{ verticalAlign: 'middle'}}
              checked={uniqueChar}
              onChange={(e) => setUniqueChar(e.target.checked)}
            />
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={handleReset}>Start new game</button>
          </div>
          <form onSubmit={handleGuessSubmit}>
            <input
              style={{ margin: "10px" }}
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              maxLength={correctWord.length}
            />
            <button type="submit">Guess</button>
          </form>
          <div>Number of guesses: {guessCount}</div>
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
          <div style={{ marginTop: '10px'}}>Time: {formatTime()}</div>
        </>
      ) : guessCount >= 100 ? (
        <>
          <div style={{ color: "red", fontSize: "24px", textAlign: "center" }}>
            Game Over, too many guesses!
          </div>
          <button onClick={handleReset}>Start new game</button>
        </>
      ) : (
        <>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "green", fontSize: "24px" }}>
              Congrats, you nailed it!
            </p>
            {highscoreSaved && <div>Highscore saved!</div>}
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value.substring(0, 30))}
              placeholder="Skriv ditt namn"
            />
            <button onClick={() => saveHighscore(userName, score)}>
              Save Highscore
            </button>
          </div>
          <div>
            <button onClick={handleReset}>Play again</button>
          </div>
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
