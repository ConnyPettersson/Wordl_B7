import React from 'react';
import './App.css';
import Game from './components/Game'; // Kontrollera och uppdatera sökvägen så att den stämmer med din mappstruktur

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Game /> {/* Lägg till Game-komponenten här */}
      </header>
    </div>
  );
}

export default App;
