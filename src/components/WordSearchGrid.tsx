import React from 'react';

interface WordSearchGridProps {
  grid: string[][];
}

const WordSearchGrid: React.FC<WordSearchGridProps> = ({ grid }) => {
  return (
    <div className="word-search-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="word-search-row">
          {row.map((cell, cellIndex) => (
            <button key={cellIndex} className="word-search-cell">
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordSearchGrid;
