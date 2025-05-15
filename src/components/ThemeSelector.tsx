import React from 'react';

interface ThemeSelectorProps {
  themes: { themeName: string; words: string[]; completionMessage: string, gameOverMessage: string }[];
  onThemeSelect: (theme: { themeName: string; words: string[]; completionMessage: string, gameOverMessage: string  }) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, onThemeSelect }) => {
  return (
    <div className="theme-selector">
      <h2>Select a Theme</h2>
      <ul>
        {themes.map((theme) => (
          <li key={theme.themeName}>
            <button onClick={() => onThemeSelect(theme)}>{theme.themeName}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
