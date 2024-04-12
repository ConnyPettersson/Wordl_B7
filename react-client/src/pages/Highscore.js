import React, { useState, useEffect } from "react";
import "./Highscore.css";

const Highscore = () => {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5080/api/highscore")
      .then((res) => res.json())
      .then((data) => {
        setHighscores(data);
      })
      .catch((error) => console.error("Error fetching highscores:", error));
  }, []);

  return (
    <>
      <main>
        <section>
          <h2 style={{ marginLeft: "40px" }}>Highscore</h2>
          <ul>
            {highscores.map((score, index) => (
              <li style={{ marginTop: "20px" }} key={index}>
                {score.name}: Score: {score.score} Guesses: {score.guesses}{" "}
                Time: {score.time} Number of letters: {score.letterCount} Unique
                characters: {score.uniqueChar}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer>
        <p>© 2024 pedalConny</p>
      </footer>
    </>
  );
};

export default Highscore;
