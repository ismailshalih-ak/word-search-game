import React, { useState, useEffect } from 'react';
import useTimer from '../hooks/useTimer';

interface WordSearchGridProps {
  grid: string[][];
  words: string[];
  duration: number;
  onWordFound: (word: string) => void;
  onGameOver: () => void;
}

const WordSearchGrid: React.FC<WordSearchGridProps> = ({ grid, words, duration, onWordFound, onGameOver }) => {
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const { timeLeft, startTimer } = useTimer(duration, onGameOver);
  const [highlightedCells, setHighlightedCells] = useState<[number, number][]>([]);
  const [firstCell, setFirstCell] = useState<[number, number] | null>(null);

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    const currentCell: [number, number] = [rowIndex, cellIndex];

    if (!firstCell) {
      // First cell selection
      setFirstCell(currentCell);
      setSelectedCells([currentCell]);
    } else {
      // Second cell selection
      const [firstRow, firstCol] = firstCell;
      const [secondRow, secondCol] = currentCell;

      const isValidSelection =
        (firstRow === secondRow || // Same row
          firstCol === secondCol || // Same column
          Math.abs(firstRow - secondRow) === Math.abs(firstCol - secondCol)) && // Diagonal
        selectedCells.length === 1;

      if (isValidSelection) {
        let selectedWord = '';
        const cellsToHighlight: [number, number][] = [];
        cellsToHighlight.push(firstCell);

        let startRow = firstRow;
        let startCol = firstCol;
        let endRow = secondRow;
        let endCol = secondCol;

        if (firstRow === secondRow) {
          // Horizontal
          startCol = Math.min(firstCol, secondCol);
          endCol = Math.max(firstCol, secondCol);
          for (let i = startCol; i <= endCol; i++) {
            selectedWord += grid[firstRow][i];
            cellsToHighlight.push([firstRow, i]);
          }
        } else if (firstCol === secondCol) {
          // Vertical
          startRow = Math.min(firstRow, secondRow);
          endRow = Math.max(firstRow, secondRow);
          for (let i = startRow; i <= endRow; i++) {
            selectedWord += grid[i][firstCol];
            cellsToHighlight.push([i, firstCol]);
          }
        } else {
          // Diagonal
          const rowDir = secondRow > firstRow ? 1 : -1;
          const colDir = secondCol > firstCol ? 1 : -1;
          let row = firstRow;
          let col = firstCol;
          while (row !== secondRow + rowDir) {
            selectedWord += grid[row][col];
            row += rowDir;
            col += colDir;
            cellsToHighlight.push([row, col]);
          }
        }

        selectedWord = selectedWord.trim().toUpperCase();
        const reversedWord = selectedWord.split("").reverse().join("");

        if (words.includes(selectedWord.toLowerCase()) || words.includes(reversedWord.toLowerCase())) {
          const correctWord = words.find(word => word.toUpperCase() === selectedWord) || words.find(word => word.toUpperCase() === reversedWord);
          if (correctWord) {
            onWordFound(correctWord); 
          }
          setHighlightedCells([...highlightedCells, ...cellsToHighlight]);
        }
      }
      resetSelection();
    }
  };

  const resetSelection = () => {
    setFirstCell(null);
    setSelectedCells([]);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <div>
      <div className="timer">Time Left: {formatTime(timeLeft)}</div>
      <div className="word-search-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="word-search-row">
            {row.map((cell, cellIndex) => (
              <button
                key={cellIndex}
                className={`word-search-cell ${
                  highlightedCells.some(
                    (highlightedCell) =>
                      highlightedCell[0] === rowIndex && highlightedCell[1] === cellIndex
                  )
                    ? 'highlighted'
                    : selectedCells.some(
                      (selectedCell) =>
                        selectedCell[0] === rowIndex && selectedCell[1] === cellIndex
                    )
                      ? 'selected'
                      : ''
                }`}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordSearchGrid;
