// I din React-komponent Highscore.js
import React, { useState, useEffect } from 'react';
import './Highscore.css';

const Highscore = () => {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5080/api/highscore') // Anpassa URL:en efter din backend-konfiguration
      .then((res) => res.json())
      .then((data) => {
        setHighscores(data);
      })
      .catch((error) => console.error('Error fetching highscores:', error));
  }, []);

  return (
    <>
      <main>
        <section>
          <h2>Highscore</h2>
          <ul>
            {highscores.map((score, index) => (
              <li key={index}>{score.name}: {score.score} {score.guesses} {score.time}</li>
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
