import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (playerName: string) => void;
  configPlayerName: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, configPlayerName }) => {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName === configPlayerName) {
      onLogin(playerName);
    } else {
      setError('Incorrect player name');
    }
  };

  return (
    <div className="login-screen">
      <h2>Enter Your Name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="name-input"
        />
        <button type="submit" style={{ marginLeft: '1em' }}>Play</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginScreen;
