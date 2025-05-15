import { useState } from 'react';
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
  gameOverMessage: string;
}

interface Config {
  playerName: string;
  duration: number;
  themes: Theme[];
}

const config: Config = {
  "playerName": "ismail",
  "duration": 60,
  "themes": [
    {
      "themeName": "Fruits",
      "words": ["apple", "banana", "grape", "mango"],
      "completionMessage": "You found all the fruits!",
      "gameOverMessage": "You found some of the fruits!"
    }
  ]
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [grid, setGrid] = useState<string[][] | null>(null);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

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

  const hasWon = selectedTheme && foundWords.length === selectedTheme.words.length;
  const gameEnded = isGameOver || hasWon;

  if (!selectedTheme) {
    return <ThemeSelector themes={config.themes} onThemeSelect={handleThemeSelect} />;
  }

  if (gameEnded) {
    return (
      <div>
        <h1>{hasWon ? selectedTheme.completionMessage : 'Game Over!'}</h1>
        {!hasWon && <p>{selectedTheme.gameOverMessage}</p>}
        <h3>Found Words:</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {foundWords.map((word, index) => (
            <li key={index} style={{ marginBottom: '0.2em' }}>{word}</li>
          ))}
        </ul>
        {/* You could add options to play again or select a new theme here */}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
      <div>
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
            style={{ marginRight: '2em'}}
          />
        )}
      </div>
      <div>
        <h3>Found Words:</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {foundWords.map((word, index) => (
            <li key={index} style={{ marginBottom: '0.2em' }}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
