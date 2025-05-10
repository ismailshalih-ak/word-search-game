import React, { useState, useEffect } from 'react';
import './App.css';
import LoginScreen from './components/LoginScreen';

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

  useEffect(() => {
    // Load config from JSON file (assuming it's in public/config.json)
    fetch('/src/config/config.json')
      .then(response => response.json())
      .then(data => setConfig(data))
      .catch(error => console.error('Error loading config:', error));
  }, []);

  const handleLogin = (name: string) => {
    setPlayerName(name);
    setIsLoggedIn(true);
  };

  if (!config) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} configPlayerName={config.playerName} />;
  }

  return (
    <>
      <h1>Word Search Game</h1>
      <p>Welcome, {playerName}!</p>
    </>
  );
}

export default App;
