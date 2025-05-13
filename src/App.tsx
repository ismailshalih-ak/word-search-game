import React, { useState, useEffect } from 'react';
import './App.css';
import LoginScreen from './components/LoginScreen';
import ThemeSelector from './components/ThemeSelector';
import WordSearchGrid from './components/WordSearchGrid';
import generateWordSearch from './utils/gridGenerator';
import './styles/WordSearchGrid.css';

interface Theme {
  themeName: string;
  words: string[];
  completionMessage: string;
}

interface Config {
  playerName: string;
  duration: number;
  themes: Theme[];
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [config, setConfig] = useState<Config | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [grid, setGrid] = useState<string[][] | null>(null);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // Load config from JSON file
    fetch('/src/config/config.json')
      .then(response => response.json())
      .then(data => setConfig(data))
      .catch(error => console.error('Error loading config:', error));
  }, []);

  const handleLogin = (name: string) => {
    setPlayerName(name);
    setIsLoggedIn(true);
  };

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    const newGrid = generateWordSearch(theme.words, 10); // You can adjust the grid size
    setGrid(newGrid);
    setFoundWords([]); // Reset found words on new theme
  };

  const handleWordFound = (word: string) => {
    if(!foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
    }
  };

  if (!config) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} configPlayerName={config.playerName} />;
  }

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  if (!selectedTheme) {
    return <ThemeSelector themes={config.themes} onThemeSelect={handleThemeSelect} />;
  }

  if (isGameOver) {
    return (
      <div>
        <h1>Game Over!</h1>
        <p>Time ran out.</p>
        {/* You could add options to play again or select a new theme here */}
      </div>
    );
  }

  return (
    <>
      <h1>Word Search Game</h1>
      <p>Welcome, {playerName}!</p>
      <p>Selected Theme: {selectedTheme.themeName}</p>
      {grid && (
        <WordSearchGrid
          grid={grid}
          words={selectedTheme.words}
          duration={config.duration}
          onWordFound={handleWordFound}
          onGameOver={handleGameOver}
        />
      )}
      <div>
        <h3>Found Words:</h3>
        <ul>
          {foundWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
